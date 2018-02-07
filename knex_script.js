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
const queryTerm = args[2];

knex.select('*')
    .from('famous_people')
    .where('first_name','LIKE',`%${queryTerm}%`)
    .orWhere('last_name', 'LIKE',`%${queryTerm}%`)
    .asCallback((error, rows) => {
    for (const item of rows) {
        var date = item.birthdate;
        console.log(item.id + ':', item.first_name, item.last_name + ', born',  date.toString().slice(4,16));
      }
});

