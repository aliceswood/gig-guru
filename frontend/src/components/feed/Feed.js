import React, { useEffect, useState } from "react";
import Event from "../event/Event";

export const getDate = () => {
  var date = new Date();
  date = date.toISOString().split("T")[0];
  date += "T00:00:00Z";
  return date;
};

const Feed = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const date = getDate();
  console.log("date is2:", date);

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=2&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`
    )
      .then((response) => response.json())
      .then((json) => {
        localStorage.setItem('apiData', JSON.stringify(json._embedded.events));
        setData(json._embedded.events);
      })
      .catch((error) => console.error(error));
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

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
          <div>
            <button type="button" id="logout" onClick={logout}>
              Logout
            </button>
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
