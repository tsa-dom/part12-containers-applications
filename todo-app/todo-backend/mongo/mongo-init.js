db.createUser({
  user: 'root',
  pwd: 'secret',
  roles: [
    {
      role: 'dbOwner',
      db: 'todo_db',
    },
  ],
});

db.createCollection('todos');

db.todos.insert({ text: 'Write code', done: true });
db.todos.insert({ text: 'Learn about containers', done: false });