const Config = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 600,
    mainCircleRadius: 5,
    mainCircleColor: "#F13830",
    secondaryCircleRadius: 1,
    secondaryCircleColor: "#000000",
    travelDistance: 0.5,
    circlesPerSecond: 1
};


document.getElementById('circlesSecond').addEventListener('input', function(){
    this.parentElement.getElementsByClassName('inputValue')[0].textContent = this.value;
    Config.circlesPerSecond = this.value;
});

document.getElementById('travelDistance').addEventListener('input', function(){
    this.parentElement.getElementsByClassName('inputValue')[0].textContent = this.value + "%";
    Config.travelDistance = this.value/100;
});

