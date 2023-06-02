import { useEffect, useState } from "react";
interface dataProps {
  id: number;
  title: string;
}

export const FetchApiTodos: React.FC<{}> = () => {
  const [data, setData] = useState<dataProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=3`)
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
      <h2 style={{ fontSize: "25px" }}>API TODO</h2>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the todo data - ${error}`}</div>
      )}
      <ul
        style={{
          background: "#cce5ff",
          color: "darkblue",
          margin: "5px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          listStyleType: "none"
        }}
      >
        {data?.map(({ id, title }) => (
          <li style={{ textAlign: "justify" }} key={id}>
            <h4 style={{ fontSize: "20px" }}>{title}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};
