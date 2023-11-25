const config = require('../config/mongoDB');
const MongoClient = require('mongodb').MongoClient;

/**
* Insert into collection one document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @objInsert obj: Data to insert into collection
*/
exports.insert = async (result, collection, objInsert) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).insertOne(objInsert, async function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            result({data: res});
            db.close();
        });
    });
};


/**
* Insert into collection many document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @array_objInsert array objects: Data to insert into collection
*/
exports.insertMany = async (result, collection, array_objInsert) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).insertMany(array_objInsert, async function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            result(res);
            db.close();
        });
    });
};


/**
* Find one document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
*/
exports.findOne = async (result, collection, query = {}) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err){
            console.log(err);
            throw err;
        } 
        let dbo = db.db(config.database);
        dbo.collection(collection).findOne(query, async function(err, res) {
            if (err){
                console.log(err);
                throw err;
            } 
            result(res);
            db.close();
        });
    });
};


/**
* Find documents
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
* @sort object: sort documents
* @sort int: limit documents
* @join array: join collection
*/
exports.find = async (result, collection, query = {}, sort = {}, limit = 0) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).find(query).sort(sort).limit(limit).toArray(async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};


/**
* Delete one document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
*/
exports.deleteOne = async (result, collection, query) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).deleteOne(query, async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};


/**
* Delete many document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
*/
exports.deleteMany = async (result, collection, query) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).deleteMany(query, async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};


/**
* Update one document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
* @newValues object: Values to update
*/
exports.updateOne = async (result, collection, query, newValues) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        var valuesUpdate = { $set: newValues };
        dbo.collection(collection).updateOne(query, valuesUpdate, async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};


/**
* Update many document
*
* @result Object: Callback to return data
* @collection String: Name collection
* @query object: Query
* @newValues object: Values to update
*/
exports.updateMany = async (result, collection, query, newValues) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        var valuesUpdate = { $set: newValues };
        dbo.collection(collection).updateMany(query, valuesUpdate, async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};


/**
* aggregate join and query
*
* @result Object: Callback to return data
* @collection String: Name collection
* @aggregate object: array with logic query
*/
exports.aggregate = async (result, collection, aggregate = {}) => {
    MongoClient.connect(config.url, config.options, async function(err, db) {
        if (err) throw err;
        let dbo = db.db(config.database);
        dbo.collection(collection).aggregate(aggregate).toArray(async function(err, res) {
            if (err) throw err;
            result(res);
            db.close();
        });
    });
};
