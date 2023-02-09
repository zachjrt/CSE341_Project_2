const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get all
const getRequests = async (req, res, next) => {
  mongodb.getDb().db().collection('requests').find().toArray((err, lists) => {
    if (err){
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  };
  
  //GET one based on id
  const getRequest = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    mongodb.getDb().db().collection('requests').find({ _id: userId }).toArray((err, result) => {
      if (err){
        res.status(400).json({message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
  };

  //Post
const createRequest = async (req, res, next) => {
    //Data to be added
    const userFirstName = req.body.firstName;
    const userLastName = req.body.lastName;
    const userEmail = req.body.email;
    const userRequest = req.body.requestType;
    const userDescription = req.body.description;
    const userEstimatedTime = req.body.estimatedTime;
    const userBuilding = req.body.building;
    const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'requestType':userRequest, 'description':userDescription, 'estimatedTime':userEstimatedTime, 'building':userBuilding};
    //Operation
    const result = await mongodb.getDb().db().collection('requests')
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

//Put
const updateRequest = async (req, res, next) => {
  //ID
  const userId = new ObjectId(req.params.id);
  //Data to be added
  const userFirstName = req.body.firstName;
  const userLastName = req.body.lastName;
  const userEmail = req.body.email;
  const userRequest = req.body.requestType;
  const userDescription = req.body.description;
  const userEstimatedTime = req.body.estimatedTime;
  const userBuilding = req.body.building;
  const userData = {'firstName':userFirstName, 'lastName':userLastName, 'email':userEmail, 'requestType':userRequest, 'description':userDescription, 'estimatedTime':userEstimatedTime, 'building':userBuilding};
  //Operation
  const result = await mongodb.getDb().db().collection('requests')
            .replaceOne({ _id: userId }, userData);
  //Response
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Some error occurred while creating the contact.');
  }
  //console confirmation
  console.log(`${result.modifiedCount} document(s) was/were created.`);
};

  //Delete
  const deleteRequest = async (req, res, next) => {
    //ID to delete
    //Request param switch to req.body
    const userId = new ObjectId(req.params.id);
    //Operation
    const result = await mongodb.getDb().db().collection('requests')
                        .deleteOne({ _id: userId });
    //Response
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(result.error || 'Some error occurred while deleting the contact.');
    }
  }
  

  module.exports = { getRequests, getRequest, createRequest, updateRequest, deleteRequest };