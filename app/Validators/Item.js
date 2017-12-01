'use strict';

class Item {
  static get itemRules () {
    return {
      text: 'required|string|min:1',
      // due_date: 'required|date_format:YYYY-MM-DD',
      category_id: 'required|integer|exists:category, id',
      estimated_time: "required|regex:^\d\d:\d\d:\d\d$",
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
    }
  }
}

module.exports = Item;
