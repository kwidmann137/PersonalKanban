'use strict';

const Logger = use('Logger')

class Category {

  static get categoryRules () {
    return {
      'categories.*.name': 'required|min:1',
      'categories.*.color': 'required|regex:^#[0-9a-zA-Z]{6}$',
      'categories.*.hours': 'required',
      'categories': 'maxHours:18'
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

  static categoryValidateMaxDailyHoursNotExceded(categories){
    let errors = [];
    let dailyTotals = new Array(7);
    dailyTotals.fill(0);
    let days = [
      'Mon',
      'Tues',
      'Wed',
      'Thurs',
      'Fri',
      'Sat',
      'Sun'
    ];

    categories.forEach( category => {
      category.hours.forEach((hour, index) => dailyTotals[index] += hour);
    });

    if(dailyTotals.some(total => total > 18)){
      const longDays = [];
      dailyTotals.forEach((total, index) => {
        if(total > 18){
          longDays.push(days[index]);
        }
      });

      errors.push({
        field: 'categories',
        validation: 'max_daily_hours',
        message: "The following days total more than 18 hours of work: (" + longDays.join() + ").\nMake sure you're totals are not higher than 18 hours per day so you can sleep!"
      })
    }

    return errors;
  }
}

module.exports = Category;
