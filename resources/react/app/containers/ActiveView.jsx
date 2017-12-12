import React from 'react';
import PersonalBoardPage from "Containers/PersonalBoardPage";
import SortPage from "Containers/SortPage";
import SchedulePage from "Containers/SchedulePage";
import AccountPage from "Components/AccountPage";

const ActiveView = ({view}) => {

  switch(view)
  {
    case 'personalBoard':
      return <PersonalBoardPage />;
    case 'account':
      return <AccountPage />;
    case 'schedule':
      return <SchedulePage />;
    case 'sortItems':
      return <SortPage />;
    case 'categories':
      return <AccountPage initialIndex={1} />;
  }
};

export default ActiveView;
