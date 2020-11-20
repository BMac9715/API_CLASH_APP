'use strict';

const databaseManagerMock = require('../Source/Common/dynamoDbConnector');

describe('Teams test cases', ()=>{

    test('Save a item on table Teams, works', async ()=> {
        var item = {
            TableName: 'Teams',
            Item: {
                'uuid': 'ajfdñadjfñadf123',
                'owner': 'BMac9715',
                'region': 'LAN',
                'nombre': 'Killers',
                'descripcion': 'Busco equipo, sean sergios',
                'icono': 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/1.png',
                'ligas': ['Hierro', 'Bronze', 'Plata'],
                'players': [
                    {
                        'nickname': 'BMac9715',
                        'role': 'JUNGLA'
                    }
                ],
                'discord':'https://discord.com/123123',
                'vigente': true
            }
        };
        const res = await databaseManagerMock.saveItem(item);
        expect(res.statusCode).toBe(201);
    });
    
    test('Save a item on table Teams whit error, item undefined', async ()=> {
        var item = {
            TableName: 'Teams',
            Item: {}
        };
        const res = await databaseManagerMock.saveItem(item);
        expect(res.statusCode).toBe(400);
    });

    test('Get a Team, works', async ()=> {
        var id = 'ajfdñadjfñadf123';
        var params = {
            TableName: 'Teams',
            FilterExpression: '#team_id = :uuid',
            ExpressionAttributeValues: {
                ':uuid': id
            },  
            ExpressionAttributeNames: {
                '#team_id': 'uuid'
            }
        };
        const res = await databaseManagerMock.getItem(params);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).items[0].uuid).toBe(id);
        expect(JSON.parse(res.body).items[0].owner).toBe('BMac9715');
    });

    test('Get a Team, team not exists', async ()=> {
        var id = '231fdadfafdf';
        var params = {
            TableName: 'Teams',
            FilterExpression: '#team_id = :uuid',
            ExpressionAttributeValues: {
                ':uuid': id
            },  
            ExpressionAttributeNames: {
                '#team_id': 'uuid'
            }
        };
        const res = await databaseManagerMock.getItem(params);
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.body).items.length).toBe(0);
    });

    test('Get Team with error, invalid request', async ()=>{
        var id = '231fdadfafdf';
        var params = {
            TableName: 'Teamsss',
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

    test('Update Team, works', async ()=>{

        var id = 'ajfdñadjfñadf123';

        var params = {
            TableName: 'Teams',
            Item: { 
                'uuid': id,
                'owner': 'BMac9715',
                'region': 'LAN',
                'nombre': 'Killers',
                'descripcion': 'Busco equipo, sean sergios',
                'icono': 'http://ddragon.leagueoflegends.com/cdn/10.23.1/img/profileicon/1.png',
                'ligas': ['Hierro', 'Bronze', 'Plata', 'Oro'],
                'players': [
                    {
                        'nickname': 'BMac9715',
                        'role': 'JUNGLA'
                    },
                    {
                        'nickname': 'amacario502',
                        'role': 'INFERIOR'
                    }
                ],
                'discord':'https://discord.com/123123',
                'vigente': true
            }
        };

        const res = await databaseManagerMock.updateItem(params);
        expect(res.statusCode).toBe(200);
    });

    test('Delete Team, works', async ()=>{
        var id = 'ajfdñadjfñadf123';
        var params = {
            TableName: 'Teams',
            Key: {uuid: id}
        };

        const res = await databaseManagerMock.deleteItem(params);
        expect(res.statusCode).toBe(200);       
    });

    test('Delete Team, team not exists', async ()=>{
        var id = 'aaaabbb22133';
        var params = {
            TableName: 'Teams',
            Key: {uuid: id}
        };

        const res = await databaseManagerMock.deleteItem(params);
        expect(res.statusCode).toBe(200);   
    });
});