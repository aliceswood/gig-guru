import React from "react";

const Event = (props) => {
  console.log(props.ticketing.url)

  return (
    <>
      <img src={props.images[0].url} alt="event"></img>
      <div data-cy="event-name">{props.name}</div>
      <div>Date: {props.dates.start.localDate}</div>
      <div>Time: {props.dates.start.localTime}</div>
      <div>{props._embedded.venues[0].name}</div>
      <div>{props._embedded.venues[0].postalCode}</div>
    </>
    );
  };
export default Event;
