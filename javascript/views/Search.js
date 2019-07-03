import endpoints from "../models/Endpoints.js";
import get_disciplines from "../controllers/ListDisciplines.js"

// Pega os parâmetros da URL.
var url_params = new URLSearchParams(window.location.search);
var substring = url_params.get("search");

// Pega o elemento da DOM.
const $disciplines_list = document.querySelector("#disciplines_list");

// Faz uma requisição das disciplinas que estão sendo procuradas.
get_disciplines(endpoints.subject(), false, substring, $disciplines_list, "search");