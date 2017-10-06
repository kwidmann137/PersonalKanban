import React from 'react';
import BoardColumn from "Components/boardComponents/BoardColumn";
import Board from 'Components/Board';

export default class PersonalBoard extends React.Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <Board >
        <BoardColumn title="To Do"/>
        <BoardColumn title="Doing" style={{borderLeft: '1px solid #eee', borderRight: '1px solid #eee'}}/>
        <BoardColumn title="Done"/>
      </Board>
    );
  }
}
