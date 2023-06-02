import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getTodos } from "../../redux/slice/todoSlice";
import { RootState } from "../../redux/store/store";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DraggableTodoList } from "../draggable/DraggableTodo";
import style from "./Style.module.css";

export const RenderedTodoList: FC<{}> = () => {
  const todo = useAppSelector((state: RootState) => state.todo);

  const dispatch = useAppDispatch();

  const [draggableToDO, updateDraggableToDo] = useState(todo.contentApi);
  const [isTodoMounted, setIsTodoMounted] = useState(false);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const todoItems = Array.from(draggableToDO);
    const [reorderedToDo] = todoItems.splice(result.source.index, 1);
    todoItems.splice(result.destination.index, 0, reorderedToDo);

    updateDraggableToDo(todoItems);
  }
  useEffect(() => {
    setIsTodoMounted(true);
  }, []);

  useEffect(() => {
    if (!todo.contentApi.length) {
      dispatch(getTodos(2));
    }
    updateDraggableToDo(todo.contentApi);
  }, [todo.contentApi.length, dispatch]);

  const renderedTodo = (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {isTodoMounted ? (
        <Droppable droppableId="todo">
          {(provided) => (
            <ul
              className={style.title_todo}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {draggableToDO.map(({ id, title }, i) => {
                return (
                  <Draggable key={id} draggableId={`${id}`} index={i}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <DraggableTodoList key={i} id={id} title={title} />
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

  return <>{renderedTodo}</>;
};
