import React from 'react';
import PropTypes from 'prop-types';
import StickyNote from "Components/StickyNote";

const columnStyle = {
  flexGrow: 1,
  flexBasis: 0,
};

const borderStyle = {
  borderTop: '1px solid #eee',
};

const BoardColumn = ({title, items, style}) => (

  <div style={columnStyle}>
    <h1 style={{textAlign: 'center'}}>{title}</h1>
    <div style={Object.assign({}, borderStyle, style)}>
      {items.map((item, index) => (
        <StickyNote key={index} data={item}/>
      ))}
    </div>
  </div>
);

BoardColumn.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      category: PropTypes.number.isRequired,
      stage: PropTypes.number.isRequired,
      priority: PropTypes.number.isRequired,
      priorityIndex: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
};

export default BoardColumn;
