const defaultUser = {
  firstName: '',
  lastName: '',
  email: '',
  avatarUrl: ''
};

const user = (state = defaultUser, action) => {
  console.log("IN USER REDUCER");
  console.log(state);
  console.log(action);
  switch(action.type){
    case "UPDATE_USER":
      return {
        firstName: action.firstName,
        lastName: action.lastName,
        email: action.email,
        avatarUrl: ''
      };
    default:
      return state;
  }
};

export default user;
