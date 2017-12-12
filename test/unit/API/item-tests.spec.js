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

test('Test adding a valid item', async ({ client, assert }) => {

  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    description: "New Item",
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "01:00",
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

  console.log(response.error);

  response.assertStatus(201);

  let newItems = await user.itemsAsJSON();

  delete addedItem.id;

  const newItem = newItems[newItems.length - 1];

  assert.deepInclude(newItem, addedItem);

});

test('Test adding an item with missing description', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    description: '',
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "01:00",
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

  console.log(response.error);

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'description',
        validation: 'required',
        message: "A description is required"
      }
    ]
  );
});

test('Test adding an item with missing category', async ({client, assert}) => {

  let addedItem = {
    id: null,
    description: "New item",
    due_date:new Date().toISOString().slice(0,10),
    category_id: null,
    estimated_time: "01:00",
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

  console.log(response.error);

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
    description: "New item",
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "",
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
        field: 'estimated_time',
        validation: 'required',
        message: "Estimated time is required"
      }
    ]
  );
});

test('Test adding an item with invalid time', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    description: "New item",
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "ab:ab",
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
        field: 'estimated_time',
        validation: 'itemTime',
        message: "Invalid format for estimated time"
      }
    ]
  );
});


test('Test adding an item with invalid time', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    description: "New item",
    due_date: new Date().toISOString().slice(0,10),
    category_id: categories[0].id,
    estimated_time: "00:01:02",
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
        field: 'estimated_time',
        validation: 'itemTime',
        message: "Invalid format for estimated time"
      }
    ]
  );
});

test('Test adding an item with missing due date', async ({client, assert}) => {
  let categories = await user.categoriesAsJSON();

  let addedItem = {
    id: null,
    description: "New item",
    due_date: null,
    category_id: categories[0].id,
    estimated_time: "",
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
        field: 'due_date',
        validation: 'required',
        message: "Due date is required"
      }
    ]
  );
});

test('Test updating an item', async ({client, assert}) => {

  const items = await user.itemsAsJSON();
  let item = items[0];

  const itemId = item.id;

  item.description = "Updated item description";
  item.due_date = new Date(2100, 1, 1).toISOString().slice(0, 10);
  item.estimated_time = "02:04";

  const response = await client.post('/api/v1/updateItem')
    .loginVia(user, 'jwt')
    .send({
      item: item
    })
    .end();

  response.assertStatus(200);

  const newItems = await user.itemsAsJSON();
  let newItem = newItems.filter(item => item.id === itemId)[0];

  delete item.updated_at;
  delete newItem.updated_at;

  assert.deepInclude(newItem, item);
});

test('Test updating an item with missing description', async ({client}) => {

  const items = await user.itemsAsJSON();
  let item = items[0];

  item.description = "";

  const response = await client.post('/api/v1/updateItem')
    .loginVia(user, 'jwt')
    .send({
      item: item
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'description',
        validation: 'required',
        message: "A description is required"
      }
    ]
  );
});

test('Test updating an item with missing due date', async ({client, assert}) => {

  const items = await user.itemsAsJSON();
  let item = items[0];

  item.due_date = "";

  const response = await client.post('/api/v1/updateItem')
    .loginVia(user, 'jwt')
    .send({
      item: item
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'due_date',
        validation: 'required',
        message: "Due date is required"
      }
    ]
  );
});

test('Test updating an item with missing category', async ({client, assert}) => {

  const items = await user.itemsAsJSON();
  let item = items[0];

  item.category_id = "";

  const response = await client.post('/api/v1/updateItem')
    .loginVia(user, 'jwt')
    .send({
      item: item
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

test('Test updating an item with missing time', async ({client, assert}) => {
  const items = await user.itemsAsJSON();
  let item = items[0];

  item.estimated_time = "";

  const response = await client.post('/api/v1/updateItem')
    .loginVia(user, 'jwt')
    .send({
      item: item
    })
    .end();

  response.assertStatus(400);
  response.assertJSONSubset(
    [
      {
        field: 'estimated_time',
        validation: 'required',
        message: "Estimated time is required"
      }
    ]
  );
});
