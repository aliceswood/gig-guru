import React, { useEffect, useState } from "react";
import Event from '../event/Event'
import city_names from '../cities/Cities'

const Feed = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [selectedCity, setSelectedCity] = useState('');

  var date = new Date();
  date = date.toISOString().split('T')[0];
  date += 'T00:00:00Z';

  useEffect(() => {
    if (selectedCity !== "") {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=${selectedCity}&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`)
      .then(response => response.json())
      .then(json => setData(json._embedded.events))
      .catch(error => console.error(error));
    } else {
      fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`)
      .then(response => response.json())
      .then(json => setData(json._embedded.events))
      .catch(error => console.error(error));
    }
  }, [selectedCity]);

  const logout = () => {
    window.localStorage.removeItem("token")
    setToken(null)
    navigate('/login')
  }

  const eventList = data.map(event => <Event {...event} key={event.id} />)
  
  if(!data.length) {
    console.log('No search results');
  } 


  return (
    <>
      <div>
        This page has rendered
        <div>
          <button type="button" id="logout" onClick={logout}>Logout</button>
          <label for="city-selector">Choose a location: </label>
          <input list="cities" id="city-selector" name="city-selector" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} />

          <datalist id="cities">
            {city_names.map(city => <option value={city}></option>)}
          </datalist>
        </div>
        <div>
          { date.toString() }
          { eventList }
        </div>
      </div>
    </>
  )
}

export default Feed;
