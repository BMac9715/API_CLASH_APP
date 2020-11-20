module.exports = {
    tables: [
        {
            TableName: 'Teams',
            KeySchema: [
                {
                    AttributeName: 'uuid',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'uuid',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
        {
            TableName: 'Requests',
            KeySchema: [
                {
                    AttributeName: 'uuid',
                    KeyType: 'HASH',
                },
            ],
            AttributeDefinitions: [
                {
                    AttributeName: 'uuid',
                    AttributeType: 'S',
                },
            ],
            BillingMode: 'PAY_PER_REQUEST',
        },
    ],
    
};