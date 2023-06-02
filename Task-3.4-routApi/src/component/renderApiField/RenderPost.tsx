import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getPosts } from "../../redux/slice/postsSlice";
import { RootState } from "../../redux/store/store";
import { DraggablePost } from "../draggable/DraggablePost";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import style from "./Style.module.css";

export const RenderPost: FC<{}> = () => {
  const posts = useAppSelector((state: RootState) => state.posts);
  const dispatch = useAppDispatch();
  const [draggablePost, updateDraggablePost] = useState(posts.contentApi);
  const [isPostMounted, setIsPostMounted] = useState(false);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const postItems = Array.from(draggablePost);
    const [reorderedPost] = postItems.splice(result.source.index, 1);
    postItems.splice(result.destination.index, 0, reorderedPost);

    updateDraggablePost(postItems);
  }
  useEffect(() => {
    setIsPostMounted(true);
  }, []);

  useEffect(() => {
    if (!posts.contentApi.length) {
      dispatch(getPosts(2));
    }
    updateDraggablePost(posts.contentApi);
  }, [posts.contentApi.length]);

  const renderedPosts = (
    // Оборачиваем в контекст нашей библиотеки, чтобы иметь возможность работать с drag&drop
    // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/drag-drop-context.md
    // Добавляем то, что мы хотим выполнить по завершению перемещения элемента, чтобы сделать изменения в списке, например
    // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/responders.md
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isPostMounted ? (
        // Компонент, который отвечает за то, куда будет перетянут элемент, в какой контейнер.
        // https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md
        <Droppable droppableId="post">
          {/*Объект, который дает доступ к опередленным данным компонента Droppable
            https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/api/droppable.md#1-provided-droppableprovided
           */}
          {(provided) => (
            // Это контейнер, где у нас находятся айтемы. Мы задаем ему пропсы компонента Droppable, также задаем ref, то есть ссылку на этот элемент
            <ul
              className={style.title_post}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* Перебираем наш массив, выбираем из него нужные свойства */}
              {draggablePost.map(({ body, id, title }, index) => {
                return (
                  <Draggable key={id} draggableId={`${id}`} index={index}>
                    {(provided) => (
                      // Это блок с нашим айтемом, тоже задаем ссылку, а также пропсы из компонентов Droppable и Draggable, чтобы можно было связать их между собой потом
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {/* Сам компонент, который мы хотим отобразить внутри передвигаемого блока */}
                        <DraggablePost
                          key={index}
                          body={body}
                          id={id}
                          title={title}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {/* Плейсхолдер, пустое место, которое мы оставляем для того, чтобы элементу, который уже взяли передвигать, было куда упасть */}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );

  return <>{renderedPosts}</>;
};
