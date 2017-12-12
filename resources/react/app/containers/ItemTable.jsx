import { connect } from 'react-redux';
import ItemTable from '../components/stickyNote/addItemWizard/ItemTable';
import {updateItems} from "../actions/index";

const mapStateToProps = (state, ownProps) => {

  if(ownProps.category_id){
    return {
      categories: state.categories.filter(category => category.id === ownProps.category_id),
      items: state.items.filter(item => item.category_id === ownProps.category_id)
    }
  }

  return {
    categories: state.categories,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateItems: (items) => dispatch(updateItems(items)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemTable);
