import React, { useEffect, useState } from "react";
import Event from '../event/Event';
import city_names from '../cities/Cities';
import './Feed.css';

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
          setId(window.localStorage.getItem("userId"));
          fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&countryCode=GB&city=${city()}&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`
          )
            .then((response) => response.json())
            .then((json) => {
              localStorage.setItem(
                "apiData",
                JSON.stringify(json._embedded.events)
              );
              setData(json._embedded.events);
            })
            .catch((error) => console.error(error));
        });
    } else {
      navigate("/signup");
    }
  }, [selectedCity, date, token]);

  const navToUserPage = () => {
    navigate("/account");
  };

  const redirectToSignup = () => {
    navigate("/signup");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let selectedCity = document.getElementById("city-selector").value;
    if (selectedCity === "") {
      selectedCity = "London";
    }
    setSelectedCity(selectedCity);
    setCityInput(""); 
  };

  const shuffle = () => {
    setSelectedCity("shuffle");
  };

  const eventList = data.map((event) => <Event {...event} key={event.id} />);
  
  if (!data.length) {
    console.log("No search results");
  }

  if (token) {
    return (
      <>
        <div className="feedPage">
          <div className="flex-column">
            <div>
              <form
                style={{ display: "inline-flex", marginTop: "1rem" }}
              >
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
              </form>
              <div
                id="current-location"
                style={{
                  display: "block",
                  marginTop: "1rem",
                  textAlign: "center",
                  color: "white",
                }}
              >
                Current location: {selectedCity[0].toUpperCase() + selectedCity.slice(1)}
              </div>
            </div>
            <div id="feed" data-cy="feed">
              <div id="event-list">{eventList}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Feed;
