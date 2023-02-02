const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//Get all
const getRequests = async (req, res, next) => {
    const result = await mongodb.getDb().db().collection('requests').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };
  
  //GET one based on id
  const getRequest = async (req, res, next) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('requests').find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
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
  

  module.exports = { getRequests, getRequest, createRequest };