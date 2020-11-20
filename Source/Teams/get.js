const AWS = require("aws-sdk");
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => {
    const region = "LAN";

    var params = {
        TableName: process.env.TABLE,
        FilterExpression: '#region = :region',
        ExpressionAttributeValues: {
            ':region': region
        },  
        ExpressionAttributeNames: {
            '#region': 'region'
        }
    };

    return await dynamodb.getItem(params);
};
