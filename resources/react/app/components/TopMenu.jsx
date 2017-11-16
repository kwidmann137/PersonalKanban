import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import CurrentProgressBar from "Containers/CurrentProgressBar";

const style={
  bar:{
    backgroundColor: '#fff',
    height: 'auto',
  },
  paper:{
    height: 80,
    width: 80,
    margin: 10,
    textAlign: 'center',
    backgroundColor: '#FAEE76',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon:{
    height: 80,
    width: 80,
    padding: 15,
  },
  addIcon:{
    color: 'green',
    width: '60%',
    height: 'auto',
  },
};

export default class TopMenu extends React.Component{

  constructor(props){
    super(props);

  }

  updateView = (view) => {
    this.props.updateView(view);
  };

  render(){
    return (
      <Toolbar style={style.bar}>
        <ToolbarGroup style={{width: '100%'}}>
          <CurrentProgressBar />
        </ToolbarGroup>
        <ToolbarGroup className="hover-group">
          {
            this.props.activeView !== 'sortItems' &&
            <div onClick={() => this.updateView('sortItems')} >
              <img src="/assets/SortIcon.png" alt="Schedule Icon" style={style.icon}/>
            </div>
          }
          {
            this.props.activeView !== 'schedule' &&
            <div onClick={() => this.updateView('schedule')} >
              <img src="/assets/ScheduleIcon.png" alt="Schedule Icon" style={style.icon}/>
            </div>
          }
          {
            this.props.activeView !== 'personalBoard' &&
            <div onClick={() => this.updateView('personalBoard')} >
              <img src="/assets/YourBoardIcon.png" alt="Schedule Icon" style={style.icon}/>
            </div>
          }
          <div onClick={() => this.props.toggleAddItem()} >
            <img src="/assets/AddItemIcon.png" alt="Schedule Icon" style={style.icon}/>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
  }

}
