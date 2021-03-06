document.addEventListener("DOMContentLoaded", () => {
	fetchAnimeNames();
	dropDownClickEvent();
    const dataDisplay = document.getElementById("specificInfo");
    dataDisplay.style.display = "none"




});

function fetchAnimeNames() {
	const dropdownElements = document.getElementById("myDropdown");
    const dataDisplay = document.getElementById("specificInfo");
   
	fetch("https://anime-facts-rest-api.herokuapp.com/api/v1")
		.then(response => response.json())
		.then(data => {
			data.data.forEach(anime => {               
				const btnSelectAnime = document.createElement("button");
				const animeNAme = anime.anime_name;
				btnSelectAnime.innerText = animeNAme.replaceAll('_', ' ');
				btnSelectAnime.addEventListener("click", () => {
                    dataDisplay.style.display = "block"
					const animeNAmeElement = document.getElementById("name");
					const animeImage = document.getElementById("animeImage");
					animeNAmeElement.textContent = anime.anime_name.replaceAll('_', ' ').toUpperCase();
					animeImage.setAttribute("src", anime.anime_img);
					dropdownElements.style.display = "none";
                    clearInterval(window.interval);
                    fetchRandomFacts(anime.anime_name);
                    fetchAnimeVotes(anime.anime_name.replaceAll('_', ' ').toUpperCase());
                    enableVoteButtons();
                    
				});
				dropdownElements.appendChild(btnSelectAnime);


			});
		});
}

function dropDownClickEvent() {
	const btnDropdown = document.getElementById("dropbtn");
	const dropdownElements = document.getElementById("myDropdown");
	btnDropdown.addEventListener("click", () => {
		if (dropdownElements.style.display === "none") {
			dropdownElements.style.display = "block";
		} else {
			dropdownElements.style.display = "none";
		}

	});
}

function fetchRandomFacts(animeName) {
    const randomFactElement = document.getElementById("RandomFact");
	const factsArray = new Array;
	fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${animeName}`)
		.then(response => response.json())
		.then(data => {
			data.data.forEach(animeFact => {
				factsArray.push(animeFact.fact);

			});
            window.interval = setInterval(()=>{
                const randomIndex = (Math.floor(Math.random() * factsArray.length));
			    let randomFact = factsArray[randomIndex];
	            randomFactElement.innerText = randomFact;
            }, 5000)
            
		})
		.catch(err => setTimeout(alert(err.message), 3000));

}

function fetchAnimeVotes(animeNAme){
    const animeNAmeElement = document.getElementById("name");
    const upVotesElement = document.getElementById("upVotes");
    const downVotesElement = document.getElementById("downVotes");
    
    //const displayedName = animeNAmeElement.innerText;
    fetch("http://localhost:3000/votes")
    .then(response => response.json())
    .then(votes => {
        
        votes.forEach(animeData => {
            const formatedAnimeName = animeData.anime_name.replaceAll('_', ' ').toUpperCase();
            // console.log(animeData);
            // console.log(formatedAnimeName);
            // console.log(displayedName);
            if (animeNAme === formatedAnimeName){
                let upVotes = animeData.up_votes
                let downVotes = animeData.down_votes
                upVotesElement.innerText = upVotes;
                downVotesElement.innerText = downVotes;
                upVoteAndDownVoteAnime(animeNAme);
                
            }
        })
        
    })


}

function upVoteAndDownVoteAnime(animeNAme){
    const upVotesElement = document.getElementById("upVotes");
    const downVotesElement = document.getElementById("downVotes");
    const btnUpVotes = document.getElementById("btnUpVote");
    const btnDownVotes = document.getElementById("btnDownVote");
    btnUpVotes.addEventListener("click", ()=> {
        fetch("http://localhost:3000/votes")
        .then(response => response.json())
        .then(votes => {
            
            votes.forEach(animeData => {
                const formatedAnimeName = animeData.anime_name.replaceAll('_', ' ').toUpperCase();
                if (animeNAme === formatedAnimeName){
                    const index = animeData.anime_id;
                    console.log(index);
                    const newVote = {
                        anime_id: animeData.anime_id,
                        anime_name: animeData.anime_name,
                        up_votes:  (animeData.up_votes + 1),
                        down_votes: animeData.down_votes
                    }
                    fetch(`http://localhost:3000/votes/${index}`,{ 
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify(newVote)
                        })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(`Element: ${data}`);
                            let newVotes = data.up_votes
                            upVotesElement.innerText = newVotes;
                            return false;
                            
                        })
                        .catch(e => setTimeout(alert(e.message), 3000)); 
                    
            
                    }
            })
            
        })
        btnUpVotes.disabled = true;
  
    });

    btnDownVotes.addEventListener("click", ()=> {
        fetch("http://localhost:3000/votes")
        .then(response => response.json())
        .then(votes => {
            
            votes.forEach(animeData => {
                const formatedAnimeName = animeData.anime_name.replaceAll('_', ' ').toUpperCase();
                if (animeNAme === formatedAnimeName){
                    const index = animeData.anime_id;
                    console.log(index);
                    const newVote = {
                        anime_id: animeData.anime_id,
                        anime_name: animeData.anime_name,
                        up_votes: animeData.up_votes,
                        down_votes: (animeData.down_votes + 1)

                    }
                    fetch(`http://localhost:3000/votes/${index}`,{ 
                            method:'PUT',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify(newVote)
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(`Element: ${data}`);
                            let newVotes = data.down_votes;
                            downVotesElement.innerText = newVotes;
                            // return false;
                            
                        })
                        .catch(e => setTimeout(alert(e.message), 3000)); 
                    
                }
            })
            
        }); 
        btnDownVotes.disabled = true;  
    });

}
function enableVoteButtons(){
    const btnUpVotes = document.getElementById("btnUpVote");
    const btnDownVotes = document.getElementById("btnDownVote");
    if( btnUpVotes.disabled === true ||  btnDownVotes.disabled === true){
        btnUpVotes.disabled = false;
        btnDownVotes.disabled = false;
  
    }
}
