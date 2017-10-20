import { connect } from 'react-redux';
import Board from 'Components/Board';

const sortItemsByStage = (items) => {
  let sortedItems = [];
  sortedItems[0] = items.filter(item => item.stage === 0);
  sortedItems[1] = items.filter(item => item.stage === 1);
  sortedItems[2] = items.filter(item => item.stage === 2);
  return sortedItems;
};

const mapStateToProps = (state) => {
  return {
    itemsByColumn: sortItemsByStage(state.items)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const PersonalBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default PersonalBoard;
