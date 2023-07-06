import React, { useEffect, useState } from "react";
import Event from '../event/Event'

const Feed = ({ navigate }) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&apikey=PK36qTtNEc9QOQ9NGvgvb1A65ZyzmW9N')
      .then(response => response.json())
      .then(json => setData(json._embedded.events))
      .catch(error => console.error(error));
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token")
    setToken(null)
    navigate('/login')
  }

  if(!data.length) {
    return 'No search results'
  }

  return <div>This page has rendered
    <div>
      <button type="button" id="logout" onClick={logout}>Logout</button>
    </div>
    <div>
    {data.map(event => <Event {...event} />)}
    </div>
  </div>;
};

export default Feed;
