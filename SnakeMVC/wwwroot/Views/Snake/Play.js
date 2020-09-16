$(document).ready(function () {
    var height = $('#gridHeight').val();
    var width = $('#gridWidth').val();

    $('#submitButton').on("click", function () {

        createGrid(height, width);
        spawnSnake();
        

        if (!isMoving) {
            $(document).on("keydown", function (event) {
                if (!isMoving) {
                    snakeController();
                }
            });
        }

        snakeMovement = setInterval(function () {
            moveSnakeNew(snakeCurrentDirection);
        }, snakeMovementIntervalTime);

    });

    var snakeHeadX = 12;
    var snakeHeadY = 12;

    var snakeTailX = 12;
    var snakeTailY = 15;

    var snakeLength = 4;

    var snakeBodyX;
    var snakeBodyY;

    var snakeMovementIntervalTime = 650;

    var snakeMovement = setInterval(function () {
        moveSnakeNew(snakeCurrentDirection);
    }, snakeMovementIntervalTime);
    clearInterval(snakeMovement);

    var pressedKey;
    var lastPressedKey;

    var snakeDirections = {
        Up: 1,
        Left: 2,
        Down: 3,
        Right: 4,
        Stop: 0
    }

    var snakeCurrentDirection = snakeDirections.Up;

    var isMoving;

    // creates the grid with the (hardcoded) input values
    function createGrid(height, width) {

        $('#grid').remove();

        $('#table').append('<table id="grid"></table')

        for (i = 0; i < height; i++) {
            $('#grid').append('<tr class="gridRow ' + i + '"></tr>');
            for (j = 0; j < width; j++) {
                $('.gridRow.' + i + '').append('<td class="gridCol ' + j + '"></td>');

            }
        }


        $('#gridInput').remove();

    }

    // spawns the snake with the body length of 4
    function spawnSnake() {

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake 1");
        $('.gridRow.13').children('.gridCol.12').addClass('snake 2');
        $('.gridRow.14').children('.gridCol.12').addClass('snake 3');
        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').addClass('snake ' + snakeLength + '');


    }

    // moves the snake based on input
    function moveSnakeNew(input) {

        isMoving = true;

        if (input == 1) {
            snakeHeadY--;
        }
        else if (input == 2) {
            snakeHeadX--;
        }
        else if (input == 3) {
            snakeHeadY++;
        }
        else if (input == 4) {
            snakeHeadX++;
        }
        else {

        }
        
        if (!snakeCollisionWithBodyTrue()) {
            snakePerformMovement();
        }
        else {
            alert("Game Over");
            location.reload();
        }

        isMoving = false;

    }

    //performs the snakes movement
    function snakePerformMovement() {

        snakeHeadX = checkLimit(snakeHeadX, width);
        snakeHeadY = checkLimit(snakeHeadY, height);

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake 1");

        snakeBodyX = snakeHeadX;
        snakeBodyY = snakeHeadY;

        for (i = 1; i < snakeLength; i++) {

            snakeBodyX = checkLimit(snakeBodyX, width);
            snakeBodyY = checkLimit(snakeBodyY, height);

            if ($('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake ' + i + '')) {
                $('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').removeClass('' + i + '');
                $('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').addClass('' + (i + 1) + '');
                snakeBodyY--;
            }
            else if ($('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake ' + i + '')) {
                $('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').removeClass('' + i + '');
                $('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').addClass('' + (i + 1) + '');
                snakeBodyY++;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').hasClass('snake ' + i + '')) {
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').removeClass('' + i + '');
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').addClass('' + (i + 1) + '');
                snakeBodyX--;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').hasClass('snake ' + i + '')) {
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').removeClass('' + i + '');
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').addClass('' + (i + 1) + '');
                snakeBodyX++;
            }
        }

        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').removeClass('snake ' + snakeLength + '');

        snakeTailX = checkLimit(snakeBodyX, width);
        snakeTailY = checkLimit(snakeBodyY, height);

    }

    // function that checks if an int reached its limit and resets it
    function checkLimit(input, limit) {
        var diff;
        if (input < 0) {
            diff = Math.abs(0 - input);
            input = limit - diff;
        }
        else if (input >= limit) {
            diff = Math.abs(limit - input);
            input = diff;
        }

        return input;
    }

    // listens to keyboard input and sets the snakes direction
    function snakeController() {

        debugger;

        pressedKey = event.key;

        if (snakeControllerRules()) {

            switch (pressedKey.toLowerCase()) {
                case "w":
                    snakeCurrentDirection = snakeDirections.Up;
                    lastPressedKey = pressedKey;
                    break;
                case "a":
                    snakeCurrentDirection = snakeDirections.Left;
                    lastPressedKey = pressedKey;
                    break;
                case "s":
                    snakeCurrentDirection = snakeDirections.Down;
                    lastPressedKey = pressedKey;
                    break;
                case "d":
                    snakeCurrentDirection = snakeDirections.Right;
                    lastPressedKey = pressedKey;
                    break;
            }

        }

    }

    // checks if the keyboard input is correct to perform the movement
    function snakeControllerRules() {

        if (lastPressedKey == pressedKey) {
            return false;
        }

        if (lastPressedKey == "s" && pressedKey == "w") {
            return false;
        }
        else if (lastPressedKey == "w" && pressedKey == "s") {
            return false;
        }
        else if (lastPressedKey == "a" && pressedKey == "d") {
            return false;
        }
        else if (lastPressedKey == "d" && pressedKey == "a") {
            return false;
        }

        if (snakeCurrentDirection == snakeDirections.Down && pressedKey == "w") {
            return false;
        }
        else if (snakeCurrentDirection == snakeDirections.Up && pressedKey == "s") {
            return false;
        }
        else if (snakeCurrentDirection == snakeDirections.Left && pressedKey == "d") {
            return false;
        }
        else if (snakeCurrentDirection == snakeDirections.Right && pressedKey == "a") {
            return false;
        }

        return true;
    }

    // checks for collision with the snakes body
    function snakeCollisionWithBodyTrue() {

        if ($('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').hasClass('snake')) {
            return true;
        }
        return false;

    }

})