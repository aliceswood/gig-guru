import React, { useEffect, useState } from "react";
import Event from '../event/Event';
import city_names from '../cities/Cities';
import './Feed.css';
import WaveSvg from "../event-page/Wave.svg";

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
  const [selectedCity, setSelectedCity] = useState("London");
  const [cityInput, setCityInput] = useState("");
  var [maxIndex, setMaxIndex] = useState(5);

  const handleChange = (event) => {
    setCityInput(event.target.value);
  };

  const isSearchDisabled = !cityInput || cityInput.length === 0;

  useEffect(() => {
    if (token) {
      const city = () => {
        if (selectedCity === "") {
          return "London";
        } else if (selectedCity === "shuffle") {
          const randomIndex = Math.floor(Math.random() * city_names.length);
          setSelectedCity(city_names[randomIndex]);
          return city_names[randomIndex];
        } else {
          setSelectedCity(selectedCity);
          return selectedCity;
        }
      };

      fetch("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.json())
      .then((data) => {
      window.localStorage.setItem("userId", data.userId);
      console.log(data)
      setId(window.localStorage.getItem("userId"));
      fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&city=${city()}&size=50&sort=date,asc&startDateTime=${date}&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
      )
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem("apiData", JSON.stringify(json._embedded.events));
        setData(json._embedded.events);
      })
      .catch((error) => console.error(error));
      })
    } else {
      navigate("/signup");
    }
  }, [selectedCity, date, token]);

  const handleSearch = (e) => {
    e.preventDefault();
    let selectedCity = document.getElementById("city-selector").value;
    if (selectedCity === "") {
      selectedCity = "London";
    }
    setSelectedCity(selectedCity);
    setCityInput(""); 
  };

  const loadMoreEvents = () => {
    setMaxIndex(maxIndex += 5);
  }

  const shuffle = () => {
    setSelectedCity("shuffle");
  };

  const eventList = data.slice(0, maxIndex).map((event) => <Event {...event} key={event.id} />);
  
  if (!data.length) {
    console.log("No search results");
  }

  const loadMoreButton = () => {
    if (maxIndex !== data.length) {
      return <button className="likeButton" onClick={loadMoreEvents}>Load more</button>
    } else {
      return;
    }
  }

  if (token) {
    return (
      <>
        <div className='feedPage' style={{ backgroundImage: `url(${WaveSvg})`, height: '100%'}}>
          <div className="flex-column">
            <div className="city-selector-container">
              <div>
              <div style={{ display: "inline-flex", marginTop: "1rem" }} >
                <input
                  placeholder="Please enter a city"
                  type="text"
                  id="city-selector"
                  name="city-selector"
                  className="city-selector-input"
                  value={cityInput}
                  onChange={handleChange}
                  defaultValue={selectedCity}
                  autoComplete="off"
                />
                <button
                  value={selectedCity}
                  onClick={handleSearch}
                  disabled={isSearchDisabled}
                  className="city-selector-button"
                >
                  Search
                </button>
                <button
                  type="button"
                  id="shuffle"
                  onClick={shuffle}
                  className="city-selector-button"
                >
                  Shuffle
                </button>
              </div>
              </div>
              <div id="current-location">
                Current location: {selectedCity[0].toUpperCase() + selectedCity.slice(1)}
              </div>
            </div>
            <div id="feed" data-cy="feed">
              <div id="event-list">{eventList}</div>
            </div>
            { loadMoreButton() }
          </div>
        </div>
      </>
    );
  }
};

export default Feed;
