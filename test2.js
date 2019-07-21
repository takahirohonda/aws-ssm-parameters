'use strict'

const { getParameters } = require('./src/get-parameters')
const parameterNames = ['dev_db_endpoint', 'dev_db_name', 'dev_db_password', 'dev_db_username']

async function check() {
  console.log(await getParameters(parameterNames, 'ap-southeast-2'))
}

check()