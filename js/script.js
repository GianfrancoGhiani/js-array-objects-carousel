'use strict'
/*
Dato un array di oggetti letterali con:
 - url dell’immagine
 - titolo
 - descrizione
Creare un carosello come nella foto allegata.

Milestone 0:
Come sempre focalizziamoci prima sulla creazione del markup statico:
     costruiamo il container e inseriamo l'immagine grande in modo 
     da poter stilare lo slider.

Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti 
letterali per popolare dinamicamente il carosello.
Al click dell'utente sulle frecce verso sinistra o destra,
 l'immagine attiva diventerà visibile e dovremo aggiungervi titolo 
 e testo.

Milestone 2:
Aggiungere il **ciclo infinito** del carosello. 
Ovvero se la miniatura attiva è la prima e l'utente clicca 
la freccia verso destra, la miniatura che deve attivarsi sarà 
l'ultima e viceversa per l'ultima miniatura se l'utente clicca 
la freccia verso sinistra.

BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click 
attivare l’immagine corrispondente.

BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) 
l’immagine attiva dovrà cambiare alla successiva.

BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
*/

// suggested : utilizzare next sibling e replace/toggle per le classi


const images = [
    {
        url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
        title: 'Svezia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Perù',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },

    {
        url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
        title: 'Chile',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
        title: 'Argentina',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
    {
        url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
        title: 'Colombia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.'
    },
];


const bigContainer = document.getElementById('bigView');
const listContainer = document.getElementById('imgList');


for (let place of images){
    const card = document.createElement('div');
    card.className = 'card d-none';
    bigContainer.append(card);
    const cardImg = document.createElement('img');
    cardImg.setAttribute('src', `${place.url}`);
    cardImg.setAttribute('style', `max-width:100%`);
    card.append(cardImg);
    const detail = document.createElement('div');
    detail.className = 'card-txt';
    detail.innerHTML= `<h4>${place.title}</h4>
    <p>${place.description}</p>`;
    card.append(detail);
    
    const littleCard = document.createElement('img');
    littleCard.setAttribute('src', `${place.url}`);
    littleCard.setAttribute('style', `max-width:100%`);
    littleCard.className = 'listEl col p-1 rounded-2 opacity-50';
    listContainer.append(littleCard);
}


const frsCard = document.querySelector('.card');
frsCard.classList.replace('d-none', 'd-block');
const frsElList = document.querySelector('.listEl');
frsElList.classList.replace('opacity-50', 'opacity-100');


const arrows = document.querySelectorAll('i');
const prevArrow = arrows[0];
const nextArrow = arrows[1];

function switchToNext(){
    const active = document.querySelector('.d-block')
    const activeImg = active.querySelector('img');
    const actListElem = document.querySelector('.opacity-100');
    images.forEach((place, index)=>{
        if (activeImg.getAttribute('src') == images[index].url){
            active.classList.replace('d-block', 'd-none');
            if (!active.nextSibling){
                const frsCard = document.querySelector('.card');
                frsCard.classList.replace('d-none', 'd-block');
            } else {
                active.nextSibling.classList.replace('d-none', 'd-block');
            }
        }
        if (actListElem.getAttribute('src') == activeImg.getAttribute('src')){
            actListElem.classList.replace('opacity-100', 'opacity-50');
            if (!active.nextSibling){
                const frsElList = document.querySelector('#imgList img');
                frsElList.classList.replace('opacity-50', 'opacity-100');
            } else {
                actListElem.nextSibling.classList.replace('opacity-50', 'opacity-100');
            }
        }
        
    })



}
function switchToPrev(){
    const active = document.querySelector('.d-block')
    const activeImg = active.querySelector('img');
    const actListElem = document.querySelector('.opacity-100');

    images.forEach((place, index)=>{
        if (activeImg.getAttribute('src') == images[index].url){
            active.classList.replace('d-block', 'd-none');
            if (index == 0){
                const cards = document.querySelectorAll('.card');
                const lastElemCard = cards[cards.length-1];
                lastElemCard.classList.replace('d-none', 'd-block');

               
            } else {
                active.previousSibling.classList.replace('d-none', 'd-block');
            }
        }  
        if (actListElem.getAttribute('src') == activeImg.getAttribute('src')){
            actListElem.classList.replace('opacity-100', 'opacity-50');
            if (!actListElem.previousSibling){
                const listElCard = document.querySelectorAll('#imgList img')
                const lastListElem = listElCard[listElCard.length-1];
                lastListElem.classList.replace('opacity-50', 'opacity-100');
            } else {
                actListElem.previousSibling.classList.replace('opacity-50', 'opacity-100');
            }
        }
    })



}
prevArrow.addEventListener('click',switchToPrev)
nextArrow.addEventListener('click',switchToNext)
/*
se la card ad index=i 
    d-block replace con d-none
    card a index=i+1 d-none in d-block
*/