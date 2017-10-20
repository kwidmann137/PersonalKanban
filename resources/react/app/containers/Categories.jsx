import { connect } from 'react-redux';
import CategoriesPane from 'Components/accountComponents/CategoriesPane';
import addCategory from 'Actions';

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    addCateogry: () => {dispatch(addCategory())},
  };
};

const AccountInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPane);

export default AccountInfo;
