import discipline from "./Discipline.js";
const $search_text = document.querySelector("#search_text");

// get disciplines from backend, change document.location.href to "./search.html" displaying a list of disciplines found.
function search_substring(search_text){

}

// get discipline from backend, change document.location.href to "../discipline.html" displaying all info from discipline
function search_code(search_text){
    
}


function decide_search(search_text){
    if(isNaN(search_text)){
        search_substring(search_text);
    }
    else{
        search_code(search_text);
    }
}

window.search = function search(){
    search_text = $search_text.value;
    decide_search(search_text)
}