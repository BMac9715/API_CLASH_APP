const AWS = require('aws-sdk');
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => {
    const request = JSON.parse(event.body).request;
    
    const {
        pathParameters: { id }
    } = event;

    var params = {
        TableName: process.env.TABLE,
        Item: { 
            'uuid': id,
            'nickname': request.nickname,
            'primaryRole': request.primaryRole,
            'secondaryRole': request.secondaryRole,
            'team': request.team,
            'status': request.status
        }
    };

    return await dynamodb.updateItem(params);
};
