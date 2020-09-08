$(document).ready(function () {
    var height = $('#gridHeight').val();
    var width = $('#gridWidth').val();

    $('#submitButton').on("click", function () {
        
        createGrid(height, width);
        spawnSnake();
    });


    function createGrid(height, width) {

        $('#grid').remove();

        $('#table').append('<table id="grid"></table')

        for (i = 0; i < height; i++) {
            $('#grid').append('<tr class="gridRow-' + i + '"></tr>');
            for (j = 0; j < width; j++) {
                $('.gridRow-' + i +'').append('<td class="gridCol-' + j + '"></td>');

            }
        }
        

        $('#gridInput').remove();

    }


    function spawnSnake() {

        $('.gridRow 12').children('.gridCol 12').addClass("snake");
        $('.gridRow 13').children('.gridCol 12').addClass('snake');
        $('.gridRow 14').children('.gridCol 12').addClass('snake');
        $('.gridRow 15').children('.gridCol 12').addClass('snake');

    }

})