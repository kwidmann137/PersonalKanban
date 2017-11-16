import { connect } from 'react-redux';
import CategoriesPane from 'Components/accountComponents/CategoriesPane';
import { saveCategories } from 'Actions';

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategories: (categories) => dispatch(saveCategories(categories)),
    // addCategory: () => dispatch(addCategory()),
    // updateColor: (color, category) => dispatch(updateCategoryColor(color, category)),
    // updateName: (name, category) => dispatch(updateCategoryName(name, category)),
    // updateHours: (hours, category) => dispatch(updateCategoryHours(hours, category)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesPane);
