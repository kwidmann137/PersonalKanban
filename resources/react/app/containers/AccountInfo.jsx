import { connect } from 'react-redux';
import AccountInfoPane from 'Components/accountComponents/AccountInfoPane';
import { updateUser } from "../actions/index";

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch
  };
};

const AccountInfo = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountInfoPane);

export default AccountInfo;
