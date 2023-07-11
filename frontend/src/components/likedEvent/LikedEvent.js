import React from "react";

const Event = (props) => {
  // console.log(props)

  const handleLike = async (event) => {
    event.preventDefault();

    await fetch('/users', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(props)
    })
  }

  return (
    <div className="flex-container">
      <div className="event-image">
        <img src={props.images[0].url} alt={props.name}/>
      </div>
      <div className="event-info-container" data-cy="event-info-container">
        <div className="event-information">
          <div>{props.name} @ {props._embedded.venues[0].name}</div>
          <div>Date: {props.dates.start.localDate}</div>
          <div>Start time: {props.dates.start.localTime}</div>
        </div>
      </div>
      <div className="event-buttons">
        <form onSubmit={handleLike} data-cy="like-button">
        <button type="submit">
          Like
        </button>
        </form>
        <button>
          Not interested
        </button>
      </div>
    </div>
  );

};

export default Event;
