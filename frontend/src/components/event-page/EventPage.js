import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventInfo from '../eventInfo/EventInfo'
import CustomControlsMap from "../map/Map";

const ViewEvent = () => {
    const [data, setData] = useState([]);
    const [token, setToken] = useState(window.localStorage.getItem("token"));
    const { id } = useParams()

    // useEffect(() => {
    //     fetch(
    //       `https://app.ticketmaster.com/discovery/v2/events.json?id=${id}&apikey=JtjU0ATGKIgSLhSEz5UQnr1LFy9hYZ0s`
    //     )
    //       .then((response) => response.json())
    //       .then((json) => setData(json._embedded.events))
    //       .catch((error) => console.error(error));
    // }, []);
    console.log(id);

    useEffect(() => {
      const storedData = localStorage.getItem('apiData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const filteredData = parsedData.filter(event => event.id === id);
        setData(filteredData);
      }
    }, [id]);

    // window.localStorage.removeItem('apiData');

      const eventInfo = data.map((event) => <EventInfo {...event} key={event.id} />);

        return (
          <>
            <div>
              <div >
                {eventInfo}
              </div>
              <div>
                <CustomControlsMap />
              </div>
            </div>
          </>
        );
      }

 export default ViewEvent;
