'use strict';

const Logger = use('Logger')

class Category {

  static get categoryRules () {
    return {
      'categories.*.name': 'required|min:1',
      'categories.*.color': 'required|regex:^#[0-9a-zA-Z]{6}$',
      'categories.*.hours': 'required',
    }
  }

  static get categoryMessages(){
    return {
      'categories.*.name.required': "Name is required",
      'categories.*.name.min': 'Name must be at least 1 character',
      'categories.*.color.required': 'Color is required',
      'categories.*.color.regex': 'Invalid color supplied',
      'categories.*.hours.required': 'Hours are required',
      'categories.*.hours.integer': 'Hours must be integers',
    }
  }

  static categoryValidateHours(categories){
    let errors = [];
    categories.forEach((category, index) => {
      if(category.hours.some(isNaN)){
        errors.push({
          field: 'categories.'+ index +'.hours',
          validation: 'integer',
          message: "Hours must be an integer"
        })
      }
    });

    return errors;
  }
}

module.exports = Category;
