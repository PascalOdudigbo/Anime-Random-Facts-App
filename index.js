document.addEventListener("DOMContentLoaded", ()=>{
    fetchAnimeNames();

})

function fetchAnimeNames(){
    fetch("https://anime-facts-rest-api.herokuapp.com/api/v1")
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        data.data.forEach(anime => {
            console.log(anime.anime_name);
        })
    })
}