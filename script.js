/* =============================
    Variables & declarations
============================= */
// status bar containers
const hungerContainer = document.getElementById('hungerWrapper');
const energyContainer = document.getElementById('energyWrapper');
const happinessContainer = document.getElementById('happinessWrapper');

// status bars
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const happinessBar = document.getElementById('happinessBar');

// main window
const mainBG = document.getElementById('homeSection')

// bottom buttons 
const btnLeft = document.getElementById('previousRoom');
const btnCenter = document.getElementById('selectButton');
const btnRight = document.getElementById('nextRoom');

/*
1 = hunger
2 = energy
3 = happiness */
let currentRoom = 1;

// creatures 
let petSpecies = ['cat', 'dog'] // more added later?

let pet = {
    hunger: 80,
    energy: 80,
    happiness: 80
}

/* ======================
    core UI functions
====================== */
const checkSelection = () => { // add selection to status bars as well
    // clear all selections
    hungerContainer.style.border = '';
    hungerContainer.style.backgroundColor = '';

    energyContainer.style.border = '';
    energyContainer.style.backgroundColor = '';

    happinessContainer.style.border = '';
    happinessContainer.style.backgroundColor = '';

    // mark current selected room
    if (currentRoom === 1) { // hunger
        mainBG.style.background = "#adccdf";
        hungerContainer.style.border = '2px solid #aaee7c';
        hungerContainer.style.backgroundColor = '#d0ff0065';

    } else if (currentRoom === 2) { // energy
        mainBG.style.background = "#addb79";
        energyContainer.style.border = '2px solid #aaee7c';
        energyContainer.style.backgroundColor = '#d0ff0065';

    } else if (currentRoom === 3) { // happiness
        mainBG.style.background = "#e6b3cc";
        happinessContainer.style.border = '2px solid #aaee7c';
        happinessContainer.style.backgroundColor = '#d0ff0065';

    } else { // debug test for errors, can be deleted later
        mainBG.style.background = "#b44343";
    }
}

/* ==============================
    status bars functionality
============================== */
const updateHungerBar = () => {
    hungerBar.style.width = pet.hunger + '%';

    if (pet.hunger > 50) {
        hungerBar.style.background = '#a3db3a'
    } else if (pet.hunger > 25) {
        hungerBar.style.backgroundColor = '#d1ad37'
    } else {
        hungerBar.style.backgroundColor = '#fc4d47'
    }

    if (pet.hunger <= 0) {
        pet.hunger = 0;
    }
}

const updateEnergyBar = () => {
    energyBar.style.width = pet.energy + '%';

    if (pet.energy > 50) {
        energyBar.style.background = '#a3db3a'
    } else if (pet.hunger > 25) {
        energyBar.style.backgroundColor = '#d1ad37'
    } else {
        energyBar.style.backgroundColor = '#fc4d47'
    }

    if (pet.energy <= 0) {
        pet.energy = 0;
    }
}

const updateHappinessBar = () => {
    happinessBar.style.width = pet.happiness + '%';

    if (pet.happiness > 50) {
        happinessBar.style.background = '#a3db3a'
    } else if (pet.happiness > 25) {
        happinessBar.style.backgroundColor = '#d1ad37'
    } else {
        happinessBar.style.backgroundColor = '#fc4d47'
    }

    if (pet.happiness <= 0) {
        pet.happiness = 0;
    }
}



const updateStatusbars = () => {
    updateHungerBar();
    updateEnergyBar();
    updateHappinessBar();
}

/* =========================
    button functionality
========================= */
// multi-functional buttons based on UI
const pressedLeft = () => {
    if (currentRoom <= 1) {
        currentRoom = 3
    } else {
        currentRoom -= 1;
    }
    checkSelection();
}

const pressedRight = () => {
    if (currentRoom >= 3) {
        currentRoom = 1
    } else {
        currentRoom += 1;
    }
    checkSelection();
}

const pressedCenter = () => {
    if (currentRoom === 1) { // hunger
        if (pet.hunger >= 100){
            pet.hunger = 100;
        } else {
            pet.hunger += 20;
        }

    } else if (currentRoom === 2) { // energy
        if (pet.energy >= 100){
            pet.energy = 100;
        } else {
            pet.energy += 20;
        }
       
    } else if (currentRoom === 3) { // happiness
        if (pet.happiness >= 100){
            pet.happiness = 100;
        } else {
            pet.happiness += 20;
        }
        
    } else { // debug test for errors, can be deleted later
        
    }
    updateStatusbars();
}

btnLeft.addEventListener('click', pressedLeft);
btnCenter.addEventListener('click', pressedCenter);
btnRight.addEventListener('click', pressedRight);
/* ==============================
    clean start after refresh
============================== */
const init = () => {
    checkSelection();
    updateStatusbars();

    setInterval(() => { // temporary test timer.
        pet.hunger -= 5;
        pet.energy -= 5;
        pet.happiness -= 5;
        updateStatusbars();
    }, 2500);
}

init();