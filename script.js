/* =============================
    Variables & declarations
============================= */
const petMenu = document.getElementById('newPetMenu');
// status bar containers
const hungerContainer = document.getElementById('hungerWrapper');
const energyContainer = document.getElementById('energyWrapper');
const hygeneContainer = document.getElementById('hygeneWrapper');

// status bars
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const hygeneBar = document.getElementById('hygeneBar')
/*
const green = '#a3db3a';
const yellow = '#d4bd6f';
const red = '#fa6f6a';
*/
const green = '#000';
const yellow = '#000';
const red = '#000';

// main window
const mainBG = document.getElementById('homeSection');

// bottom buttons 
const btnLeft = document.getElementById('leftButton');
const btnCenter = document.getElementById('selectButton');
const btnRight = document.getElementById('rightButton');

// pet select menu
const leftArrow = document.getElementById('leftArrow');
const centerArrow = document.getElementById('centerArrow');
const rightArow = document.getElementById('rightArrow');

// status alerts
const bubbleWrapper = document.getElementById('bubbleWrapper');

const hungryBubble = document.getElementById('hungry');
const tiredBubble = document.getElementById('tired');
const dirtyBubble = document.getElementById('dirty');

//pet div
const petSprite = document.getElementById('petSprite');

/* selected room
1 = hunger
2 = energy
3 = hygene */
let currentRoom = 1;
let roomBG = {
    kicthen: "url('./assets/x.png')",
    bed: "url('./assets/y.png')",
    Shower: "url('./assets/z.png')"
}

// creatures (unused currently)
let petSpecies = {
    cat: "url('./assets/pet one sprites verbeterd.png')",
    dog: "",
    bunny: ""
}

let pet = {
    hunger:     80,
    energy:     80,
    hygene:     80,
    hungry:     false,
    tired:      false,
    dirty:      false,
    mood:       3, // 0 = run away, 1 = unhappy, 2 = neutral, 3 = happy
    age:        0,
    alive:      false,
    idle:       true,
    pose:       1,
    species:    '',
    name:       `unnamed`
}

let tick = 0;
let saveDate;
let currentDate = new Date();
let ToD = 'Daytime'
let clock = '00:00'

// animation values
let nextAnimGrid = 217;
// default idle
let idleX = -36; 
let idleY = -10;





let idleInterval = null;

/* ===============
    game State
=============== */
const saveToLocalStorage = () => {
    let petState = JSON.stringify(pet);
    saveDate = new Date();
    
    //localStorage.clear();

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
    let savedDate = localStorage.getItem('savedDate');
    if (savedDate === null) return;

    let oldSaveDate = new Date(savedDate);
    let currentTime = Date.now();
    let savedTime = oldSaveDate.getTime();

    let timeDifference = currentTime - savedTime;
    let catchUpSeconds = Math.floor(timeDifference / 1000);

    if (catchUpSeconds <= 0) return;

    pet.hunger -= catchUpSeconds;
    pet.energy -= catchUpSeconds;
    pet.hygene -= catchUpSeconds;

    pet.hunger = Math.max(0, pet.hunger);
    pet.energy = Math.max(0, pet.energy);
    pet.hygene = Math.max(0, pet.hygene);

    updateTime();
    updateUI();
    updatePet();

    console.log(`Caught up ${catchUpSeconds} seconds.`);
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

const togglePetSelect = () => {
    if (!pet.alive) {
        petMenu.classList.remove('hidden');
    } else {
        petMenu.classList.add('hidden');
    }
}

const newPet = () => {
    pet = {
        hunger:     80,
        energy:     80,
        hygene:     80,
        hungry:     false,
        tired:      false,
        dirty:      false,
        mood:       3,
        age:        0,
        alive:      true,
        anim:       'idle',
        pose:       1,
    }
}

/* ============
    Display
============ */
const idleAnim = () => {
    if (idleInterval !== null) return;

    idleInterval = setInterval(() => {
        if (!pet.alive) return;

        pet.pose = pet.pose === 1 ? 2 : 1;
        updatePet();
    }, 750);
}

const updateAnimation = () => {
    let x;
    let y;
    if (pet.anim === 'idle') {
        x = idleX;
    } else if (pet.anim === 'unhappy') {
        x = idleX + nextAnimGrid;
        y = idleY + nextAnimGrid;
    } else if (pet.anim === '') {

    } else if (pet.anim === '') {

    } else if (pet.anim === '') {

    } else if (pet.anim === '') {

    }
    

    if (pet.pose === 2) {
        x -= nextAnimGrid;
    }

    petSprite.style.backgroundPosition = `${x}px ${idleY}px`;
}

const updatePet = () => {
    if (!pet.alive) return;
    petSprite.style.backgroundImage = petSpecies.cat;
    
    if (pet.anim === 'idle') {
        updateAnimation();        
    } else if (pet.hungry) {
        console.log('hunger');
    } else if (pet.energy) {
        console.log('energy');
    } else if (pet.hygene) {
        console.log('hygene');
    } else {
        console.log('anim state not found');
    }
}

/* ======================
    core UI functions
====================== */
const checkSelection = () => { // add selection to status bars as well
    // clear all selections
    hungerContainer.classList.remove('selected');
    energyContainer.classList.remove('selected');
    hygeneContainer.classList.remove('selected');

    leftArrow.classList.add('hidden');
    centerArrow.classList.add('hidden');
    rightArow.classList.add('hidden');

    // mark current selected room
    if (currentRoom === 1) { // hunger
        mainBG.style.backgroundImage = roomBG.kicthen;
        hungerContainer.classList.add('selected');
        leftArrow.classList.remove('hidden');

    } else if (currentRoom === 2) { // energy
        mainBG.style.backgroundImage = roomBG.bed;
        energyContainer.classList.add('selected');
        centerArrow.classList.remove('hidden');

    } else if (currentRoom === 3) { // hygene
        mainBG.style.backgroundImage = roomBG.shower;
        hygeneContainer.classList.add('selected');
        rightArrow.classList.remove('hidden');
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
        pet.hygene -= 1;
    //}   

    updateTime();
    updateUI();
    updatePet();
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

const updateHygeneBar = () => {
    hygeneBar.style.width = pet.hygene + '%';
    pet.dirty = false;

    if (pet.hygene > 50) {
        hygeneBar.style.background = green;
    } else if (pet.hygene > 20) {
        hygeneBar.style.backgroundColor = yellow;
    } else {
        hygeneBar.style.backgroundColor = red;
        pet.dirty = true;
    }

    if (pet.hygene <= 0) {
        pet.hygene = 0;
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

    if (pet.dirty) {
        dirtyBubble.classList.remove('hidden');
        } else {
            dirtyBubble.classList.add('hidden');
    }
}

const updateStatusbars = () => {
    updateHungerBar();
    updateEnergyBar();
    updateHygeneBar();
}

const updateUI = () => {
    updateStatusbars();
    updateAlerts();
    checkSelection();
}

/* =======================
    player interaction
======================= */
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
        if (!pet.alive) {
            pet.species = 'cat';
            pet.name = 'cat name'

            pet.anim = 'idle';
            pet.pose = 1;
            updatePet();
        }

    } else if (currentRoom === 2) {
        pet.energy = Math.min(100, pet.energy + 20);
        if (!pet.alive) { 
            pet.species = 'TBD';
            console.log('not implemented yet');
            return;
        }

    } else if (currentRoom === 3) {
        pet.hygene = Math.min(100, pet.hygene + 20);
        if (!pet.alive) { 
            pet.species = 'TBD';
            console.log('not implemented yet');
            return;
        }
    }
    
    if (!pet.alive) {
        pet.alive = true;      
        togglePetSelect();
    } else { 
        updateStatusbars();
    }
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
    idleAnim();

    if (!pet.alive) {
        togglePetSelect();
    }
}

init();

// wiping local storage for debug
// hold center button for 5 seconds
isDown=false;
secondsToHold=5

btnCenter.addEventListener('mousedown', function(event) { 
    if (!isDown){
		isDown=true;
	    setTimeout(function() {
			if (isDown){
				localStorage.clear();
                console.log("localstorage wiped");

                pet = {
                    hunger:     80,
                    energy:     80,
                    hygene:     80,
                    mood:       3,
                    age:        0,
                    alive:      false,
                    idle:       true,
                    pose:       1,
                    name:       'unnamed'
                }

                saveToLocalStorage();
                togglePetSelect();
			}
		}, (secondsToHold*1000));
	}
});
btnCenter.addEventListener('mouseup', function(event) {
	isDown=false;  
})