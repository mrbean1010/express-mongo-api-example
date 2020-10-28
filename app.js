/* jshint ignore:start */
const path = require('path');
const express = require('express');
const expressApp = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const port = 3005;
const axios = require('axios');
const mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/dbexample";

//connect to mongo
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Connected to Database!");
    db.close();
});

  
//Express Started
expressApp.listen(port, () => {
  console.log(`Started API On: ${port}`)
})

//index load
expressApp.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//Express
expressApp.use(cors());
expressApp.use(bodyParser.urlencoded({ extended: false }))
expressApp.use(bodyParser.json())

//Pings API and Tests DB 
expressApp.get('/api/ping', (req, res) => {
    res.json({
        status: 'Connected to API',
        message: 'Success'
    })
    ping();
})

//Gets Success
expressApp.get('/api/success', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        dbo.collection("success").find("success").toArray(function(err, result) {
          if (err) throw err;
          res.json({
            status: 'Success',
            results: result
            })
          db.close();
        });
      });
    
    
})

//Saves Success
expressApp.post('/api/success', (req, res) => {
    const success = req.body;
    console.log(success)
    res.json({
        body: req.body,
        message: 'Success Saved'
    })
    success_post(success);
})

//Gets Fails
expressApp.get('/api/fail', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        dbo.collection("failed").find("failed").toArray(function(err, result) {
          if (err) throw err;
          res.json({
            status: 'Success',
            results: result
          })
          db.close();
        });
      });
    
})

expressApp.post('/api/fail', (req, res) => {
  //console.log(req.body)
  const fail = req.body;
  console.log(fail)
  res.json({
    body: req.body,
    message: 'Fails Saved'
  })
  failed_post(fail);
  
})


//Mongo





function success_post(success_data){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        dbo.collection("success").insertOne(success_data, function(err, res) {
          if (err) throw err;
          console.log(`Logged Success: ${success_data.success}`);
          db.close();
        });
      });
}

function failed_post(failed_data){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        dbo.collection("failed").insertOne(failed_data, function(err, res) {
          if (err) throw err;
          console.log(`Logged Failure: ${failed_data.failure}`);
          db.close();
        });
      });
}

//Un Comment bellow to structure DB
//structureDB();
function structureDB(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        dbo.createCollection("status", function(err, res) {
          if (err) throw err;
          console.log("Status created!");
          db.close();
        });
        dbo.createCollection("failed", function(err, res) {
            if (err) throw err;
            console.log("Failed created!");
            db.close();
          });
          dbo.createCollection("success", function(err, res) {
            if (err) throw err;
            console.log("Success created!");
            db.close();
          });
      });
}



function ping(){
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbexample");
        var myobj = { ping: "pong"};
        dbo.collection("status").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("DB Pinged");
          db.close();
        });
      });
}



/*
POST http://localhost:3005/api/success
{
    "success": "hello"
}

POST http://localhost:3005/api/failure
{
    "failure": "hello"
}

*/