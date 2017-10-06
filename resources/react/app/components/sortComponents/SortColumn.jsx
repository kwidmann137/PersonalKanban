import React, {Component} from 'react';
import SortingStickyNote from 'Components/SortingStickyNote';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const columnStyle = {
  flexGrow: 1,
  flexBasis: 0,
};

const borderStyle = {
  borderTop: '1px solid #eee',
};

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class SortColumn extends Component{

  constructor(props){
    super(props);
    this.state = {
      items: [
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
      ]
    }

  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items,
    });
  };

  shuffleArray = (arr) => arr.sort(() => (Math.random() - 0.5));

  render(){

    this.shuffleArray(this.state.items);

    return(
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div ref={provided.innerRef}>
            <div style={columnStyle}>
              <h1 style={{textAlign: 'center'}}>{this.props.title}</h1>
              <div style={Object.assign({}, borderStyle, this.props.style)}>
                {this.state.items.map((item, index) => (
                  <Draggable key={index} draggableId={index}>
                    {(provided, snapshot) => (
                      <div>
                        <SortingStickyNote
                          data={item}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            </div>
          </div>
        )}
      </Droppable>
    )
  }
}

