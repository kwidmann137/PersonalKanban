'use strict';

class Item {
  static get itemRules () {
    return {
      text: 'required|min:1',
      due_date: 'required|date_format:YYYY-MM-DD',
      category_id: 'required|integer|exists:categories, id',
      estimated_time: "required|regex:^[0-9]{2}:[0-9]{2}:[0-9]{2}$",
      index: 'required|integer',
      stage: 'required|integer',
      stage_index: 'required|integer',
      sorting_stage: 'required|integer',
      sorting_index: 'required|integer',
    }
  }

  static get itemMessages() {
    return {
      'text.required': "A description is required",
      'text.min': '',
      'due_date.required': '',
      'due_date.date_format': '',
      'category_id.required': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
      '': '',
    }
  }
}

module.exports = Item;
