const AWS = require('aws-sdk');
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => { 
    const {
        pathParameters: { id }
    } = event;

    var params = {
        TableName: process.env.TABLE,
        Key: {uuid: id}
    };

    return await dynamodb.deleteItem(params);
};