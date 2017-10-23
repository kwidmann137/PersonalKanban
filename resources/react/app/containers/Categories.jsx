import { connect } from 'react-redux';
import CategoriesPane from 'Components/accountComponents/CategoriesPane';
import { addCategory } from 'Actions';
import { updateCategoryColor } from 'Actions';
import { updateCategoryHours } from 'Actions';

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCategory: () => dispatch(addCategory()),
    updateColor: (color, category) => dispatch(updateCategoryColor(color, category)),
    updateHours: (hours, category) => dispatch(updateCategoryHours(hours, category)),
  };
};

const AccountInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPane);

export default AccountInfo;
