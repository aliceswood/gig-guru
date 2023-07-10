import { useEffect, useState } from "react";

const Account = ({ navigate }) => {
  const [events, setEvents] = useState([]);
  const [userId] = useState(window.localStorage.getItem("userId"));
  const [token] = useState(window.localStorage.getItem("token"));

  useEffect(() => {
    // fetch(`/users/${userId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // })
    // .then(response => response.json())
    // .then(async data => {
    //   console.log(data);
    // })
  })

  return (
    <>
      <div>Logged in as: {userId}</div>
      <div>
        Location placeholder
      </div>
      <div>
        Slider placeholder
      </div>
      <div>
        {events}
      </div>
    </>
  );
}

export default Account;