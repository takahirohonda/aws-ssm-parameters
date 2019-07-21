# aws-ssm-parameters
Node module to get a list of parameters from AWS Parameter Store

## How to use it

```javascript
'use strict';

const { getParameters } = require('./src/get-parameters');
const parameterNames = ['my.db.endpoint', 'my.db.name', 'my.db.password', 'my.db.username'];

async function check() {
  const parameters = await getParameters(parameterNames, 'ap-southeast-2');
  console.log(parameters);
}

check();
```