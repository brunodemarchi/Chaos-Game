const Game = function (canvas, config) {
    const self = this;
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext("2d");
    this.config = config;
    this.running = false;

    // MOUSE LOGIC
    this.mouseCircle = new Circle(this.context, this.config.mainCircleColor, this.config.mainCircleRadius, {
        x: -100,
        y: -100
    }); // out of bounds
    this.isMouseIn = false;

    this.onClick = function (event) {
        if (!self.running) {
            self.addMainCircle(event);
        }
    };

    this.onMouseMove = function (event) {
        if (!self.isMouseIn) {
            self.isMouseIn = true;
        }
        let pos = self.getMousePos(event);
        self.mouseCircle.position = pos;
    };

    this.onMouseOut = function () {
        self.isMouseIn = false;
        self.mouseCircle.position = {x: -100, y: -100};
    };

    this.getMousePos = function (event) {
        const rect = self.canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    // MAIN CIRCLES / POINTS

    this.mainCircles = [];
    this.addMainCircle = function (event) {
        let pos = self.getMousePos(event);
        let newCircle = new Circle(self.context, self.config.mainCircleColor, self.config.mainCircleRadius, pos);
        newCircle.name = "Point " + arrLengthToLetter(self.mainCircles.length).toUpperCase();
        self.mainCircles.push(newCircle);
        this.updateStartButton();

    };

    this.updateStartButton = function () {
        let startButton = document.getElementById('startButton');
        startButton.disabled = !(self.mainCircles.length >= 2 && !self.running); // needs two circles to start the game
    };

    // CLEAR

    this.reset = function (clearAll) {
        if (clearAll) {
            self.mainCircles = [];
        }
        self.running = false;
        self.updateStartButton();
    };


    this.init = function () {
        this.canvas.setAttribute("height", this.config.GAME_HEIGHT);
        this.canvas.setAttribute("width", this.config.GAME_WIDTH);
        this.canvas.addEventListener('click', this.onClick);
        this.canvas.addEventListener('mousemove', this.onMouseMove);
        this.canvas.addEventListener('mouseout', this.onMouseOut);
        requestAnimationFrame(self.update)
    };

    this.update = function () {
        if (!self.running) {
            self.context.clearRect(0, 0, self.config.GAME_WIDTH, self.config.GAME_HEIGHT);
            self.mouseCircle.draw();
            self.mainCircles.forEach(function (circle) {
                circle.draw();
            });
        }

        requestAnimationFrame(self.update);
    };

    //START GAME  +  ANIMATION

    this.startGame = function () {
        self.running = true;
        self.updateStartButton();
        self.addSecondaryCircles();
    };

    this.lastSecondaryCirclePosition = {x: self.config.GAME_WIDTH / 2, y: self.config.GAME_HEIGHT / 2};
    this.addSecondaryCircles = function () {
        if (self.running) {
            let newCircle = new Circle(self.context, self.config.secondaryCircleColor, self.config.secondaryCircleRadius, self.getRandomPosition());
            newCircle.draw();

            setTimeout(self.addSecondaryCircles, 1000 / self.config.circlesPerSecond);
        }
    };

    this.getRandomPosition = function () {
        const randomMainCircle = self.mainCircles[Math.floor(Math.random() * self.mainCircles.length)];
        const posX = lerp(randomMainCircle.position.x, self.lastSecondaryCirclePosition.x, self.config.travelDistance);
        const posY = lerp(randomMainCircle.position.y, self.lastSecondaryCirclePosition.y, self.config.travelDistance);
        self.lastSecondaryCirclePosition = {x: posX, y: posY};
        return self.lastSecondaryCirclePosition;
    }

};


const chaosGame = new Game("gameCanvas", Config);
chaosGame.init();

