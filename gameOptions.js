let gameOptions = {
    // width of the game
    width: 640,

    // height of the game
    height: 960,

    // name of the container for the game
    container: 'thegame',

    // gravity of bird
    birdGravity: 800,

    // speed of bird
    birdSpeed: 200,

    // strength of the flap
    birdFlapPower: 400,

    // max bird angle
    birdAngle: 30,

    // minimum pipe height
    minPipeHeight: 150,

    // distance between pipes
    pipeDistance: [300, 350],

    // length of the hole
    pipeHole: [200, 260],

    // name of the font
    fontName: 'Amatic SC',

    // background color
    backgroundColor: '#6dcff6',

    // music volume
    soundVolume: 0.2,

    // local storage variable name
    localStorage: 'UniFlyTopScore'
};

export default gameOptions;