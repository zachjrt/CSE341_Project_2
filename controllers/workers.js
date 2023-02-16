const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Added try catch Blocks

//Get all
const getWorkers = async (req, res, next) => {
  try {
    mongodb.getDb().db().collection('workers').find().toArray((err, lists) => {
      if (err){
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err){
    res.status(500).json(err);
  }
  };
  
  //GET one based on id
  const getWorker = async (req, res, next) => {
    try {
     //  #swagger.parameters['id'] = { description: 'Get a specfic worker' }
    const userId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('workers').find({ _id: userId }).toArray((err, result) => {
      if (err){
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
  } catch (err){
    res.status(500).json(err);
  }
  };

  //Post
const createWorker = async (req, res, next) => {
  try {
    //Data to be added
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userLevel = req.body.skillLevel
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'skillLevel' : userLevel};
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
  } catch (err){
    res.status(500).json(err);
  }
  };

  //Put
  const updateWorker = async (req, res, next) => {
    try {
    //ID
    const userId = new ObjectId(req.params.id);
    //Data to be added
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userLevel = req.body.skillLevel
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'skillLevel' : userLevel};
    //Operation
    const result = await mongodb.getDb().db().collection('workers')
            .replaceOne({ _id: userId }, userData);
  
    //Response
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Some error occurred while creating the contact.');
    }
    //console confirmation
    console.log(`${result.modifiedCount} document(s) was/were created.`);
  } catch (err){
    res.status(500).json(err);
  }
  };

  //Delete
  const deleteWorker = async (req, res, next) => {
    try {
    //ID to delete
    //Request param switch to req.body
    const userId = new ObjectId(req.params.id);
    //Operation
    const result = await mongodb.getDb().db().collection('workers')
                        .deleteOne({ _id: userId });
    //Response
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
  } catch (err){
    res.status(500).json(err);
  }
  };
  

  module.exports = { getWorkers, getWorker, createWorker, updateWorker, deleteWorker };