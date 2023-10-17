// https://newsapi.org/v2/everything?q=tesla&from=2023-09-17&sortBy=publishedAt&apiKey=API_KEY
// alternate api key : 1d3a0eefa97b499d8fbc4ee93eeb40b7
const API_KEY = "f99353a9f4024b40a4b88c02f504d54d";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews('India'));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    addToCard(data.articles);
}

function addToCard(articles){
    const cardContainer = document.querySelector(".main-container")
    const card =  document.querySelector("#card-template")

    cardContainer.innerHTML="";
    articles.forEach((item)=>{
        if(!item.urlToImage) return;
        const cardCopy = card.content.cloneNode(true);
        datafill(item,cardCopy);
        cardContainer.appendChild(cardCopy);
    })
}

function datafill(item, cardCopy){

    const cardImg = cardCopy.querySelector("#card-img")
    const cardTitle = cardCopy.querySelector("#title")
    const cardSource =cardCopy.querySelector("#source")
    const cardDesc = cardCopy.querySelector("#description")

    cardCopy.firstElementChild.addEventListener("click",()=>{
        window.open(item.url,"_blank");
    })
    cardImg.src = item.urlToImage;
     cardTitle.innerHTML= item.title;
    cardSource.innerHTML= item.source.name;
     cardDesc.innerHTML= item.description;
}

let selectedNav=null;
function navClicked(id){

    fetchNews(id);
    let currNav=document.getElementById(id);
    selectedNav?.classList.remove("active")
    selectedNav=currNav;
    selectedNav.classList.add("active");
}

const searchInput = document.querySelector("#search-item");
searchInput.addEventListener("keyup",(event)=>{
    if(event.key==='Enter'){
        event.preventDefault();
        const item = searchInput.value;
        fetchNews(item);
        selectedNav?.classList.remove("active");
        selectedNav=null;
        searchInput.innerHTML="";
    }
})

