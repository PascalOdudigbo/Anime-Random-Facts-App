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
            btnSelectAnime.innerText = animeNAme.replaceAll('_', ' ');
            console.log(anime);
            btnSelectAnime.addEventListener("click", () =>{
                //console.log(anime);
                const dropdownElements = document.getElementById("myDropdown");
                const animeNAmeElement = document.getElementById("name");
                const animeImage = document.getElementById("animeImage");
                animeNAmeElement.textContent = anime.anime_name.replaceAll('_', ' ').toUpperCase();
                animeImage.setAttribute("src", anime.anime_img);
                dropdownElements.style.display = "none";
                fetchRandomFacts(anime.anime_name);
            
            });
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
        
    });
}

function fetchRandomFacts(animeName){
    const factsArray = [];
    fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`)
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        //console.log(data.data)
        data.data.forEach(animeFact =>{
            factsArray.push(animeFact.fact);
        })
    .catch(err => setTimeout(alert(err.message), 3000))

    })
    return factsArray;
}

