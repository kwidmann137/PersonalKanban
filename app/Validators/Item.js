'use strict';

class Item {
  static get itemRules () {
    return {
      description: 'required|min:1',
      due_date: 'required|date_format:YYYY-MM-DD',
      category_id: 'required|integer|exists:categories, id',
      estimated_time: 'required|itemTime',
      stage: 'required|integer',
      stage_index: 'required|integer',
      sorting_stage: 'required|integer',
      sorting_index: 'required|integer',
    }
  }

  static get itemArrayRules(){
    return {
      'items.*.description': 'required|min:1',
      'items.*.due_date': 'required|date_format:YYYY-MM-DD',
      'items.*.category_id': 'required|integer|exists:categories, id',
      'items.*.estimated_time': 'required|itemTime',
      'items.*.stage': 'required|integer',
      'items.*.stage_index': 'required|integer',
      'items.*.sorting_stage': 'required|integer',
      'items.*.sorting_index': 'required|integer',
    }
  }

  static get itemMessages() {
    return {
      'description.required': "A description is required",
      'description.min': 'The description must be at least 1 character',
      'due_date.required': 'Due date is required',
      'due_date.date_format': 'Invalid date format supplied.  Must be YYYY-MM-DD',
      'category_id.required': 'A category is required',
      'category_id.integer': 'Invalid category given',
      'category_id.exists': 'Category does not exist',
      'estimated_time.required': 'Estimated time is required',
      'estimated_time.itemTime': 'Invalid format for estimated time',
    }
  }


  static get itemArrayMessages(){
    return {
      'items.*.description.required': "A description is required",
      'items.*.description.min': 'The description must be at least 1 character',
      'items.*.due_date.required': 'Due date is required',
      'items.*.due_date.date_format': 'Invalid date format supplied.  Must be YYYY-MM-DD',
      'items.*.category_id.required': 'A category is required',
      'items.*.category_id.integer': 'Invalid category given',
      'items.*.category_id.exists': 'Category does not exist',
      'items.*.estimated_time.required': 'Estimated time is required',
      'items.*.estimated_time.itemTime': 'Invalid format for estimated time',
    }
  }
}

module.exports = Item;
