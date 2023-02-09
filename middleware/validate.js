//get validator
const validator = require('../helpers/validate');

const saveWorker = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};


{
    "firstName":"Jane", 
    "lastName":"Worker",
     "email":"tester@test.com", 
     "requestType":"Maintenance", 
     "description":"Ceiling tile collapsed onto desk need to investigate cause", 
     "estimatedTime":"3 hours", 
     "building":"Higgins Hall"
}
const saveRequest = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|email',
      requestType: 'required|string',
      description: 'required|string',
      estimatedTime: 'required|string',
      building: 'required|string',

    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };

module.exports = {
  saveRequest,
  saveWorker
};