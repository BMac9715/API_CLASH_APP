exports.handler = async (event) => {

    const token = event.authorizationToken;
    const methodArn = event.methodArn;

    switch(token){
        case process.env.TOKEN:
            return generateAuthResponse('user', 'Allow', methodArn);
        default:
            return generateAuthResponse('user', 'Deny', methodArn);
    }
   
};

let generateAuthResponse = (principalId, effect, methodArn) => {
    const policyDocument = generatePolicyDocument(effect, methodArn);

    return {
        principalId,
        policyDocument
    }
}

let generatePolicyDocument = (effect, methodArn) => {
    if(!effect || !methodArn) return null;

    const policyDocument = {
        Version: '2012-10-17',
        Statement: [{
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: methodArn
        }]
    };

    return policyDocument;
}
