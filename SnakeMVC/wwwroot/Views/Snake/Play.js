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

        setInterval(function () {
            $(document).on("keydown", function (event) {
                snakeController();
            }); 
        }, 750);

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

    function moveSnakeNew() {

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

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake");
        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').removeClass('snake');            
        
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

        if ($('.gridRow.' + (snakeTailY-1) + '').children('.gridCol.' + snakeTailX + '').hasClass('snake')) {
            snakeTailY--;
        }
        else if ($('.gridRow.' + (snakeTailY + 1) + '').children('.gridCol.' + snakeTailX + '').hasClass('snake')) {
            snakeTailY++;
        }
        else if ($('.gridRow.' + snakeTailY + '').children('.gridCol.' + (snakeTailX - 1) + '').hasClass('snake')) {
            snakeTailX--;
        }
        else if ($('.gridRow.' + snakeTailY + '').children('.gridCol.' + (snakeTailX + 1) + '').hasClass('snake')) {
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

    
    function snakeController() {

        var pressedKey = event.key;

        switch (pressedKey) {
            case "w" || "W":
                setInterval(function () {
                    snakeHeadY--;
                    moveSnakeNew();
                }, 750);
                break;
            case "a" || "A":
                setInterval(function () {
                    snakeHeadX--;
                    moveSnakeNew();
                }, 750);
                break;
            case "s" || "S":
                setInterval(function () {
                    snakeHeadY++;
                    moveSnakeNew();
                }, 750);
                break;
            case "d" || "D":
                setInterval(function () {
                    snakeHeadX++;
                    moveSnakeNew();
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



})