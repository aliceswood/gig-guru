import { useEffect, useState } from "react";
import LikedEvent from "../likedEvent/LikedEvent";
import './Account.css'

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');
  const [userId] = useState(window.localStorage.getItem("userId"));
  
  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then((json) => {
      localStorage.setItem('apiData', JSON.stringify(json.events));
      // console.log(json.events);
      console.log(json.username);
      setEvents(json.events);
      setUsername(json.username);
  })
}, [])
  
    return (
    <>
      <div className="accountPage">
          <div className="logged-in">Logged in as: {username}</div>
        <div className="flex-container">
          <div id="liked-events">
            { events.map((event => <LikedEvent {...event} key={event.id}/>)) }
          </div>
        </div>
      </div>
    </>
    );
  };

export default Account;
