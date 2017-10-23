const initialStages = [
  {name: "Not Sorted"},
  {name: "One"},
  {name: "Two"},
  {name: "Three"},
  {name: "Five"},
  {name: "Eight"},
  {name: "Thirteen"},
  {name: "Twenty-One"},
];


const sortingStages = (state = initialStages, action) => {
  switch (action.type){
    default:
      return state;
  }
};

export default sortingStages;
