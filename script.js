/* =============================
    Variables & declarations
============================= */
const petMenu = document.getElementById('newPetMenu');
const screenLabel = document.getElementById('screenLabel');
const buttonMount = document.getElementById('MaingameButtonsSection');
// const petNameDisplay = document.querySelectorAll(".petNameDisplay");

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

// clear local data once
// localStorage.clear();

/* ============================
    minigame 1 declarations - Falling blocks
============================ */
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
let game1CurrentScore = 0;
let game1HighScore = Number(localStorage.getItem('game1HighScore')) || 0;
let game1Misses = 0;
let game1PlayerLane = 1;
let game1AnimationFrame = null;
let game1LastFrameTime = 0;
let game1SpawnTimer = 0;
let game1FallingBlocks = [];

let gamePlayedCount1 = 0;

/* ============================
    minigame 2 declarations
============================ */

let game2Active = false;

let gamePlayedCount2 = 0;

 /* ===========================
    minigame 3 declarations - rock paper scissors
============================ */
let game3Options = ["Rock", "Paper", "Scissors"];

let game3Active = false;

let gamePlayedCount3 = 0;

// status alerts
const bubbleWrapper = document.getElementById('bubbleWrapper');

const hungryBubbles = document.querySelectorAll('[data-care-bubble="hungry"]');

const tiredBubbles = document.querySelectorAll('[data-care-bubble="tired"]');

const dirtyBubbles = document.querySelectorAll('[data-care-bubble="dirty"]');

// Care request settings
const CARE_RESPONSE_TIME_MS = 5 * 60 * 1000;       // 5 minutes to respond
const CARE_REQUEST_MIN_DELAY_MS = 10 * 60 * 1000; // minimum 10 minutes
const CARE_REQUEST_MAX_DELAY_MS = 20 * 60 * 1000; // maximum 20 minutes
const CARE_PRIORITY_THRESHOLD = 25;
const OFFLINE_CARE_REQUEST_MAX_AGE_MS = 2 * 60 * 60 * 1000;
const CATCH_UP_REQUEST_DELAY_MS = 6 * 1000;

const CARE_REQUEST_TYPES = ['hungry', 'tired', 'dirty'];

const careRequestDetails = {
    hungry: {
        requestText: 'is hungry',
        neededAction: 'food'
    },

    tired: {
        requestText: 'is tired',
        neededAction: 'sleep'
    },

    dirty: {
        requestText: 'is dirty',
        neededAction: 'a bath'
    }
};

// pet sprites
const petWrapper = document.getElementsByClassName('petWrapper');
const petSprite = document.getElementsByClassName('petSprite');
const previewSprite = document.getElementsByClassName('previewSprite');

// logs
const clockDisplay = document.getElementsByClassName('clock');
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

// if window is out of view
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

/* ====================
    Evolution logic
==================== */

const hour = 1 * 1; // 60 * 60;
let optionB = false; // decide Pet A or B per evolution.

// Default fallback until an egg is selected or a save is loaded.
let currentSpecies = null;
let currentsprite = null;

// Finds the original petSpecies object.
const getCanonicalSpecies = (species) => {
    if (!species) return null;

    const wantedSpecies = String(
        typeof species === 'object'
            ? species.name
            : species
    ).toLowerCase();

    for (const group of Object.values(petSpecies)) {
        for (const [speciesKey, speciesData] of Object.entries(group)) {
            const matchesKey =
                speciesKey.toLowerCase() === wantedSpecies;

            const matchesName =
                speciesData.name.toLowerCase() === wantedSpecies;

            if (matchesKey || matchesName) {
                return speciesData;
            }
        }
    }

    return null;
};

/*
    1 hour   = Egg > Baby
    24 hours = Baby > Child
    60 hours = Child > Teen
    120 hours = Teen > Adult
*/
const evolutionPaths = new Map([
    // Eggs > Babies
    [
        petSpecies.Eggs.Egg1,
        {
            age: hour,
            optionA: petSpecies.Babies.Babytchi
        }
    ],
    [
        petSpecies.Eggs.Egg2,
        {
            age: hour,
            optionA: petSpecies.Babies.Shirobabytchi
        }
    ],

    // Babies > Children
    [
        petSpecies.Babies.Babytchi,
        {
            age: hour * 24,
            optionA: petSpecies.Children.Tonmarutchi
        }
    ],
    [
        petSpecies.Babies.Shirobabytchi,
        {
            age: hour * 24,
            optionA: petSpecies.Children.Marutchi
        }
    ],

    // Children > Teens
    [
        petSpecies.Children.Marutchi,
        {
            age: hour * 60,
            optionA: petSpecies.Teens.Hasitamatchi,
            optionB: petSpecies.Teens.Kuchitamatchi
        }
    ],
    [
        petSpecies.Children.Tonmarutchi,
        {
            age: hour * 60,
            optionA: petSpecies.Teens.Tongaritchi,
            optionB: petSpecies.Teens.Tamatchi
        }
    ],

    // Teens > Adults
    [
        petSpecies.Teens.Tamatchi,
        {
            age: hour * 120,
            optionA: petSpecies.Adults.Mametchi,
            optionB: petSpecies.Adults.Nyatchi
        }
    ],
    [
        petSpecies.Teens.Hasitamatchi,
        {
            age: hour * 120,
            optionA: petSpecies.Adults.Ginjirotchi,
            optionB: petSpecies.Adults.Kusatchi
        }
    ],
    [
        petSpecies.Teens.Kuchitamatchi,
        {
            age: hour * 120,
            optionA: petSpecies.Adults.Kuchipatchi,
            optionB: petSpecies.Adults.Nyorotchi
        }
    ],
    [
        petSpecies.Teens.Tongaritchi,
        {
            age: hour * 120,
            optionA: petSpecies.Adults.Pochitchi,
            optionB: petSpecies.Adults.Mimitchi
        }
    ]
]);

const evolveTo = (nextSpecies) => {
    if (!nextSpecies || currentSpecies === nextSpecies) return;

    const previousName = currentSpecies.name;

    currentSpecies = nextSpecies;
    currentsprite = nextSpecies.sprite;

    pet.species = nextSpecies;
    pet.name = nextSpecies.name;

    // Change to the new species sprite.
    updateSprite();
    updatePet();

    logEntry(`${previousName} evolved into ${nextSpecies.name}!`);
};

const checkEvolution = () => {
    if (!pet.alive) return;

    // Reconnect loaded save data to the original petSpecies object
    const restoredSpecies = getCanonicalSpecies(pet.species);

    if (restoredSpecies && currentSpecies !== restoredSpecies) {
        currentSpecies = restoredSpecies;
        currentsprite = restoredSpecies.sprite;
    }

    // run multiple evolutions in case of long time catch-up
    let evolutionsThisCheck = 0;

    while (evolutionsThisCheck < 4) {
        const evolution = evolutionPaths.get(currentSpecies);

        if (!evolution) break;
        if (pet.age < evolution.age) break;

        checkGamesPlayed();

        const nextSpecies =
            optionB === true && evolution.optionB
                ? evolution.optionB
                : evolution.optionA;

        evolveTo(nextSpecies);
        evolutionsThisCheck++;
    }
};

function checkGamesPlayed() {
    if (currentSpecies === petSpecies.Children.Marutchi && gamePlayedCount2 >= 1) {
        
    }
}

// ========================== //
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

let pet = {
    hunger:     80,
    energy:     80,
    hygene:     80,
    hungry:     false,
    tired:      false,
    dirty:      false,
    sick:       false,
    careMistakes: 0,
    activeCareRequest: null,
    careRequestDeadline: null,
    nextCareRequestAt: null,
    catchUpCareQueue: [],
    mood:       3, // 0 = run away, 1 = unhappy, 2 = neutral, 3 = happy
    age:        0,
    stage:      null,
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

// Set to null for normal behaviour.
const DEBUG_SPRITE_OVERRIDE = null // petSpecies.Adults.Mametchi;

const spriteSizeConfig = {
    min: 90,
    max: 135,
    viewportScale: 0.12
};

const standardLiveSpriteConfig = {
    columns: 2,
    rows: 5,
    zoom: 1.125,
    animationRows: {
        idle: 1,
        happy: 2,
        unhappy: 3,
        eating: 5,
        bathing: 3,
        sleeping: 5
    }
};

// default sprite offset
const normalSpriteOffset = {
    x: 0,
    y: 125
};

// specific animation offsets
const careAnimationOffsets = {
    eating: {
        x: 0,
        y: 275
    },

    bathing: {
        x: 0,
        y: 425
    },

    sleeping: {
        x: 0,
        y: 125
    }
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
// sprite positioning
const renderSpriteFrame = (
    sprite,
    column,
    row,
    config,
    spriteOffsetX = 0,
    spriteOffsetY = 0,
    offsetReferenceSize = spriteSizeConfig.max
) => {
    const frameWidth = sprite.clientWidth;
    const frameHeight = sprite.clientHeight;

    if (frameWidth <= 0 || frameHeight <= 0) return;

    const scaledFrameWidth = frameWidth * config.zoom;
    const scaledFrameHeight = frameHeight * config.zoom;

    const cropOffsetX = (scaledFrameWidth - frameWidth) / 2;
    const cropOffsetY = (scaledFrameHeight - frameHeight) / 2;

    // Make offsets scale with the sprite's current size.
    const offsetScaleX = frameWidth / offsetReferenceSize;
    const offsetScaleY = frameHeight / offsetReferenceSize;

    const responsiveOffsetX = spriteOffsetX * offsetScaleX;
    const responsiveOffsetY = spriteOffsetY * offsetScaleY;

    sprite.style.backgroundRepeat = 'no-repeat';

    sprite.style.backgroundSize =
        `${config.columns * scaledFrameWidth}px ` +
        `${config.rows * scaledFrameHeight}px`;

    const x =
        -(column * scaledFrameWidth + cropOffsetX) +
        responsiveOffsetX;

    const y =
        -(row * scaledFrameHeight + cropOffsetY) +
        responsiveOffsetY;

    sprite.style.backgroundPosition = `${x}px ${y}px`;
};

const setSpriteFrame = (
    column,
    row,
    config,
    spriteOffset = normalSpriteOffset
) => {
    setPetWrapperSize();

    for (let i = 0; i < petSprite.length; i++) {
        renderSpriteFrame(
            petSprite[i],
            column,
            row,
            config,
            spriteOffset.x,
            spriteOffset.y
        );
    }
};

// new pet menu positioning
const renderPreviewSprites = () => {
    for (let i = 0; i < previewSprite.length; i++) {
        renderSpriteFrame(
            previewSprite[i],
            0,
            0,
            standardLiveSpriteConfig,
            0,   // X-axis position
            -30, // Y-axis position
            90   // Preview sprite reference size
        );
    }
};

const updateAnimation = () => {
    if (!pet.alive) return;

    const config = standardLiveSpriteConfig;

    const animationName =
        config.animationRows[pet.anim] !== undefined
            ? pet.anim
            : 'idle';

    const row = config.animationRows[animationName];
    const column = pet.pose === 2 ? 1 : 0;

    // Care offsets are used only during an active care animation.
    const careOffset = careAnimationOffsets[animationName];
    const spriteOffset =
        animOverride && careOffset
            ? careOffset
            : normalSpriteOffset;

    setSpriteFrame(
        column,
        row,
        config,
        spriteOffset
    );
};

const updatePet = () => {
    if (!pet.alive) return;
    pet.name = currentSpecies.name
    pet.species = currentSpecies;
    currentsprite = currentSpecies.sprite;
    
    findPetSprite(pet.species)
    updateAnimation();
};

const renderDeathFrame = () => {
    const frame = deathFrames[deathFrame - 1] ?? deathFrames[deathFrames.length - 1];

    const column = frame[0];
    const row = frame[1];

    setSpriteFrame(
        column,
        row,
        standardLiveSpriteConfig,
        normalSpriteOffset
    );
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
    const petState = localStorage.getItem('petState');
    const innerColor = localStorage.getItem('innerColor');
    const frameColor = localStorage.getItem('frameColor');

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

    // restore the species object from the saved data
    const restoredSpecies = getCanonicalSpecies(pet.species);

    if (!restoredSpecies) {
        console.error('Could not restore species:', pet.species);
        pet.alive = false;
        return;
    }

    currentSpecies = restoredSpecies;
    currentsprite = restoredSpecies.sprite;

    pet.species = restoredSpecies;
    pet.name = restoredSpecies.name;

    updateSprite();
    catchUpGameState();
    initializeCareRequestSystem();
    checkEvolution();
    updateUI();
};

const catchUpGameState = () => {
    const savedDate = localStorage.getItem('savedDate');
    if (savedDate === null) return;

    const oldSaveDate = new Date(savedDate);
    const currentTime = Date.now();
    const savedTime = oldSaveDate.getTime();

    if (!Number.isFinite(savedTime)) return;

    const timeDifference = currentTime - savedTime;
    const catchUpSeconds = Math.floor(timeDifference / 1000);
    const catchUpMinutes = Math.floor(catchUpSeconds / 60);
    const catchUpHours = Math.floor(catchUpMinutes / 60);
    const catchUpTimeString = `${catchUpHours}h ${catchUpMinutes % 60}m ${catchUpSeconds % 60}s`;

    if (catchUpSeconds <= 0) return;

    pet.age += catchUpSeconds;
    checkEvolution();

    pet.hunger -= Math.floor(catchUpSeconds / 300);
    pet.energy -= Math.floor(catchUpSeconds / 180);
    pet.hygene -= Math.floor(catchUpSeconds / 240);

    pet.hunger = Math.max(1, pet.hunger);
    pet.energy = Math.max(1, pet.energy);
    pet.hygene = Math.max(1, pet.hygene);

    pet.careMistakes = Number(pet.careMistakes) || 0;
    pet.catchUpCareQueue = Array.isArray(pet.catchUpCareQueue)
        ? pet.catchUpCareQueue.filter(
            (requestType, index, queue) =>
                CARE_REQUEST_TYPES.includes(requestType) &&
                queue.indexOf(requestType) === index
        )
        : [];

    let expiredOfflineRequestType = null;

    if (
        CARE_REQUEST_TYPES.includes(pet.activeCareRequest)
    ) {
        if (
            timeDifference >=
            OFFLINE_CARE_REQUEST_MAX_AGE_MS
        ) {
            expiredOfflineRequestType =
                pet.activeCareRequest;

            pet.careMistakes += 1;

            logEntry(
                `Care mistake #${pet.careMistakes}: ` +
                `${pet.name}'s ${expiredOfflineRequestType} request expired while offline.`
            );

            clearActiveCareRequest();
        } else {
            pet.careRequestDeadline =
                currentTime + CARE_RESPONSE_TIME_MS;

            syncCareRequestFlags();
            updateAlerts();
        }
    }

    if (expiredOfflineRequestType) {
        pet.catchUpCareQueue =
            pet.catchUpCareQueue.filter(
                (requestType) =>
                    requestType !==
                    expiredOfflineRequestType
            );
    }

    const queuedRequestTypes = new Set(
        pet.catchUpCareQueue
    );

    if (pet.activeCareRequest) {
        queuedRequestTypes.add(
            pet.activeCareRequest
        );
    }

    const offlineNeeds = [
        {
            requestType: 'hungry',
            value: pet.hunger
        },
        {
            requestType: 'tired',
            value: pet.energy
        },
        {
            requestType: 'dirty',
            value: pet.hygene
        }
    ];

    const newCatchUpRequests = offlineNeeds
        .filter(
            (need) =>
                need.value <=
                    CARE_PRIORITY_THRESHOLD &&
                need.requestType !==
                    expiredOfflineRequestType &&
                !queuedRequestTypes.has(
                    need.requestType
                )
        )
        .sort(
            (firstNeed, secondNeed) =>
                firstNeed.value - secondNeed.value
        )
        .map(
            (need) => need.requestType
        );

    pet.catchUpCareQueue.push(
        ...newCatchUpRequests
    );

    if (
        !pet.activeCareRequest &&
        pet.catchUpCareQueue.length > 0
    ) {
        const nextCatchUpRequest =
            pet.catchUpCareQueue.shift();

        startCareRequest(
            nextCatchUpRequest
        );
    } else if (
        !pet.activeCareRequest &&
        expiredOfflineRequestType
    ) {
        scheduleNextCareRequest(
            currentTime
        );
    }

    updateTime();
    updateUI();
    updateMood();
    saveToLocalStorage();

    logEntry(`Caught up, player has been away for ${catchUpTimeString}`)
}

const updateTime = () => {
    currentDate = new Date();
    let timeOfDay = currentDate.toTimeString();

    let currentMinute = parseInt(timeOfDay.slice(3, 5));
    let currentHour = parseInt(timeOfDay.slice(0, 2));
    clock = timeOfDay.slice(0, 5);

    // Debug number
    // currentHour += 8;
    // currentMinute = 35;
    
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
    
    for (let i = 0; i < clockDisplay.length; i++) {
        clockDisplay[i].innerText = `${clock} ${ToD}`;
    }

    // debug time log
    // console.log(`It's ${ToD} - Time:${clock} - ${currentMinute}`);
}

const togglePetSelect = () => {
    if (!pet.alive) {
        activeScreen = 'home';
        selectedMenuIndex = 1;

        petMenu.classList.remove('hidden');
        renderPetSelection();

        // delay the preview sprite rendering to ensure the DOM is updated before measuring
        requestAnimationFrame(() => {
            renderPreviewSprites();
        });
    } else {
        petMenu.classList.add('hidden');
    }

    updateScreenLabel();
    renderScreenButtons();
};

const newPet = () => { 
    return {
        hunger:     60,
        energy:     60,
        hygene:     60,
        hungry:     false,
        tired:      false,
        dirty:      false,
        sick:       false,
        careMistakes: 0,
        activeCareRequest: null,
        careRequestDeadline: null,
        nextCareRequestAt: null,
        catchUpCareQueue: [],
        mood:       3,
        age:        0,
        stage:      null,
        alive:      true,
        idle:       true,
        pose:       1,
        species:    '',
        name:       `unnamed`,
        anim:       'idle' 
    };
}

/* =========================
    Care request system
========================= */

const getRandomCareDelay = () => {
    const delayRange =
        CARE_REQUEST_MAX_DELAY_MS -
        CARE_REQUEST_MIN_DELAY_MS;

    return (
        CARE_REQUEST_MIN_DELAY_MS +
        Math.floor(Math.random() * (delayRange + 1))
    );
};

const syncCareRequestFlags = () => {
    pet.hungry =
        pet.activeCareRequest === 'hungry';

    pet.tired =
        pet.activeCareRequest === 'tired';

    pet.dirty =
        pet.activeCareRequest === 'dirty';
};

const scheduleNextCareRequest = (
    fromTime = Date.now()
) => {
    if (!pet.alive) {
        pet.nextCareRequestAt = null;
        return;
    }

    pet.nextCareRequestAt =
        fromTime + getRandomCareDelay();
};

const clearActiveCareRequest = () => {
    pet.activeCareRequest = null;
    pet.careRequestDeadline = null;

    pet.hungry = false;
    pet.tired = false;
    pet.dirty = false;

    updateAlerts();
};

const chooseCareRequestType = (
    requestedType = null
) => {
    // Debug commands can still force a specific request.
    if (CARE_REQUEST_TYPES.includes(requestedType)) {
        return requestedType;
    }

    const careNeeds = [
        {
            requestType: 'hungry',
            value: pet.hunger
        },
        {
            requestType: 'tired',
            value: pet.energy
        },
        {
            requestType: 'dirty',
            value: pet.hygene
        }
    ];

    const lowCareNeeds = careNeeds.filter(
        (need) =>
            need.value <= CARE_PRIORITY_THRESHOLD
    );

    /*
    When one or more bars are low, prioritize
    whichever bar currently has the lowest value.
    */
    if (lowCareNeeds.length > 0) {
        const lowestValue = Math.min(
            ...lowCareNeeds.map(
                (need) => need.value
            )
        );

        const mostUrgentNeeds = lowCareNeeds.filter(
            (need) =>
                need.value === lowestValue
        );

        // Randomly choose if multiple bars are equally low.
        return mostUrgentNeeds[
            Math.floor(
                Math.random() *
                mostUrgentNeeds.length
            )
        ].requestType;
    }

    // All bars are safe, so use a normal random request.
    return CARE_REQUEST_TYPES[
        Math.floor(
            Math.random() *
            CARE_REQUEST_TYPES.length
        )
    ];
};

const startCareRequest = (
    requestedType = null
) => {
    if (!pet.alive) return false;

    // Only allow one active request at a time
    if (pet.activeCareRequest !== null) {
        return false;
    }

    const requestType = chooseCareRequestType(requestedType);

    pet.activeCareRequest = requestType;

    pet.careRequestDeadline =
        Date.now() + CARE_RESPONSE_TIME_MS;

    pet.nextCareRequestAt = null;

    syncCareRequestFlags();
    updateAlerts();

    logEntry(
        `${pet.name} ` +
        `${careRequestDetails[requestType].requestText}. ` +
        `Respond within 5 minutes.`
    );

    return true;
};

const registerCareMistake = (now = Date.now()) => {
    const missedRequest = pet.activeCareRequest;

    if (!missedRequest) return;

    pet.careMistakes =
        Number(pet.careMistakes) || 0;

    pet.careMistakes += 1;

    logEntry(
        `Care mistake #${pet.careMistakes}: ` +
        `${pet.name}'s ${missedRequest} request was ignored.`
    );

    // Removes the request and hides its bubble.
    clearActiveCareRequest();

    // Starts the random wait for the next request.
    if (
        Array.isArray(pet.catchUpCareQueue) &&
        pet.catchUpCareQueue.length > 0
    ) {
        pet.nextCareRequestAt =
            now + CATCH_UP_REQUEST_DELAY_MS;
    } else {
        scheduleNextCareRequest(now);
    }

    saveToLocalStorage();
};

const completeCareRequest = (
    requestType
) => {
    if (
        pet.activeCareRequest !== requestType
    ) {
        return false;
    }

    clearActiveCareRequest();

    if (
        Array.isArray(pet.catchUpCareQueue) &&
        pet.catchUpCareQueue.length > 0
    ) {
        pet.nextCareRequestAt =
            Date.now() + CATCH_UP_REQUEST_DELAY_MS;
    } else {
        scheduleNextCareRequest();
    }

    updateAlerts();

    return true;
};

const canUseCareAction = (
    requestType
) => {
    if (!pet.alive) return false;
    if (animOverride) return false;

    if (
        pet.activeCareRequest === requestType
    ) {
        return true;
    }

    if (pet.activeCareRequest) {
        const currentNeed =
            careRequestDetails[
                pet.activeCareRequest
            ].neededAction;

        logEntry(
            `${pet.name} is asking for ` +
            `${currentNeed}, not this care option.`
        );
    } else {
        logEntry(
            `${pet.name} is not asking ` +
            `for care right now.`
        );
    }

    return false;
};

const initializeCareRequestSystem = () => {
    pet.careMistakes =
        Number(pet.careMistakes) || 0;

    pet.catchUpCareQueue = Array.isArray(
        pet.catchUpCareQueue
    )
        ? pet.catchUpCareQueue.filter(
            (requestType, index, queue) =>
                CARE_REQUEST_TYPES.includes(requestType) &&
                queue.indexOf(requestType) === index
        )
        : [];

    if (!pet.alive) {
        clearActiveCareRequest();
        pet.nextCareRequestAt = null;
        pet.catchUpCareQueue = [];
        return;
    }

    // Protect against old save files
    if (
        !CARE_REQUEST_TYPES.includes(
            pet.activeCareRequest
        )
    ) {
        pet.activeCareRequest = null;
    }

    const now = Date.now();

    // Restore an active request
    if (pet.activeCareRequest) {
        const savedDeadline =
            Number(pet.careRequestDeadline);

        pet.careRequestDeadline =
            Number.isFinite(savedDeadline) &&
            savedDeadline > 0
                ? savedDeadline
                : now + CARE_RESPONSE_TIME_MS;

        syncCareRequestFlags();

        // Request expired while the game was closed
        if (
            now >= pet.careRequestDeadline
        ) {
            registerCareMistake(now);
        }

        return;
    }

    clearActiveCareRequest();

    const savedNextRequest =
        Number(pet.nextCareRequestAt);

    pet.nextCareRequestAt =
        Number.isFinite(savedNextRequest) &&
        savedNextRequest > 0
            ? savedNextRequest
            : null;

    if (pet.nextCareRequestAt === null) {
        scheduleNextCareRequest(now);
    }
};

const updateCareRequestSystem = () => {
    if (!pet.alive) return;

    const now = Date.now();

    // There is currently an active request.
    if (pet.activeCareRequest) {
        const deadline =
            Number(pet.careRequestDeadline);

        if (
            Number.isFinite(deadline) &&
            now >= deadline
        ) {
            registerCareMistake(now);
        }

        return;
    }

    // No request and no scheduled request yet.
    if (!pet.nextCareRequestAt) {
        scheduleNextCareRequest(now);
        return;
    }

    // Time to create the next request.
    if (
        now >= Number(pet.nextCareRequestAt)
    ) {
        const nextCatchUpRequest =
            Array.isArray(pet.catchUpCareQueue) &&
            pet.catchUpCareQueue.length > 0
                ? pet.catchUpCareQueue.shift()
                : null;

        startCareRequest(
            nextCatchUpRequest
        );
    }
};

// Debug command examples:
// debugCareRequest('hungry')
// debugCareRequest('tired')
// debugCareRequest('dirty')
// debugCareRequest('random')

window.debugCareRequest = (
    requestType = 'random'
) => {
    return startCareRequest(
        requestType === 'random'
            ? null
            : requestType
    );
};

const updateMood = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    if (pet.hunger == 0 || pet.energy == 0 || pet.hygene == 0) {
        pet.mood = 0;
        startDeathAnimation();
        
    } else if (pet.hunger < 20 || pet.energy < 20 || pet.hygene < 20) {
        pet.mood = 1;
        pet.anim = 'unhappy';
        console.log('pet is unhappy');
    } else if (pet.hunger < 50 || pet.energy < 50 || pet.hygene < 50) {
        pet.mood = 2;
        pet.anim = 'idle';
        console.log('pet is neutral');
    } else {
        pet.mood = 3;
        pet.anim = 'happy';
        console.log('pet is happy');
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

    // Render the care row and its own offset immediately.
    updatePet();
    graduallyIncrease('hunger', updateHungerBar);

    setTimeout(() => {
        animOverride = false;

        // Restore the correct normal animation and normal offset.
        updateMood();
        updatePet();
    }, 5000);
};

const petBathing = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    pet.anim = 'bathing';
    animOverride = true;

    // Render the care row and its own offset immediately.
    updatePet();
    graduallyIncrease('hygene', updateHygeneBar);

    setTimeout(() => {
        animOverride = false;

        // Restore the correct normal animation and normal offset.
        updateMood();
        updatePet();
    }, 5000);
};

const petSleeping = () => {
    if (!pet.alive) return;
    if (animOverride) return;

    pet.anim = 'sleeping';
    animOverride = true;

    // Render the care row and its own offset immediately.
    updatePet();
    graduallyIncrease('energy', updateEnergyBar);

    setTimeout(() => {
        animOverride = false;

        // Restore the correct normal animation and normal offset.
        updateMood();
        updatePet();
    }, 5000);
};

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
// 
const toCssUrl = (path) => {
    return `url("${String(path).replaceAll('"', '\"')}")`;
};

const updateSprite = () => {
    const spritePath =
        DEBUG_SPRITE_OVERRIDE?.sprite ??
        currentsprite;

    if (!spritePath) return;

    const cssSpritePath = toCssUrl(spritePath);

    // Update the normal home/menu pet sprites.
    for (let i = 0; i < petSprite.length; i++) {
        petSprite[i].style.backgroundImage = cssSpritePath;
    }

    // Update the Block Drop mini-game character.
    if (game1Player) {
        game1Player.style.backgroundImage = cssSpritePath;
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
    {
        id: 'Egg1',
        name: 'Babytchi',
        available: true,
        sprite: petSpecies.Eggs.Egg1.sprite,
        species: petSpecies.Eggs.Egg1
    },
    {
        id: 'Egg2',
        name: 'Shirobabytchi',
        available: true,
        sprite: petSpecies.Eggs.Egg2.sprite,
        species: petSpecies.Eggs.Egg2
    }
];

const createSelectedPet = () => {
    const choice = petChoices[selectedPet - 1];

    pet = newPet();
    pet.species = choice.species;
    pet.name = choice.name;
    pet.anim = 'idle';
    pet.pose = 1;

    deathFrame = undefined;

    currentsprite = choice.sprite;
   currentSpecies = choice.species;
    updateSprite();

    initializeCareRequestSystem();

    petAnim();
    togglePetSelect();
    updateUI();

    logEntry(`New pet selected, ${pet.name} (${pet.species})`);
};

function gameLoop() {
    tick++;
    pet.age += 1;

    updateTime();

    if (!pet.alive) return;

    updateCareRequestSystem();

    if (tick % 300 === 0) { // every 5 minutes
        pet.hunger -= 1;
    }

    if (tick % 180 === 0) { // every 3 minutes
        pet.energy -= 1;
    }

    if (tick % 240 === 0) { // every 4 minutes
        pet.hygene -= 1;
    }

    checkEvolution();
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
    hungryBubbles.forEach((bubble) => {
        bubble.classList.toggle(
            'hidden',
            !pet.hungry
        );
    });

    tiredBubbles.forEach((bubble) => {
        bubble.classList.toggle(
            'hidden',
            !pet.tired
        );
    });

    dirtyBubbles.forEach((bubble) => {
        bubble.classList.toggle(
            'hidden',
            !pet.dirty
        );
    });
};

const updateStatusbars = () => {
    updateHungerBar();
    updateEnergyBar();
    updateHygeneBar();
    updateGeneralMoodBar();
};

const updatePetName = () => {
    document.querySelectorAll(".petNameDisplay").forEach((nameDisplay) => {
    nameDisplay.textContent = pet.name;
});
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
    if (!canUseCareAction('hungry')) {
        return;
    }

    currentRoom = 1;
    checkSelection();

    completeCareRequest('hungry');
    petFeeding();

    logEntry(`${pet.name} was fed.`);
};

const restPet = () => {
    if (!canUseCareAction('tired')) {
        return;
    }

    currentRoom = 2;
    checkSelection();

    completeCareRequest('tired');
    petSleeping();

    logEntry(`${pet.name} went to sleep.`);
};

const cleanPet = () => {
    if (!canUseCareAction('dirty')) {
        return;
    }

    currentRoom = 3;
    checkSelection();

    completeCareRequest('dirty');
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
    gamePlayedCount2 += 1; // remove later
};

const game2Right = () => {
    updateMiniGameStatus('game2', 'Game 2: right button pressed.');
};

const game3Left = () => {
    updateMiniGameStatus('game3', 'Game 3: left button pressed.');
};

const game3Center = () => {
    updateMiniGameStatus('game3', 'Game 3: center button pressed.');
    gamePlayedCount3 += 1; // remove later
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
    gamePlayedCount1 += 1;
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


// game 3 - rock paper scissors


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

    loadFromLocalstorage();

    logWindow.innerHTML =
        localStorage.getItem('eventLog') || '';

    prepareGame1Menu();

    setScreen('home');
    togglePetSelect();

    updateTime();
    updateUI();

    // delay rendering & size calc until DOM is fully loaded
    requestAnimationFrame(() => {
        setPetWrapperSize();
        renderPreviewSprites();

        if (pet.alive) {
            updateSprite();
            updatePet();
        }
    });

    petAnim();
    updateMood();

    setInterval(gameLoop, 1000);
    setInterval(saveToLocalStorage, 300000);
};

init();