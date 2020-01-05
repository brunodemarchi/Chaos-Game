const Circle = function (context, color, radius, position,) {
    this.context = context;
    this.color = color;
    this.radius = radius;
    this.position = position;
    this.name = "";
    this.draw = function () {
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        this.context.fillStyle = this.color;
        this.context.fill();
        if (this.name) {
            this.context.font = "15px Arial";
            this.context.fillText(this.name, this.position.x + 10, this.position.y + 10);
        }

    }
};
