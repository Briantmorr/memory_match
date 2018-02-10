$(document).ready(initializeApp);

var gamesPlayed = 0;
var attempts = 0;
var accuracy = 100;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 12;
var match_counter = 0;
var cardFronts = [
    'assets/fruitCards/banana.png',
    'assets/fruitCards/Blueberries.png',
    'assets/fruitCards/cherries.png',
    'assets/fruitCards/grapes.png',
    'assets/fruitCards/kiwi.png',
    'assets/fruitCards/lemon.png',
    'assets/fruitCards/orange.png',
    'assets/fruitCards/pear.png',
    'assets/fruitCards/Pineapple.png',
    'assets/fruitCards/strawberry.png',
    'assets/fruitCards/watermelon.png',
    'assets/fruitCards/Pineapple.png'
    ];


var pairTracker = {};
function initializeApp(){
        console.log("initializing app...");
        createBoard();

        $('.reset').on('click', resetBoard);

        var code = 0;
    // $(document).on('keydown',function(e) {
    //     console.log('keypress');
    //     code = (e.keyCode ? e.keyCode : e.which);
    // });
    // debugger;
    // handleMovement(code);
    //var grabCode;
    handleMovement();


}
// $(document).on('keydown',function(e) {
//     var code = (e.keyCode ? e.keyCode : e.which);
//     grabCode = code;
//
//     switch (code) {
//         case 40:
//             alert("Down pressed");
//             handleMovement(code);
//             break;
//         case 38:
//             alert("Up pressed");
//             handleMovement(code);
//             break;
//         case 37:
//             alert("Left pressed");
//             handleMovement(code);
//
//             break;
//         case 39:
//             alert("Right pressed");
//             handleMovement(code);
//             break;
//         case 13:
//             alert("enter pressed");
//             handleMovement(code);
//             break;
//     }
// });
function createBoard(){
    var w = '80px';
    var h = w;
    for(var i = 1; i <= 5; i++) {
        var row = $('<div>', {
            class: 'bigRow' + i,
        });
        for(var x = 1; x <= 5; x++){
            var column = $('<div>', {
                class: 'column' + x + ' ' + 'row' + i + ' ' + 'cardBack' + ' ' + 'card',
                css:{
                    width:w,
                    height:h,
                    margin:'2px',
                    display:'inline-block',
                    //'background-image': "url(" + cardFronts[randomCardIndexes()] + ")",
                },
                on:{
                    'click': cardFlip}
                //text:'R' + i + 'C' + x
            });
            if(column.attr('class').indexOf('column3 row3') === -1){
                var image = $('<img>').attr('src',  cardFronts[randomCardIndexes()]).addClass('imageFront');
                //var monkey = $('<img>').attr('src',  'assets/monkeyTest3.png').attr('class', 'monkey');
                column.append(image);

            }
            row.append(column);
        }
        $('#board').append(row);
    }

}

function cardFlip(){
    var clickedCard = $(this)

    //disable clicks for faded cards and disables clicks when two cards are already up.
    // Also disables reclicking first card
    if(clickedCard.attr('class').indexOf('cardFade') === -1
        && second_card_clicked === null) {
        if(first_card_clicked !== null
            && first_card_clicked[0] === clickedCard[0]){

            return;
        }
        clickedCard.toggleClass('cardBack');
        if (clickedCard.attr('class').indexOf('cardBack') === -1) {

            checkMatch(clickedCard);
        }
    }
}
function resetBoard(){
    $('#win').css('display','none');
    $('.card').removeClass('cardBack');
    setTimeout(function(){
        $('.card').removeClass('cardFade');
        $('.card').addClass('cardBack');
    },2000);
    //workaround to move monkey back to start
    handleMovement('reset');
    first_card_clicked = null;
    second_card_clicked = null;
     attempts = 0;
     accuracy = 100;
     match_counter = 0;
     gamesPlayed++;
}
function checkMatch(clickedCard) {
    //debugger;
    if (first_card_clicked === null) {
        first_card_clicked = clickedCard;

    }
    else if(first_card_clicked.attr('class') === clickedCard.attr('class')){
        first_card_clicked = null;
    }

    else {
        attempts++;
        second_card_clicked = clickedCard;
        var image1 = first_card_clicked.children('img').attr('src');
        var image2 = second_card_clicked.children('img').attr('src');
        if (image1 === image2) {
            match_counter++;

            first_card_clicked.off('click');
            second_card_clicked.off('click');
            setTimeout(function () {
               first_card_clicked.addClass('cardFade');
               second_card_clicked.addClass('cardFade');
               first_card_clicked = null;
               second_card_clicked = null;
               if(total_possible_matches === match_counter)
               {
                   winning();
               }
            }, 1800);

        }
        else {

            setTimeout(function () {
                second_card_clicked.toggleClass('cardBack');
                first_card_clicked.toggleClass('cardBack');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 500);
        }
        updateStats();
    }
}

function updateStats(){
    $('#attempts .value').text(attempts);
    $('#accuracy .value').text((match_counter / attempts   * 100) + '%');
}
function handleMovement(reset, code){
    //moveMonkey(start);
    var active = {
        position: $('.row3.column3'),
        getColumn: function() {
            var currentColumnIndex = this.position.attr('class').indexOf('column');
            return parseInt(this.position.attr('class')[currentColumnIndex + 6]);
        },
        getRow: function(){
            var currentRowIndex = this.position.attr('class').indexOf('row');
            return parseInt(this.position.attr('class')[currentRowIndex + 3]);
        },
        moveUp: function(){
            var row = this.getRow() - 1;
            var column = this.getColumn();
            var newPosition = $('.column' + column + '.row' + row);
            this.position = newPosition;
            moveMonkey(active);
        },
        moveDown: function(){
            var row = this.getRow() + 1;
            var column = this.getColumn();
            var newPosition = $('.column' + column + '.row' + row);
            this.position = newPosition;
            moveMonkey(active);
        },
        moveLeft: function(){
            var row = this.getRow();
            var column = this.getColumn() - 1;
            var newPosition = $('.column' + column + '.row' + row);
            this.position = newPosition;
            moveMonkey(active);
        },
        moveRight: function(){
            var row = this.getRow();
            var column = this.getColumn() + 1;
            var newPosition = $('.column' + column + '.row' + row);
            this.position = newPosition;
            moveMonkey(active);
        },
        click: function(){
            monkeyClick(this.position);
        },
        moveToStart(){
           
            this.position = $('.row3.column3');
            moveMonkey(active);
            $('.monkey').css({
                top: this.position().top + 180,
                left: this.position().left
            });
        }

    };
    if(reset === 'reset'){
        active.moveToStart();
        return;
    }

    var start = $('.row3.column3');
        start.toggleClass('startingPosition').off().removeClass('cardBack cardFront');



        var monkey = $('<img>').attr('src', 'assets/monkeyTest1.png');
        monkey.addClass('monkey').css({
            top: start.position().top + 180,
            left: start.position().left
        });
        $('body').append(monkey);




    var up = $('#up');

    up.on('click', function(){
        active.moveUp();
    });
    var down = $('#back');
    down.on('click', function(){
        active.moveDown();
    });
    var left = $('#left');
    left.on('click', function(){
        active.moveLeft();
    });
    var right = $('#right');
    right.on('click', function(){
        active.moveRight();
    });
    var click = $('#click');
    click.on('click', function(){
        active.click();
    });
    switch (code) {
        case 40:
            console.log('move up key');
            active.moveDown();
            break;
        case 38:
            active.moveUp();
            break;
        case 37:
            active.moveLeft();
            break;
        case 39:
            active.moveRight();
            break;
        case 13:
            active.click();
            break;
    }

}
function monkeyClick(position){
    var top = parseFloat(position.position().top);
     $('.monkey').animate({
            top:   top + 145 },400);
     setTimeout(function(){
         position.click()},800);
}

function moveMonkey(active){
    debugger;
    var top = active.position.position().top + 180;
    var left = active.position.position().left;

    $('.monkey').animate({
        left: left,
        top: top},
        800);

}
function randomCardIndexes(){
    var random = Math.floor(Math.random() * cardFronts.length);
    while(pairTracker[random] >= 2){
        random = Math.floor(Math.random() * cardFronts.length);
    }
    if(pairTracker[random] === undefined){
        pairTracker[random] = 1;
    }
    else{
        pairTracker[random] += 1;
    }

    return random;
}

function winning(){
    console.log('you won!');
    $('#win').css('display','block');
}



