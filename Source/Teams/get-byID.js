const AWS = require('aws-sdk');
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async(event) => {
    const {
        pathParameters: { id }
    } = event;
    
    const params = {
        TableName: process.env.TABLE,
        FilterExpression: '#owner_id = :owner',
        ExpressionAttributeValues: {
            ':owner': id
        },  
        ExpressionAttributeNames: {
            '#owner_id': 'owner'
        }
    };

    return await dynamodb.getItem(params);
};