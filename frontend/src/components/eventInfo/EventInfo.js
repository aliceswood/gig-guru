import React from "react";

const Event = (props) => {
  console.log(props)

  return (
    <div data-cy="event-name">{props.name}</div>
    );
  };
export default Event;
