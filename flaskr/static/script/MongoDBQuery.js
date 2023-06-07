//var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function sendMongoDBQuery_ON_HOLD(){
//    let text = document.getElementById("mongoQuery");
//    let query = text.value;
//
//    MongoClient.connect(url, function(err, db) {
//        if (err) throw err;
//        var dbo = db.db("mydb");
//        dbo.collection("logs").find(query).toArray(function(err, result) {
//            if (err) throw err;
//            console.log(result);
//            db.close();
//        });
//    });
}

function sendMongoDBQuery(){
var settings = {
  "url": "https://6p5txxhkagnbr3dxk54iz4n3cu0pvjub.lambda-url.ap-southeast-1.on.aws/",
  "method": "POST",
  "timeout": 0,
  "headers": {
    "Content-Type": "application/json"
  },
  "data": JSON.stringify({
    "statement.context.extensions.http://gamestrax&46;com/extensions/session": "6bf76a62"
  }),
};

$.ajax(settings).done(function (response) {
  console.log(response);
});
}