import { FC, useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

interface dataAlbProps {
  id: number | string;
  title: string;
  userId: number;
}

interface dataTodosProps {
  id: number | string;
  title: string;
  userId: number;
}

interface dataPostsProps {
  id: number | string;
  title: string;
  body: string;
}
export const GetAlbumsTodosPost: FC<{}> = () => {
  const albumsUrl = 'https://jsonplaceholder.typicode.com/users/1/albums';
  const todosUrl = 'https://jsonplaceholder.typicode.com/users/1/todos';
  const postsUrl = 'https://jsonplaceholder.typicode.com/users/1/posts';

  const fetchData = (url: string, callback: (data: any) => void) => {
      fetch(url)
          .then((response) => {
              if (!response.ok) {
                  throw new Error(
                      `This is an HTTP error: The status is ${response.status}`
                  );
              }
              return response.json();
          })
          .then((actualData) => {
              callback(actualData);
          });
  }

  const [dataAlb, setDataAlb] = useState<dataAlbProps[] | null>(null);

  const [dataTodos, setDataTodos] = useState<dataTodosProps[] | null>(null);

  const [dataPost, setDataPost] = useState<dataPostsProps[] | null>(null);

  useEffect(() => {
    fetchData(albumsUrl, setDataAlb);
    fetchData(todosUrl, setDataTodos);
    fetchData(postsUrl, setDataPost);
  }, []);

  return (
    <>
      <Tabs>
        <TabList>
          <Tab style={{ color: 'rgb(231, 17, 81)' }}>Albums</Tab>
          <Tab style={{ color: 'rgb(239, 255, 11)' }}>Todos</Tab>
          <Tab style={{ color: 'rgb(105, 253, 6)' }}>Posts</Tab>
        </TabList>
        <TabPanel>
          {dataAlb &&
            dataAlb.map(({ title, id }) => (
              <ul
                style={{
                  display: 'flex',
                  color: 'rgb(233, 9, 9)',
                  textAlign: 'left',
                }}>
                <li key={id}>{title}</li>
              </ul>
            ))}
        </TabPanel>
        <TabPanel>
          {dataTodos &&
            dataTodos.map(({ title, id }) => (
              <ul
                style={{
                  display: 'flex',
                  color: 'rgb(252, 248, 9)',
                  textAlign: 'left',
                }}>
                <li key={id}>{title}</li>
              </ul>
            ))}
        </TabPanel>
        <TabPanel>
          {dataPost &&
            dataPost.map(({ id, body }) => (
              <ul
                style={{
                  display: 'flex',
                  color: 'rgb(40, 189, 10)',
                  width: '600px',
                  textAlign: 'left',
                }}>
                <li key={id}>{body}</li>
              </ul>
            ))}
        </TabPanel>
      </Tabs>
    </>
  );
};
