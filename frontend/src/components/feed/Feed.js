import React, { useEffect, useState } from "react";
import Event from '../event/Event'
import city_names from '../cities/Cities'
import './Feed.css'

export const getDate = () => {
  var date = new Date();
  date = date.toISOString().split("T")[0];
  date += "T00:00:00Z";
  return date;
};

const Feed = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [userId, setId] = useState("");
  const date = getDate();
  const [selectedCity, setSelectedCity] = useState('');
  const [displayCityName, setDisplayCityName] = useState('London')
  
  useEffect(() => {

    if (token) {
      const city = () => {
        if (selectedCity === '') {
          return 'London'
        } else if (selectedCity === 'shuffle') {
          const randomIndex = Math.floor(Math.random() * city_names.length);
          setSelectedCity(city_names[randomIndex]);
          return city_names[randomIndex];
        } else {
          return selectedCity
        }
      }

      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
      window.localStorage.setItem("userId", data.userId);
      setId(window.localStorage.getItem("userId"));
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&city=${city()}&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`
      )
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("apiData", JSON.stringify(json._embedded.events));
        setData(json._embedded.events);
      })
      .catch((error) => console.error(error));
      })
    } else {
      navigate("/signup")
    }
  }, [selectedCity, date, token]);

  const navToUserPage = () => {
    navigate("/account");
  }


  const redirectToSignup = () => {
    navigate("/signup");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const selectedCity = document.getElementById('city-selector').value;
    setSelectedCity(selectedCity);
    document.getElementById('city-selector').value = '';
  }

  const shuffle = () => {
    setSelectedCity('shuffle')
  }
  
  const eventList = data.map((event) => <Event {...event} key={event.id} />);

  if (selectedCity !== "" && displayCityName !== selectedCity) {
    setDisplayCityName(selectedCity)
  }

  if (!data.length) {
    console.log("No search results");
  }

  if (token) {
    return (
      <>
       <div className='feedPage'>
          <div className='flex-column'>
            <div id="city-selector-container">
              <label for="city-selector">Choose a location: </label>
            <form>
            <input placeholder="City (default: London)" type="text" id="city-selector" name="city-selector"  />
            <button value={selectedCity} onClick={handleSearch}>Search</button>

            <button type="button" id="shuffle" onClick={shuffle}>Shuffle</button>
            </form>
            <div id="current-location">Current location: { displayCityName }</div>
            </div>
            <div id="feed" data-cy="feed">
              <div id="event-list">
                {eventList}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Feed;