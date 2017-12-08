import React, { Component } from 'react';
import CategoriesTableHeader from "./CategoriesTableHeader";
import CategoriesTableRow from "./CategoriesTableRow";
import RaisedButton from 'material-ui/RaisedButton';
import SavedIndicator from "../../../common/components/SavedIndicator";

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

export default class CategoriesPane extends Component {

  constructor(props) {
    super(props);

    this.state = {
      categories: [...props.categories],
      saved: false,
      errors: {
        general: '',
      }
    };
  }

  updateColor = (category, color) => {
    // console.log("update color in categories pane");
    let categories = [...this.state.categories];
    categories[category].color =  color;
    // console.log("UPDATE COLOR SET STATE");
    this.setState({categories: categories});
  };

  updateName = (category, name) => {
    // console.log("update name in categories pane");
    let categories = [...this.state.categories];
    categories[category].name = name;
    // console.log("UPDATE NAME SET STATE");
    this.setState({categories: categories});
  };

  updateHours = (category, hours) => {
    // console.log("update hours in categories pane");
    let categories = [...this.state.categories];
    categories[category].hours = hours;
    // console.log("UPDATE HOURS SET STATE");
    this.setState({categories: categories});
  };

  addCategory = () => {
    // console.log("add cat in categories pane");
    // console.log("ADD CATEGORY SET STATE");
    this.setState({categories: [...this.state.categories, {...newCategory}]});
  };

  clearErrors = () => this.setState({errors: {}});

  setErrors = (errors) => {
    console.log(errors);
    errors.forEach(error => {
      let meta = error.field.split('.');
      if(meta.length === 1) {
        this.setState(({errors}) => ({
          errors: {
            ...errors,
            'general': error.message
          }
        }));
      } else {
        this.setState(({errors}) => ({
          errors: {
            ...errors,
            [meta[1]]: {
              ...errors[meta[1]],
              [meta[2]]: error.message
            }
          }
        }));
      }
    });
  };

  saveCategories = () => {
    this.props.saveCategories(this.state.categories)
      .then(() => {
        this.clearErrors();
        this.setState({saved: true});
        setInterval( () => {
          this.setState({saved:false});
        }, 2000);
      })
      .catch(errors => {
        this.clearErrors();
        this.setErrors(errors);
      });
  };

  deleteCategory = (category) => {

    this.props.deleteCategory(category)
      .then(resp => {
        let { categories } = {...this.state};
        categories = categories.filter(cat => cat.id !== category.id);
        this.setState({categories: categories});
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {
          this.state.saved &&
            <SavedIndicator />
        }
        <h2>Categories</h2>
        <small>Set a category name, color, and how many hours per day you plan to spend on it.</small>
        {
          this.state.errors.general &&
            <div>
              <small className="error">{this.state.errors.general}</small>
            </div>
        }
        <br/>
        <CategoriesTableHeader/>
        {
          this.state.categories.map((category, index) => (
            <CategoriesTableRow key={index}
                                category={category}
                                categoryIndex={index}
                                errors={this.state.errors[index]}
                                updateName={this.updateName}
                                updateHours={this.updateHours}
                                updateColor={this.updateColor}
                                deleteCategory={this.deleteCategory}
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
