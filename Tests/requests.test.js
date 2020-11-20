'use strict';

const databaseManagerMock = require('../Source/Common/dynamoDbConnector');

describe('Requests test cases', ()=>{
    
    test('Save a item on table Request, works', async ()=> {
        var params = {
            TableName: 'Requests',
            Item: {
                'uuid': '123456789abc',
                'nickname': 'bwipo',
                'primaryRole': 'Superior',
                'secondaryRole': 'Soporte',
                'team': 'ac1f1370359c506247bb54fcc1b0bfe6',
                'teamName': 'Kohaku',
                'message': 'Deseo ingresar al equipo, soy main udyr',
                'status': 'Enviada'
            }
        };
        const res = await databaseManagerMock.saveItem(params);
        expect(res.statusCode).toBe(201);
    });

    test('Save a item on table Request works, item undefined', async ()=> {
        var params = {
            TableName: 'Requests',
            Item: {}
        };
        const res = await databaseManagerMock.saveItem(params);
        expect(res.statusCode).toBe(400);
    });

    test('Get a Request, works', async ()=>{
        var team_id = 'ac1f1370359c506247bb54fcc1b0bfe6';
        var params = {
            TableName: 'Requests',
            FilterExpression: '#team = :team',
            ExpressionAttributeValues: {
                ':team': team_id
            },  
            ExpressionAttributeNames: {
                '#team': 'team'
            }
        };
        const res = await databaseManagerMock.getItem(params);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).items[0].team).toBe(team_id);
    });

    test('Get a Request, request not exists', async ()=>{
        var team_id = '123adfadfadfa';
        var params = {
            TableName: 'Requests',
            FilterExpression: '#team = :team',
            ExpressionAttributeValues: {
                ':team': team_id
            },  
            ExpressionAttributeNames: {
                '#team': 'team'
            }
        };
        const res = await databaseManagerMock.getItem(params);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).items.length).toBe(0);
    });

    test('Get Request with error, incorrect request', async ()=>{
        var id = '231fdadfafdf';
        var params = {
            TableName: 'Requestsss',
            FilterExpression: '#team_id = :uuid',
            ExpressionAttributeValues: {
                ':uuid': id
            },  
            ExpressionAttributeNames: {
                '#team_id': 'uuid'
            }
        };
        const res = await databaseManagerMock.getItem(params);
        expect(res.statusCode).toBe(400);
    });

    test('Update Request, works', async ()=>{

        var params = {
            TableName: 'Requests',
            Item: {
                'uuid': '123456789abc',
                'nickname': 'amacario502',
                'primaryRole': 'Superior',
                'secondaryRole': 'Soporte',
                'team': 'ac1f1370359c506247bb54fcc1b0bfe6',
                'teamName': 'Kohaku',
                'message': 'Deseo ingresar al equipo, soy main udyr y no flameo',
                'status': 'Rechazada'
            }
        };

        const res = await databaseManagerMock.updateItem(params);
        expect(res.statusCode).toBe(200);
    });

    test('Delete Request, works', async ()=>{
        var id = '123456789abc';
        var params = {
            TableName: 'Requests',
            Key: {uuid: id}
        };

        const res = await databaseManagerMock.deleteItem(params);
        expect(res.statusCode).toBe(200);
    });

    test('Delete Request, request not exists', async ()=>{
        var id = 'aaaaabbbb123123';
        var params = {
            TableName: 'Requests',
            Key: {uuid: id}
        };

        const res = await databaseManagerMock.deleteItem(params);
        expect(res.statusCode).toBe(200);
    });
});
