import { useEffect, useState } from "react";

const Account = ({ navigate }) => {
  const [userId] = useState(window.localStorage.getItem("userId"));

  return (
    <div>{userId}</div>
  );
}

export default Account;