import React, { useEffect, useState } from "react";
import Event from '../event/Event'

const Feed = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=5&apikey=PK36qTtNEc9QOQ9NGvgvb1A65ZyzmW9N')
      .then(response => response.json())
      .then(json => setData(json._embedded.events))
      .catch(error => console.error(error));
  }, []);

  if(!data.length) {
    return 'No search results'
  }

  return (
    <>
      <div>This page has rendered
        <div>
          {data.map(event => <Event {...event} key={event.id} />)}
        </div>
      </div>
    </>
  )
}

export default Feed;
