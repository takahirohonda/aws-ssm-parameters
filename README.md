# aws-ssm-parameters

Node module to easily retrieve multiple parameters from AWS parameter store.

The function takes two argument, an array of parameter names and AWS region. It returns a JSON object with parameter name as key and parameter value as value. See the usage example below.

The decrypt option is enabled. It works on all parameter types, SecureString, String, and StringList.

Output look like this:

```javascript
{
  my.db.endpoint:'endpoint-url', 
  my.db.name: 'database-name',
  my.db.password: 'database-pw',
  my.db.usernme: 'database-username'
}
```

## Installation

```bash
npm i @mdhnpm/aws-ssm-parameters
```

## Prerequisites

It requires [AWS Cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html). It needs to be configured with the correct credentials (read access rights to AWS Parameter Store). Check out the official documentation for [AWS Cli configuration](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html). 

To use this module in Lambda function. The function needs to have the permission for AWS parameter store access as below.

```yaml   
- Effect: Allow
  Action:
    - ssm:Describe*
    - ssm:Get*
  Resource: arn:aws:ssm:ap-southeast-2:<account no>:parameter/*
```

## Example Code

```javascript
'use strict';
 
const { getParameters } = require('@mdhnpm/aws-ssm-parameters');

// Input is an array of parameter names
const parameterNames = [
  'my.db.endpoint',
  'my.db.name',
  'my.db.password',
  'my.db.username'
];
 
const getParams = async () => {
  // Argument is (1) an array of parameter name & (2) AWS region
  const parameters = await getParameters(parameterNames, 'ap-southeast-2');
  console.log(parameters);
}

// The module creates a Json object 
// with parameter name as key and actual value as value
// Decrypt option is enabled. It works on secure string.
// {
//   my.db.endpoint:'endpoint-url', 
//   my.db.name: 'database-name',
//   my.db.password: 'database-pw',
//   my.db.usernme: 'database-username'
// }
getParams()
```
## Lambda Function Use Case

Instead of adding the actual database credentials or API keys in the environment variable, we can add the parameter names and use this module to retrieve them. In this way, the lambda function does not need to be deployed every time the credential gets roatated.

Retrieval of parameters has computational costs. The parameter store also throttles requests when the volume is high. The best practice is to store the retrieved value globally and make sure the code only calls parameter store when it doesn't exist in the global scope (this is when the lambd execution container is on cold start) as well as retry logic when the credentials get roatated.

## Source Code

Soucre code can be found at a GitHub repo, [aws-ssm-parameters](https://github.com/mydatahack/aws-ssm-parameters).
