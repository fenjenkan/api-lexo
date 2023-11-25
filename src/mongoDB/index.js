const mongoose = require('mongoose');
const config = require('../config/mongoDB');
const { MongoClient } = require("mongodb");
const DB_uri = 'mongodb://localhost:27017/lexgo'
const client = new MongoClient(DB_uri);


const connet = async () => {
   //Collections
let array_collections = [
    "empresa",
    "departamento",
    "empleado"
];

//Create database
MongoClient.connect(config.url, config.options, function(err, db) {
    if (err) throw err;
    console.log(`Database ${config.database} created!`);
    // db.close();
});

//Create collections on database
MongoClient.connect(config.url, config.options, async function(err, db) {
    if (err) throw err;
    let dbo = db.db(config.database);
    for(let collection of array_collections){
        dbo.listCollections().toArray(function(err, collInfos) {
            if(!collInfos.find(coll => coll.name === collection))
                dbo.createCollection(collection, function(err, res) {
                    if (err) throw err;
                    console.log(`Collection ${collection} created!`);
                    db.close();
                });
        });
    }
});

}



module.exports = () =>{
    connet();
}