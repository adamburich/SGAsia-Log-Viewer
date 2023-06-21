let selected_filters = [];
let activityName = "";
let activityId = "";

const types = [
    {
        "type": "activity/mcq",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/completed"]
    },
    {
        "type": "activity/action",
        "logs": ["http://gamestrax.com/verbs/completed"]
    },
    {
        "type": "stage",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/completed"]
    },
    {
        "type": "game",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/closed"]
    },
    {
        "type": "activity/mcq_submit",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/selected", "http://gamestrax.com/verbs/deselected", "http://gamestrax.com/verbs/completed"]
    },
    {
        "type": "activity/drag_drop",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/selected", "http://gamestrax.com/verbs/completed"]
    },
    {
        "type": "activity/set_value",
        "logs": ["http://gamestrax.com/verbs/started", "http://gamestrax.com/verbs/completed"]
    }
]

function buildCheckList(){
    document.getElementById("metadata_output_div").innerHTML = "";
    let data = JSON.stringify(parseMetaData());
    console.log(data);

//    if(data.length == undefined){
//    }else{
//        for(let i = 0; i < data.length; i++){
//
//        }
//    }

    const tree = jsonview.create(data);
    jsonview.render(tree, document.querySelector('.metadata-result-root'));
    jsonview.expand(tree);
}

function checkRequiredLogs(log, logList){
    let activity_id = log.id;
    let activity_type = log.type;
    let required_verbs = log.required_logs;

    let logs = [];

    for(let i = 0; i < required_logs.length; i++){

    }
}

function parseGameMD(md){
    let stageArr = md.stages;

    let activity_id = md.id;
    let type = md.definition.type;
    let shortType = type.split("type/")[1];
    let typeObject = getType(shortType);

    let stageList = [];

    let game = {
        "id": activity_id,
        "type": type,
        "required_logs": typeObject.logs
    }

    stageList.push(game);

    for(let i = 0; i < stageArr.length; i++){
        stageList.push(parseStageMD(stageArr[i]));
    }

    return stageList;
}

function parseStageMD(md){
//    console.log(md);
//    let stageArr = md.stages;

    let activity_id = md.id;
    let type = md.definition.type;
    let shortType = type.split("type/")[1];
    let typeObject = getType(shortType);

    let activitiesList = [];

    let stage = {
        "id": activity_id,
        "type": type,
        "required_logs": typeObject.logs
    }

    activitiesList.push(stage);

    //console.log(stageArr);
    let activities = md._activities;
    activitiesList.push(parseActivitiesMD(activities));
//    for(let j = 0; j < activities.length; j++){
//        activitiesList.push(parseActivitiesMD(activities[i]));
//    }

    return activitiesList;

}

function parseActivitiesMD(md){
    let activitiesList = [];

    if(md.length != undefined){
        for(let i = 0; i < md.length; i++){
            activitiesList.push(parseSingleActivity(md[i]));
        }
        return activitiesList;
    }else{
        return parseSingleActivity(md);
    }

}

function parseSingleActivity(md){
    let activity_id = md.id;
    let type = md._type;
    let shortType = type.split("type/")[1];

    let typeObject = getType(shortType);
    let activityObj = {
        "id": activity_id,
        "type": type,
        "required_logs": typeObject.logs
    }

    return activityObj;
}

function parseMetaData(){
    let text = document.getElementById("metadata_input");

    let metadata_json = JSON.parse(text.value);

    if(metadata_json.length != undefined){
        let returnList = [];
        for(let i = 0; i < metadata_json.length; i++){
            returnList.push(parseSingleMetaDataObject(metadata_json[i]));
        }
        return returnList;
    }else{
        return parseSingleMetaDataObject(metadata_json);
    }
}

function parseSingleMetaDataObject(md){
    if(md.definition.type === "http://gamestrax.com/define/type/game"){
        return parseGameMD(md);
    }else if(md.definition.type === "http://gamestrax.com/define/type/stage"){
        return parseStageMD(md);
    }else if(md.definition.type === "http://gamestrax.com/define/type/activity"){
        //console.log("Parsing activity metadata");
        return parseActivitiesMD(md);
    }else return -1;
}

function getType(typeStr){
    for(let i = 0; i < types.length; i++){
        if(types[i].type === typeStr){
            return types[i];
        }
    }
    return -1;
}