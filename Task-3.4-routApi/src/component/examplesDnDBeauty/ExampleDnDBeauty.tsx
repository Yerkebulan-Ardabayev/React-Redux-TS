import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Examples.css";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed"
  },
  {
    id: "cato",
    name: "Little Cato"
  },
  {
    id: "kvn",
    name: "KVN"
  },
  {
    id: "mooncake",
    name: "Mooncake"
  },
  {
    id: "quinn",
    name: "Quinn Ergon"
  }
];

export const ExampleDnDBeauty = () => {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [isMounted, setIsMounted] = useState(false);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="App">
      <div className="AppHeader">
        <h1 className="name_title">Final Space Characters</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {isMounted ? (
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters.map(({ id, name }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p>{name}</p>
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
      </div>
    </div>
  );
};
