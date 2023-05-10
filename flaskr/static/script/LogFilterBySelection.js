let selected_filters = [];

function filter(){
    //filter results of query here using selected_filters
}

function getSelections(){
    selected_filters = [];
    let selectedOptions = document.getElementById("metadata_log_type_options").getChildren();
    for(let i = 0; i < selectedOptions.length(); i++){
        if(selectedOptions[i].isChecked()){
            selected_filters.append(selectedOptions[i]);
        }
    }
}