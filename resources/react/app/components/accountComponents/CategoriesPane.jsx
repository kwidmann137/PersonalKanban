import React, {Component} from 'react';
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableRow from "./CategoriesTableRow";

export default class CategoriesPane extends Component{

  constructor(props) {
    super(props);
    this.state = {
      categories: props.categories,
    }
  }

  updateInput = (evt, value) => {
    console.log(evt, value);
    if(value >= 0){

    }
  };

  render(){
    console.log(this.state);

    return(
      <div>
        <h2>Categories</h2>
        <CategoriesTableHeader/>
        {
          this.state.categories.map((category, index) => (
            <CategoriesTableRow key={index}
                                category={category}
                                updateInput={this.updateInput}
            />
          ))
        }
        <div>
          Add Category
        </div>
      </div>
    );
  }
}
