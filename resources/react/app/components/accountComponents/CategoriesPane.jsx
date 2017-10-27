import React, { Component } from 'react';
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableRow from "./CategoriesTableRow";
import RaisedButton from 'material-ui/RaisedButton';


const newCategory = {
  name: '',
  color: '#FAEE76',
  hours: [
    0, 0, 0, 0, 0, 0, 0
  ]
};

export default class  CategoriesPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [...props.categories],
    };

  }

  updateColor = (category, color) => {
    let categories = [...this.state.categories];
    categories[category].color =  color;
    this.setState({categories: categories});
  };

  updateName = (category, name) => {
    let categories = [...this.state.categories];
    categories[category].name = name;
    this.setState({categories: categories});
    // this.props.updateName(value, this.props.categoryIndex);
  };

  updateHours = (category, hours) => {
    let categories = [...this.state.categories];
    categories[category].hours = hours;
    this.setState({categories: categories});
    // if(value > 0 || value === ''){
    //   if(value === '') value = 0;
    //   let newHours = [...this.props.category.hours];
    //   newHours[evt.target.name] = value;
    //   this.props.updateHours(newHours, this.props.categoryIndex);
    // }
  };

  addCategory = () => this.setState({categories: [...this.state.categories, {...newCategory}]});

  saveCategories = () => this.props.saveCategories(this.state.categories);

  render() {
    console.log(this.state);
    console.log(this.props);
    return (
      <div>
        <h2>Categories</h2>
        <small>Set a category name, color, and how many hours per day you plan to spend on it.</small>
        <br/>
        <CategoriesTableHeader/>
        {
          this.state.categories.map((category, index) => (
            <CategoriesTableRow key={index}
                                category={category}
                                categoryIndex={index}
                                updateName={this.updateName}
                                updateHours={this.updateHours}
                                updateColor={this.updateColor}
            />
          ))
        }
        <div className="text-right">
          <br/>
          <RaisedButton
            label="Add Category"
            default={true}
            onClick={this.addCategory}
          />
          <RaisedButton
            label="Save"
            primary={true}
            onClick={this.saveCategories}
          />
        </div>
      </div>
    )
  }
};
