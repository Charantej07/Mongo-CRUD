const express = require("express");
const mongodb = require("mongodb");
const url = require("../url");
// const url = "mongodb://localhost:27017";

let mcl = mongodb.MongoClient;
let router = express.Router();

router.get("/", (req, res) => {
  mcl.connect(url, (err, conn) => {
    if (err) console.log("Error in connection");
    else {
      let db = conn.db("nodedb");
      db.collection("products")
        .find()
        .toArray((err, array) => {
          if (err) console.log("Error:- ", err);
          else {
            console.log("Data Sent");
            res.json(array);
            conn.close();
          }
        });
    }
  });
});

module.exports = router;
