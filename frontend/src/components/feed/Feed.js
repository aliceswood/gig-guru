import React, { useEffect, useState } from "react";
import Event from '../event/Event'

const Feed = () => {
  const [data, setData] = useState([]);
  var date = new Date();
  date = date.toISOString().split('T')[0];
  date += 'T00:00:00Z';

  useEffect(() => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationId=KZFzniwnSyZfZ7v7nJ&city=london&size=2&sort=date,asc&startDateTime=${date}&apikey=<api-key>`)
      .then(response => response.json())
      .then(json => setData(json._embedded.events))
      .catch(error => console.error(error));
  });

  const eventList = data.map(event => <Event {...event} key={event.id} />)
  
  if(!data.length) {
    return 'No search results'
  }

  return (
    <>
      <div>This page has rendered
        <div>
          { date.toString() }
          { eventList }
        </div>
      </div>
    </>
  )
}

export default Feed;
