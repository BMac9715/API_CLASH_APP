const redis = require('redis');

exports.handler = async(event) => {
    const client = redis.createClient(process.env.REDIS_URL);
    var promises = [];
    var leagues = {};
    
    client.on("connect", function() {
        console.log("You are now connected");
    });
    
    const GetKeyObject = (item) => {
        return new Promise((resolve, reject) => {
            client.hgetall(item, function(err, object) {
                if(err) { reject(err); }
                resolve(object);
            });
        });
    };
    
    return new Promise((resolve, reject)=>{
         client.keys('*', function (err, keys){
            
            if(err) { reject(err) }
            
            keys.forEach(item => {
                promises.push(
                    GetKeyObject(item)
                    .then(data => {
                        leagues[item] = data;
                    })
                    .catch(err =>{
                        reject(response(500, {'error': err}));
                    })
                );
            });
              
            Promise.all(promises)
            .then( () => {
                resolve(response(200, {'data': leagues})); 
            })
            .catch( (err) => {
                reject(response(500, {'error': err}));
            });
         }); 
    });
};

let response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
};
