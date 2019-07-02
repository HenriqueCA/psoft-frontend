import endpoints from "../models/Endpoints.js";
import get_disciplines from "../controllers/ListDisciplines.js"

const $disciplines_list = document.querySelector("#disciplines_list");

var url_params = new URLSearchParams(window.location.search);

var substring = url_params.get("search");

get_disciplines(endpoints.subject(),false, substring, $disciplines_list, "search");


