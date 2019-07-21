const { expect } = require('chai');
const AWSMock = require('aws-sdk-mock');
const { getParameters } = require('../src/get-parameters');

describe('get-parameter()', () => {
  describe('Happy path', () => {
    beforeEach(() => {
      const mockResponse = {
        Parameters:[
          { Name: 'endpoint',
            Type: 'SecureString',
            Value: 'database.endpoint',
            Version: 2,
            LastModifiedDate: '2019-07-21T05:37:07.907Z',
            ARN: 'arn:aws:ssm:blah:parameters/whatever'
          },
          { Name: 'db.name',
            Type: 'SecureString',
            Value: 'databaseName',
            Version: 1,
            LastModifiedDate: '2018-03-16T12:46:09.474Z',
            ARN: 'arn:aws:ssm:blah:parameters/whatever'
          },
          { Name: 'db.pw',
            Type: 'SecureString',
            Value: 'password',
            Version: 1,
            LastModifiedDate: '2018-03-16T12:46:07.580Z',
            ARN: 'arn:aws:ssm:blah:parameters/whatever'
          },
          { Name: 'db.user',
            Type: 'SecureString',
            Value: 'username',
            Version: 2,
            LastModifiedDate: '2019-07-21T05:37:46.696Z',
            ARN: 'arn:aws:ssm:blah:parameters/whatever'
          }
        ],
        InvalidParameters: []
      };
      AWSMock.mock('SSM', 'getParameters', mockResponse);
    });

    afterEach(() => {
      AWSMock.restore('SSM', 'getParameters');
    });

    it('should return correct parameter object', async () => {
      const parameterNames = ['endpoint', 'db.name', 'db.pw', 'db.user'];
      const expectedObj = {
        'endpoint': 'database.endpoint',
        'db.name': 'databaseName',
        'db.pw': 'password',
        'db.user': 'username'
      };
      const parameters = await getParameters(parameterNames, 'ap-southeast-2');
      // console.log(parameters);
      expect(parameters).deep.equal(expectedObj);
    });
  });

  describe('Error path', () => {
    beforeEach(() => {
      AWSMock.mock('SSM', 'getParameters', function(params, callback) {
        callback(new Error('Hello error'), null);
      });
    });

    afterEach(() => {
      AWSMock.restore('SSM', 'getParameters');
    });

    it('should throw an error if aws api getParameters errors', async () => {
      const parameterNames = ['endpoint', 'db.name', 'db.pw', 'db.user'];
      const expectedObj = {
        'endpoint': 'database.endpoint',
        'db.name': 'databaseName',
        'db.pw': 'password',
        'db.user': 'username'
      };
      try {
        await getParameters(parameterNames, 'ap-southeast-2');
      } catch (e) {
        expect(e.message).deep.equal('Hello error');
      }
    });
  });

})
;
