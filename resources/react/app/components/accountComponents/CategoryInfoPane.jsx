import React, {Component} from 'react';
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableRow from "./CategoriesTableRow";

export default class CategoryInfoPane extends Component{

  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          category: 'Work',
          hours: [
            8, 8, 8, 8, 8, 0, 0
          ]
        },
        {
          category: 'School',
          hours: [
            6, 6, 6, 6, 6, 6, 6
          ]
        },
        {
          category: 'Home',
          hours: [
            1, 1, 1, 1, 1, 3, 3
          ]
        }
      ]
    };
  }

  render(){
    return(
      <div>
        <h2>Categories</h2>
        <CategoriesTableHeader/>
        {
          this.state.categories.map((item, index) => (
            <CategoriesTableRow key={index} category={item.category} hours={item.hours}/>
          ))
        }
      </div>
    );
  }
}
