import React, { Component } from 'react';
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableRow from "./CategoriesTableRow";
import RaisedButton from 'material-ui/RaisedButton';
import SavedIndicator from "../../../common/components/SavedIndicator";
import Api from '../../../helpers/Api';

const newCategory = {
  id: null,
  name: '',
  color: '#FAEE76',
  hours: [
    0, 0, 0, 0, 0, 0, 0
  ]
};

const buttonStyle = {
  margin: 10
};

export default class  CategoriesPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [...props.categories],
      saving: false,
    };
  }

  updateColor = (category, color) => {
    let categories = [...this.state.categories];
    categories[category].color =  color;
    console.log("UPDATE COLOR SET STATE");
    this.setState({categories: categories});
  };

  updateName = (category, name) => {
    let categories = [...this.state.categories];
    categories[category].name = name;
    console.log("UPDATE NAME SET STATE");
    this.setState({categories: categories});
  };

  updateHours = (category, hours) => {
    let categories = [...this.state.categories];
    categories[category].hours = hours;
    console.log("UPDATE HOURS SET STATE");
    this.setState({categories: categories});
  };

  addCategory = () => {
    console.log("ADD CATEGORY SET STATE");
    this.setState({categories: [...this.state.categories, {...newCategory}]});
  };

  saveCategories = () => {
    this.setState({saving: true});
    Api.post('/updateCategories', this.state.categories)
      .then(resp =>{
        console.log(resp);
        this.props.saveCategories(this.state.categories);
      })
      .catch(error => {
        console.log(error);
      });

    setInterval(() => {
      this.setState({saving: false})
    }, 2000);
  };

  validateCategories = () => {
    let valid = true;
    let errors = '';
    this.state.categories.forEach((category) => {
      if(category.name.length < 3){
        errors += "The name must be at least 3 characters long<br/>";
      }
      category.hours.forEach((hour) => {
        if(hour === ''){
          errors += 'You must enter '
        }
      })
    });
    return valid;
  };

  render() {
    return (
      <div>
        {
          this.state.saving &&
            <SavedIndicator />
        }
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
          <RaisedButton
            label="Add Category"
            default={true}
            style={buttonStyle}
            onClick={this.addCategory}
          />
          <RaisedButton
            label="Save"
            primary={true}
            style={buttonStyle}
            onClick={this.saveCategories}
          />
        </div>
      </div>
    )
  }
};
