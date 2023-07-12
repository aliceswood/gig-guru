import React from "react";

const EventInfo = (props) => {

  // test not functional, probably need token and 

  return (
    <>
      <img data-cy="event-image" src={props.images[0].url} alt="event"></img>
      <div data-cy="event-name">{props.name}</div>
      <div data-cy="event-date">Date: {props.dates.start.localDate}</div>
      <div data-cy="event-time">Time: {props.dates.start.localTime}</div>
      <div data-cy="event-venue">{props._embedded.venues[0].name}</div>
      <div data-cy="event-postalcode">{props._embedded.venues[0].postalCode}</div>
    </>
    );
  };
export default EventInfo;
