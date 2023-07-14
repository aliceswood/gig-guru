import React from "react";
import './LikedEvent.css';
import {useNavigate} from "react-router-dom";


const Event = (event) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="carousel-item">
      <div className="entireEvent">
        <div className="flex-container">
          <div className="event-image">
            <img src={event.images[3].url} alt={event.name}/>
          </div>
          <div className="event-info-container" data-cy="event-info-container">
            <div className="event-information">
              <div data-cy={event.name}>{event.name} @ {event._embedded.venues[0].name}</div>
              <div>Date: {event.dates.start.localDate}</div>
              <div>Start time: {event.dates.start.localTime}</div>
            </div>
          </div>
          <div className="event-buttons">
            <button id="View-event-button" className="infoButton" data-cy='clickable-carousel-item' onClick={handleClick}>More Info</button>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Event;
