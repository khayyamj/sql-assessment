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
   console.log('Query ', req.query);
   //  Need function to accept email and firstletters queries
      db.get_vehicles ([], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.post('/api/users', function (req, res) {
   console.log('Adding user');
      db.add_user ([req.body.firstname, req.body.lastname, req.body.email], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.post('/api/vehicles', function (req, res) {
   console.log('Adding vehicles');
   var year = parseInt(req.body.year),
      ownerId = parseInt(req.body.ownerId);
      db.add_vehicle ([req.body.make, req.body.model, year, ownerId], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.get('/api/user/:userId/vehiclecount', function (req, res) {
   console.log('Vehicle count for user ', req.params.userId);
      db.vehicle_count ([req.params.userId], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results[0]);
      })
   })

app.get('/api/vehicle', function (req, res) {
   console.log('EMAIL & NAME Queries ', req.query);
   var email = req.query.email,
      letters = req.query.userFirstStart;
      console.log ('email' , email, 'letters' , letters)
      if (!email){
         db.email_vehicles ([req.query.email], function(err, results) {
            if (err) {
               console.log('email checked')
               console.error(err);
               return res.send(err);
            }
            return res.send(results[0]);
      })} else if (!letters){
         console.log('name string checked')
         db.name.search ([req.query.email], function(err, results) {
            if (err) {
               console.error(err);
               return res.send(err);
            }
            return res.send(results[0]);
      })}
      return res.send("Query not found")
   })

app.get('/api/user/:userId/vehicle', function (req, res) {
   console.log('Vehicles for user ', req.params.userId);
      db.user_vehicles ([req.params.userId], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.get('/api/newervehiclesbyyear', function (req, res) {
   console.log('Newer Vehicles Requested');
      db.new_vehicles ([], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.put('/api/vehicle/:vehicleId/user/:userId', function (req, res) {
   console.log('Vehicle Transfered');
   var ownerId = req.params.vehicleId,
      id = req.params.userId;
      console.log('vehicleId: ', ownerId, 'userId: ', id);
      db.transfer ([ownerId, id], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.delete('/api/vehicle/:vehicleId/user/:userId', function (req, res) {
   console.log('Removing Owner');
      var ownerId = req.params.vehicleId,
      id = req.params.userId;
      db.delete_owner ([ownerId, id], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })

app.delete('/api/vehicle/:vehicleId', function (req, res) {
   console.log('Removing Owner');
      var ownerId = req.params.vehicleId;
      db.delete_vehicle ([ownerId], function(err, results) {
         if (err) {
            console.error(err);
            return res.send(err);
         }
         return res.send(results);
      })
   })




   // end of async callback function
});




   // listen
   // ===============================================================
app.listen('3000', function(){
  console.log("Khayyam is a rock-star programmer! Successfully listening on : 3000")
})

module.exports = app;
