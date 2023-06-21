//var MongoClient = require('mongodb').MongoClient;
//var url = "mongodb://localhost:27017/";

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
//To test use:
//{"statement.context.extensions.http://gamestrax&46;com/extensions/session": "6bf76a62"}
//in MongoDB Query field
    let query = document.getElementById("mongoQuery").value;
    var settings = {
      "url": "https://6p5txxhkagnbr3dxk54iz4n3cu0pvjub.lambda-url.ap-southeast-1.on.aws/",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json"
      },
      "data": query,
    };

    $.ajax(settings).done(function (response) {
          document.getElementById("hidden_log_div").innerHTML = response;
          const tree = jsonview.create(response);
          jsonview.render(tree, document.querySelector('.query-result-root'));
    });
}