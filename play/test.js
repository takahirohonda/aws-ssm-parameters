'use strict'
const { getParameters } = require('./get-parameters')
const parameterNames = ['dev_db_endpoint', 'dev_db_name', 'dev_db_password', 'dev_db_username']

const check = async () => {
  const params = await getParameters(parameterNames, 'ap-southeast-2')
  console.log(params)
}

check()
