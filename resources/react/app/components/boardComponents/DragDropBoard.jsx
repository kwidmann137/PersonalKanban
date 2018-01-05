import React from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import Board from './Board';



const DragDropBoard = ({children, onDragEnd}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board >
        {children}
      </Board>
    </DragDropContext>
  );
};

export default DragDropBoard;
