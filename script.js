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
const rightArrow = document.getElementById('rightArrow');

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
    cat: "url('./assets/pet one sprites verbeterd (2 breed).png')",
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
    name:       `unnamed`,
    anim:       'idle'
}

let tick = 0;
let saveDate;
let currentDate = new Date();
let ToD = 'Daytime'
let clock = '00:00'

// animation values
let animOverride = false; // used to prevent mood changes during action animations
let nextAnimGrid = 225;
// default idle
let startX = -32;
let startY = -14;

let animInterval = null;

let deathFrame;
/* ===============
    game State
=============== */
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
    }

    try {
        pet = JSON.parse(petState);
    } catch (error) {
        console.error('Bad petState in localStorage:', petState);
        localStorage.removeItem('petState');
        return;
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
    updateMood();

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
    return {
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
        species:    '',
        name:       'unnamed'
    };
}

const updateMood = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    if (pet.hunger == 0 || pet.energy == 0 || pet.hygene == 0) {
        pet.alive = false;
        deathFrame = 1;
        pet.mood = 0;

        clearInterval(animInterval);
        animInterval = null;
        
        petSprite.style.backgroundImage = "url('./assets/mametchi dying (6 lang).png')";
        runner(10);
        
    } else if (pet.hunger < 20 || pet.energy < 20 || pet.hygene < 20) {
        pet.mood = 1;
        pet.anim = 'unhappy';
    } else if (pet.hunger < 50 || pet.energy < 50 || pet.hygene < 50) {
        pet.mood = 2;
        pet.anim = 'idle';
    } else {
        pet.mood = 3;
        pet.anim = 'happy';
    }
}

const graduallyIncrease = (statName, updateBarFunction) => {
    let amountAdded = 0;

    const interval = setInterval(() => {
        pet[statName] = Math.min(100, pet[statName] + 1);
        updateBarFunction();

        amountAdded++;

        if (amountAdded >= 10 || pet[statName] >= 100) {
            clearInterval(interval);
        }
    }, 500);
};

const petFeeding = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    pet.anim = 'eating';
    animOverride = true;

    graduallyIncrease('hunger', updateHungerBar);

    setTimeout(() => {
        animOverride = false;
    }, 5000);
}

const petBathing = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    pet.anim = 'bathing';
    animOverride = true;

    graduallyIncrease('hygene', updateHygeneBar);

    setTimeout(() => {
        animOverride = false;
    }, 5000);
}

const petSleeping = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    pet.anim = 'sleeping';
    animOverride = true;

    graduallyIncrease('energy', updateEnergyBar);

    setTimeout(() => {
        animOverride = false;
    }, 5000);
}

/* ============
    Display
============ */
const petAnim = () => {
    if (animInterval !== null) return;

    animInterval = setInterval(() => {
        if (!pet.alive) return;

        pet.pose = pet.pose === 1 ? 2 : 1;
        updatePet();
    }, 750);
}

const updateAnimation = () => {
    if (!pet.alive) return;

    let x = startX;
    let y = startY;

    if (pet.anim === 'idle') {
        y = startY;
    } else if (pet.anim === 'happy') {
        y = startY - nextAnimGrid;
    } else if (pet.anim === 'unhappy') {
        y = startY - nextAnimGrid * 2;
    } else if (pet.anim === 'eating') {
        y = startY - nextAnimGrid * 3;
    } else if (pet.anim === 'bathing') {
        y = startY - nextAnimGrid * 4;
    } else if (pet.anim === 'sleeping') {
        y = startY - nextAnimGrid * 5;
    }

    if (pet.pose === 2) {
        x -= nextAnimGrid;
    }

    petSprite.style.backgroundPosition = `${x}px ${y}px`;
}

const updatePet = () => {
    if (!pet.alive) return;
    petSprite.style.backgroundImage = petSpecies.cat;
    updateAnimation();       
}

function runner(repeats) {
    if (repeats > 0) {
        playDeathAnim();
        setTimeout(() => runner(repeats - 1), 750);
    }
}

// death animation sequence
const deathFrames = [
    [startX, startY],                           // frame 1
    [startX, startY - nextAnimGrid],            // frame 2
        // repeat frame 1 & 2 twice
    [startX, startY],
    [startX, startY - nextAnimGrid],

    [startX, startY], 
    [startX, startY - nextAnimGrid],

    [startX - nextAnimGrid, startY],             // frame 3
    [startX - nextAnimGrid, startY - nextAnimGrid], // frame 4
    [startX, startY - nextAnimGrid * 2],         // frame 5
    [startX - nextAnimGrid, startY - nextAnimGrid * 2] // frame 6
];

// edit the above array to change animation sequence
const playDeathAnim = () => {
    const frame = deathFrames[deathFrame - 1] ?? deathFrames[deathFrames.length - 1];

    const x = frame[0];
    const y = frame[1];

    petSprite.style.backgroundPosition = `${x}px ${y}px`;

    if (deathFrame < deathFrames.length) {
        deathFrame += 1;
    }
};

// test death anim
addEventListener("keydown", function(event) {
    if (event.key === "x" || event.key === "X") {
        pet.alive = false;
        clearInterval(animInterval);
        animInterval = null;
        deathFrame = 1;

        petSprite.style.backgroundImage = "url('./assets/mametchi dying (6 lang).png')";
        runner(10);
    }
});

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
    rightArrow.classList.add('hidden');

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

    if (tick % 300 === 0) { // every 5 minutes
        pet.hunger -= 1;
    }

    if (tick % 180 === 0) { // every 3 minutes
        pet.energy -= 1;
    }

    if (tick % 240 === 0) { // every 4 minutes
        pet.hygene -= 1;
    }   

    updateTime();
    updateUI();
    updatePet();
    updateMood();
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
        if (!pet.alive) {

            pet = newPet();
            pet.species = 'cat';
            pet.name = 'Mametchi'
            
            pet.anim = 'idle';
            pet.pose = 1;
            petAnim();
            updatePet();
            togglePetSelect();

            return;
        }
        petFeeding();
        

    } else if (currentRoom === 2) {
        if (!pet.alive) { 
            pet.species = 'TBD';
            console.log('not implemented yet');
            return;
        }
        petSleeping();

    } else if (currentRoom === 3) {
        if (!pet.alive) { 
            pet.species = 'TBD';
            console.log('not implemented yet');
            return;
        }
        petBathing();
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
    petAnim();
    updateMood();

    if (!pet.alive) {
        togglePetSelect();
    }
}

init();

/* wiping local storage for debug
hold center button for 5 seconds
temporarily disable regular click */

(function() {
    let mouseTimer;
    let longPressFired = false;
    
    function mouseDown() { 
        longPressFired = false;
        mouseUp();
        mouseTimer = window.setTimeout(execMouseDown, 2000);
    }

    function mouseUp() { 
        if (mouseTimer) window.clearTimeout(mouseTimer);
    }

    function blockClickAfterHold(e) {
        if (longPressFired) {
            e.preventDefault();
            e.stopImmediatePropagation();
            longPressFired = false;
            return;
        }

        pressedCenter();
    }

    function execMouseDown() { 
        longPressFired = true;

        localStorage.clear();
        console.log("localstorage wiped");

        pet = {
            hunger: 80,
            energy: 80,
            hygene: 80,
            mood: 3,
            age: 0,
            alive: false,
            idle: true,
            pose: 1,
            name: 'unnamed'
        };

        saveToLocalStorage();
        togglePetSelect();
    }

    btnCenter.removeEventListener('click', pressedCenter);
    btnCenter.addEventListener('click', blockClickAfterHold);

    btnCenter.addEventListener("mousedown", mouseDown);
    document.body.addEventListener("mouseup", mouseUp); 
}());

