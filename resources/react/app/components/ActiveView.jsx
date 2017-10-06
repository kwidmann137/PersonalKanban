import React from 'react';
import Account from "Components/Account";
import Schedule from "Components/Schedule";
import SortItems from "Components/SortItems";
import PersonalBoard from "Components/PersonalBoard";

export default class ActiveView extends React.Component{

  constructor(props){
    super(props);
  }

  render(){

    let activeItem = null;

    switch(this.props.activeView)
    {
      case 'personalBoard':
        activeItem = <PersonalBoard />;
        break;
      case 'account':
        activeItem = <Account />;
        break;
      case 'schedule':
        activeItem = <Schedule />;
        break;
      case 'sortItems':
        activeItem = <SortItems />;
        break;
      case 'categories':
        activeItem = <Account />;
        break;
    }

    return(
      <div>
        {activeItem}
      </div>
    )
  }

}
