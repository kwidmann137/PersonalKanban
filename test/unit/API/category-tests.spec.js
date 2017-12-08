'use strict';

const User = use('App/Models/User');
const Logger = use('Logger');
const Category = use('App/Models/Category');
const { test, trait, before, after } = use('Test/Suite')('API End Points - Categories');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

let user;

test('Test adding categories', async ({ client, assert }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  let addedCategory = {
    id: null,
    name: "Test Category 4",
    color: "#FAEE76",
    hours: [
      0, 1, 1, 1, 1, 1, 0
    ]
  };

  let categories = [
    ...originalUserCategories,
    addedCategory
  ];

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories:categories
    })
    .end();

  response.assertStatus(200);

  let userCategories = await user.categoriesAsJSON();

  delete addedCategory.id;

  const newCategory = userCategories[userCategories.length - 1];
  assert.deepInclude(newCategory, addedCategory);

});

test('Test updating categories', async ({ client, assert }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  const updatedCategories = [
    ...originalUserCategories
  ];

  const updatedCategory = updatedCategories[0];

  updatedCategory.name = 'Updated Category';


  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: updatedCategories
    })
    .end();

  response.assertStatus(200);

  let userCategories = await user.categoriesAsJSON();

  const newCategory = userCategories[0];
  delete updatedCategory.updated_at;
  assert.deepInclude(newCategory, updatedCategory);
});

test('Test updating category with missing name', async ({ client }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  const updatedCategories = [
    ...originalUserCategories
  ];

  const updatedCategory = updatedCategories[0];

  updatedCategory.name = '';

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: updatedCategories
    })
    .end();

  response.assertStatus(405);
  response.assertJSONSubset(
    [
      {
      field: 'categories.0.name',
      validation: 'required',
      message: "Name is required"
      }
    ]
  );

});

test('Test updating category invalid hours', async ({ client }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  const updatedCategories = [
    ...originalUserCategories
  ];

  const updatedCategory = updatedCategories[0];

  updatedCategory.hours = [
    0, 3, 3, 3, 3, "A", 0
  ];

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: updatedCategories
    })
    .end();

  response.assertStatus(405);
  response.assertJSONSubset(
    [
      {
        field: 'categories.0.hours',
        validation: 'integer',
        message: "Hours must be an integer"
      }
    ]
  );

});

test('Test updating category invalid color', async ({ client }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  const updatedCategories = [
    ...originalUserCategories
  ];

  const updatedCategory = updatedCategories[0];

  updatedCategory.color = "abc";

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: updatedCategories
    })
    .end();

  response.assertStatus(405);
  response.assertJSONSubset(
    [
      {
        field: 'categories.0.color',
        validation: 'regex',
        message: "Invalid color supplied"
      }
    ]
  );

});

test('Test category totals more than 18 hours per day for all days', async ({ client }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  let higherHourCategories = [];
  originalUserCategories.forEach(category => {
    category.hours.forEach((hour,index,hours) => hours[index] = (18/originalUserCategories.length) + 1);
    higherHourCategories.push(category);
  });

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: higherHourCategories
    })
    .end();

  response.assertStatus(405);
  response.assertJSONSubset(
    [
      {
        field: 'categories',
        validation: 'maxHours',
        message: "The following days total more than 18 hours of work: (Mon,Tues,Wed,Thurs,Fri,Sat,Sun).\nMake sure you're totals are not higher than 18 hours per day so you can sleep!"
      }
    ]
  );

});


test('Test category totals more than 18 hours per day for select days', async ({ client }) => {

  let originalUserCategories = await user.categoriesAsJSON();

  let higherHourCategories = [];
  originalUserCategories.forEach(category => {
    category.hours.forEach((hour,index,hours) => {
      if(index % 2 === 0){
        hours[index] = (18/originalUserCategories.length) + 1
      }
    });
    higherHourCategories.push(category);
  });

  const response = await client.post('/api/v1/updateCategories')
    .loginVia(user, 'jwt')
    .send({
      categories: higherHourCategories
    })
    .end();

  response.assertStatus(405);
  response.assertJSONSubset(
    [
      {
        field: 'categories',
        validation: 'maxHours',
        message: "The following days total more than 18 hours of work: (Mon,Wed,Fri,Sun).\nMake sure you're totals are not higher than 18 hours per day so you can sleep!"
      }
    ]
  );

});

test('Delete category and make sure items are deleted', async ({browser}) => {

});


before(async () => {
  user = await User.findBy('email', 'test@example.com');
});
