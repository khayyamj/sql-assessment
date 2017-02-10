var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = 'postgres://postgres:postgres@localhost/assessbox';

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb) {
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });

    //  ADD ALL ENDPOINTS HERE...

app.get('/api/users', function (req, res) {
   console.log('Getting users');
      db.get_users ([], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.get('/api/vehicles', function (req, res) {
   console.log('Getting vehicles');
      db.get_vehicles ([], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })
});

app.listen('3000', function(){
  console.log("Khayyam is a rock-star programmer! Successfully listening on : 3000")
})

module.exports = app;
