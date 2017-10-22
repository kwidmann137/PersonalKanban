const initialStages = [
  {
    name: "To Do",
  },
  {
    name: "Doing",
  },
  {
    name: "Done",
  },
];

const stages = (state = initialStages, action) => {
  switch (action.type){
    default:
      return state;
  }
};

export default stages;
