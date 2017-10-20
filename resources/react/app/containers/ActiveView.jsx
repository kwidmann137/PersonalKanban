import React from 'react';
import Account from "Components/pages/Account";
import Schedule from "Containers/Schedule";
import SortItems from "Containers/SortItems";
import PersonalBoard from "Containers/PersonalBoard";

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