import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInfo from '../eventInfo/EventInfo'

const ViewEvent = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    let { id } = useParams()

    useEffect(() => {
      const storedData = localStorage.getItem('apiData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const filteredData = parsedData.filter(event => event.id === id);
        setData(filteredData);
      }
    }, [id]);

    console.log(data)

    const eventInfo = data.map((event) => <EventInfo {...event} key={event.id} />)

        return (
          <>
            <div>
              <div data-cy="event-div">
                {eventInfo}
              </div>
            </div>
          </>
        );
      }

 export default ViewEvent;
