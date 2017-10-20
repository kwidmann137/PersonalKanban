import React from 'react';
import { connect } from 'react-redux';
import Board from 'Components/Board';
import BoardColumn from "../components/boardComponents/BoardColumn";


const columns = [
  { title: 'To Do'},
  { title: 'Doing'},
  { title: 'Done'},
];

const PersonalBoardPage = ({itemsByStage}) => {
  return (
    <Board>
      {
        columns.map((column, index) => (
          <BoardColumn key={index} title={column.title} items={itemsByStage[index]}/>
        ))
      }
    </Board>
  )
};

const sortItemsByStage = (items) => {
  let sortedItems = [];
  for(let column = 0; column < columns.length; column++){
    sortedItems[column] = items.filter(item => item.stage === column);
  }
  return sortedItems;
};

const mapStateToProps = (state) => {
  return {
    itemsByStage: sortItemsByStage(state.items)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalBoardPage);
