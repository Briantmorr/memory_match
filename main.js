$(document).ready(initializeApp);

var gamesPlayed = 0;
var attempts = 0;
var accuracy = 100;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 12;
var match_counter = 0;

function initializeApp(){
        console.log("initializing app...");
        createBoard();
        $('.reset').on('click', resetBoard);
        handleMovement();
}

function createBoard(){
    var w = '80px';
    var h = w;
    for(var i = 1; i <= 5; i++) {
        var row = $('<div>', {
            class: 'bigrow' + i,
        });
        for(var x = 1; x <= 5; x++){
            var column = $('<div>', {
                class: 'column' + x + ' ' + 'row' + i + ' ' + 'cardBack',
                css:{
                    width:w,
                    height:h,
                    margin:'2px',
                    display:'inline-block',
                },
                on:{
                    'click': cardFlip},
                text:'R' + i + 'C' + x
            });
            row.append(column);
        }
        $('#board').append(row);
    }
}

function cardFlip(){
    var clickedCard = $(this);
    clickedCard.toggleClass('cardFront');
    if (clickedCard.attr('class').indexOf('cardFront') !== -1)
    {
        console.log('flip to front');
        checkMatch(clickedCard);
    }
}
function resetBoard(){
    $('.cardFade').toggleClass('cardFade');
    var temp =$('.cardFront');
    temp.toggleClass('cardFront');
     attempts = 0;
     accuracy = 100;
}
function checkMatch(clickedCard) {
    //debugger;
    if (first_card_clicked === null) {
        first_card_clicked = clickedCard;

    }
    else if(first_card_clicked.attr('class') === clickedCard.attr('class')){
        console.log('catch 1');
    }
    else if(first_card_clicked.attr('class').indexOf('cardFront') === -1){

        first_card_clicked = clickedCard;
        console.log('catch 2');
    }
    else {

        attempts++;
        second_card_clicked = clickedCard;
        if (first_card_clicked.css('background-image') === second_card_clicked.css('background-image') &&
            first_card_clicked.attr('class') !== second_card_clicked.attr('class')) {
            console.log('in same background');
            match_counter++;
            setTimeout(function () {
                console.log(first_card_clicked);
                first_card_clicked.addClass('cardFade');
                second_card_clicked.addClass('cardFade');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);

        }
        else {
            setTimeout(function () {
                console.log('in turn back to cardback');
                second_card_clicked.toggleClass('cardFront');
                first_card_clicked.toggleClass('cardFront');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
        }
        updateStats();
    }
}

function updateStats(){
    $('#attempts .value').text(attempts);
    $('#accuracy .value').text((attempts / match_counter * 100) + '%');
}
function handleMovement(){
    var position = $('.column3.row5');
        position.css({
        'background-color':'black'
    });
    var up = $('#up');
    up.on('click', function(){
        upMove(position);
    });
    var left = $('#left');
    var right = $('#right');
    var down = $('#down');
}
function upMove(position) {
    var currentColumnIndex = position.attr('class').indexOf('column');
    var currentRowIndex = position.attr('class').indexOf('row');
    var currentColumn = parseInt(position.attr('class')[currentColumnIndex + 6]);
    var currentRow = parseInt(position.attr('class')[currentRowIndex + 3]) -1;
    console.log('column' + currentColumn);
    console.log('row' + currentRow);
    var newPosition = $('.column' + currentColumn + '.row' + currentRow);
    newPosition.css({
        'background-color': 'black'
    });
    position.css({
       'background-color':'brown'
    });
    return newPosition;
}
function downMove(position){

}
function leftMove(position){

}
function rightMove(position){

}

// function createCard(suit, rank){
//         var card = $('<div>',{
//                 class: 'card '  suit  ' '  rank,
//                 on:{
//                     click:toggleCardBack
//                 }
//         });
//         return card;
//     }
// function createRandomCard(){
//         var suitArray = ['heart', 'club', 'diamond', 'spade'];
//         var rankArray = ['ace', 'two', 'three', 'four',
//                             'five', 'six', 'seven', 'eight',
//                             'nine', 'ten', 'jack', 'queen', 'king'];
//         var suitIndex = Math.floor(Math.random() * suitArray.length);
//         var rankIndex = Math.floor(Math.random() * rankArray.length);
//
//             var randomSuit = suitArray[suitIndex];
//         var randomRank = rankArray[rankIndex];
//
//             var randomCard = createCard(randomSuit, randomRank);
//        return randomCard;
//     }
// function addRandomCardToDom(){
//         var randomCard = createRandomCard();
//         $('.container .col:nth-child(2)').append(randomCard);
//     }
