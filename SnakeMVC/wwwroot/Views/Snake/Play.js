$(document).ready(function () {
    var height = $('#gridHeight').val();
    var width = $('#gridWidth').val();

    $('#submitButton').on("click", function () {

        createGrid(height, width);
        spawnSnake();
        setInterval(function () {
            moveSnake();
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

    function spawnSnake() {

        $('.gridRow.' + snakeHeadY + '').children('.gridCol.' + snakeHeadX + '').addClass("snake");
        $('.gridRow.13').children('.gridCol.12').addClass('snake');
        $('.gridRow.14').children('.gridCol.12').addClass('snake');
        $('.gridRow.' + snakeTailY + '').children('.gridCol.' + snakeTailX + '').addClass('snake');


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



})