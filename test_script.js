const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


const args = process.argv;
const queryTerm = args[2];
const terms = [`%${queryTerm}%`];

function outputRows(rows, name) {
    console.log('Found', rows.length, 'person(s) by the name', name);
    for (const item of rows) {
      var date = item.birthdate;
      console.log(item.id + ':', item.first_name, item.last_name + ', born',  date.toString().slice(4,16));
    }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name LIKE $1::text OR last_name LIKE $1::text`,terms, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching...")
    outputRows(result.rows, queryTerm);
    client.end();
  });
});




