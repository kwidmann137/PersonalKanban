import React from 'react';
import Board from 'Components/Board';
import SortColumn from "Components/sortComponents/SortColumn";
import { DragDropContext} from 'react-beautiful-dnd';

const style = {
  borders: {
    borderLeft: '1px solid #eee', borderRight: '1px solid #eee'
  }
};

export default class SortItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: {
        notSorted: shuffleArray(items.slice()),
        one: shuffleArray(items.slice()),
        two: shuffleArray(items.slice()),
        three: shuffleArray(items.slice()),
        five: shuffleArray(items.slice()),
        eight: shuffleArray(items.slice()),
        thirteen: shuffleArray(items.slice()),
        twentyOne: shuffleArray(items.slice()),
      }
    };

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result){
    // console.log(result);
    // dropped outside the list
    if(!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.droppableId,
      result.source.index,
      result.destination.droppableId,
      result.destination.index
    );

    // console.log(items);

    this.setState({
      items
    });
  };

  render(){
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Board >
          <SortColumn title="Not Sorted" id="notSorted" items={this.state.items.notSorted}/>
          <SortColumn title="1" id="one" items={this.state.items.one} style={style.borders}/>
          <SortColumn title="2" id="two" items={this.state.items.two} style={style.borders}/>
          <SortColumn title="3" id="three" items={this.state.items.three} style={style.borders}/>
          <SortColumn title="5" id="five" items={this.state.items.five} style={style.borders}/>
          <SortColumn title="8" id="eight" items={this.state.items.eight} style={style.borders}/>
          <SortColumn title="13" id="thirteen" items={this.state.items.thirteen} style={style.borders}/>
          <SortColumn title="21" id="twentyOne" items={this.state.items.twentyOne}/>
        </Board>
      </DragDropContext>
    );
  }
}

// a little function to help us with reordering the result
const reorder =  (list, startColumn, startIndex, endColumn, endIndex) => {
  // console.log(startColumn);
  // console.log(endColumn);
  // console.log(list);
  let newList = list;
  // console.log(newList);
  let srcArray = Array.from(list[startColumn]);
  let destArray = null;
  if(startColumn != endColumn){
    // console.log("DIFF COLUMNS");
    destArray = Array.from(list[endColumn]);
  }else{
    destArray = srcArray;
  }

  const removed = srcArray.splice(startIndex, 1)[0];
  // console.log(removed);
  // console.log("SRC");
  // console.log(srcArray);
  destArray.splice(endIndex, 0, removed);
  // console.log("DEST");
  // console.log(destArray);
  newList[startColumn] = srcArray.slice();
  newList[endColumn] = destArray.slice();
  // console.log("LIST");
  // console.log(newList[startColumn]);
  // console.log(newList[endColumn]);
  // console.log(newList);
  return newList;
};

const shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5));

const items = [
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'home',
  },
  {
    text: 'Longer Example - lorem ipsum',
    dueDate: '9/1/2017',
    category: 'school',
  },
  {
    text: 'Longest Example - lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    dueDate: '9/1/2017',
    category: 'school',
  },
  {
    text: 'Longer Example - lorem ipsum',
    dueDate: '9/1/2017',
    category: 'work',
  },
  {
    text: 'Longest Example - lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
    dueDate: '9/1/2017',
    category: 'home',
  },
  {
    text: 'Example',
    dueDate: '9/1/2017',
    category: 'work',
  },
];
