const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get all
const getWorkers = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('workers').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
  //GET one based on id
  const getWorker = async (req, res, next) => {
     //  #swagger.parameters['id'] = { description: 'Get a specfic worker' }
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workers').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  //Post
const createWorker = async (req, res, next) => {
  
    //Data to be added
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail};
    //Operation
    const result = await mongodb.getDb().db().collection('workers')
                        .insertOne(userData);
  
    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
    //console confirmation
    console.log(`${result.modifiedCount} document(s) was/were created.`);
  };
  

  module.exports = { getWorkers, getWorker, createWorker };