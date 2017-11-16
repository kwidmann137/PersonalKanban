const initialStages = [
  {
    name: "To Do",
  },
  {
    name: "Doing",
  },
  {
    name: "Done",
  }
];

const boardStages = (state = initialStages, action) => {
  switch (action.type){
    default:
      return state;
  }
};

export default boardStages;
