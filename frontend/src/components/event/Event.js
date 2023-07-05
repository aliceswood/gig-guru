import React from "react";

const Event = (props) => {
  console.log(props)
  return (
    <div>
      <img src={props.images[0].url} alt={props.name}/>
      <div>{props.name}</div>;
    </div>
  );

};

export default Event;
