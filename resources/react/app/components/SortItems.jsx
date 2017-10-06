import React from 'react';
import Board from 'Components/Board';
import SortColumn from "Components/sortComponents/SortColumn";
import { DragDropContext} from 'react-beautiful-dnd';

export default class SortItems extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Board >
          <SortColumn title="Not Sorted"/>
          <SortColumn title="1" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="2" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="3" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="5" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="8" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="13" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
          <SortColumn title="21" />
        </Board>
      </DragDropContext>
    );
  }
}
