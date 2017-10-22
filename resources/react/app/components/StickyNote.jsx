import React from 'react';
import Paper from 'material-ui/Paper';

const StickyNote = ({note, style}) => (
  <Paper style={style} zDepth={1}>
    <p>{note.text}</p>
    <p>{note.dueDate}</p>
    <div>

    </div>
  </Paper>
);


export default StickyNote;
