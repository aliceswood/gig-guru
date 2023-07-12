import { useEffect, useState } from "react";
import LikedEvent from "../likedEvent/LikedEvent";
import './Account.css'

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));
  
  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then((json) => {
      localStorage.setItem('apiData', JSON.stringify(json.events));
      console.log(json.events);
      setEvents(json.events);
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
      <div id="liked-events">
        { events.map((event => <LikedEvent {...event} key={event.id}/>)) }
      </div>
    </>
    );
  };

export default Account;
