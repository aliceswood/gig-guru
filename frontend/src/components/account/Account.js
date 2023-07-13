import { useEffect, useState } from "react";
import LikedEvent from "../likedEvent/LikedEvent";
import './Account.css'
import WaveSvg from "../event-page/Wave.svg"

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));
  
  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then((json) => {
      localStorage.setItem('apiData', JSON.stringify(json.events));
      // console.log(json.events);
      console.log(json.username);
      setEvents(json.events);
  })
}, [])
  
    return (
    <>
      <div style={{ backgroundImage: `url(${WaveSvg})`, height: '110vh'}}> 
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
      </div>
    </>
    );
  };

export default Account;
