db = db.getSiblingDB('myDatabase');
db.createCollection('orders');



db.createUser({
    user: 'admin',
    pwd: 'admin',
    roles: [
      {
        role: 'dbOwner',
      db: 'myDatabase',
    },
  ],
});
