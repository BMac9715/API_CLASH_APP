const AWS = require('aws-sdk');
const crypto = require("crypto");
const dynamodb = require("../Common/dynamoDbConnector");

exports.handler = async(event) => {
    const team = JSON.parse(event.body).team;

    var element = {
        'uuid': generateUUID(),
        'owner': team.owner,
        'region': team.region,
        'nombre': team.nombre,
        'descripcion': team.descripcion,
        'icono': team.icono,
        'ligas': team.ligas,
        'players': team.players,
        'discord': team.discord,
        'vigente': true
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
