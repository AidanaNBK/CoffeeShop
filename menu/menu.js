let selectedButton = "coffee"

const onLoadData = async (res) => {
    const data = await res.json()
    console.log("data:", data)
    createCards(data, selectedButton);
    /* Need to change styles of the buttons!!! after click */
    document.getElementById('tab-coffee').addEventListener('click', (e) => {
        if (selectedButton === "coffee"){
            return;
        }
        changeButtonDark(document.getElementById('tab-coffee'))
        changeButtonLight(document.getElementById(`tab-${selectedButton}`));
        selectedButton = "coffee";
        createCards(data, selectedButton);
    })
    document.getElementById('tab-tea').addEventListener('click', (e) => {
        if (selectedButton === "tea"){
            return;
        }
        changeButtonDark(document.getElementById('tab-tea'))
        changeButtonLight(document.getElementById(`tab-${selectedButton}`));
        selectedButton = "tea";
        createCards(data, selectedButton);
    })
    document.getElementById('tab-dessert').addEventListener('click', (e) => {
        if (selectedButton === "dessert"){
            return;
        }
        changeButtonDark(document.getElementById('tab-dessert'))
        changeButtonLight(document.getElementById(`tab-${selectedButton}`));
        selectedButton = "dessert";
        createCards(data, selectedButton);
    })
}

function changeButtonDark(buttonSelected){
    buttonSelected.classList.remove("tab-light");
    buttonSelected.classList.add("tab-dark");
    buttonSelected.querySelector('.img-circle').classList.remove("back-light");
    buttonSelected.querySelector('.img-circle').classList.add("back-body");
    buttonSelected.querySelector('.tab-item-text').classList.remove("dark");
    buttonSelected.querySelector('.tab-item-text').classList.add("light");
}
function changeButtonLight(buttonSelected){
    buttonSelected.classList.add("tab-light");
    buttonSelected.classList.remove("tab-dark");
    buttonSelected.querySelector('.img-circle').classList.add("back-light");
    buttonSelected.querySelector('.img-circle').classList.remove("back-body");
    buttonSelected.querySelector('.tab-item-text').classList.add("dark");
    buttonSelected.querySelector('.tab-item-text').classList.remove("light");
}

function createCards(data, category){
    let menuGridElem = document.getElementById('menu-grid')
    menuGridElem.innerHTML = '';
    let popupCard = document.getElementById('popup-card-coffee');
    let popupMain = document.getElementById('popup-card');
    let id = 1;
    for (let elem of data) {
        if (elem.category != category) {continue}
        const cardEl = createCoffeeCard(id, elem)
        cardEl.querySelector('.coffee-card-img').style.backgroundImage = `url("../images/${category}-${cardEl.dataset.id}.svg")`;
        menuGridElem.appendChild(cardEl);
        id++
        cardEl.addEventListener('click', (e) => {
            popupMain.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            popupCard.querySelector('#popup-card-name').innerHTML = elem.name;
            popupCard.querySelector('#popup-card-information').innerHTML = elem.description;
            popupCard.querySelector('.size-elements').innerHTML = '';
            console.log(popupCard);
            console.log(cardEl.dataset.id);
            // popupCard.querySelector('.popup-card-img').classList.add(`img${cardEl.dataset.id}`);
            popupCard.querySelector('.popup-card-img').style.backgroundImage = `url("../images/${category}-${cardEl.dataset.id}.svg")`;
            for (let [key, val] of Object.entries(elem.sizes)){
                popupCard.querySelector('.size-elements').appendChild(createButton(key, val));
            }
            popupCard.querySelector('.additive-elements').innerHTML = '';
            for (let [key, val] of Object.entries(elem.additives)){
                popupCard.querySelector('.additive-elements').appendChild(createButtonAdd(key, val));
            }
            popupCard.querySelector('.total-cost').innerHTML = `$${elem.price}`;
        })
        popupCard.querySelector('#close-popup').addEventListener('click', (e) => {
            popupMain.style.display = 'none';
            document.body.style.overflow = 'auto';
        })
    }
}

fetch('./../assets/data.json')
.then(onLoadData)
.catch(err => console.error("Err with loading home.json:", err))

let menuGridElem = document.getElementById('menu-grid')

function createCoffeeCard(id, props) {
    // returns HTMLDivElement
    const cardEl = document.createElement('div');
    cardEl.classList.add('coffee-card');
    cardEl.id = 'coffee-card';
    cardEl.dataset.id = id;
    // console.log("CardEl: ", id, cardEl.dataset.id)
    const innerHTML = `
<div class = "coffee-card-img hoverOn"></div>
<!-- <img class = "coffee-img" src = "../images/coffee-${id}.svg" alt= "Image of coffee1"> -->
<div class = "coffee-text">
    <div class = "coffee-info">
        <h3 class = "dark">${props.name}</h3>
        <p class = "dark">${props.description}</p>
    </div>
    <span class = "coffee-price">$${props.price}</span>
</div>
`
    cardEl.innerHTML = innerHTML;
    return cardEl;
}

function createButton(key, data){
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('tab-item');
    buttonEl.classList.add('tab-dark');
    buttonEl.id = `tab-coffee-${key}`
    buttonEl.innerHTML = `
<span class = "img-circle back-body">
    <span class = "tab-img-item">${key.toUpperCase()}</span>
</span>
<span class = "tab-item-text light">${data.size}</span>`
    return buttonEl;
}
function createButtonAdd(key, data){
    const buttonEl = document.createElement('button');
    buttonEl.classList.add('tab-item');
    buttonEl.classList.add('tab-dark');
    buttonEl.id = `tab-coffee-${key+1}`
    buttonEl.innerHTML = `
<span class = "img-circle back-body">
    <span class = "tab-img-item">${Number(key)+1}</span>
</span>
<span class = "tab-item-text light">${data.name}</span>`
    return buttonEl;
}


