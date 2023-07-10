import React, { useEffect, useState } from "react";
import Event from "../event/Event";
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
  const date = getDate();
  // console.log("date is2:", date);

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=5&sort=date,asc&startDateTime=${date}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`
    )
      .then((response) => response.json())
      .then((json) => setData(json._embedded.events))
      .catch((error) => console.error(error));
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const eventList = data.map((event) => <Event {...event} key={event.id} />);

  if (!data.length) {
    console.log("No search results");
  }

  return (
    <>
      <div>
       <div>
        This page has rendered - could add the nav bar here
        <div>
          <button class nametype="button" id="logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="feedPage">
        <div className="logo">
          <img src="small-logo.jpeg" alt="logo"/>
        </div>
          <div data-cy="feed" className="eventComponent">
            {date.toString()}
            {eventList}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
