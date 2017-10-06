import React from 'react';
import StickyNote from "Components/StickyNote";

const columnStyle = {
  flexGrow: 1,
  flexBasis: 0,
};

const borderStyle = {
  borderTop: '1px solid #eee',
};

export default class BoardColumn extends React.Component{

  constructor(props){
    super(props);

  }

  shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5));

  render(){

    this.shuffleArray(exampleItems);

    return(
      <div style={columnStyle}>
        <h1 style={{textAlign: 'center'}}>{this.props.title}</h1>
        <div style={Object.assign({}, borderStyle, this.props.style)}>
          {exampleItems.map((item, index) => (
            <StickyNote key={index} data={item}/>
          ))}
        </div>
      </div>
    )
  }
}


const exampleItems = [
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'home',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'school',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'school',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'work',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'home',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'work',
  },
];
