import React from 'react';
import PropTypes from 'prop-types';
import BoardColumn from "Components/boardComponents/BoardColumn";

const boardStyle = {
  display: 'flex',
  color: '#777',
};

const columns = [
  { title: 'To Do'},
  { title: 'Doing'},
  { title: 'Done'},
];

const Board = ({itemsByColumn}) => (

      <div style={boardStyle}>
        {
          columns.map((column, columnIndex) => {
            return (
              <BoardColumn title={column.title} key={columnIndex} items={itemsByColumn[columnIndex]}/>
            )
          })
        }
      </div>
);

Board.propTypes = {
  itemsByColumn: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        category: PropTypes.number.isRequired,
        stage: PropTypes.number.isRequired,
        priority: PropTypes.number.isRequired,
        priorityIndex: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired
};

export default Board;
