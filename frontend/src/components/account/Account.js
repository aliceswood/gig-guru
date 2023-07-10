import { useEffect, useState } from "react";
import Event from "../event/Event";

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));

  
  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(async data => {
      setEvents(data.events);
    })
  }, [])

  
  var eventsArray = events.map((event) => <Event {...event} key={event.id}/>);
  
  
    return (
    <>
      <div>Logged in as: {userId}</div>
      <div>
        Location placeholder
      </div>
      <div>
        Slider placeholder
      </div>
      <div>
        { eventsArray }
      </div>
    </>
  );
}

export default Account;