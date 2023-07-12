import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const CustomControlsMap = () => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState('');
  const mapRef = useRef(null);
  const london = { lat: 51.50, lng: 0.13 };
  const { id } = useParams();

  useEffect(() => {
    const createCenterControl = (map) => {
      const controlButton = document.createElement('button');
      controlButton.classList.add('buttonStyle');

      controlButton.textContent = 'Center Map';
      controlButton.title = 'Click to recenter the map';
      controlButton.type = 'button';
      controlButton.addEventListener('click', () => {
        map.setCenter(london);
      });

      return controlButton;
    };

    const storedData = localStorage.getItem('apiData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const filteredData = parsedData.filter((event) => event.id === id);
      setData(filteredData);

      if (filteredData.length > 0) {
        setAddress(
          filteredData[0]._embedded.venues[0].name +
            ',' +
          filteredData[0]._embedded.venues[0].address.line1 +
            ',' +
            filteredData[0]._embedded.venues[0].city +
            ',' +
            filteredData[0]._embedded.venues[0].country.countryCode
        );
      }
    }

    const initMap = () => {
      const geocoder = new window.google.maps.Geocoder();

      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results.length > 0) {
          const map = new window.google.maps.Map(mapRef.current, {
            zoom: 15,
            center: results[0].geometry.location,
          });

          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: map,
            title: 'My Marker',
          });

          const centerControlDiv = document.createElement('div');
          const centerControl = createCenterControl(map);
          centerControlDiv.appendChild(centerControl);
          map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
        }
      });
    };

    if (typeof window.google === 'undefined' || typeof window.google.maps === 'undefined') {
      // Check if Google Maps API is not loaded
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDP7yEWMM2fPVIbvghrbbrUjGjHvvcJM8k&libraries=places`;
      script.defer = true;
      script.addEventListener('load', initMap);
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [id, address]);

  return (
    <div className='map' data-cy='map'>
      <div style={{ height: '40vh', width: '450px' }}>
        <div ref={mapRef} style={{ height: '100%' }}></div>
      </div>
    </div>
  );
};

export default CustomControlsMap;
