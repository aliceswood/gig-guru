import { useEffect, useState } from "react";
import LikedEvent from "../likedEvent/LikedEvent";
import './Account.css'

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));
  var [minIndex, setMin] = useState(0);
  var [maxIndex, setMax] = useState(3);
  var eventsDisplay = useState("")
  
  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(async data => {
      setEvents(data.events);
    })
  }, [])
  
  const updateEvents = (events) => {
    if (events === "reset") {
      return "no events"
    } else {
      return events.slice(minIndex, maxIndex).map((event => <LikedEvent {...event} key={event.id}/>))
    }
  }
  
  eventsDisplay = updateEvents(events);
  
 const clearDivs = () => {
   document.getElementById("liked-events").innerHTML = ""
 }

  const loadNextEvents = () => {
    clearDivs();
    setMin(minIndex += 3)
    setMax(maxIndex += 3)
    // if (minIndex >= events.length) {
    //   setMin(minIndex = 0)
    //   setMax(maxIndex = 3)
    // }
    eventsDisplay = updateEvents(events)
  }
  
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
        { eventsDisplay }
      </div>
      <button onClick={loadNextEvents}>Load next</button>
      <div>
        min index: {minIndex} - max index: {maxIndex}
      </div>
    </>
  );
}

export default Account;