const AWS = require("aws-sdk");
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => {
    const {
        pathParameters: { id }
    } = event;

    var params = {
        TableName: process.env.TABLE,
        FilterExpression: '#team = :team',
        ExpressionAttributeValues: {
            ':team': id
        },  
        ExpressionAttributeNames: {
            '#team': 'team'
        }
    };

    return await dynamodb.getItem(params);
};
