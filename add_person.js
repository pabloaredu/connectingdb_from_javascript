const pg = require("pg");
const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});
console.log('Connected');

const args = process.argv;
const firstName = args[2];
const lastName = args[3];
const dateBorn = args[4];

knex('famous_people')
    .insert([{first_name: firstName}, {last_name: lastName}, {birthdate: dateBorn}])
    .asCallback((error, rows) => {
     console.log(`Inserted: ${firstName}`);
});

// knex('famous_people')
//     .insert({last_name: lastName})
//     .asCallback((error, rows) => {
//      console.log(`Inserted: ${lastName}`);
// });

// knex('famous_people')
//     .insert({birthdate: dateBorn})
//     .asCallback((error, rows) => {
//      console.log(`Inserted: ${dateBorn}`);
// });




