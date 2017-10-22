import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import StickyNote from 'Components/StickyNote';

const grid = 2;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : '',

  // styles we need to apply on draggables
  ...draggableStyle
});

const DraggableStickyNote = ({id, note, style}) => (
    <Draggable
      key={id}
      draggableId={id}
    >
      {(provided, snapshot) => (
        <div>
          <div
            ref={provided.innerRef}
            style={getItemStyle(
              provided.draggableStyle,
              snapshot.isDragging
            )}
            {...provided.dragHandleProps}
          >
            <StickyNote
              note={note}
              style={style}
              ref={provided.innerRef}
              {...provided.dragHandleProps}
            />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
);



export default DraggableStickyNote;
