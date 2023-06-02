import { useEffect, useState } from "react";
interface dataProps {
    name: string;
    username: string;
}
  
export const FetchApiUsers: React.FC<{}> = () => {
  

  const [data, setData] = useState<dataProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users?_limit=3`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "400px" }}>
      <h2 style={{fontSize: "25px"}}>API USERS</h2>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the users data - ${error}`}</div>
      )}
      <ul
        style={{
          background: "#cce5ff",
          color: "darkblue",
          margin: "5px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          listStyleType: 'none'
        }}
      >
        {data &&
          data.map(({ name, username }, i) => (
            <li style={{ textAlign: "justify" }} key={i}>
              <h4 style={{fontSize: "20px"}}>NAME:&nbsp;{name}</h4>
              <h4 style={{fontSize: "20px"}}>USERNAME:&nbsp;{username}</h4>
            </li>
          ))}
      </ul>
    </div>
  );
};
