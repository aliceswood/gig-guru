import React from "react";
import './LikedEvent.css';


const Event = (event) => {
  return (
    <div className="carousel-item">
      <div className="liked-event-holder">
        {/* { JSON.stringify(event) } */}
        <div className="event-img">
          <img src={event.images[3].url} alt={event.name}/>
        </div>
        <div>
          { event.name }
        </div>
      </div>
    </div>
  );

};

export default Event;
