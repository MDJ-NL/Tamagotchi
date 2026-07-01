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

// pet div
const petWrapper = document.getElementById('petWrapper');
const petSprite = document.getElementById('petSprite');

// logs
const clockDisplay = document.getElementById('clock');
const logWindow = document.getElementById('eventLog');
const logBtn = document.getElementById('logBtn');

// options menu
const menuBtn = document.getElementById('optionBtn');
const optionsPanel = document.getElementById('options');

// draggable panels
let draggingOptions = false;
let draggingLog = false;

let dragOffsetX = 0;
let dragOffsetY = 0;
let logDragOffsetX = 0;
let logDragOffsetY = 0;

const restorePanelPosition = (panel, storageKeyX, storageKeyY) => {
    const savedX = localStorage.getItem(storageKeyX);
    const savedY = localStorage.getItem(storageKeyY);

    if (savedX !== null && savedY !== null) {
        panel.style.position = 'fixed';
        panel.style.left = savedX + 'px';
        panel.style.top = savedY + 'px';
        panel.style.right = 'auto';
        panel.style.bottom = 'auto';
    }
};

const isMobileView = () => window.matchMedia('(max-width: 500px)').matches;

const preparePanelForDrag = (panel) => {
    const rect = panel.getBoundingClientRect();

    panel.style.position = 'fixed';
    panel.style.left = rect.left + 'px';
    panel.style.top = rect.top + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';

    return rect;
};

restorePanelPosition(optionsPanel, 'optionsX', 'optionsY');
restorePanelPosition(logWindow, 'eventLogX', 'eventLogY');

const test = () => {
    console.log('tested');
}

// egg shellcolor
const eggshell = document.getElementById('st1');

document.getElementById('blue').addEventListener('click', (event) => frameColor('blue', event));
document.getElementById('green').addEventListener('click', (event) => frameColor('green', event));
document.getElementById('yellow').addEventListener('click', (event) => frameColor('yellow', event));
document.getElementById('orange').addEventListener('click', (event) => frameColor('orange', event));
document.getElementById('purple').addEventListener('click', (event) => frameColor('purple', event));
document.getElementById('red').addEventListener('click', (event) => frameColor('red', event));

// inner shell color
const innerEgg = document.getElementById('cls-1');

document.getElementById('blue2').addEventListener('click', (event) => innerShellColor('blue2', event));
document.getElementById('green2').addEventListener('click', (event) => innerShellColor('green2', event));
document.getElementById('yellow2').addEventListener('click', (event) => innerShellColor('yellow2', event));
document.getElementById('orange2').addEventListener('click', (event) => innerShellColor('orange2', event));
document.getElementById('purple2').addEventListener('click', (event) => innerShellColor('purple2', event));
document.getElementById('red2').addEventListener('click', (event) => innerShellColor('red2', event));

document.getElementById('resetColors').addEventListener('click', resetColors);

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
let animInterval = null;
let deathFrame;

/* =========================
    Sprite logic only
========================= */

const liveSpriteConfig = {
    columns: 2,
    rows: 6,
    zoom: 1.12
};

const deathSpriteConfig = {
    columns: 2,
    rows: 6,
    zoom: 1.12
};

const animationRows = {
    idle: 0,
    happy: 1,
    unhappy: 2,
    eating: 3,
    bathing: 4,
    sleeping: 5
};

const deathFrames = [
    [0, 0], // frame 1
    [0, 1], // frame 2
            // repeated twice
    [0, 0],
    [0, 1],

    [0, 0],
    [0, 1],

    [1, 0], // frame 3
    [1, 1], // frame 4
    [0, 2], // frame 5
    [1, 2]  // frame 6
];

const setPetWrapperSize = () => {
    petWrapper.style.width = 'clamp(100px, 12vmin, 135px)';
    petWrapper.style.height = 'clamp(100px, 12vmin, 135px)';
};

const setSpriteFrame = (column, row, config) => {
    setPetWrapperSize();

    const frameSize = petWrapper.offsetWidth;
    const scaledFrame = frameSize * config.zoom;
    const cropOffset = (scaledFrame - frameSize) / 2;

    petSprite.style.width = '100%';
    petSprite.style.height = '100%';
    petSprite.style.backgroundRepeat = 'no-repeat';
    petSprite.style.backgroundSize =
        `${config.columns * config.zoom * 100}% ${config.rows * config.zoom * 100}%`;

    const x = -(column * scaledFrame + cropOffset);
    const y = -(row * scaledFrame + cropOffset);

    petSprite.style.backgroundPosition = `${x}px ${y}px`;
};

const updateAnimation = () => {
    if (!pet.alive) return;

    const row = animationRows[pet.anim] ?? animationRows.idle;
    const column = pet.pose === 2 ? 1 : 0;

    setSpriteFrame(column, row, liveSpriteConfig);
};

const updatePet = () => {
    if (!pet.alive) return;

    petSprite.style.backgroundImage = petSpecies.cat;
    updateAnimation();
};

const renderDeathFrame = () => {
    const frame = deathFrames[deathFrame - 1] ?? deathFrames[deathFrames.length - 1];

    const column = frame[0];
    const row = frame[1];

    setSpriteFrame(column, row, deathSpriteConfig);
};

const playDeathAnim = () => {
    renderDeathFrame();

    if (deathFrame < deathFrames.length) {
        deathFrame += 1;
    }
};

const startDeathAnimation = () => {
    if (!pet.alive && deathFrame !== undefined) return;

    pet.alive = false;
    deathFrame = 1;

    clearInterval(animInterval);
    animInterval = null;

    petSprite.style.backgroundImage = "url('./assets/mametchi dying (6 lang).png')";
    
    logEntry(`${pet.name} has died...`);
    runner(deathFrames.length);
};

window.addEventListener('resize', () => {
    setPetWrapperSize();

    if (pet.alive) {
        updateAnimation();
    } else if (deathFrame !== undefined) {
        renderDeathFrame();
    }
});

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
    let innerColor = localStorage.getItem('innerColor');
    let frameColor = localStorage.getItem('frameColor');

    eggshell.style.fill = "var(--" + frameColor +")";
    innerEgg.style.fill = "var(--" + innerColor +")";

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
    let catchUpMinutes = Math.floor(catchUpSeconds / 60);
    let catchUpHours = Math.floor(catchUpMinutes / 60);
    let catchUpTimeString = `${catchUpHours}h ${catchUpMinutes % 60}m ${catchUpSeconds % 60}s`;

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

    logEntry(`Caught up, player has been away for ${catchUpTimeString}`)
}

const updateTime = () => {
    currentDate = new Date();
    let timeOfDay = currentDate.toTimeString();

    let currentMinute = parseInt(timeOfDay.slice(3, 5));
    let currentHour = parseInt(timeOfDay.slice(0, 2));
    clock = timeOfDay.slice(0, 5);

    // Debug number
    //currentHour += 8;
    //currentMinute = 35;

    // time of day
    if (currentHour >= 6 && currentHour <= 12) {
        ToD = 'Morning';
    } else if (currentHour > 12 && currentHour <= 18) {
        ToD = 'Day';
    } else if (currentHour > 18 && currentHour <= 21) {
        ToD = 'Evening';
    } else {
        ToD = 'Night';
    }

    // background color cycle
   if (currentHour == 5 && currentMinute >= 30) {
        document.body.style.backgroundColor = "var(--" + 'tod-dawn' +")";
   } else if (currentHour == 6 && currentMinute >= 30) {
        document.body.style.backgroundColor = "var(--" + 'tod-day' +")";
   } else if (currentHour == 19 && currentMinute >= 30) {
        document.body.style.backgroundColor = "var(--" + 'tod-dusk' +")";
   } else if (currentHour == 20 && currentMinute >= 30) {
        document.body.style.backgroundColor = "var(--" + 'tod-night' +")";
   }
    
    clockDisplay.innerText = `${clock} ${ToD}`;

    // debug time log
    console.log(`It's ${ToD} - Time:${clock} - ${currentMinute}`);
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
        pet.mood = 0;
        startDeathAnimation();
        
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

        if (amountAdded >= 20 || pet[statName] >= 100) {
            clearInterval(interval);
        }
    }, 250);
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

function runner(repeats) {
    if (repeats > 0) {
        playDeathAnim();
        setTimeout(() => runner(repeats - 1), 750);
    }
}

// test death anim
addEventListener("keydown", function(event) {
    if (event.key === "x" || event.key === "X") {
        startDeathAnimation();
    }
});


const toggleLog = () => {
    if (logWindow.classList.contains('hidden')) {
        logWindow.classList.remove('hidden');
    } else {
        logWindow.classList.add('hidden');
    }
}
logBtn.addEventListener('click', toggleLog);

function logEntry(entry) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('logEntry');
    newDiv.innerHTML = `<p>${entry}</p> <p class="timestamp">${clock}</p>`;
    logWindow.appendChild(newDiv);

    if (logWindow.children.length > 10) {
        logWindow.firstElementChild.remove();
    }

    localStorage.setItem('eventLog', logWindow.innerHTML);
}

// Options menu
const toggleOptions = () => {
    if (optionsPanel.classList.contains('hidden')) {
        optionsPanel.classList.remove('hidden');
    } else {
        optionsPanel.classList.add('hidden');
    }
}

menuBtn.addEventListener('click', toggleOptions);

// color selector
function frameColor(selection, event) {
    eggshell.style.fill = "var(--" + selection +")";
    localStorage.setItem('frameColor', selection);

    let colors = document.getElementsByClassName('color');
    colors = Array.from(colors);

    colors.forEach(element => {
        element.style.border = "1px #dbdad7 solid";
    });

    event.target.style.border = "1px #000 solid";
}

function innerShellColor(selection, event) {
    innerEgg.style.fill = "var(--" + selection +")";
    localStorage.setItem('innerColor', selection);

    let colors = document.getElementsByClassName('color2');
    colors = Array.from(colors);

    colors.forEach(element => {
        element.style.border = "1px #dbdad7 solid";
    });

    event.target.style.border = "1px #000 solid";
}

function resetColors() {
    eggshell.style.fill = "#f8b85b";
    innerEgg.style.fill = "#335ca7";

    localStorage.setItem('frameColor', "#f8b85b");
    localStorage.setItem('innerColor', "#335ca7");
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
            
            logEntry(`New pet selected, ${pet.name} (${pet.species})`)
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

// options panel drag logic
optionsPanel.addEventListener('mousedown', (event) => {
    if (isMobileView()) return;

    event.preventDefault();

    // prevent drag on color buttons
    if (
        event.target.classList.contains('color') ||
        event.target.classList.contains('color2') ||
        event.target.id === 'resetColors'
    ) {
        return;
    }

    const rect = preparePanelForDrag(optionsPanel);

    draggingOptions = true;
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;
});

// event log drag logic
logWindow.addEventListener('mousedown', (event) => {
    if (isMobileView()) return;

    event.preventDefault();

    const rect = preparePanelForDrag(logWindow);

    draggingLog = true;
    logDragOffsetX = event.clientX - rect.left;
    logDragOffsetY = event.clientY - rect.top;
});

document.addEventListener('mousemove', (event) => {
    if (draggingOptions) {
        optionsPanel.style.left =
            (event.clientX - dragOffsetX) + 'px';

        optionsPanel.style.top =
            (event.clientY - dragOffsetY) + 'px';
    }

    if (draggingLog) {
        logWindow.style.left =
            (event.clientX - logDragOffsetX) + 'px';

        logWindow.style.top =
            (event.clientY - logDragOffsetY) + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (draggingOptions) {
        draggingOptions = false;

        localStorage.setItem(
            'optionsX',
            optionsPanel.offsetLeft
        );

        localStorage.setItem(
            'optionsY',
            optionsPanel.offsetTop
        );
    }

    if (draggingLog) {
        draggingLog = false;

        localStorage.setItem(
            'eventLogX',
            logWindow.offsetLeft
        );

        localStorage.setItem(
            'eventLogY',
            logWindow.offsetTop
        );
    }
});

/* ===============
    first load
=============== */
const init = () => {
    tick = 0;
    setPetWrapperSize();
    loadFromLocalstorage();
    updateUI();
    setInterval(gameLoop, 1000);
    setInterval(saveToLocalStorage, 300000); // 5min periodic save
    petAnim();
    updateMood();
    logWindow.innerHTML = localStorage.getItem('eventLog') || '';

    if (!pet.alive) {
        togglePetSelect();
    }
}

init();