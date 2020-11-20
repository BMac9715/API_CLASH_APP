const AWS = require("aws-sdk");

exports.handler = async (event) => {

    const translate = new AWS.Translate({ apiVersion: '2017-07-01' });
    const elements = JSON.parse(event.body);

    var params = {
        "SourceLanguageCode": elements.source_language,
        "TargetLanguageCode": elements.target_language,
        "Text": elements.text,
        "TerminologyNames": ['LeagueOfLegends']
    }

    try{
        return translate.translateText(params)
        .promise().then((res) => {
            return response(200, {'translation': res.TranslatedText});
        })
        .catch((err) => {
            return response(err.statusCode, {'error': err});
        });
    }
    catch(e){
        return response(500, {'error': e});
    }
};

let response = (statusCode, message) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(message)
    };
};

