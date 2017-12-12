const nextAlertId = 0;

const alerts = (state = [], action) => {

  switch(action.type){
    case "SET_ALERT":
      return [
        {
          id: nextAlertId,
          text: action.text,
          action: action.action,
        },
        ...state
      ];
    case "CLEAR_ALERT":
      return state.filter(alter => alter.id !== action.id);
    default:
      return state;
  }
};
