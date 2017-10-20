const activeView = (state = "personalBoard", action) => {
  console.log("ACTIVE VIEW REDUCER");
  console.log(state);
  return state;
};

export default activeView;
