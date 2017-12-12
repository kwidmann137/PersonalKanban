import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types'

/**
 * Dialog with action buttons. The APIReducers are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class ConfirmOnlyDialog extends React.Component {

  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleConfirm = () => {
    this.props.handleConfirm();
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton
        label={this.props.confirmText}
        secondary={true}
        keyboardFocused={true}
        onClick={this.handleConfirm}
      />,
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.state.open}
      >
        {this.props.message}
      </Dialog>
    );
  }
}

ConfirmOnlyDialog.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
