import React from 'react';
import Paper from 'material-ui/Paper';

const colors = {
  home: '#FAEE76',
  work: '#FD892C',
  school: '#86CBFB',
};

export default class SortingStickyNote extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      style: {
        height: 150,
        width: 150,
        margin: '10px auto',
        padding: '15px',
        position: 'relative',
        fontFamily: 'Architects Daughter, cursive',
        fontSize: 14,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transform: 'rotate(' + (Math.random() * (2 - -2) + -2).toString() + 'deg)',
        left: (Math.random() * (10 - -10) + -10).toString() + 'px',
      }
    };
  }

  render(){

    return(
      <Paper style={Object.assign({}, {backgroundColor: colors[this.props.data.category]}, this.state.style)} zDepth={1}>
        <p>{this.props.data.text}</p>
        <p>{this.props.data.category}</p>
        <p>{this.state.style.backgroundColor}</p>
        <div>

        </div>
      </Paper>
    );
  }
}
