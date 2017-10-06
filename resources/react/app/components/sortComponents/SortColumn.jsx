import React, {Component} from 'react';
import SortingStickyNote from 'Components/SortingStickyNote';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const borderStyle = {
  borderTop: '1px solid #eee',
};

const grid = 2;

const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'white',
  width: 250,
  flexGrow: 1,
  flexBasis: 0,
});

export default class SortColumn extends Component{

  constructor(props){
    super(props);
  };

  render(){

    return(
      <Droppable droppableId={this.props.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <h1 style={{textAlign: 'center'}}>{this.props.title}</h1>
            <div style={Object.assign({}, borderStyle, this.props.style)}>
              {
                this.props.items.map((item, index) => (
                  <Draggable
                    key={this.props.id + '-' + index}
                    draggableId={this.props.id + '-' + index}
                  >
                    {(provided, snapshot) => (
                      <div>
                        <div
                          ref={provided.innerRef}
                          style={getItemStyle(
                            provided.draggableStyle,
                            snapshot.isDragging
                          )}
                          {...provided.dragHandleProps}
                        >
                          <SortingStickyNote
                            data={item}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    )
  }
}

