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
    'assets/cardFronts/front12.jpg'];
    //'assets/cardFronts/front13.jpg'];
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
                class: 'column' + x + ' ' + 'row' + i + ' ' + 'cardBack',
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
                var image = $('<img>').attr('src',  cardFronts[randomCardIndexes()]);
                column.append(image)
            }
            row.append(column);
        }
        $('#board').append(row);
    }

}

function cardFlip(){
    var clickedCard = $(this);
    if(clickedCard.attr('class').indexOf('cardFade') === -1 && second_card_clicked === null) {
        clickedCard.toggleClass('cardBack');
        if (clickedCard.attr('class').indexOf('cardBack') === -1) {
            console.log('flip to front');
            checkMatch(clickedCard);
        }
    }
}
function resetBoard(){
    $('.cardFade').toggleClass('cardFade cardBack');
    // var temp =$('.cardFront');
    // temp.toggleClass('cardFront');
     attempts = 0;
     accuracy = 100;
}
function checkMatch(clickedCard) {
    //debugger;
    if (first_card_clicked === null) {
        first_card_clicked = clickedCard;

    }
    else if(first_card_clicked.attr('class') === clickedCard.attr('class')){
        console.log('same card clicked twice');
        first_card_clicked = null;
    }

    else {
        attempts++;
        second_card_clicked = clickedCard;
        console.log(first_card_clicked);
        var image1 = first_card_clicked.children('img').attr('src');
        var image2 = second_card_clicked.children('img').attr('src');
        console.log('image 1', image1);
        if (image1 === image2) {
            match_counter++;
            console.log('in same background');
            first_card_clicked.off('click');
            second_card_clicked.off('click');
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
                second_card_clicked.toggleClass('cardBack');
               first_card_clicked.toggleClass('cardBack');
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
        }
        updateStats();
    }
}

function updateStats(){
    $('#attempts .value').text(attempts);
    $('#accuracy .value').text((match_counter / attempts   * 100) + '%');
}
function handleMovement(){

    $('.row3.column3').toggleClass('startingPosition active').off().removeClass('cardBack cardFront');
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


