'use strict';

const getParameter = (parameterName, ssm) => {

  const value = ssm.getParameter({'Name': parameterName, WithDecryption: true}).promise();

  return value.then( (data) =>{
    return data.Parameter.Value;
  })
    .catch((err) => {
      return err;
    });
};

module.exports = { getParameter };
