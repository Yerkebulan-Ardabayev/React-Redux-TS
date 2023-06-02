import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { RootState } from '../../redux/store/store';
import { getUsers } from '../../redux/slice/userSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableUser } from '../draggable/DraggableUser';
import style from './Style.module.css';

export const RenderedUser: FC<{}> = () => {
  const users = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [draggableUser, updateDraggableUser] = useState(users.usersList);
  const [isUserMounted, setIsUserMounted] = useState(false);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const todoItems = Array.from(draggableUser);
    const [reorderedToDo] = todoItems.splice(result.source.index, 1);
    todoItems.splice(result.destination.index, 0, reorderedToDo);

    updateDraggableUser(todoItems);
  }
  useEffect(() => {
    setIsUserMounted(true);
  }, []);

  useEffect(() => {
    if (!users.usersList.length) {
      dispatch(getUsers(2));
    }
    updateDraggableUser(users.usersList);
  }, [users.usersList.length, dispatch]);

  const renderedUsers = (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isUserMounted ? (
        <Droppable droppableId='user'>
          {(provided) => (
            <ul
              className={style.title_user}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {draggableUser.map(({ id, name, username }, i) => {
                return (
                  <Draggable key={id} draggableId={`${id}`} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}>
                        <DraggableUser
                          key={i}
                          id={id}
                          name={name}
                          username={username}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      ) : null}
    </DragDropContext>
  );

  return <>{renderedUsers}</>;
};
