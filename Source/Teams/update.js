const AWS = require('aws-sdk');
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async (event) => {
    const team = JSON.parse(event.body).team;
    
    const {
        pathParameters: { id }
    } = event;

    var params = {
        TableName: process.env.TABLE,
        Item: { 
            'uuid': id,
            'nombre': team.nombre,
            'ligas': team.ligas,
            'descripcion': team.descripcion,
            'players': team.players,
            'vigente': team.vigente,
            'owner': team.owner,
            'discord': team.discord,
            'region': team.region,
            'icono': team.icono
        }
    };
    
    return await dynamodb.updateItem(params);
};