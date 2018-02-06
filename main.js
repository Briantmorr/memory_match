$(document).ready(initializeApp);

var gamesPlayed = 0;
var attempts = 0;
var accuracy = 100;

function initializeApp(){
        console.log("initializing app...");
        createBoard();
        $('.reset').on('click', resetBoard);
        // var dynamicCol = $('.container .col:nth-child(2)');
        // dynamicCol.append("<h1>Dynamic Content</h1>");
        // var firstCard = createCard('heart', 'ten');
        // dynamicCol.append(firstCard);
        // var firstRandomCard = createRandomCard();
        // dynamicCol.append(firstRandomCard);
        // addRandomCardToDom();
        // var addCardButton = $('<button>', {
        //         text: 'Add Card to DOM',
        //         click: addRandomCardToDom
        // });
        // dynamicCol.prepend(addCardButton);
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
    console.log('in flip');
    var clickedCard = $(this);
    clickedCard.toggleClass('cardFront');
    checkMatch();
}
function resetBoard(){
    var temp =$('.cardFront');
    temp.toggleClass('cardFront');
     attempts = 0;
     accuracy = 100;
}
function checkMatch(){

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
