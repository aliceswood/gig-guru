import React from "react";
import './LikedEvent.css';
import {useNavigate} from "react-router-dom";


const Event = (event) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="carousel-item" data-cy='clickable-carousel-item' onClick={handleClick}>
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
