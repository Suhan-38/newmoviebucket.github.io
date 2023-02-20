let main = document.getElementById("main");
let submit = document.getElementById("submit");
let form = document.getElementById("form");
let i = document.getElementById("i");
let movieinfo = document.querySelector(".movieinfo");
let closee = document.querySelector(".close");
let favlist = document.getElementById("fav-list");
let hamburger = document.getElementById("hamburger");
let box = document.querySelector(".box");

// this function is used to update searchlist on everyinput typed

async function updatesearchlist(vl) {
    if (vl === '') {
        movieinfo.style.display = "none";
        return;
    }
    let x = await fetch(`http://www.omdbapi.com/?s=${vl}&page=1&apikey=1b79c252`);
    let y = await x.json();
    if (y.Search !== undefined) {
        main.style.display = "block";
        for (let i = 0; i < y.Search.length; i++) {
            let ne = document.createElement("div");
            ne.classList.add("itemlist");
            if (y.Search[i].Poster == "N/A") {
                ne.innerHTML = `<p class="title">${y.Search[i].Title}</p>
                        <i class="fa-sharp fa-solid fa-heart"></i>
        <img src="./image_not_found.png" alt="" class="pos">`;
            }
            else {
                ne.innerHTML = `<p class="title">${y.Search[i].Title}</p>
                        <i class="fa-sharp fa-solid fa-heart"></i>
        <img src="${y.Search[i].Poster}" alt="" class="pos">`;
            }
            let te = Array.from(ne.getElementsByTagName("p"));
            main.appendChild(ne);

        }

        // here we have picked up the paragraph element from item of search list and onclicking it we should update moveiinfo block

        let titleclick = Array.from(document.getElementsByClassName("itemlist"));
        // console.log(titleclick);
        titleclick.forEach((element, index) => {
            element.querySelector("p").addEventListener('click', () => {
                main.style.display = "none";
                additemstofavlist(y.Search[index].imdbID, y.Search[index].Poster)
            });
        })

        // adding click eventlisiner on favicon (heartshapedicon)

        let favicon = Array.from(document.getElementsByClassName("fa-heart"));
        favicon.forEach((element) => {
            element.addEventListener('click', (e) => {
                element.style.color = "orange";
                let favitemlist = document.createElement("li");
                let favp = e.currentTarget.parentElement.querySelector("p").innerText;
                let favimg = e.currentTarget.parentElement.querySelector("img").src;
                favitemlist.innerHTML = `<p class="title">${favp}</p>
                        <i class="fa-solid fa-trash trash-icon"></i>
                        <img src="${favimg}" alt="" class="pos">`;
                favitemlist.classList.add("favlistitem")
                favlist.appendChild(favitemlist);
                Array.from(favitemlist.getElementsByTagName("P")).forEach((element) => {
                    element.addEventListener('click', (e) => {
                        console.log("clicked 1");
                    })
                });

                // clicking on this icons u can remove elements from favourite FileList

                let trashicons = Array.from(document.getElementsByClassName("trash-icon"));
                trashicons.forEach((element) => {
                    element.addEventListener('click', (e) => {
                        favlist.removeChild(e.currentTarget.parentElement);
                    })
                })
            })
        })
    }
    else {
        main.style.display = "none";
    }
}
// clicking on this hamburger icon u will able to close and open favourite list all other items will be closed when u click on this 
hamburger.addEventListener('click', () => {
    favlist.classList.toggle("favlistdisplay");
    box.classList.toggle("favlistdisplay");
    main.style.display = "none";
    movieinfo.style.display = "none";

})

// this function is used to add items to favourite list
// the key is the unique key refering to particular movie is passed aupdatesearchlistng with url of image poster


async function additemstofavlist(key, urrl) {

    let x = await fetch(`http://www.omdbapi.com/?i=${key}&apikey=1b79c252`);
    let y = await x.json();
    let previouspost = movieinfo.querySelector(".moveinfodiv");
    if (previouspost !== null) {
        movieinfo.removeChild(previouspost);
    }
    movieinfo.style.display = "flex";
    let moveinfodiv = document.createElement("div");
    moveinfodiv.innerHTML = `
            <img src=${urrl} alt="" class="movie-info-img">
        <div class="info">
            <h1>${y.Title}</h1>
            <p><span>Year of Realese : ${y.Year},</span><span>Rated : ${y.Rated},</span><span>Date : ${y.Released}</span></p>
            <p>Genre : ${y.Genre}</p>
            <p>Director : ${y.Director}</p>
            <p>Actors : ${y.Actors}</p>
            <p id="plot">plot : ${y.Plot}</p>
        </div>`;
    movieinfo.appendChild(moveinfodiv);
    moveinfodiv.classList.add("moveinfodiv");

}
// here adding click event on close icon to close movieinfo block


closee.addEventListener('click', (e) => {
    let removing = e.currentTarget.nextElementSibling;
    movieinfo.removeChild(removing);
    movieinfo.style.display = "none";

})

// adding input eventlisiner of form which used to update search list
form.addEventListener("input", (e) => {
    main.innerHTML = "";
    let value = e.target.value;
    if (value == "") {
        return;
    }
    favlist.classList.add("favlistdisplay");
    updatesearchlist(value);
})
