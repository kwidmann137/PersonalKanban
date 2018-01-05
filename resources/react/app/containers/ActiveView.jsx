import React from 'react';
import PersonalBoardPage from "./PersonalBoardPage";
import SortPage from "./SortPage";
import SchedulePage from "./SchedulePage";
import AccountPage from "../components/accountComponents/AccountPage";

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
