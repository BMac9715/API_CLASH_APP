const AWS = require('aws-sdk');
const crypto = require("crypto");
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => {
    const request = JSON.parse(event.body).request;

    var element = {
        'uuid': generateUUID(),
        'nickname': request.nickname,
        'primaryRole': request.primaryRole,
        'secondaryRole': request.secondaryRole,
        'team': request.team,
        'teamName': request.teamName,
        'message': request.message,
        'status': 'Enviada'
    };

    var params = {
        TableName: process.env.TABLE,
        Item: element
    }

    return await dynamodb.saveItem(params);
};

const generateUUID = () => { 
    return crypto.randomBytes(16).toString("hex");
};
