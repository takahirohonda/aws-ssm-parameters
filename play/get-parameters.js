'use strict';
const AWS = require('aws-sdk');
const { getParameter } = require('../play/get-parameter');
let ssm;

const getParameters = (parameterNames, region, getParameterFunc=getParameter) => {

  if (!ssm) {
    ssm = new AWS.SSM({apiVersion: '2014-11-06', region: region});
  }

  return Promise.all(parameterNames
    .map(parameterName => getParameterFunc(parameterName, ssm)))
    .then(values => parameterNames
      .reduce((obj, paramName, index) => ({ ...obj, [paramName]: values[index]}), {}))
    .catch(err => err);
};


module.exports = { getParameters };

