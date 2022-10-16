import './styles.css';
import apiCalls from './apiCalls';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// --------------------------------------------- QUERY SELECTORS
const modalBtn = document.querySelector('#modalBtn');
const modal = document.querySelector('#modal');
const close = document.querySelector('#close')


// --------------------------------------------- EVENT LISTENERS
modalBtn.onclick = () => {modal.style.display = "block"};
close.onclick = () => {modal.style.display = "none";}
window.onclick = (event) => {if (event.target == modal) {modal.style.display = "none"}}

  //will need some event bubblin for the cards we create dynamically later

// --------------------------------------------- GLOBAL VARIABLES



// --------------------------------------------- FETCH 




// --------------------------------------------- FUNCTIONS





console.log('Hello world');
