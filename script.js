/* =============================
    Variables & declarations
============================= */
//status bars
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const happinessBar = document.getElementById('hapinessBar');

// main window
const mainBG = document.getElementById('mainBackground') // check ID

// bottom buttons 
//check button ID names when basic UI is made <--
const btnLeft = document.getElementById('leftBtn');
const btnCenter = document.getElementById('selectBtn');
const btnRight = document.getElementById('rightBtn');

/*
1 = hunger
2 = energy
3 = happiness */
let currentSelection = 1;

// creatures 
let petSpecies = [cat, dog] // more added later?

let pet = {
    hunger: 80,
    energy: 80,
    happiness: 80
}

/* ======================
    core UI functions
====================== */
const checkSelection = () => { // add selection to status bars as well
    if (currentSelection === 1) { // hunger
        mainBG.style.background = "#74a5c2";
    } else if (currentSelection === 2) { // energy
        mainBG.style.background = "#8fb663";
    } else if (currentSelection === 3) { // happiness
        mainBG.style.background = "#c97da3";
    } else { // debug test for errors
        mainBG.style.background = "#b44343";
    }
}

/* ==============================
    status bars functionality
============================== */


/* =========================
    button functionality
========================= */
// multi-functional buttons based on UI
const pressedLeft = () => {
    if (currentSelection <= 1) {
        currentSelection = 3
    } else {
        currentSelection -= 1;
    }
    checkSelection();
}

const pressedRight = () => {
    if (currentSelection >= 3) {
        currentSelection = 1
    } else {
        currentSelection += 1;
    }
    checkSelection();
}

const pressedCenter = () => {
    if (currentSelection === 1) { // hunger
        
    } else if (currentSelection === 2) { // energy
       
    } else if (currentSelection === 3) { // happiness
        
    } else { // debug test for errors
        
    }
}

btnLeft.addEventListener('click', pressedLeft);
btnCenter.addEventListener('click', pressedCenter);
btnRight.addEventListener('click', pressedRight);
/* ==============================
    clean start after refresh
============================== */
const init = () => {
    checkSelection();
}

init();