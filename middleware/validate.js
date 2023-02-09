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



const saveRequest = (req, res, next) => {
    const validationRule = {
      firstName: 'required|string',
      lastName: 'required|string',
      email: 'required|email',
      requestType: 'required|string',
      description: 'required|string',
      estimatedTime: 'string',
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