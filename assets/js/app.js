const playlist = document.getElementById("playlist");

const lecteur = document.querySelector("#lecteur"); 
const randomButton = document.getElementById("randomButton");
const closeButton = document.getElementById("closeButton");
const btnPause = document.getElementById("btnPause");
const disque = document.querySelector(".disque");
const texteInfo = document.querySelector("#texte-info");
const cover = document.querySelector(".cov");


disque.classList.add("pause");

const config = {
    urlCover : "uploads/cover/",
    urlSound : "uploads/music/"
};

closeButton.addEventListener("click", function () {
    closeExpandedCover(); // Appel de la fonction pour fermer la cover agrandie
});

const expandAndCenterCover = (selectedDiv) => {
    disque.classList.remove("pause");
    selectedDiv.classList.add("selected", "expanded");
    selectedDiv.parentElement.style.display = "flex";
    selectedDiv.parentElement.style.justifyContent = "center";
    selectedDiv.parentElement.style.alignItems = "center";
    const siblings = [...selectedDiv.parentElement.children].filter((el) => el !== selectedDiv);
    siblings.forEach((sibling) => {
        sibling.classList.add("hidden");
    });
    disque.classList.remove("pause");
    selectedDiv.querySelector('.disque').classList.remove('pause'); // Afficher le disque pour la musique sélectionnée    
};

const closeExpandedCover = () => {
    const selectedDiv = document.querySelector(".selected");
    if (selectedDiv) {
        selectedDiv.classList.remove("selected");
        selectedDiv.parentElement.style.removeProperty("display");
        selectedDiv.parentElement.style.removeProperty("justify-content");
        selectedDiv.parentElement.style.removeProperty("align-items");
        const siblings = [...selectedDiv.parentElement.children].filter((el) => el !== selectedDiv);
        siblings.forEach((sibling) => {
            sibling.classList.remove("hidden");
        });
        selectedDiv.querySelector('.disque').classList.add('pause'); // Masquer le disque lorsque la cover est fermée
    }
};

const showDisque = () => {
    disque.classList.pause("click");
};


const hideDisque = () => {
    disque.classList.add("click");
};


const getData = async () =>{
    const req = await fetch("https://leapigoat.onrender.com/api/v1/musics");
    console.log(req);
    const dbMusic = await req.json();
    console.log("result ", dbMusic);
    data = dbMusic.result
    data.forEach((music) => {
        const textLengthClass = music.title.length > 15 ? "long-text" : "";
        playlist.innerHTML += `<li id="${music.id}"><h2>${music.title} </h2><div><small> ${music.categorygit } </small> </div></li> ` 
    });
    const allLi = document.querySelectorAll("li");


    allLi.forEach((li) => {   
        li.addEventListener("click", function(elem) {
            const id = parseInt(li.id);
            const searchById = data.find((element) => element.id === id);
            if (searchById) {
                console.log(searchById);
                lecteur.src = `${config.urlSound}${searchById.sound}`;
                updateCover(`${config.urlCover}${searchById.cover}`);
                expandAndCenterCover(li);

            } else {
                console.log("Aucune musique trouvée avec cet ID.");
            }
        });
        
    });

    const updateCover = (coverUrl) => {
        const coverElement = document.querySelector('.cov');
        coverElement.src = coverUrl;
    };
    
    randomButton.addEventListener("click", function () {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMusic = data[randomIndex];
        if (randomMusic) {
            lecteur.src = `${config.urlSound}${randomMusic.sound}`;
            const selectedLi = document.getElementById(randomMusic.id);
            expandAndCenterCover(selectedLi);
            updateCover(`${config.urlCover}${searchById.cover}`);

        } else {
            console.log("Impossible de trouver une chanson aléatoire.");
        }
        
    });
   

    closeButton.addEventListener("click", function () {
        closeExpandedCover(); // Appel de la fonction pour fermer la cover agrandie
    });
        
}

lecteur.addEventListener("pause", () => disque.classList.add("pause"));
lecteur.addEventListener("play", () => disque.classList.remove("pause"));

getData();



