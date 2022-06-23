document.addEventListener("DOMContentLoaded", ()=>{
    fetchAnimeNames();
    dropDownClickEvent();

    

})

function fetchAnimeNames(){
    const dropdownElements = document.getElementById("myDropdown");
    fetch("https://anime-facts-rest-api.herokuapp.com/api/v1")
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        //console.log(data.data);
        data.data.forEach(anime => {
            //console.log(anime.anime_name);
            const btnSelectAnime = document.createElement("button");
            const animeNAme = anime.anime_name;
            btnSelectAnime.innerText = animeNAme;
            btnSelectAnime.addEventListener("click", animeSelected(anime));
            dropdownElements.appendChild(btnSelectAnime);
            
        })
    })
}

function dropDownClickEvent(){
    const btnDropdown = document.getElementById("dropbtn");
    const dropdownElements = document.getElementById("myDropdown");
    btnDropdown.addEventListener("click", ()=>{
        if(dropdownElements.style.display === "none"){
            dropdownElements.style.display = "block";
        }
        else{
            dropdownElements.style.display = "none";
        }
        
    })
}

function animeSelected(){

}