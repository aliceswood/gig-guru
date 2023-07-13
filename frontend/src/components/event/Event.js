import React, { useEffect, useState } from "react";
import './event.css'
import { useNavigate } from 'react-router-dom';

const Event = (props) => {
  const ViewEvent = `/event/${props.id}`;
  console.log(`This is the Event.js component ${props}`)
  const [userId] = useState(window.localStorage.getItem("userId"))
  const [eventStatus, setEventStatus] = useState(false)

  useEffect(() => {
    fetch(`/users/${userId}/${props.id}`)
    .then((response) => response.json())
    .then((data) => {
      setEventStatus(data.eventInDB)
    })
  }, [])

  const handleLike = async (event) => {
    event.preventDefault();
    setEventStatus(true)

    await fetch('/users', {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(props)
    })
  }

  const navigate = useNavigate()
  const handleClick = () => {
    navigate(ViewEvent)
  }

  const eventStatusValue = () => {
    if (!eventStatus) {
      return 'Interested?';
    } else {
      return 'Added!';
    }
  }

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
          { eventStatusValue() }
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