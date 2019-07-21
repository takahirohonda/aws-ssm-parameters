'use strict';
const AWS = require('aws-sdk');

let ssm;

const getParameters = async (parameterNames, region, apiVersion='2014-11-06') => {

  if (!ssm) {
    ssm = new AWS.SSM({apiVersion: apiVersion, region: region});
  }
  const params = {
    Names: parameterNames,
    WithDecryption: true
  };
  try {
    const parameters = await ssm.getParameters(params).promise();
    console.log('parameters', parameters);
    return formatParameters(parameters);
  } catch (e) {
    return e;
  }
};

const formatParameters = (parameters) => {
  return parameters.Parameters.reduce((object, param) => {
    return { ...object, [param.Name]: param.Value };
  }, {});
};

module.exports = { getParameters };
