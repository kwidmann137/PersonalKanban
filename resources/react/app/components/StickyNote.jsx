import React from 'react';
import Paper from 'material-ui/Paper';

let style = {
  height: 300,
  width: 300,
  margin: '10px auto',
  padding: '15px',
  backgroundColor: '#FAEE76',
  position: 'relative',
  fontFamily: 'Architects Daughter, cursive',
  fontSize: 18
};

export default class StickyNote extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      colors: [
        '#FAEE76',
        '#FD892C',
        '#86CBFB',
      ]
    }
  }

  render(){

    style['transform'] = 'rotate(' + (Math.random() * (2 - -2) + -2).toString() + 'deg)';
    style['left'] = (Math.random() * (10 - -10) + -10).toString() + 'px';
    style['backgroundColor'] = this.state.colors[this.props.data.category];

    return(
      <Paper style={style} zDepth={1}>
        <p>{this.props.data.text}</p>
        <p>{this.props.data.dueDate}</p>
        <div>

        </div>
      </Paper>
    );
  }
}
