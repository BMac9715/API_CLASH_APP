const AWS = require('aws-sdk');
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async(event) => {
    const {
        pathParameters: { id }
    } = event;
    
    const params = {
        TableName: process.env.TABLE,
        FilterExpression: '#team_id = :uuid',
        ExpressionAttributeValues: {
            ':uuid': id
        },  
        ExpressionAttributeNames: {
            '#team_id': 'uuid'
        }
    };

    return await dynamodb.getItem(params);
};