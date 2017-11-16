import React, {Component} from 'react';
import SortingStickyNote from 'Components/sortComponents/SortingStickyNote';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const borderStyle = {
  borderTop: '1px solid #eee',
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  width: 250,
  flexGrow: 1,
  flexBasis: 0,
});

const DroppableColumn = ({children, id, title, style}) => (
  <Droppable droppableId={id.toString()}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
      >
        <h1 style={{textAlign: 'center'}}>{title}</h1>
        <div style={Object.assign({}, borderStyle, style)}>
          {children}
        </div>
      </div>
    )}
  </Droppable>
);

export default DroppableColumn;

