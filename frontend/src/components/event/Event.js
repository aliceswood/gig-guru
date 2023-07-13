import React from "react";
import './event.css'

const Event = (props, navigate) => {

  const ViewEvent = `/event/${props.id}`;
  console.log(`This is the Event.js component ${props}`)

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

  const handleClick = () => {
    navigate(ViewEvent)
  }

  console.log(props)

  return (
    <>
    <div className="entireEvent">
    <div className="flex-container">
      <div className="event-image">
        <img src={props.images[0].url} alt={props.name}/>
      </div>
      <div className="event-info-container" data-cy="event-info-container">
        <div className="event-information">
          <div data-cy={props.name}>{props.name} @ {props._embedded.venues[0].name}</div>
          <div>Date: {props.dates.start.localDate}</div>
          <div>Start time: {props.dates.start.localTime}</div>
        </div>
      </div>
      <div className="event-buttons">
        <form onSubmit={handleLike} data-cy="like-button">
        <button type="submit" data-cy="actual-like-button" className="likeButton">
          Interested?
        </button>
        <button id="View-event-button" className="likeButton" data-cy="more-info-button" onClick={handleClick}>More Info</button>
        </form>
        </div>
      </div>
    </div>
  </>
  );
  };

export default Event;