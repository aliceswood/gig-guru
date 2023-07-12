import React, { useEffect, useState } from "react";
import Event from '../event/Event'
import city_names from '../cities/Cities'

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
  
  useEffect(() => {
    fetch("/users", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(async data => {
      window.localStorage.setItem("userId", data.userId)
      setId(window.localStorage.getItem("userId"))
      if (selectedCity !== "") {
      fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=${selectedCity}&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`)
         .then((response) => response.json())
         .then((json) => {
          localStorage.setItem('apiData', JSON.stringify(json._embedded.events));
          setData(json._embedded.events);
        })
        .catch((error) => console.error(error))
      } else {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`)
         .then((response) => response.json())
         .then((json) => {
          localStorage.setItem('apiData', JSON.stringify(json._embedded.events));
          setData(json._embedded.events);
        })
        .catch((error) => console.error(error))
      }
    })
  }, [selectedCity]);


  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem('apiData');
    window.localStorage.removeItem("userId");
    setToken(null);
    setId(null);
    navigate("/login");
  };

  const navToUserPage = () => {
    // navigate(`/${userId}`)
    navigate("/account");
  }

  const redirectToSignup = () => {
    navigate("/signup");
  }

  const eventList = data.map((event) => <Event {...event} key={event.id} />);

  if (!data.length) {
    console.log("No search results");
  }

  if (token) {
    return (
      <>
        <div>
          This page has rendered
          <p>{userId}</p>
          <div>
            <button type="button" id="logout" onClick={logout}>Logout</button>
            <button type="button" id="user-page-btn" onClick={navToUserPage}>
              Your Profile
            </button>
            <label for="city-selector">Choose a location: </label>
            <input list="cities" id="city-selector" name="city-selector" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} />

            <datalist id="cities">
              {city_names.map(city => <option value={city}></option>)}
            </datalist>
          </div>
          <div data-cy="feed">
            {date.toString()}
            {eventList}
          </div>
        </div>
      </>
    );
  } else {
    redirectToSignup();
  }
};

export default Feed;
