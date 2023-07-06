import React from "react";
import './event.css'

const Event = (props) => {
  console.log(props)
  return (
    <div className="flex-container">
      <div className="event-image">
        <img src={props.images[0].url} alt={props.name}/>
      </div>
      <div className="event-info-container">
        <div className="event-information">
          <div>{props.name} @ {props._embedded.venues[0].name}</div>
          <div>Date: {props.dates.start.localDate}</div>
          <div>Start time: {props.dates.start.localTime}</div>
        </div>
      </div>
      <div className="event-buttons">
        <button>
          Like
        </button>
        <button>
          Not interested
        </button>
      </div>
    </div>
  );

};

export default Event;
