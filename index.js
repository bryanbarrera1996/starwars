//const movie = document.getElementById("movie");
const films = document.getElementById("films");
const divplanets = document.getElementById("planets");
const divstarship = document.getElementById("starship");
const divpeople = document.getElementById("people");
const ulr_image = "assets/images/starwars.jpg";
let temp_response = [];
//movie.addEventListener("click", getMovies);
//Recibo las peliculas
function getMovies(){
    //console.log('Entro');
    let xhr = new XMLHttpRequest();
    xhr.onload = function(e) {
        const response = JSON.parse(e.target.responseText);
        // Ordeno las peliculas por capitulo
        const  result  = response.results;
        console.log(result);
        result.sort(compare_episode);
        const array_films = [];
        temp_response = result;
        let print_films = '';
        result.forEach((element, index) => {
            
            if (index == 0){
                print_films+='<div class="row" >';
            }
            if (index % 3 == 0 && index != 0){
                print_films += '</div>';
                print_films += '<br />';
                print_films+='<div class="row" >';
            }
            
            print_films += '<div class="col-md-4">';
            print_films += '<div class="card" style="width: 18rem;">';
            print_films += '<img src="'+ulr_image+'" class="card-img-top" alt="...">';
            print_films += '<div class="card-body">';
            print_films += '<h5 class="card-title">'+element.title+'</h5>';
            print_films += '<ul class="nav justify-content-center">';
            print_films += '<li class="nav-item">';
            print_films += '<a class="nav-link planets" data-id="'+index+'" title="Click if you want to know the planets of this saga" href="#"><img src="assets/images/planet.png" width="25" heigth="25" ></a>';
            print_films += '</li>';
            print_films += '<li class="nav-item">';
            print_films += '<a class="nav-link starship" data-id="'+index+'" title="Click if you want to know the ships of this saga" href="#"><img src="assets/images/starship.png" width="25" heigth="25" ></a>';
            print_films += '</li>';
            print_films += '<li class="nav-item">';
            print_films += '<a class="nav-link people" data-id="'+index+'" title="Click if you want to know the celebrities of this saga" href="#"><img src="assets/images/people.png" width="25" heigth="25" ></a>';
            print_films += '</li>';
            print_films += '</ul>';
            print_films += '<p class="card-text">';
            print_films += element.opening_crawl;
            print_films += '</p>';
            print_films += '</div>';
            print_films += '</div>';
            print_films += '</div>';
            
         });
        //Imprimo las peliculas
        films.innerHTML = print_films;
    };
    xhr.open("GET", "https://swapi.dev/api/films/");
    xhr.send();
}
function compare_episode( a, b ) {
    if ( a.episode_id < b.episode_id ){
      return -1;
    }
    if ( a.episode_id > b.episode_id ){
      return 1;
    }
    return 0;
  }
  //Función dinamica para traer los planetas, actores y naves
function getdynamic(url, div, index){
    let xhr_dynamic = new XMLHttpRequest();
    xhr_dynamic.onload = function(e) {
        const response = JSON.parse(e.target.responseText);
        if(div == 'dataplanets'){
            printdataplanets(div, response);
        }

        if(div == 'datastarship'){
            printdatastarships(div, response);
        }
        if(div == 'datapeople'){
            printdatapeople(div, response, index);
        }
        if(div == 'homeworld'){
            //console.log('Entro');
            printhomeworld(div, response, index);
        }

        if(div == 'species'){
            //console.log('Entro');
            printspecies(div, response, index);
        }
    }
    xhr_dynamic.open("GET", url);
    xhr_dynamic.send();
  }

  function loadplanets(data){
    let planets_html = ''; 
    planets_html += '<div class="jumbotron">';
    planets_html += '<h1 class="display-4"><a href="#" class="back"><img src="assets/images/back.png" title="Back" width="40" heigth="40" ></a> '+data.title+'</h1>';
    planets_html += '<p class="lead"><img src="assets/images/planet.png" width="25" heigth="25" > Planets</p>';
    planets_html += '<hr class="my-4">';
    planets_html += '<div class="dataplanets row"></div>';
    planets_html += '</div>';
    divplanets.innerHTML = planets_html;

    data.planets.forEach(element => {
        getdynamic(element,'dataplanets');
    });
  }

  function printdataplanets(div, planetsdata){
    let dataplanets = divplanets.getElementsByClassName(div);
    let printplanetshtml = '';
    printplanetshtml += '<div class="col-md-4">';
    printplanetshtml += '<ul class="list-group">';
    printplanetshtml += '<li class="list-group-item text-white bg-dark">'+planetsdata.name+'</li>';
    printplanetshtml += '<li class="list-group-item"><i>Terrain:</i> '+planetsdata.terrain+'</li>';
    printplanetshtml += '<li class="list-group-item"><i>Gravity:</i> '+planetsdata.gravity+'</li>';
    printplanetshtml += '<li class="list-group-item"><i>Population:</i> '+planetsdata.population+'</li>';
    printplanetshtml += '<li class="list-group-item"><i>Diameter:</i> '+planetsdata.diameter+'</li>';
    printplanetshtml += '</ul>';
    printplanetshtml += '</div>';
    console.log(planetsdata);
    dataplanets[0].innerHTML = dataplanets[0].innerHTML + printplanetshtml;
    
  } 

  function loadstarships(data){
    let starship_html = ''; 
    starship_html += '<div class="jumbotron">';
    starship_html += '<h1 class="display-4"><a href="#" class="back"><img src="assets/images/back.png" title="Back" width="40" heigth="40" ></a> '+data.title+'</h1>';
    starship_html += '<p class="lead"><img src="assets/images/starship.png" width="25" heigth="25" > Starships</p>';
    starship_html += '<hr class="my-4">';
    starship_html += '<div class="datastarship row"></div>';
    starship_html += '</div>';
    divstarship.innerHTML = starship_html;

    data.starships.forEach(element => {
        getdynamic(element,'datastarship');
    });
  }

  function printdatastarships(div, starshipsdata){
    let datastarship = divstarship.getElementsByClassName(div);
    let printstarshiphtml = '';
    printstarshiphtml += '<div class="col-md-4">';
    printstarshiphtml += '<ul class="list-group">';
    printstarshiphtml += '<li class="list-group-item text-white bg-dark">'+starshipsdata.name+'</li>';
    printstarshiphtml += '<li class="list-group-item"><i>Model:</i> '+starshipsdata.model+'</li>';
    printstarshiphtml += '<li class="list-group-item"><i>Manufacturer:</i> '+starshipsdata.gravity+'</li>';
    printstarshiphtml += '<li class="list-group-item"><i>Passengers:</i> '+starshipsdata.passengers+'</li>';
    printstarshiphtml += '</ul>';
    printstarshiphtml += '</div>';
    console.log(datastarship);
    datastarship[0].innerHTML = datastarship[0].innerHTML + printstarshiphtml;
  }

  function loadpeople(data){
    let people_html = ''; 
    people_html += '<div class="jumbotron">';
    people_html += '<h1 class="display-4"><a href="#" class="back"><img src="assets/images/back.png" title="Back" width="40" heigth="40" ></a> '+data.title+'</h1>';
    people_html += '<p class="lead"><img src="assets/images/people.png" width="25" heigth="25" > Starships</p>';
    people_html += '<hr class="my-4">';
    people_html += '<div class="datapeople row"></div>';
    people_html += '</div>';
    divpeople.innerHTML = people_html;

    data.characters.forEach((element, index) => {
        getdynamic(element,'datapeople', index);
    });
  }

  function printdatapeople(div, peopledata, index){
    let datapeople = divpeople.getElementsByClassName(div);
    let printpeoplehtml = '';
    printpeoplehtml += '<div class="col-md-4">';
    printpeoplehtml += '<ul class="list-group homeworld list-people-'+index+'">';
    printpeoplehtml += '<li class="list-group-item text-white bg-dark">'+peopledata.name+'</li>';
    printpeoplehtml += '<li class="list-group-item"><i>Gender:</i> '+peopledata.gender+'</li>';
    printpeoplehtml += '<li class="list-group-item"><i>Hair color:</i> '+peopledata.hair_color+'</li>';
    printpeoplehtml += '<li class="list-group-item"><i>Skin color:</i> '+peopledata.skin_color+'</li>';
    printpeoplehtml += '<li class="list-group-item"><i>Eye color:</i> '+peopledata.eye_color+'</li>';
    //printpeoplehtml += '<li class="list-group-item"><i>Homeworld:</i> '+peopledata.homeworld+'</li>';
    printpeoplehtml += '</ul>';
    printpeoplehtml += '</div>';
    
    loadhomeworld(peopledata.homeworld,'homeworld','list-people-'+index);
    if (peopledata.species[0]){
        loadspecies(peopledata.species[0],'species','list-people-'+index);
    }
    
    //console.log(peopledata,'list-people');
    datapeople[0].innerHTML = datapeople[0].innerHTML + printpeoplehtml;
  }

 function loadhomeworld(url, div, index){
    getdynamic(url, div, index);
 }

 function printhomeworld(div, homeworlddata, divindex){
    //debugger
    let datapeople = divpeople.getElementsByClassName(divindex);
    //console.log(homeworlddata);
    let printhomeworld = '<li class="list-group-item"><i>Homeworld:</i> '+homeworlddata.name+'</li>';
    datapeople[0].innerHTML = datapeople[0].innerHTML + printhomeworld;
 }

 function loadspecies(url, div, index){
    getdynamic(url, div, index);
 }

 function printspecies(div, speciesdata, divindex){
    //debugger
    let datapeople = divpeople.getElementsByClassName(divindex);
    //console.log(speciesdata);
    let printspecies = '<li class="list-group-item"><i>Species:</i> '+speciesdata.name+'</li>';
    printspecies += '<li class="list-group-item"><i>Languaje:</i> '+speciesdata.languaje+'</li>';
    printspecies += '<li class="list-group-item"><i>Average_height:</i> '+speciesdata.average_height+'</li>';
    datapeople[0].innerHTML = datapeople[0].innerHTML + printspecies;
 }
  

//Utilizo jquery para los click dinamicos
$(document).ready(function(){
    getMovies();
    //Planetas 
    $("#films").on("click",".planets", function(){
        const planets = temp_response[$(this).attr("data-id")];
        films.style.display = "none";
        divplanets.style.display = "";
        divplanets.innerHTML = "";
        loadplanets(planets);
    });
    $("#planets").on("click",".back",function(){
        films.style.display = "";
        divplanets.style.display = "none";
    });
    //Fin planetas
    //Naves
    $("#films").on("click",".starship", function(){
        const starship = temp_response[$(this).attr("data-id")];
        films.style.display = "none";
        divstarship.style.display = "";
        divstarship.innerHTML = "";
        loadstarships(starship);
    });
    $("#starship").on("click",".back",function(){
        films.style.display = "";
        divstarship.style.display = "none";
    });
    //Fin naves
    //Actores
    $("#films").on("click",".people", function(){
        const people = temp_response[$(this).attr("data-id")];
        films.style.display = "none";
        divpeople.style.display = "";
        divpeople.innerHTML = "";
        loadpeople(people);
    });
    $("#people").on("click",".back",function(){
        films.style.display = "";
        divpeople.style.display = "none";
    });
    //Fin naves
});