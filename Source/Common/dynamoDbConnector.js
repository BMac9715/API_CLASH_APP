const AWS = require('aws-sdk');

let options = { apiVersion: '2012-08-10' };

if (process.env.JEST_WORKER_ID) {
    options = {
        endpoint: 'http://localhost:8000',
        region: 'local-env',
        sslEnabled: false,
    };
}

const dynamodb = new AWS.DynamoDB.DocumentClient(options);

module.exports.saveItem = async params => {
    return await dynamodb.put(params).promise()
    .then(() => {
        return response(201, {'message': 'Item created successfully'});
    })
    .catch((err) => {
        return response(err.statusCode, {'error': err});
    });
}

module.exports.getItem = async params => {
    return dynamodb.scan(params).promise()
    .then((data) => {
        return response(200, { 'items': data.Items });
    })
    .catch((err) => {
        return response(err.statusCode, {'error': err});
    });
}

module.exports.updateItem = async params => {
    return dynamodb.put(params).promise()
    .then((data) => {
        return response(200, {'message': 'Item update completed successfully'});
    })
    .catch((err) => {
        return response(err.statusCode, {'error': err});
    });
}

module.exports.deleteItem = async params =>{
    return dynamodb.delete(params)
    .promise()
    .then(()=>{
        return response(200, {'message': 'Item delete completed successfully'});
    })
    .catch((err)=>{
        return response(err.statusCode, {'error': err} );
    });
}

const response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
}
