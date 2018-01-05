import React from 'react';
import BaseDialog from './BaseDialog';

/**
 * Dialog with action buttons. The APIReducers are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const DeleteDialog = ({message, handleCancel, handleConfirm}) => (
  <BaseDialog
    title="Are you sure?"
    message={message}
    cancelText="Cancel"
    handleCancel={handleCancel}
    confirmText="Delete"
    handleConfirm={handleConfirm}
  />
);

export default DeleteDialog;
