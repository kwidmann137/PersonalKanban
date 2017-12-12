export const itemRules = {
  //ToDo: add in custom rule on front end to check store for category with matching ID
  description: 'required|min:1',
  due_date: 'required|date_format:YYYY-MM-DD',
  category_id: 'required|integer',
  estimated_time: 'required|itemTime',
};

export const itemMessages = {
  'description.required': "A description is required",
  'description.min': 'The description must be at least 1 character',
  'due_date.required': 'Due date is required',
  'due_date.date_format': 'Invalid date format supplied.  Must be YYYY-MM-DD',
  'category_id.required': 'A category is required',
  'category_id.integer': 'Invalid category given',
  'category_id.exists': 'Category does not exist',
  'estimated_time.required': 'Estimated time is required',
  'estimated_time.itemTime': 'Invalid format for estimated time',
};
