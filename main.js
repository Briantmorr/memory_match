$(document).ready(initializeApp);

var gamesPlayed = 0;
var attempts = 0;
var accuracy = 100;
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 12;
var match_counter = 0;
var cardFronts = ['assets/cardFronts/front1.jpg',
    'assets/cardFronts/front2.jpg',
    'assets/cardFronts/front3.jpg',
    'assets/cardFronts/front4.jpg',
    'assets/cardFronts/front5.jpg',
    'assets/cardFronts/front6.jpg',
    'assets/cardFronts/front7.jpg',
    'assets/cardFronts/front8.jpg',
    'assets/cardFronts/front9.jpg',
    'assets/cardFronts/front10.jpg',
    'assets/cardFronts/front11.jpg',
    'assets/cardFronts/front12.jpg',
    'assets/cardFronts/front13.jpg'];
    // 'assets/cardFronts/front14.png',
    // 'assets/cardFronts/front15.jpeg',
    //  ];
var pairTracker = {};
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
            class: 'bigRow' + i,
        });
        for(var x = 1; x <= 5; x++){
            var column = $('<div>', {
                class: 'column' + x + ' ' + 'row' + i + ' ' + 'card' + ' ' + 'cardBack',
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
            var image = $('<img>').attr('src',  cardFronts[randomCardIndexes()]);
            column.append(image)
            row.append(column);
        }
        $('#board').append(row);
    }
    $('.card').addClass('cardBack');
}

function cardFlip(){
    var clickedCard = $(this);
    clickedCard.toggleClass('cardBack');
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
    $('.row5.column3').toggleClass('active');
    var active = {
        position: $('.row5.column3'),
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
            newPosition.toggleClass('active');
            this.position.toggleClass('active');
            this.position = newPosition;
        },
        moveDown: function(){
            var row = this.getRow() + 1;
            var column = this.getColumn();
            var newPosition = $('.column' + column + '.row' + row);
            newPosition.toggleClass('active');
            this.position.toggleClass('active');
            this.position = newPosition;
        },
        moveLeft: function(){
            var row = this.getRow();
            var column = this.getColumn() - 1;
            var newPosition = $('.column' + column + '.row' + row);
            newPosition.toggleClass('active');
            this.position.toggleClass('active');
            this.position = newPosition;
        },
        moveRight: function(){
            var row = this.getRow();
            var column = this.getColumn() + 1;
            var newPosition = $('.column' + column + '.row' + row);
            newPosition.toggleClass('active');
            this.position.toggleClass('active');
            this.position = newPosition;
        },
        click: function(){
            this.position.click();
        }

    };
    console.log(active.position);
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
