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
const happinessBar = document.getElementById('happinessBar')
/*
const green = '#a3db3a';
const yellow = '#d4bd6f';
const red = '#fa6f6a';
*/
const green = '#000';
const yellow = '#000';
const red = '#000';

// main window
const mainBG = document.getElementById('homeSection')

// bottom buttons 
const btnLeft = document.getElementById('previousRoom');
const btnCenter = document.getElementById('selectButton');
const btnRight = document.getElementById('nextRoom');

// status alerts
const bubbleWrapper = document.getElementById('bubbleWrapper');

const hungryBubble = document.getElementById('hungry');
const tiredBubble = document.getElementById('tired');
const unhappyBubble = document.getElementById('unhappy');

/* ==============
    Gamestate
============== */
/* selected room
1 = hunger
2 = energy
3 = happiness */
let currentRoom = 1;
const feedRoom = '#adccdf';
const bedRoom = '#addb79';
const playRoom = '#e6b3cc';
// creatures (unused currently)
let petSpecies = ['cat', 'dog', 'bunny'] // more added later?

let pet = {
    hunger: 80,
    energy: 80,
    happiness: 80,
    hungry: false,
    tired: false,
    unhappy: false,
    mood: 3, // 0 = run away, 1 = unhappy, 2 = neutral, 3 = happy
    age: 0,
    alive: true,
    name: 'placeholderName'
}

let tick = 0;
let saveDate;
let currentDate = new Date();
let ToD = 'Daytime'
let clock = '00:00'

/* ==================
    game State
================== */
const saveToLocalStorage = () => {
    let petState = JSON.stringify(pet);
    saveDate = new Date();

    localStorage.setItem('petState', petState);
    localStorage.setItem('savedDate', saveDate);
}

// save gamestate on exit
window.onbeforeunload = function () {
   saveToLocalStorage();
}

const loadFromLocalstorage = () => {
    let petState = localStorage.getItem('petState');

    if (petState === null) {
        return;
    } else {
        pet = JSON.parse(petState);
    }

    catchUpGameState();
    updateUI();
}

const catchUpGameState = () => {
    let oldSaveDate = new Date(localStorage.getItem('savedDate'));

    if (oldSaveDate === '') return;

    let currentTime = currentDate.getTime();
    let savedTime = oldSaveDate.getTime();

    let timeDifference = currentTime - savedTime;

    // convert to seconds and round down
    let catchUpSeconds = Math.floor(timeDifference / 1000);

    for (let i = 0; i < catchUpSeconds; i++) {
        gameLoop();
    }

    const notification = new Notification('Page status', {
        body: `It has been ${Math.floor(catchUpSeconds / 60)} minutes since your last visit. Please take good care of ${pet.name}!`
    });
}

const updateTime = () => {
    currentDate = new Date();
    let timeOfDay = currentDate.toTimeString();

    let currentHour = parseInt(timeOfDay.slice(0, 2));
    clock = timeOfDay.slice(0, 5);

    // currentHour += 8; // Debug number

    if (currentHour >= 6 && currentHour <= 18) {
        ToD = 'Daytime';
    } else if (currentHour <= 22) {
        ToD = 'Evening';
    } else {
        ToD = 'Nighttime';
    }
    console.log(`It's ${ToD} - Time:${currentHour}`);
}

/* ======================
    core UI functions
====================== */
const checkSelection = () => { // add selection to status bars as well
    // clear all selections
    hungerContainer.classList.remove('selected');
    energyContainer.classList.remove('selected');
    happinessContainer.classList.remove('selected');

    // mark current selected room
    if (currentRoom === 1) { // hunger
        //mainBG.style.background = feedRoom;
        hungerContainer.classList.add('selected');

    } else if (currentRoom === 2) { // energy
        //mainBG.style.background = bedRoom;
        energyContainer.classList.add('selected');

    } else if (currentRoom === 3) { // happiness
        //mainBG.style.background = playRoom;
        happinessContainer.classList.add('selected');

    } else { // debug test for errors, can be deleted later
        mainBG.style.background = "#b44343";
    }
}

function gameLoop() {
    tick++;

    if (!pet.alive) return;

    //if (tick % 300 === 0) { // every 5 minutes
        pet.hunger -= 1;
    //}

    //if (tick % 180 === 0) { // every 3 minutes
        pet.energy -= 1;
    //}

    //if (tick % 240 === 0) { // every 4 minutes
        pet.happiness -= 1;
    //}   

    updateTime();
    updateUI();
}

/* ==============================
    status bars functionality
============================== */
const updateHungerBar = () => {
    hungerBar.style.width = pet.hunger + '%';
    pet.hungry = false;

    if (pet.hunger > 50) {
        hungerBar.style.background = green;
    } else if (pet.hunger > 20) {
        hungerBar.style.backgroundColor = yellow;
    } else {
        hungerBar.style.backgroundColor = red;
        pet.hungry = true;
    }
    
    if (pet.hunger <= 0) {
        pet.hunger = 0;
    }
}

const updateEnergyBar = () => {
    energyBar.style.width = pet.energy + '%';
    pet.tired = false;

    if (pet.energy > 50) {
        energyBar.style.background = green;
    } else if (pet.energy > 20) {
        energyBar.style.backgroundColor = yellow;
    } else {
        energyBar.style.backgroundColor = red;
        pet.tired = true;
    }

    if (pet.energy <= 0) {
        pet.energy = 0;
    }
}

const updateHappinessBar = () => {
    happinessBar.style.width = pet.happiness + '%';
    pet.unhappy = false;

    if (pet.happiness > 50) {
        happinessBar.style.background = green;
    } else if (pet.happiness > 20) {
        happinessBar.style.backgroundColor = yellow;
    } else {
        happinessBar.style.backgroundColor = red;
        pet.unhappy = true;
    }

    if (pet.happiness <= 0) {
        pet.happiness = 0;
    }
}

const updateAlerts = () => {
    if (pet.hungry) {
        hungryBubble.classList.remove('hidden');
        } else {
            hungryBubble.classList.add('hidden');
    }

     if (pet.tired) {
        tiredBubble.classList.remove('hidden');
        } else {
            tiredBubble.classList.add('hidden');
    }

    if (pet.unhappy) {
        unhappyBubble.classList.remove('hidden');
        } else {
            unhappyBubble.classList.add('hidden');
    }
}

const updateStatusbars = () => {
    updateHungerBar();
    updateEnergyBar();
    updateHappinessBar();
}

const updateUI = () => {
    updateStatusbars();
    updateAlerts();
    checkSelection();
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
    if (currentRoom === 1) {
        pet.hunger = Math.min(100, pet.hunger + 20);

    } else if (currentRoom === 2) {
        pet.energy = Math.min(100, pet.energy + 20);

    } else if (currentRoom === 3) {
        pet.happiness = Math.min(100, pet.happiness + 20);
    }

    updateStatusbars();
}

btnLeft.addEventListener('click', pressedLeft);
btnCenter.addEventListener('click', pressedCenter);
btnRight.addEventListener('click', pressedRight);
/* ===============
    first load
=============== */
const init = () => {
    tick = 0;
    loadFromLocalstorage();
    updateUI();
    setInterval(gameLoop, 1000);
    setInterval(saveToLocalStorage, 300000); // 5min periodic save
}

init();