import React from 'react';
import Paper from 'material-ui/Paper';

let style = {
  height: 150,
  width: 150,
  margin: '10px auto',
  padding: '15px',
  backgroundColor: '#FAEE76',
  position: 'relative',
  fontFamily: 'Architects Daughter, cursive',
  fontSize: 14,
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default class SortingStickyNote extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      colors: {
        home: '#FAEE76',
        work: '#FD892C',
        school: '#86CBFB',
      }
    }
  }

  render(){

    style['transform'] = 'rotate(' + (Math.random() * (2 - -2) + -2).toString() + 'deg)';
    style['left'] = (Math.random() * (10 - -10) + -10).toString() + 'px';
    style['backgroundColor'] = this.state.colors[this.props.data.category];

    return(
      <Paper style={style} zDepth={1}>
        <p>{this.props.data.text}</p>
        <div>

        </div>
      </Paper>
    );
  }
}
