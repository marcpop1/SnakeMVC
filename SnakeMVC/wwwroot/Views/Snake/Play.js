$(document).ready(function () {
    var height = $('#gridHeight').val();
    var width = $('#gridWidth').val();

    $('#submitButton').on("click", function () {

        createGrid(height, width);
        spawnSnake();
        debugger;

        //setInterval(function () {
        //    moveSnakeNew();
        //}, 750);

        $(document).on("keydown", function (event) {
            snakeController();
        }); 

        //setInterval(function () {
            
        //}, 750);

    });


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

    var snakeHeadX = 12;
    var snakeHeadY = 12;

    var snakeTailX = 12;
    var snakeTailY = 15;

    var snakeLength = 4;

    function spawnSnake() {

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake 1");
        $('.gridRow.13').children('.gridCol.12').addClass('snake 2');
        $('.gridRow.14').children('.gridCol.12').addClass('snake 3');
        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').addClass('snake ' + snakeLength +'');


    }

    function moveSnake() {

        if (snakeHeadY > 0) {
            //debugger;
            snakeHeadY--;
            $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake");
            $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').removeClass('snake');

            if (snakeTailY > 0) {
                snakeTailY--;
            }
            else if (snakeTailY === 0) {
                snakeTailY = height - 1;
            }

        }
        if (snakeHeadY <= 0) {
            snakeHeadY = height;
        }

    }

    var snakeBodyX;
    var snakeBodyY;

    function moveSnakeNew(input) {

        //$(document).on("keydown", function (event) {
        //    var pressedKey = event.key;

        //    if (pressedKey === "W" || pressedKey === "w") {
        //        snakeHeadY--;
        //    }
        //    else if (pressedKey === "A" || pressedKey === "a") {
        //        snakeHeadX--;
        //    }
        //    else if (pressedKey === "S" || pressedKey === "s") {
        //        snakeHeadY++;
        //    }
        //    else if (pressedKey === "D" || pressedKey === "d") {
        //        snakeHeadX++;
        //    }

        //    switch (pressedKey) {
        //        case "w" || "W":
                    
        //    }

        //});
        //debugger;
        //snakeHeadY--;

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
        else if (input == null) {

        }

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake 1");

        snakeBodyX = snakeHeadX;
        snakeBodyY = snakeHeadY;

        for (i = 1; i < snakeLength; i++) {

            if (snakeBodyY < 0) {
                snakeBodyY = height - 1;
            }
            else if (snakeBodyY > (height - 1)) {
                snakeBodyY = 0;
            }
            else if (snakeBodyX < 0) {
                snakeBodyX = width - 1;
            }
            else if (snakeBodyX > (width - 1)) {
                snakeBodyX = 0;
            }

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
        
        if (snakeHeadY <= 0) {
            snakeHeadY = height;
        }
        else if (snakeHeadY >= height) {
            snakeHeadY = 0;
        }
        else if (snakeHeadX <= 0) {
            snakeHeadX = width;
        }
        else if (snakeHeadX >= width) {
            snakeHeadX = 0;
        }

        if ($('.gridRow.' + (snakeTailY - 1) + '').children('.gridCol.' + snakeTailX + '').hasClass('snake ' + snakeLength + '')) {
            snakeTailY--;
        }
        else if ($('.gridRow.' + (snakeTailY + 1) + '').children('.gridCol.' + snakeTailX + '').hasClass('snake ' + snakeLength + '')) {
            snakeTailY++;
        }
        else if ($('.gridRow.' + snakeTailY + '').children('.gridCol.' + (snakeTailX - 1) + '').hasClass('snake ' + snakeLength + '')) {
            snakeTailX--;
        }
        else if ($('.gridRow.' + snakeTailY + '').children('.gridCol.' + (snakeTailX + 1) + '').hasClass('snake ' + snakeLength + '')) {
            snakeTailX++;
        }
        else if (snakeTailY === 0) {
            snakeTailY = height - 1;
        }
        else if (snakeTailY === (height - 1)) {
            snakeTailY = 0;
        }
        else if (snakeTailX === 0) {
            snakeTailX = width - 1;
        }
        else if (snakeTailX === (width - 1)) {
            snakeTailX = 0;
        }

    }

    function checkLimit(input, limit) {
        if (input < 0) {
            input = limit - 1;
        }
        else if (input > (limit - 1)) {
            input = 0;
        }

        return input;

    }

    
    function snakeController() {

        var pressedKey = event.key;
        var snakeMovement = setInterval(function () {
            moveSnakeNew();
        }, 750);
        debugger;

        switch (pressedKey) {
            case "w" || "W":
                clearInterval(snakeMovement);
                snakeMovement = setInterval(function () {
                    moveSnakeNew(1);
                }, 750);
                
                break;
            case "a" || "A":
                clearInterval(snakeMovement);
                snakeMovement = setInterval(function () {
                    moveSnakeNew(2);
                }, 750);
                
                break;
            case "s" || "S":
                clearInterval(snakeMovement);
                snakeMovement = setInterval(function () {
                    moveSnakeNew(3);
                }, 750);
                
                break;
            case "d" || "D":
                clearInterval(snakeMovement);
                snakeMovement = setInterval(function () {
                    moveSnakeNew(4);
                }, 750);
                
                break;
            //default:
            //    setInterval(function () {
            //        snakeHeadY--;
            //        moveSnakeNew();
            //    }, 750);
            //    break;
        }
    }

    function snakeControllerNew() {

        var pressedKey = event.key;

        var snakeMovement;

        if (pressedKey == "w" || pressedKey == "W") {
            clearInterval(snakeMovement);
            snakeMovement = setInterval(function () {
                snakeHeadY--;
                moveSnakeNew();
            }, 750);
        }
        else if (pressedKey == "a" || pressedKey == "A") {
            clearInterval(snakeMovement);
            snakeMovement = setInterval(function () {
                snakeHeadX--;
                moveSnakeNew();
            }, 750);
        }
        else if (pressedKey == "s" || pressedKey == "S") {
            clearInterval(snakeMovement);
            snakeMovement = setInterval(function () {
                snakeHeadY++;
                moveSnakeNew();
            }, 750);
        }
        else if (pressedKey == "d" || pressedKey == "D") {
            clearInterval(snakeMovement);
            snakeMovement = setInterval(function () {
                snakeHeadX++;
                moveSnakeNew();
            }, 750);
        }

        //moveSnakeNew();

    }


})