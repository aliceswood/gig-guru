import { useEffect, useState } from "react";
import LikedEvent from "../likedEvent/LikedEvent";
import './Account.css'
import WaveSvg from "../event-page/Wave.svg"

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');
  const [userId] = useState(window.localStorage.getItem("userId"));
  const [token] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetch(`/users/${userId}`)
      .then(response => response.json())
      .then((json) => {
        localStorage.setItem('apiData', JSON.stringify(json.events));
        console.log(json.username);
        setEvents(json.events);
        setUsername(json.username);
      })
    } else {
      navigate("/signup")
    }
  }, [])
  
  if (token) {
    return (
    <>
      <div style={{ backgroundImage: `url(${WaveSvg})`, height: '110vh'}}> 
        <div className="accountPage">
          <div className="liked-events-container">
            <div className="logged-in">Welcome, {username}</div>
            <div id="liked-events">
              { events.map((event => <LikedEvent {...event} key={event.id}/>)) }
            </div>
          </div>
        </div>
      </div>
    </>
    );
  };
};
export default Account;
