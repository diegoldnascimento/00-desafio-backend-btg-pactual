db = db.getSiblingDB('btgPactual');
db.createCollection('orders');



db.createUser({
    user: 'admin',
    pwd: 'admin',
    roles: [
      {
        role: 'dbOwner',
      db: 'btgPactual',
    },
  ],
});
