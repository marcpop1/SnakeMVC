﻿$(document).ready(function () {
    var height = $('#gridHeight').val();
    var width = $('#gridWidth').val();

    var snakeHeadX = 12;
    var snakeHeadY = 12;

    var snakeTailX = 12;
    var snakeTailY = 15;

    var snakeLength = 4;

    var snakeBodyX;
    var snakeBodyY;

    var snakeMovementIntervalTime = 300;

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

    var applePositionX;
    var applePositionY;

    var min = 0;
    var max = height - 1;

    let score = 0;

    var gameIsPaused = false;

    var saveGame = {};

    var game = {};

    var apple = {};

    var snakeBodyPositionX;
    var snakeBodyPositionY;

    var snakeBodyPositionsXY = {};
    var snakeBody = [
        {
            SnakeBodyPositionsX: -1,
            SnakeBodyPositionsY: -1
        }
    ];

    
    $('#submitButton').on("click", function () {
        
        debugger;
        deleteSavedGame();


        createGrid(height, width);
        debugger;
        snakeShowScore();
        spawnSnake();
        

        if (!isMoving) {
            $(document).on("keydown", function (event) {
                if (!isMoving) {
                    snakeController();
                }
            });
        }

        appleRandomSpawn();

        snakeMovement = setInterval(function () {
            if (!gameIsPaused) {
                moveSnakeNew(snakeCurrentDirection);
            }
        }, snakeMovementIntervalTime);

        $(document).on("keydown", function (event) {
            snakePauseGame();
            showOrHidePauseModal();
        });

        $('#resumeButton').on('click', function () {
            gameIsPaused = false;
            showOrHidePauseModal();
        });

        $("#saveGameButton").on("click", function () {
            debugger;
            deleteSavedGame();
            saveCurrentGame();

        })

    });

    $('#loadGameButton').on("click", function () {


        debugger;

        createGrid(height, width);

        loadGame();



        if (!isMoving) {
            $(document).on("keydown", function (event) {
                if (!isMoving) {
                    snakeController();
                }
            });
        }

        

        snakeShowScore();

        snakeMovement = setInterval(function () {
            if (!gameIsPaused) {
                moveSnakeNew(snakeCurrentDirection);
            }
        }, snakeMovementIntervalTime);

        $(document).on("keydown", function (event) {
            snakePauseGame();
            showOrHidePauseModal();
        });

        $('#resumeButton').on('click', function () {
            gameIsPaused = false;
            showOrHidePauseModal();
        });

        $("#saveGameButton").on("click", function () {
            debugger;
            deleteSavedGame();
            saveCurrentGame();

        })

    });

    

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

    // initializes the snake's body's positions with the default positions
    function initializeSpawnSnake() {

        //$('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake s1");
        //$('.gridRow.13').children('.gridCol.12').addClass('snake s2');
        //$('.gridRow.14').children('.gridCol.12').addClass('snake s3');
        //$('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').addClass('snake s' + snakeLength + '');

        snakeBodyPositionX = snakeHeadX;
        snakeBodyPositionY = snakeHeadY;

        for (i = 0; i < snakeLength; i++) {
            snakeBodyPositionsXY = {
                snakeBodyPositionsX: snakeBodyPositionX,
                snakeBodyPositionsY: snakeBodyPositionY
            }
            snakeBody.push(snakeBodyPositionsXY);

            snakeBodyPositionY++;

        }

    }
    
    // spawns the snake
    function spawnSnake() {
        debugger;
        if (snakeBody.length <= 1) {
            initializeSpawnSnake();
        }

        for (i = 1; i <= snakeLength; i++) {
            $('.gridRow.' + snakeBody[i].snakeBodyPositionsY + '').children('.gridCol.' + snakeBody[i].snakeBodyPositionsX + '').addClass('snake s' + i + '');
        }

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
            deleteSavedGame();
            location.reload();
            score = 0;
        }

        isMoving = false;

    }

    //performs the snakes movement
    function snakePerformMovement() {

        debugger;

        snakeHeadX = checkLimit(snakeHeadX, width);
        snakeHeadY = checkLimit(snakeHeadY, height);

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake s1");

        snakeBodyX = snakeHeadX;
        snakeBodyY = snakeHeadY;

        for (i = 1; i < snakeLength; i++) {

            snakeBodyX = checkLimit(snakeBodyX, width);
            snakeBodyY = checkLimit(snakeBodyY, height);

            if ($('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake s' + i + '')) {
                $('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').removeClass('s' + i + '');
                $('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').addClass('s' + (i + 1) + '');
                snakeBodyY--;
            }
            else if ($('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake s' + i + '')) {
                $('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').removeClass('s' + i + '');
                $('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').addClass('s' + (i + 1) + '');
                snakeBodyY++;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').hasClass('snake s' + i + '')) {
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').removeClass('s' + i + '');
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').addClass('s' + (i + 1) + '');
                snakeBodyX--;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').hasClass('snake s' + i + '')) {
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').removeClass('s' + i + '');
                $('.gridRow.' + (snakeBodyY) + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').addClass('s' + (i + 1) + '');
                snakeBodyX++;
            }
        }

        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').removeClass('snake s' + snakeLength + '');

        snakeTailX = checkLimit(snakeBodyX, width);
        snakeTailY = checkLimit(snakeBodyY, height);

        if (appleCollisionTrue()) {
            snakeLength++;
            $('.gridRow.' + applePositionY + '').children('.gridCol.' + applePositionX + '').removeClass('apple');
            appleRandomSpawn();
        }

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

    // checks if collision with apple is true
    function appleCollisionTrue() {

        if ($('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').hasClass('apple')) {
            score++;
            snakeShowScore();
            return true;
        }
        return false;

    }

    // spawns the apple randomly on the map
    function appleRandomSpawn() {

        appleRandomizePosition();
        
        if (!$('.gridRow.' + applePositionY + '').children('.gridCol.' + applePositionX + '').hasClass('snake')) {
            $('.gridRow.' + applePositionY + '').children('.gridCol.' + applePositionX + '').addClass('apple');
        }
        else {
            appleRandomSpawn();
        }

    }

    // randomizes the apple's position
    function appleRandomizePosition() {
        applePositionX = Math.floor(Math.random() * (max - min + 1)) + min;
        applePositionY = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // spawns the apple on the last saved game's position
    function appleLoadSpawn() {

        $('.gridRow.' + applePositionY + '').children('.gridCol.' + applePositionX + '').addClass('apple');

    }

    // shows and updates the snake's score
    function snakeShowScore() {
        $('.score').remove();
        $("#main").append('<h1 class="text-center score">Score: ' + score + '</h1>');

    }

    // if escape key is pressed game gets paused/unpaused
    function snakePauseGame() {

        var pauseKey = event.key;

        if (pauseKey == "Escape") {

            if (!gameIsPaused) {
                gameIsPaused = true;
            }
            else if (gameIsPaused) {
                gameIsPaused = false;
            }

        }

    }

    // if game is paused/unpaused modal is shown/unshown
    function showOrHidePauseModal() {
        if (gameIsPaused) {
            $('body').addClass('gamePausedTable');

            $('#pauseModal').css('display', 'block');
        }
        else if (!gameIsPaused) {
            $('body').removeClass('gamePausedTable');

            $('#pauseModal').css('display', 'none');
        }
    }

    // sets the game, apple, snake objects and creates the savegame object wich is sent through the ajax post call to the controller
    function saveCurrentGame() {

        game = {
            Score: score,
            SnakeLength: snakeLength,
            SnakeDirection: snakeCurrentDirection
        }; 

        apple = {
            ApplePositionX: applePositionX,
            ApplePositionY: applePositionY 
        };

        createSnakeArray();

        saveGame = {
            game: game,
            apple: apple,
            snake: snakeBody
        }

        $.ajax({
            type: "POST",
            url: '/Snake/SaveGame',
            dataType: "text",
            data: { gameInput: JSON.stringify(saveGame) },
            success: function () {
                debugger;
                alert("Game Saved Successfully!");
                window.location.href = "/Snake/Play";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert("Some error occurred");
                console.log(xhr, ajaxOptions, thrownError);
                window.location.href = "/Snake/Play";
            }
        });

    }

    // creates the array containing the snake's body's positions
    function createSnakeArray() {
        snakeBody = [];
        debugger;
        snakeBodyX = snakeHeadX;
        snakeBodyY = snakeHeadY;

        for (i = 2; i <= (snakeLength + 1); i++) {

            snakeBodyX = checkLimit(snakeBodyX, width);
            snakeBodyY = checkLimit(snakeBodyY, height);

            snakeBodyPositionsXY = {
                SnakeBodyPositionX: snakeBodyX,
                SnakeBodyPositionY: snakeBodyY
            }

            snakeBody.push(snakeBodyPositionsXY);

            if ($('.gridRow.' + (checkLimit(snakeBodyY - 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake s' + i + '')) {
                snakeBodyY--;
            }
            else if ($('.gridRow.' + (checkLimit(snakeBodyY + 1, height)) + '').children('.gridCol.' + snakeBodyX + '').hasClass('snake s' + i + '')) {
                snakeBodyY++;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX - 1, width)) + '').hasClass('snake s' + i + '')) {
                snakeBodyX--;
            }
            else if ($('.gridRow.' + snakeBodyY + '').children('.gridCol.' + (checkLimit(snakeBodyX + 1, width)) + '').hasClass('snake s' + i + '')) {
                snakeBodyX++;
            }

        }
        debugger;
    }

    function loadGame() {
        debugger;
        $.ajax({
            type: "GET",
            url: "/Snake/LoadGameGame",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                debugger;
                if (response != null) {
                    score = response.score;
                    snakeLength = response.snakeLength;
                    snakeCurrentDirection = response.snakeDirection;
                    snakeShowScore();
                }
                else {
                    alert("Something went wrong");
                    location.reload();
                }
            },
            failure: function (response) {
                alert("Failure");
            },
            error: function (response) {
                alert("Error");
            }
        });
        debugger;
        $.ajax({
            type: "GET",
            url: "/Snake/LoadGameApple",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                
                if (response != null) {
                    applePositionX = response.applePositionX;
                    applePositionY = response.applePositionY;
                    appleLoadSpawn();
                }
                else {
                    alert("Something went wrong for apple");
                }
            },
            failure: function (response) {
                alert("Failure");
            },
            error: function (response) {
                alert("Error");
            }
        });
        debugger;
        $.ajax({
            type: "GET",
            url: "/Snake/LoadGameSnake",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response != null) {
                    for (i = 0; i < snakeLength; i++) {
                        snakeBodyPositionsXY = {
                            snakeBodyPositionsX: response[i].snakeBodyPositionX,
                            snakeBodyPositionsY: response[i].snakeBodyPositionY
                        }
                        snakeBody.push(snakeBodyPositionsXY);
                    }
                    debugger;
                    snakeHeadX = response[0].snakeBodyPositionX;
                    snakeHeadY = response[0].snakeBodyPositionY;
                    snakeTailX = response[snakeLength - 1].snakeBodyPositionX;
                    snakeTailY = response[snakeLength - 1].snakeBodyPositionY;
                    spawnSnake();
                }
                else {
                    alert("Something went wrong for snake");
                }
            },
            failure: function (response) {
                alert("Failure");
            },
            error: function (response) {
                alert("Error");
            }
        });

    }

    // calls the DeleteSavedGame method from the controller wich deletes the last saved game
    function deleteSavedGame() {

        $.ajax({
            url: '/Snake/DeleteSavedGame'
        });

    }

})