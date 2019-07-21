'use strict';

const { getParameters } = require('./src/get-parameters');
const parameterNames = ['dev_db_endpoint', 'dev_db_name', 'dev_db_password', 'dev_db_username'];

async function check() {
  const parameters = await getParameters(parameterNames, 'ap-southeast-2');
  console.log(parameters);
}

check();
