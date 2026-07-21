/* =============================
    Variables & declarations
============================= */
const petMenu = document.getElementById('newPetMenu');
const screenLabel = document.getElementById('screenLabel');
const buttonMount = document.getElementById('MaingameButtonsSection');
const petNameDisplay = document.getElementById('petNameDisplay');

const screenElements = {
    home: document.getElementById('MainMenu'),
    care: document.getElementById('gameSection'),
    games: document.getElementById('gamesMenu'),
    game1: document.getElementById('game1Screen'),
    game2: document.getElementById('game2Screen'),
    game3: document.getElementById('game3Screen')
};

const screenNames = {
    home: 'Home',
    care: 'Care',
    games: 'Mini-games',
    game1: 'Block Drop',
    game2: 'Game 2',
    game3: 'Game 3'
};

// Top-level menu order: Care <- Home -> Mini-games
const menuScreens = ['care', 'home', 'games'];
let selectedMenuIndex = 1;
let activeScreen = 'home';

// status bar containers
const hungerContainer = document.getElementById('hungerWrapper');
const energyContainer = document.getElementById('energyWrapper');
const hygeneContainer = document.getElementById('hygeneWrapper');

// status bars
const hungerBar = document.getElementById('hungerBar');
const energyBar = document.getElementById('energyBar');
const hygeneBar = document.getElementById('hygeneBar');

const generalMoodBars = document.querySelectorAll('.generalMoodBar');
const generalMoodValues = document.querySelectorAll('.generalMoodValue');

const green = '#000';
const yellow = '#000';
const red = '#000';

// care room background
const mainBG = document.getElementById('homeSection');

// pet select menu arrows
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

// mini-game display
const gameCards = document.querySelectorAll('.gameCard');
const gameMessage = document.getElementById('gameMessage');

const miniGameScreens = ['game1', 'game2', 'game3'];

const miniGameStatus = {
    game1: document.getElementById('game1Status'),
    game2: document.getElementById('game2Status'),
    game3: document.getElementById('game3Status')
};

/*========================
 minigame declarations
 ====================== */
const game1Window = document.getElementById('game1Container');
const game1MainMenu = document.getElementById('game1MainMenu');
const game1Playfield = document.getElementById('game1Playfield');
const game1Player = document.getElementById('g1Player');
const game1ScoreDisplay = document.getElementById('game1Score');
const game1MissesDisplay = document.getElementById('game1Misses');
const game1HighScoreDisplay = document.getElementById('game1HighScore');
const game1GameOver = document.getElementById('game1GameOver');
const game1FinalScore = document.getElementById('game1FinalScore');

let game1Active = false;
let game2Active = false;
let game3Active = false;

let game1CurrentScore = 0;
let game1HighScore = Number(localStorage.getItem('game1HighScore')) || 0;
let game1Misses = 0;
let game1PlayerLane = 1;
let game1AnimationFrame = null;
let game1LastFrameTime = 0;
let game1SpawnTimer = 0;
let game1FallingBlocks = [];
 
// status alerts
const bubbleWrapper = document.getElementById('bubbleWrapper');

const hungryBubble = document.getElementById('hungry');
const tiredBubble = document.getElementById('tired');
const dirtyBubble = document.getElementById('dirty');

// pet sprites
const petWrapper = document.getElementsByClassName('petWrapper');
const petSprite = document.getElementsByClassName('petSprite');
const previewSprite = document.getElementsByClassName('previewSprite');

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

const isMobileView = () => window.matchMedia('(max-width: 500px)').matches;

const restorePanelPosition = (panel, storageKeyX, storageKeyY) => {
    if (isMobileView()) return;

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

const preparePanelForDrag = (panel) => {
    const rect = panel.getBoundingClientRect();

    panel.style.position = 'fixed';
    panel.style.left = rect.left + 'px';
    panel.style.top = rect.top + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';

    return rect;
};

// if windowi so ut of view

restorePanelPosition(optionsPanel, 'optionsX', 'optionsY');
restorePanelPosition(logWindow, 'eventLogX', 'eventLogY');

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
let selectedPet = 1;
const roomBG = {
    kitchen: "url('./assets/x.png')",
    bed: "url('./assets/y.png')",
    shower: "url('./assets/z.png')"
};

// creature spirtes & names
const petSpecies = {
    Eggs: {
        Egg1: {
            sprite: "./assets/new sprites/upscaled/babies/Hatching_Baby_Babytchi.webp",
            name: "Unborn Babytchi"
        },
        Egg2: {
            sprite: "./assets/new sprites/upscaled/babies/Hatching_Baby_Shirobabytchi.webp",
            name: "Unborn Shirobabytchi"
        }
    },
    Babies: { 
        Babytchi: { // > Tonmuratchi
            sprite: "./assets/new sprites/upscaled/babies/Baby_Babytchi.webp",
            name: "Babytchi"
        },
        Shirobabytchi: { // >  Muratchi
            sprite: "./assets/new sprites/upscaled/babies/Baby_Shirobabytchi.webp",
            name: "Shirobabytchi"
        }
    },
    Children: { 
        Marutchi: { // > Hasitamatchi & Kuchitamatchi
            sprite: "./assets/new sprites/upscaled/children/Child_Marutchi.webp",
            name: "Marutchi"
        },
        Tonmarutchi: { // > Tongaritchi & Tamatchi
            sprite: "./assets/new sprites/upscaled/children/Child_Tonmarutchi.webp",
            name: "Tonmarutchi"
        }
    },
    Teens: {
        Tamatchi: { // > Mametchi & Nyatchi
            sprite: "./assets/new sprites/upscaled/teens/Teen_Tamatchi.webp",
            name: "Tamatchi"
        },
        Hasitamatchi: { // > Ginjirotchi & Kusatchi
            sprite: "./assets/new sprites/upscaled/teens/Teen_Hashitamatchi.webp",
            name: "Hasitamatchi"
        },
        Kuchitamatchi: { // > Kuchipatchi & Nyorotchi
            sprite: "./assets/new sprites/upscaled/teens/Teen_Kuchitamatchi.webp",
            name: "Kuchitamatchi"
        },
        Tongaritchi: { // > Pochitchi & Mimitchi
            sprite: "./assets/new sprites/upscaled/teens/Teen_Tongaritchi.webp",
            name: "Tongaritchi"
        }
    },
    Adults: {
        Mametchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Mametchi.webp",
            name: "Mametchi"
        },
        Mimitchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Mimitchi.webp",
            name: "Mimitchi"
        },
        Kusatchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Kusatchi.webp",
            name: "Kusatchi"
        },
        Kuchipatchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Kuchipatchi.webp",
            name: "Kuchipatchi"
        },
        Ginjirotchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Ginjirotchi.webp",
            name: "Ginjirotchi"
        },
        Nyatchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adult_Nyatchi.webp",
            name: "Nyatchi"
        },
        Nyorotchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adults_Nyorotchi.webp",
            name: "Nyorotchi"
        },
        Pochitchi: {
            sprite: "./assets/new sprites/upscaled/adults/Adults_Pochitchi.webp",
            name: "Pochitchi"
        }
    }
}

const findPetSprite = (species) => {
    if (!species) return null;

    const wantedSpecies = String(species).toLowerCase();

    for (const group of Object.values(petSpecies)) {
        for (const [speciesKey, speciesData] of Object.entries(group)) {
            const matchesKey = speciesKey.toLowerCase() === wantedSpecies;
            const matchesName = speciesData.name.toLowerCase() === wantedSpecies;

            if (matchesKey || matchesName) {
                return speciesData.sprite;
            }
        }
    }

    return null;
};

// default fallback
let newPetSprite = petSpecies.Adults.Mametchi.sprite;

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
    Sprite logic
========================= */

// Normal target size is 90-135px. On a very small screen the wrapper is
// allowed to shrink below 90px so it never spills outside the Tamagotchi LCD.
const spriteSizeConfig = {
    min: 90,
    max: 135,
    viewportScale: 0.12
};

const standardLiveSpriteConfig = {
    columns: 2,
    rows: 6,
    zoom: 1.12,
    animationRows: {
        idle: 0,
        happy: 1,
        unhappy: 2,
        eating: 3,
        bathing: 4,
        sleeping: 5
    }
};

// Hashitamatchi is the one differently arranged sheet: 2 columns x 5 rows.
// The original image remains untouched. Its last row is sleeping, and because
// it has no separate bathing row, bathing falls back to the idle row.
const hashitamatchiSpriteConfig = {
    columns: 2,
    rows: 5,
    zoom: 1.12,
    animationRows: {
        idle: 0,
        happy: 1,
        unhappy: 2,
        eating: 3,
        bathing: 0,
        sleeping: 4
    }
};

const isHashitamatchiSheet = () => {
    return String(newPetSprite)
        .replaceAll('\\', '/')
        .toLowerCase()
        .endsWith('/teen_hashitamatchi.webp');
};

const getLiveSpriteConfig = () => {
    return isHashitamatchiSheet()
        ? hashitamatchiSpriteConfig
        : standardLiveSpriteConfig;
};

const getDeathSpriteConfig = () => {
    const liveConfig = getLiveSpriteConfig();

    return {
        columns: liveConfig.columns,
        rows: liveConfig.rows,
        zoom: liveConfig.zoom
    };
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

const clampNumber = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
};

const getBoxSpacing = (style, sideA, sideB) => {
    const firstValue = Number.parseFloat(style[sideA]) || 0;
    const secondValue = Number.parseFloat(style[sideB]) || 0;

    return firstValue + secondValue;
};

const getOuterHeight = (element) => {
    const style = getComputedStyle(element);

    if (style.display === 'none' || style.position === 'absolute' || style.position === 'fixed') {
        return 0;
    }

    return element.getBoundingClientRect().height +
        getBoxSpacing(style, 'marginTop', 'marginBottom');
};

const getAvailableSquareSize = (wrapper) => {
    const parent = wrapper.parentElement;

    if (!parent || parent.clientWidth === 0 || parent.clientHeight === 0) {
        return 0;
    }

    const parentStyle = getComputedStyle(parent);
    const wrapperStyle = getComputedStyle(wrapper);

    const parentContentWidth = parent.clientWidth -
        getBoxSpacing(parentStyle, 'paddingLeft', 'paddingRight');

    const parentContentHeight = parent.clientHeight -
        getBoxSpacing(parentStyle, 'paddingTop', 'paddingBottom');

    const wrapperHorizontalSpace = getBoxSpacing(
        wrapperStyle,
        'marginLeft',
        'marginRight'
    );

    const wrapperVerticalSpace = getBoxSpacing(
        wrapperStyle,
        'marginTop',
        'marginBottom'
    );

    let siblingHeight = 0;

    for (const sibling of parent.children) {
        if (sibling !== wrapper) {
            siblingHeight += getOuterHeight(sibling);
        }
    }

    const availableWidth = parentContentWidth - wrapperHorizontalSpace;
    const availableHeight = parentContentHeight - siblingHeight - wrapperVerticalSpace;

    return Math.floor(Math.max(0, Math.min(availableWidth, availableHeight)));
};

const setPetWrapperSize = () => {
    const fluidSize =
        Math.min(window.innerWidth, window.innerHeight) *
        spriteSizeConfig.viewportScale;

    const preferredSize = clampNumber(
        fluidSize,
        spriteSizeConfig.min,
        spriteSizeConfig.max
    );

    const visibleWrappers = Array.from(petWrapper).filter((wrapper) => {
        return wrapper.offsetParent !== null;
    });

    visibleWrappers.forEach((wrapper) => {
        wrapper.style.width = `${preferredSize}px`;
        wrapper.style.height = `${preferredSize}px`;
    });

    // Force recalculation of layout before measuring.
    void document.documentElement.offsetHeight;

    visibleWrappers.forEach((wrapper) => {
        const availableSize = getAvailableSquareSize(wrapper);

        if (availableSize <= 0) return;

        const finalSize = Math.max(
            1,
            Math.min(preferredSize, availableSize)
        );

        wrapper.style.width = `${finalSize}px`;
        wrapper.style.height = `${finalSize}px`;
    });
};

const renderSpriteFrame = (sprite, column, row, config) => {
    const frameWidth = sprite.clientWidth;
    const frameHeight = sprite.clientHeight;

    if (frameWidth <= 0 || frameHeight <= 0) return;

    const scaledFrameWidth = frameWidth * config.zoom;
    const scaledFrameHeight = frameHeight * config.zoom;
    const cropOffsetX = (scaledFrameWidth - frameWidth) / 2;
    const cropOffsetY = (scaledFrameHeight - frameHeight) / 2;

    sprite.style.backgroundRepeat = 'no-repeat';
    sprite.style.backgroundSize =
        `${config.columns * scaledFrameWidth}px ${config.rows * scaledFrameHeight}px`;

    const x = -(column * scaledFrameWidth + cropOffsetX);
    const y = -(row * scaledFrameHeight + cropOffsetY);

    sprite.style.backgroundPosition = `${x}px ${y}px`;
};

const setSpriteFrame = (column, row, config) => {
    setPetWrapperSize();

    for (let i = 0; i < petSprite.length; i++) {
        renderSpriteFrame(petSprite[i], column, row, config);
    }
};

const renderPreviewSprites = () => {
    for (let i = 0; i < previewSprite.length; i++) {
        renderSpriteFrame(previewSprite[i], 0, 0, standardLiveSpriteConfig);
    }
};

const updateAnimation = () => {
    if (!pet.alive) return;

    const config = getLiveSpriteConfig();
    const row = config.animationRows[pet.anim] ?? config.animationRows.idle;
    const column = pet.pose === 2 ? 1 : 0;

    setSpriteFrame(column, row, config);
};

const updatePet = () => {
    if (!pet.alive) return;
    updateAnimation();
};

const renderDeathFrame = () => {
    const frame = deathFrames[deathFrame - 1] ?? deathFrames[deathFrames.length - 1];

    const column = frame[0];
    const row = frame[1];

    setSpriteFrame(column, row, getDeathSpriteConfig());
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

    // Keep valid CSS url(...) syntax when changing/reapplying the sheet.
    updateSprite();

    runner(deathFrames.length);

    setTimeout(() => {
        logEntry(`${pet.name} has died...`);
        togglePetSelect();
        setScreen('home');
    }, 10000);
};

let spriteResizeFrame = null;

const refreshSpriteLayout = () => {
    spriteResizeFrame = null;
    setPetWrapperSize();
    renderPreviewSprites();

    if (pet.alive) {
        updateAnimation();
    } else if (deathFrame !== undefined) {
        renderDeathFrame();
    }
};

window.addEventListener('resize', () => {
    if (spriteResizeFrame !== null) {
        cancelAnimationFrame(spriteResizeFrame);
    }

    spriteResizeFrame = requestAnimationFrame(refreshSpriteLayout);
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

    if (frameColor) {
        eggshell.style.fill = frameColor.startsWith('#')
            ? frameColor
            : `var(--${frameColor})`;
    }

    if (innerColor) {
        innerEgg.style.fill = innerColor.startsWith('#')
            ? innerColor
            : `var(--${innerColor})`;
    }

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

    const restoredSprite = findPetSprite(pet.species);
    if (restoredSprite) {
        newPetSprite = restoredSprite;
        updateSprite();
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
   if (currentHour >= 5 && currentHour < 6) {
        document.body.style.backgroundColor = "var(--" + 'tod-dawn' +")";
   } else if (currentHour >= 6 && currentHour < 19) {
        document.body.style.backgroundColor = "var(--" + 'tod-day' +")";
   } else if (currentHour >= 19 && currentHour < 20) {
        document.body.style.backgroundColor = "var(--" + 'tod-dusk' +")";
   } else if (currentHour >= 20) {
        document.body.style.backgroundColor = "var(--" + 'tod-night' +")";
   }
    
    clockDisplay.innerText = `${clock} ${ToD}`;

    // debug time log
    // console.log(`It's ${ToD} - Time:${clock} - ${currentMinute}`);
}

const togglePetSelect = () => {
    if (!pet.alive) {
        activeScreen = 'home';
        selectedMenuIndex = 1;
        petMenu.classList.remove('hidden');
        renderPetSelection();
    } else {
        petMenu.classList.add('hidden');
    }

    updateScreenLabel();
    renderScreenButtons();
};

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

const toCssUrl = (path) => {
    return `url("${String(path).replaceAll('"', '\"')}")`;
};

const updateSprite = () => {
    for (let i = 0; i < petSprite.length; i++) {
        petSprite[i].style.backgroundImage = toCssUrl(newPetSprite);
    }
};

function runner(repeats) {
    if (repeats > 0) {
        playDeathAnim();
        setTimeout(() => runner(repeats - 1), 750);
    }
}

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
    newDiv.innerHTML = `<p>${entry}</p> <p class="timestamp">${currentTime()}</p>`;
    logWindow.appendChild(newDiv);

    if (logWindow.children.length > 10) {
        logWindow.firstElementChild.remove();
    }

    localStorage.setItem('eventLog', logWindow.innerHTML);
    logWindow.scrollTo(0, logWindow.scrollHeight);
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

    localStorage.setItem('frameColor', '#f8b85b');
    localStorage.setItem('innerColor', '#335ca7');
}

const currentTime = () => {
    return new Date().toLocaleString();
}

/* ======================
    core UI functions
====================== */
const checkSelection = () => {
    hungerContainer.classList.remove('selected');
    energyContainer.classList.remove('selected');
    hygeneContainer.classList.remove('selected');

    if (currentRoom === 1) {
        mainBG.style.backgroundImage = roomBG.kitchen;
        hungerContainer.classList.add('selected');
    } else if (currentRoom === 2) {
        mainBG.style.backgroundImage = roomBG.bed;
        energyContainer.classList.add('selected');
    } else {
        mainBG.style.backgroundImage = roomBG.shower;
        hygeneContainer.classList.add('selected');
    }
};

const renderPetSelection = () => {
    leftArrow.classList.toggle('hidden', selectedPet !== 1);
    rightArrow.classList.toggle('hidden', selectedPet !== 2);
};

const selectPreviousPet = () => {
    selectedPet = selectedPet === 1 ? 2 : selectedPet - 1;
    renderPetSelection();
};

const selectNextPet = () => {
    selectedPet = selectedPet === 2 ? 1 : selectedPet + 1;
    renderPetSelection();
};

const petChoices = [
    { species: 'Egg1', name: 'Babytchi', available: true, sprite: petSpecies.Eggs.Egg1.sprite },
    { species: 'Egg2', name: 'Shirobabytchi', available: true, sprite: petSpecies.Eggs.Egg2.sprite }
];

const createSelectedPet = () => {
    const choice = petChoices[selectedPet - 1];

    pet = newPet();
    pet.species = choice.species;
    pet.name = choice.name;
    pet.anim = 'idle';
    pet.pose = 1;

    deathFrame = undefined;

    newPetSprite = choice.sprite;
    updateSprite();

    petAnim();
    togglePetSelect();
    updateUI();
    updatePet();

    logEntry(`New pet selected, ${pet.name} (${pet.species})`);
};

function gameLoop() {
    tick++;

    updateTime();

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

    updateUI();
    updateMood();
    updatePet();
}

/* ==============================
    status bars functionality
============================== */
const updateHungerBar = () => {
    pet.hunger = Math.max(0, pet.hunger);
    hungerBar.style.width = pet.hunger + '%';
    pet.hungry = pet.hunger <= 20;

    if (pet.hunger > 50) {
        hungerBar.style.backgroundColor = green;
    } else if (pet.hunger > 20) {
        hungerBar.style.backgroundColor = yellow;
    } else {
        hungerBar.style.backgroundColor = red;
    }
};

const updateEnergyBar = () => {
    pet.energy = Math.max(0, pet.energy);
    energyBar.style.width = pet.energy + '%';
    pet.tired = pet.energy <= 20;

    if (pet.energy > 50) {
        energyBar.style.backgroundColor = green;
    } else if (pet.energy > 20) {
        energyBar.style.backgroundColor = yellow;
    } else {
        energyBar.style.backgroundColor = red;
    }
};

const updateHygeneBar = () => {
    pet.hygene = Math.max(0, pet.hygene);
    hygeneBar.style.width = pet.hygene + '%';
    pet.dirty = pet.hygene <= 20;

    if (pet.hygene > 50) {
        hygeneBar.style.backgroundColor = green;
    } else if (pet.hygene > 20) {
        hygeneBar.style.backgroundColor = yellow;
    } else {
        hygeneBar.style.backgroundColor = red;
    }
};

const updateGeneralMoodBar = () => {
    let generalMood = 0;

    if (pet.alive) {
        generalMood = Math.round(
            (pet.hunger + pet.energy + pet.hygene) / 3
        );
    }

    generalMoodBars.forEach((bar) => {
        bar.style.width = `${generalMood}%`;

        if (generalMood > 50) {
            bar.style.backgroundColor = green;
        } else if (generalMood > 20) {
            bar.style.backgroundColor = yellow;
        } else {
            bar.style.backgroundColor = red;
        }
    });

    generalMoodValues.forEach((value) => {
        value.textContent = `${generalMood}%`;
    });
};

const updateAlerts = () => {
    hungryBubble.classList.toggle('hidden', !pet.hungry);
    tiredBubble.classList.toggle('hidden', !pet.tired);
    dirtyBubble.classList.toggle('hidden', !pet.dirty);
};

const updateStatusbars = () => {
    updateHungerBar();
    updateEnergyBar();
    updateHygeneBar();
    updateGeneralMoodBar();
};

const updatePetName = () => {
    petNameDisplay.textContent = pet.alive ? pet.name : 'No pet selected';
};

const updateUI = () => {
    updateStatusbars();
    updateAlerts();
    updatePetName();
    checkSelection();
};

/* ============================
    screen-specific actions
============================ */
const interactWithPet = () => {
    if (!pet.alive || animOverride) return;

    pet.anim = 'happy';
    animOverride = true;
    updatePet();
    logEntry(`${pet.name} enjoyed the attention.`);

    setTimeout(() => {
        animOverride = false;
        updateMood();
        updatePet();
    }, 2500);
};

const feedPet = () => {
    if (!pet.alive || animOverride) return;
    currentRoom = 1;
    checkSelection();
    petFeeding();
    logEntry(`${pet.name} was fed.`);
};

const restPet = () => {
    if (!pet.alive || animOverride) return;
    currentRoom = 2;
    checkSelection();
    petSleeping();
    logEntry(`${pet.name} went to sleep.`);
};

const cleanPet = () => {
    if (!pet.alive || animOverride) return;
    currentRoom = 3;
    checkSelection();
    petBathing();
    logEntry(`${pet.name} had a bath.`);
};

let selectedGame = 0;

const gameNames = ['Block Drop', 'Game 2', 'Game 3'];

const renderGameSelection = () => {
    gameCards.forEach((card, index) => {
        card.classList.toggle('active', index === selectedGame);
    });
};

const selectPreviousGame = () => {
    selectedGame = selectedGame === 0 ? gameCards.length - 1 : selectedGame - 1;
    renderGameSelection();
};

const selectNextGame = () => {
    selectedGame = selectedGame === gameCards.length - 1 ? 0 : selectedGame + 1;
    renderGameSelection();
};

const launchMiniGame = (gameIndex, gameName) => {
    const gameScreen = miniGameScreens[gameIndex];

    if (!gameScreen) return;

    selectedGame = gameIndex;
    renderGameSelection();
    setScreen(gameScreen);
    logEntry(`${gameName} opened.`);
};

const launchGame1 = () => launchMiniGame(0, 'Block Drop');
const launchGame2 = () => launchMiniGame(1, 'Game 2');
const launchGame3 = () => launchMiniGame(2, 'Game 3');

const launchSelectedGame = () => {
    const gameLaunchers = [
        launchGame1,
        launchGame2,
        launchGame3
    ];

    gameLaunchers[selectedGame]?.();
};

const selectPreviousCareRoom = () => {
    currentRoom = currentRoom === 1 ? 3 : currentRoom - 1;
    checkSelection();
};

const selectNextCareRoom = () => {
    currentRoom = currentRoom === 3 ? 1 : currentRoom + 1;
    checkSelection();
};

const activateSelectedCareRoom = () => {
    const careActions = [feedPet, restPet, cleanPet];
    careActions[currentRoom - 1]?.();
};

/* ======================================
    individual mini-game button hooks
====================================== */
const updateMiniGameStatus = (gameScreen, message) => {
    const statusElement = miniGameStatus[gameScreen];

    if (statusElement) {
        statusElement.textContent = message;
    }
};

const game1Left = () => {
    if (!game1Active) return;
    moveGame1Player(-1);
};

const game1Center = () => {
    if (!game1Active) {
        startGame1();
    }
};

const game1Right = () => {
    if (!game1Active) return;
    moveGame1Player(1);
};

const game2Left = () => {
    updateMiniGameStatus('game2', 'Game 2: left button pressed.');
};

const game2Center = () => {
    updateMiniGameStatus('game2', 'Game 2: center button pressed.');
};

const game2Right = () => {
    updateMiniGameStatus('game2', 'Game 2: right button pressed.');
};

const game3Left = () => {
    updateMiniGameStatus('game3', 'Game 3: left button pressed.');
};

const game3Center = () => {
    updateMiniGameStatus('game3', 'Game 3: center button pressed.');
};

const game3Right = () => {
    updateMiniGameStatus('game3', 'Game 3: right button pressed.');
};

const miniGameButtonActions = {
    game1: {
        left: { label: 'Move catcher left', onPress: game1Left },
        center: { label: 'Start or restart Block Drop', onPress: game1Center },
        right: { label: 'Move catcher right', onPress: game1Right }
    },
    game2: {
        left: { label: 'Game 2 left action', onPress: game2Left },
        center: { label: 'Game 2 center action', onPress: game2Center },
        right: { label: 'Game 2 right action', onPress: game2Right }
    },
    game3: {
        left: { label: 'Game 3 left action', onPress: game3Left },
        center: { label: 'Game 3 center action', onPress: game3Center },
        right: { label: 'Game 3 right action', onPress: game3Right }
    }
};

/* ==========================
    minigame functionality
========================== */

//game 1 (falling blocks)
const GAME1_MAX_MISSES = 3;
const GAME1_LANE_COUNT = 3;
const GAME1_BLOCK_STYLES = ['blockPink', 'blockBlue', 'blockYellow', 'blockGreen'];

function updateGame1Hud() {
    game1ScoreDisplay.textContent = game1CurrentScore;
    game1MissesDisplay.textContent = game1Misses;
    game1HighScoreDisplay.textContent = game1HighScore;
}

function setGame1PlayerLane() {
    const laneCenter = ((game1PlayerLane + 0.5) / GAME1_LANE_COUNT) * 100;
    game1Player.style.left = `${laneCenter}%`;
}

function moveGame1Player(direction) {
    game1PlayerLane = Math.max(
        0,
        Math.min(GAME1_LANE_COUNT - 1, game1PlayerLane + direction)
    );

    setGame1PlayerLane();
}

function clearGame1Blocks() {
    game1FallingBlocks.forEach((block) => block.element.remove());
    game1FallingBlocks = [];
}

function stopGame1Loop() {
    game1Active = false;

    if (game1AnimationFrame !== null) {
        cancelAnimationFrame(game1AnimationFrame);
        game1AnimationFrame = null;
    }
}

function prepareGame1Menu() {
    stopGame1Loop();
    clearGame1Blocks();

    game1CurrentScore = 0;
    game1Misses = 0;
    game1PlayerLane = 1;

    game1MainMenu.classList.remove('noDisplay');
    game1Window.classList.add('noDisplay');
    game1GameOver.classList.add('noDisplay');

    updateGame1Hud();
    setGame1PlayerLane();
}

function startGame1() {
    stopGame1Loop();
    clearGame1Blocks();

    game1CurrentScore = 0;
    game1Misses = 0;
    game1PlayerLane = 1;
    game1SpawnTimer = 0;
    game1LastFrameTime = 0;
    game1Active = true;

    game1MainMenu.classList.add('noDisplay');
    game1Window.classList.remove('noDisplay');
    game1GameOver.classList.add('noDisplay');

    updateGame1Hud();
    setGame1PlayerLane();

    game1AnimationFrame = requestAnimationFrame(game1Loop);
    logEntry('Block Drop started.');
}

function spawnGame1Block() {
    const lane = Math.floor(Math.random() * GAME1_LANE_COUNT);
    const block = document.createElement('div');
    const blockStyle = GAME1_BLOCK_STYLES[
        Math.floor(Math.random() * GAME1_BLOCK_STYLES.length)
    ];

    block.className = `game1FallingBlock ${blockStyle}`;
    block.style.left = `${((lane + 0.5) / GAME1_LANE_COUNT) * 100}%`;
    block.style.top = '-3vmin';

    game1Playfield.appendChild(block);
    game1FallingBlocks.push({
        element: block,
        lane,
        y: -block.offsetHeight
    });
}

function catchGame1Block(index) {
    const [block] = game1FallingBlocks.splice(index, 1);
    block.element.classList.add('caught');

    setTimeout(() => block.element.remove(), 120);

    game1CurrentScore += 1;
    updateGame1Hud();
}

function missGame1Block(index) {
    const [block] = game1FallingBlocks.splice(index, 1);
    block.element.remove();game1Playfield

    game1Misses += 1;
    updateGame1Hud();

    if (game1Misses >= GAME1_MAX_MISSES) {
        endGame1();
    }
}

function endGame1() {
    stopGame1Loop();
    clearGame1Blocks();

    if (game1CurrentScore > game1HighScore) {
        game1HighScore = game1CurrentScore;
        localStorage.setItem('game1HighScore', game1HighScore);
    } else {
    }

    game1FinalScore.textContent = `Score: ${game1CurrentScore}`;
    game1GameOver.classList.remove('noDisplay');
    updateGame1Hud();
    logEntry(`Block Drop ended with a score of ${game1CurrentScore}.`);
    game1ScoreCheck();
}

function game1Loop(timestamp) {
    if (!game1Active) return;

    if (game1LastFrameTime === 0) {
        game1LastFrameTime = timestamp;
    }
    // limit deltaSeconds to max 0.05 to prevent jumps in block movement
    const deltaSeconds = Math.min((timestamp - game1LastFrameTime) / 1000, 0.05);
    game1LastFrameTime = timestamp;
    game1SpawnTimer += deltaSeconds * 1000;
    // calculate spawn interval and fall speed based onscore
    const spawnInterval = Math.max(430, 1050 - game1CurrentScore * 24);
    const fallSpeed = 58 + game1CurrentScore * 2.8;

    if (game1SpawnTimer >= spawnInterval) {
        game1SpawnTimer -= spawnInterval;
        spawnGame1Block();
    }

    const playerTop = game1Player.offsetTop;
    const playerBottom = playerTop + game1Player.offsetHeight;
    const playfieldHeight = game1Playfield.clientHeight;

    for (let index = game1FallingBlocks.length - 1; index >= 0; index -= 1) {
        const block = game1FallingBlocks[index];
        const blockHeight = block.element.offsetHeight;

        block.y += fallSpeed * deltaSeconds;
        block.element.style.top = `${block.y}px`;

        const blockBottom = block.y + blockHeight;
        const overlapsPlayer = blockBottom >= playerTop && block.y <= playerBottom;

        if (overlapsPlayer && block.lane === game1PlayerLane) {
            catchGame1Block(index);
            continue;
        }

        if (block.y > playfieldHeight) {
            missGame1Block(index);

            if (!game1Active) return;
        }
    }

    game1AnimationFrame = requestAnimationFrame(game1Loop);
}

function game1ScoreCheck() {
    if (game1CurrentScore >= 70) {
        console.log(`70+`);
    } else if (game1CurrentScore >= 50) {
        console.log(`50+`);
    } else if (game1CurrentScore >= 10) {
        console.log(`10+`);
    } else {
        console.log(`get good`)
    }
}

// game 2


// game 3


/* =============================
    screen and button system
============================= */
const getSelectedMenu = () => menuScreens[selectedMenuIndex];

const updateScreenLabel = () => {
    if (!pet.alive) {
        screenLabel.textContent = 'Choose a pet';
        return;
    }

    screenLabel.textContent = activeScreen === 'home'
        ? screenNames[getSelectedMenu()]
        : screenNames[activeScreen];
};

const selectPreviousMenu = () => {
    if (pet.alive == false) return;
    selectedMenuIndex =
        selectedMenuIndex === 0
            ? menuScreens.length - 1
            : selectedMenuIndex - 1;

    updateScreenLabel();
};

const selectNextMenu = () => {
    if (pet.alive == false) return;
    selectedMenuIndex =
        selectedMenuIndex === menuScreens.length - 1
            ? 0
            : selectedMenuIndex + 1;

    updateScreenLabel();
};

const enterSelectedMenu = () => {
    const selectedMenu = getSelectedMenu();

    if (selectedMenu === 'home') {
        interactWithPet();
        return;
    }

    setScreen(selectedMenu);
};

const centerHoldCount = 2000;

const returnFromCurrentScreen = () => {
    if (!pet.alive || activeScreen === 'home') return;

    if (miniGameScreens.includes(activeScreen)) {
        setScreen('games');
        return;
    }

    setScreen('home');
};

const makeDeviceButton = ({
    id,
    label,
    iconClass,
    onPress,
    onHold = null,
    holdDuration = centerHoldCount
}) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = id;
    button.title = label;

    if (iconClass) {
        const icon = document.createElement('i');
        icon.className = iconClass;
        button.appendChild(icon);
    }

    let holdTimer = null;
    let holdTriggered = false;

    const cancelHoldTimer = () => {
        if (holdTimer !== null) {
            clearTimeout(holdTimer);
            holdTimer = null;
        }
    };

    if (onHold) {
        
        button.addEventListener('pointerdown', (event) => {
            if (event.button !== 0) return;

            holdTriggered = false;
            cancelHoldTimer();

            holdTimer = setTimeout(() => {
                if (game1Active == true || game2Active == true || game3Active == true) return
                holdTimer = null;
                holdTriggered = true;
                onHold();
            }, holdDuration);
        });

        button.addEventListener('pointerup', cancelHoldTimer);
        button.addEventListener('pointercancel', cancelHoldTimer);
        button.addEventListener('pointerleave', cancelHoldTimer);
    }

    button.addEventListener('click', (event) => {
        if (holdTriggered) {
            event.preventDefault();
            event.stopPropagation();
            holdTriggered = false;
            return;
        }

        onPress();
    });

    return button;
};

const getCurrentButtonActions = () => {
    if (!pet.alive) {
        return {
            left: {
                label: 'Previous pet',
                onPress: selectPreviousPet
            },
            center: {
                label: 'Choose pet',
                onPress: createSelectedPet
            },
            right: {
                label: 'Next pet',
                onPress: selectNextPet
            }
        };
    }

    if (miniGameButtonActions[activeScreen]) {
        return miniGameButtonActions[activeScreen];
    }

    if (activeScreen === 'care') {
        return {
            left: {
                label: 'Previous care option',
                onPress: selectPreviousCareRoom
            },
            center: {
                label: 'Use selected care option',
                onPress: activateSelectedCareRoom
            },
            right: {
                label: 'Next care option',
                onPress: selectNextCareRoom
            }
        };
    }

    if (activeScreen === 'games') {
        return {
            left: {
                label: 'Previous mini-game',
                onPress: selectPreviousGame
            },
            center: {
                label: 'Open selected mini-game',
                onPress: launchSelectedGame
            },
            right: {
                label: 'Next mini-game',
                onPress: selectNextGame
            }
        };
    }

    return {
        left: {
            label: 'Previous menu',
            onPress: selectPreviousMenu
        },
        center: {
            label: 'Open selected menu',
            onPress: enterSelectedMenu
        },
        right: {
            label: 'Next menu',
            onPress: selectNextMenu
        }
    };
};

const renderScreenButtons = () => {
    const actions = getCurrentButtonActions();

    const leftButton = makeDeviceButton({
        id: 'MainleftButton',
        label: actions.left.label,
        iconClass: 'fas fa-arrow-circle-left',
        onPress: actions.left.onPress
    });

    const centerButton = makeDeviceButton({
        id: 'MainselectButton',
        label: activeScreen === 'home'
            ? actions.center.label
            : `${actions.center.label} — hold 2 seconds to return`,
        onPress: actions.center.onPress,
        onHold: activeScreen === 'home' ? null : returnFromCurrentScreen
    });

    const rightButton = makeDeviceButton({
        id: 'MainrightButton',
        label: actions.right.label,
        iconClass: 'fas fa-arrow-circle-right',
        onPress: actions.right.onPress
    });

    // Remove the previous buttons and replace with new ones
    buttonMount.replaceChildren(leftButton, centerButton, rightButton);
};

const moveScreenLabel = () => {
    const activeElement = screenElements[activeScreen];

    if (!activeElement) return;

    if (activeScreen === 'care') {
        const statusBars = document.getElementById('statusBarWrapper');
        statusBars?.insertAdjacentElement('afterend', screenLabel);
        return;
    }

    const moodBar = activeElement.querySelector('.generalMoodWrapper');

    if (moodBar) {
        moodBar.insertAdjacentElement('afterend', screenLabel);
        return;
    }

    activeElement.insertAdjacentElement('afterbegin', screenLabel);
};

const setScreen = (screenName) => {
    if (!screenElements[screenName]) return;
    if (!pet.alive && screenName !== 'home') return;

    const previousScreen = activeScreen;

    if (previousScreen === 'game1' && screenName !== 'game1') {
        prepareGame1Menu();
    }

    activeScreen = screenName;

    if (screenName !== 'home') {
        const menuIndex = menuScreens.indexOf(screenName);
        if (menuIndex !== -1) selectedMenuIndex = menuIndex;
    }

    Object.entries(screenElements).forEach(([name, element]) => {
        element.classList.toggle('noDisplay', name !== activeScreen);
    });

    moveScreenLabel();
    updateScreenLabel();
    renderScreenButtons();

    if (activeScreen === 'care') {
        checkSelection();
    }

    if (activeScreen === 'games') {
        renderGameSelection();
    }

    if (activeScreen === 'game1') {
        prepareGame1Menu();
    }

    updatePet();
};

const activateCenterButton = () => {
    document.getElementById('MainselectButton')?.click();
};

const handleKeyboardControls = (event) => {
    const targetTag = event.target.tagName;
    if (targetTag === 'INPUT' || targetTag === 'TEXTAREA' || targetTag === 'SELECT') {
        return;
    }

    if ((event.key === 'x' || event.key === 'X') && pet.alive) {
        startDeathAnimation();
        return;
    }

    if (!pet.alive) {
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            selectPreviousPet();
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            selectNextPet();
        } else if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            createSelectedPet();
        }
        return;
    }

    if (event.key === 'Escape') {
        event.preventDefault();

        if (miniGameScreens.includes(activeScreen)) {
            setScreen('games');
        } else {
            setScreen('home');
        }

        return;
    }

    if (event.key === 'Home') {
        event.preventDefault();
        setScreen('home');
        return;
    }

    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        document.getElementById('MainleftButton')?.click();
    } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        document.getElementById('MainrightButton')?.click();
    } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activateCenterButton();
    }
};

document.addEventListener('keydown', handleKeyboardControls);

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
    renderPreviewSprites();
    loadFromLocalstorage();
    logWindow.innerHTML = localStorage.getItem('eventLog') || '';
    prepareGame1Menu();

    setScreen('home');
    togglePetSelect();
    updateTime();
    updateUI();
    petAnim();
    updateMood();
    updatePet();

    setInterval(gameLoop, 1000);
    setInterval(saveToLocalStorage, 300000); // 5min periodic save
};
init();