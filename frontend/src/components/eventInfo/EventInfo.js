import React from "react";
import "./EventInfo.css";
import CustomControlsMap from "../map/Map";
import { AiOutlineCalendar } from "react-icons/ai"
import { SlLocationPin } from "react-icons/sl"

const EventInfo = (props) => {

  return (
    <>
      <div className="event-info">
        <img
          id="image"
          data-cy="event-image"
          src={props.images[3].url}
          alt="event"
        ></img>
        <div id="event-title" data-cy="event-name">
          {props.name}
        </div>
        <div id="details-container">
          <div id="event-time">
            <AiOutlineCalendar/>
            <div data-cy="event-date">Date: {props.dates.start.localDate}</div>
            <div data-cy="event-time">Time: {props.dates.start.localTime}</div>
          </div>
          <div id="venue-details">
            <SlLocationPin/>
            <div data-cy="event-venue">{props._embedded.venues[0].name}</div>
            <div data-cy="event-postalcode">
              {props._embedded.venues[0].postalCode}
            </div>
          </div>
        </div>
        <div id="map">
          <CustomControlsMap />
        </div>
      </div>
    </>
  );
};
export default EventInfo;
