'use strict';

const User = use('App/Models/User');
const Logger = use('Logger');
const Category = use('App/Models/Category');
const { test, trait, before, after } = use('Test/Suite')('API End Points - Items');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

let user;

before(async () => {
  user = await User.findBy('email', 'test@example.com');
});

test('Test adding an item', async ({ client, assert }) => {

  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    text: "New Item",
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "01:00:00",
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  };

  const response = await client.post('/api/v1/addItem')
    .loginVia(user, 'jwt')
    .send({
      item: addedItem
    })
    .end();

  // console.log(response.error);

  response.assertStatus(201);

  let newItems = await user.itemsAsJSON();

  delete addedItem.id;

  const newItem = newItems[newItems.length - 1];

  assert.deepInclude(newItem, addedItem);

});

test('Test adding an item with missing text', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    text: '',
    due_date: new Date().toISOString(),
    category_id: categories[0].id,
    estimated_time: "01:00:00",
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  };

  const response = await client.post('/api/v1/addItem')
    .loginVia(user, 'jwt')
    .send({
      item: addedItem
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'text',
        validation: 'required',
        message: "A description is required"
      }
    ]
  );
});

test('Test adding an item with missing category', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    text: "New item",
    due_date: new Date(),
    category_id: null,
    estimated_time: "01:00:00",
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  };

  const response = await client.post('/api/v1/addItem')
    .loginVia(user, 'jwt')
    .send({
      item: addedItem
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'category_id',
        validation: 'required',
        message: "A category is required"
      }
    ]
  );
});

test('Test adding an item with missing time', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    text: "New item",
    due_date: new Date(),
    category_id: categories[0].id,
    estimated_time: "",
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  };

  const response = await client.post('/api/v1/addItem')
    .loginVia(user, 'jwt')
    .send({
      item: addedItem
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'text',
        validation: 'required',
        message: "A description is required"
      }
    ]
  );
});

test('Test adding an item with missing due date', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    text: "New item",
    due_date: new Date(),
    category_id: categories[0].id,
    estimated_time: "",
    index: 0,
    stage: 0,
    stage_index: 0,
    sorting_stage: 0,
    sorting_index: 0
  };

  const response = await client.post('/api/v1/addItem')
    .loginVia(user, 'jwt')
    .send({
      item: addedItem
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'text',
        validation: 'required',
        message: "A description is required"
      }
    ]
  );
});

test('Test updating an item', async ({client, assert}) => {

});

test('Test updating an item with missing text', async ({client, assert}) => {

});

test('Test updating an item with missing due date', async ({client, assert}) => {

});

test('Test updating an item with missing category', async ({client, assert}) => {

});

test('Test updating an item with missing time', async ({client, assert}) => {

});
