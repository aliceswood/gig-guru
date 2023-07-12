import React from "react";
import './EventInfo.css'
import CustomControlsMap from "../map/Map";

const EventInfo = (props) => {

  // test not functional, probably need token and 

  return (
    <>
      <div className="event-info">
        <img id="image" data-cy="event-image" src={props.images[0].url} alt="event"></img>
        <div id="event-title" data-cy="event-name">{props.name}</div>
        <div id="event-time">
          <div data-cy="event-date">Date: {props.dates.start.localDate}</div>
          <div data-cy="event-time">Time: {props.dates.start.localTime}</div>
         </div>
         <div id="venue-details"> 
          <div data-cy="event-venue">{props._embedded.venues[0].name}</div>
          <div data-cy="event-postalcode">{props._embedded.venues[0].postalCode}</div>
        </div>
        <div id='map'>
          <CustomControlsMap />
        </div>
      </div>
    </>
    );
  };
export default EventInfo;
