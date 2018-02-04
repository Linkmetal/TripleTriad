var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});
var data_;
var cardlist;
var style = {
    font: "18px Calibri",
    fill: "#ffffff",
    align: "center"
};

var playerHand;
var playerCards = [];
var card1;
var card2;
var card3;
var card4;
var card5;

var comHand;
var comCards = [];
var card6;
var card7;
var card8;
var card9;
var card10;

var lastMoved;

var turn = -1;
var cardsPlayed = 0;
let boardo;

class Board {
    constructor() {
        this.slots = [];
    }
    render() {
        this.container = new Phaser.Group(game);
        this.container.top += height * 0.1321;
        this.container.left += width * 0.351;
        for (let i = 0; i < 9; i++) {
            //this.slots.push(game.add.sprite(0, 0, "cards1b", 24));
            this.slots.push(new Card(cardlist.cards[112], "blue"));
        }
        for (let i = 0; i < 9; i++) {
            this.slots[i].renderEmpty(this.container);
            //this.container.add(this.solts[i]);
        }
        this.container.align(3, 3, 192, 247);
        console.log(this.slots);
    }
}

class Hand {
    constructor() {
        this.cards = [];
        this.size = 0;
        this.container = new Phaser.Group(game);
    }

}

class Card {
    constructor(obj, color) {
        this.id = obj.id;
        this.name = obj.name;
        this.top = obj.top;
        this.left = obj.left;
        this.right = obj.right;
        this.down = obj.bottom;
        this.element = obj.element;
        this.level = obj.level;
        this.color = color;
        this.originalPos;
    }

    stopDrag() {
        this.sprite.position = this.originalPos;
    }
    renderEmpty(hand) {
        this.sprite = game.add.sprite(0, 0);
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(true);
        this.sprite.width = 192;
        this.sprite.height = 247;
        //Add to the hand group
        hand.add(this.sprite);
        hand.align(1, 5, 192, 145);
    }
    render(hand, slots) {
        //Create the sprite and drag property
        this.sprite = game.add.sprite(0, 0, "cards1" + this.color, this.id - 1);
        if (this.color != "r") {
            this.sprite.inputEnabled = true;
            this.sprite.input.enableDrag(true);
        }
        //Add name to the card
        var dialog = game.add.sprite(0, 0, "dialogWindow");
        dialog.scale.setTo(0.30);
        var text = game.add.text(20, 20, this.name.toUpperCase(), style);
        text.position.x = dialog.width / 2;
        text.strokeThickness = 4;
        this.sprite.addChild(dialog);
        this.sprite.addChild(text);
        dialog.alignIn(this.sprite, Phaser.BOTTOM_CENTER);
        text.alignIn(dialog, Phaser.CENTER);
        //Add to the hand group
        hand.add(this.sprite);
        hand.align(1, 5, 192, 145);
        //Drag event
        let obj = this;
        if (this.color != "r") this.sprite.events.onDragStop.add(function (sprite, ojb) {
            if (turn == 0) {
                for (let i = 0; i < boardo.slots.length; i++) {
                    if (checkOverlap(sprite, boardo.slots[i].sprite)) {
                        if (boardo.slots[i].name == "none") {
                            boardo.container.remove(boardo.slots[i].sprite);
                            boardo.container.addAt(sprite, i);
                            boardo.container.align(3, 3, 192, 247);
                            boardo.slots.splice(i, 1);
                            boardo.slots.splice(i, 0, obj);
                            sprite.inputEnabled = false;
                            sprite.input.enableDrag(false);
                            lastMoved = boardo.slots[i];
                            turn = 1;
                            cardsPlayed++;
                            checkMove();
                        }
                    } else {

                        hand.align(1, 5, 192, 145);
                    }
                }
            }
        });
    }

}

class CardList {
    constructor() {
        this.cards = [];
        for (let i = 0; i < data_.length; i++) {
            this.cards.push(data_[i]);
        }
    }
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function preload() {
    readTextFile("data/cards.json", function (text) {
        data_ = JSON.parse(text);
    });
    game.load.image("board", "/img/board6.png");
    game.load.image("background", "/img/background2.jpg"),
    game.load.image("dialogWindow", "/img/dialogWindow.png"),
    game.load.spritesheet('cards1b', "/img/cards_1_b.jpg", 192, 247);
    game.load.spritesheet('cards1r', "/img/cards_1_r.jpg", 192, 247);
    game.load.spritesheet('cards2b', "/img/cards_2_b.jpg", 192, 247);
    game.load.spritesheet('cards2r', "/img/cards_2_r.jpg", 192, 247);
    game.load.image("handContainer", "/img/handContainer.png");
}

function create() {
    cardlist = new CardList();
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Layer 0
    var background = game.add.sprite(0, 0, "background");
    var board = game.add.sprite(width * 0.32, height * 0.08, "board");
    var hand1 = game.add.sprite(width * 0.00, 0, "handContainer");
    var hand2 = game.add.sprite(width * 0.85, 0, "handContainer");

    boardo = new Board();
    boardo.render();

    hand1.scale.setTo(0.8, 0.9);
    hand2.scale.setTo(0.8, 0.9);
    board.scale.setTo(1.2, 1.05);
    //Layer 1
    playerHand = new Phaser.Group(game);
    playerHand.top += height * 0.06;
    playerHand.left += width * 0.024;
    comHand = new Phaser.Group(game);
    comHand.top += height * 0.06;
    comHand.left += width * 0.874;

    //Layer 2
    card1 = new Card(cardlist.cards[29], "b");
    card2 = new Card(cardlist.cards[45], "b");
    card3 = new Card(cardlist.cards[32], "b");
    card4 = new Card(cardlist.cards[12], "b");
    card5 = new Card(cardlist.cards[11], "b");
    playerCards.push(card1);
    playerCards.push(card2);
    playerCards.push(card3);
    playerCards.push(card4);
    playerCards.push(card5);



    card6 = new Card(cardlist.cards[28], "r");
    card7 = new Card(cardlist.cards[44], "r");
    card8 = new Card(cardlist.cards[32], "r");
    card9 = new Card(cardlist.cards[13], "r");
    card10 = new Card(cardlist.cards[18], "r");
    comCards.push(card6);
    comCards.push(card7);
    comCards.push(card8);
    comCards.push(card9);
    comCards.push(card10);


    card1.render(playerHand, boardo.slots);
    card2.render(playerHand, boardo.slots);
    card3.render(playerHand, boardo.slots);
    card4.render(playerHand, boardo.slots);
    card5.render(playerHand, boardo.slots);

    card6.render(comHand, boardo.slots);
    card7.render(comHand, boardo.slots);
    card8.render(comHand, boardo.slots);
    card9.render(comHand, boardo.slots);
    card10.render(comHand, boardo.slots);

}

function update() {
    if(cardsPlayed < 9){
        if(turn == -1){
            turn = 0;
        }
        if (turn == 0) {
            // eDrag();
        } 
        else {
            dDrag();
            turn = 0;
            setTimeout(comMove, 2000);
        }
    }
    else{

    }
}

function dDrag() {
    for(let i = 0 ; i < playerCards.length; i++){
        playerCards[i].sprite.inputEnabled = false;
        playerCards[i].sprite.input.enableDrag(false);
    }
}

function eDrag() {
    for(let i = 0 ; i < playerCards.length; i++){
        playerCards[i].sprite.inputEnabled = true;
        playerCards[i].sprite.input.enableDrag(true);
    }
}

function checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    boundsA.height = boundsA.height / 3;
    boundsA.width = boundsA.width / 3;
    var boundsB = spriteB.getBounds();
    boundsB.height = boundsB.height / 3;
    boundsB.width = boundsB.width / 3;
    return Phaser.Rectangle.intersects(boundsA, boundsB);
}

function comMove(){
    let randomCard = comHand.getRandom();
    let randomSlot = 0;
    do{
        randomSlot = Math.floor(Math.random() * (9 - 1) + 1);
    } while(boardo.slots[randomSlot].name != "none");
    var aux = false;
    var it = 0;
    while(aux != true){
        if(comCards[it].sprite == randomCard){
            aux = true;
        }
        else{
            it++;
        }
    }
    console.log(boardo.slots);
    console.log(randomSlot);
    boardo.container.remove(boardo.slots[randomSlot].sprite);
    boardo.container.addAt(randomCard, randomSlot);
    boardo.container.align(3, 3, 192, 247);
    boardo.slots.splice(randomSlot, 1);
    boardo.slots.splice(randomSlot, 0, comCards[it]);
    lastMoved = comCards[it];
    turn = 0;
    cardsPlayed++;
    checkMove();
    eDrag();
}


function checkMove(){
    let slots = boardo.slots;
    let index = slots.indexOf(lastMoved);
    let type = index % 3;

    //Highest Number Check
    if(type != 2){
        if(lastMoved.right > slots[index + 1].left){
            flipCard(slots[index + 1]);
        }
    }
    if(type != 0){
        if(lastMoved.left > slots[index - 1].right){
            flipCard(slots[index - 1]);
        }
    }
    if(index - 3 >= type){
        if(lastMoved.top > slots[index - 3].down){
            flipCard(slots[index - 3]);
        }
    }
    if(index + 3 <= type + 6){
        if(lastMoved.down > slots[index + 3].top){
            flipCard(slots[index + 3]);
        }
    }
}

function flipCard(card){
    if(turn == 1 && card.color == 'r'){
        card.sprite.loadTexture("cards1b", card.id - 1);
        card.color = 'b';
    }
    if(turn == 0 && card.color == 'b'){
        card.sprite.loadTexture("cards1r", card.id - 1);
        card.color = 'r';
    }
}