import lf from 'lovefield/dist/lovefield.es6';

let schemaBuilder = lf.schema.create('todo', 1);

schemaBuilder.createTable('Item').
addColumn('id', lf.Type.INTEGER).
addColumn('description', lf.Type.STRING).
addColumn('deadline', lf.Type.DATE_TIME).
addColumn('done', lf.Type.BOOLEAN).
addPrimaryKey(['id']).
addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);

let todoDb;
let item;
schemaBuilder.connect().then(function(db) {
  todoDb = db;
  item = db.getSchema().table('Item');
  let row = item.createRow({
    'id': 1,
    'description': 'Get a cup of coffee',
    'deadline': new Date(),
    'done': false
  });

  return db.insertOrReplace().into(item).values([row]).exec();
}).then(function() {
  return todoDb.select().from(item).where(item.done.eq(false)).exec();
}).then(function(results) {
  results.forEach(function(row) {
    console.log(row['description'], 'before', row['deadline']);
  });
});
