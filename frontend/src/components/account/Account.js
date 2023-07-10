import { useEffect, useState } from "react";
import Event from "../event/Event";

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));

  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(async data => {
      console.log(data.events);
      setEvents(data.events);
    })
  }, [])

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
        { events.map((event) => <Event {...event} key={event.id} />)}
      </div>
    </>
  );
}

export default Account;