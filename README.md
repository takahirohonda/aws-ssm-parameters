# aws-ssm-parameters
Node module to get a list of parameters from AWS Parameter Store

## Installation

```bash
npm i @mdhnpm/aws-ssm-parameters
```

## How to use it

```javascript
'use strict';

const { getParameters } = require('@mdhnpm/aws-ssm-parameters');
const parameterNames = ['my.db.endpoint', 'my.db.name', 'my.db.password', 'my.db.username'];

const getParams = async () => {
  const parameters = await getParameters(parameterNames, 'ap-southeast-2');
  console.log(parameters);
}

getParams()
```