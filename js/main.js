var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });
var data_;
var cardlist;
var style = { font: "18px Calibri", fill: "#ffffff" , align: "center"};
class Hand {
    constructor(){
        this.cards = [];
        this.size = 0;
        this.container = new Phaser.Group(game);

    }

}

class Card {
    constructor(obj, color){
        this.id = obj.id;
        this.name = obj.name;
        this.top = obj.top;
        this.left = obj.left;
        this.right = obj.right;
        this.bottom = obj.bottom;
        this.element = obj.element;
        this.level = obj.level;
        this.color = color;
    }
    render(){
        this.sprite = game.add.sprite(0, 0, "cards1b", this.id - 1);
        this.sprite.inputEnabled = true;
        this.sprite.input.enableDrag(true);
        var dialog = game.add.sprite(0,0, "dialogWindow");
        dialog.scale.setTo(0.30);
        var text = game.add.text(20, 20, this.name.toUpperCase(), style);
        text.position.x = dialog.width / 2;
        text.strokeThickness = 4;
        this.sprite.addChild(dialog);
        this.sprite.addChild(text);
        dialog.alignIn(this.sprite, Phaser.BOTTOM_CENTER);
        text.alignIn(dialog, Phaser.CENTER);
    }
}

class CardList{
    constructor(){
        this.cards = [];
        for(let i = 0; i < data_.length; i++){
            this.cards.push(data_[i]);
        }
    }
}


function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

function preload() {
    readTextFile("data/cards.json", function(text){
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
    hand1.scale.setTo(0.8,0.9);
    hand2.scale.setTo(0.8,0.9);
    board.scale.setTo(1.2,1.05);
    //Layer 1
    var playerHand = new Phaser.Group(game);
    playerHand.top += height * 0.06;
    playerHand.left += width * 0.024;
    var comHand = new Phaser.Group(game);
    
    //Layer 2
    var card1 = new Card(cardlist.cards[29], "blue");
    var card2 = new Card(cardlist.cards[45], "blue");
    var card3 = new Card(cardlist.cards[32], "blue");
    var card4 = new Card(cardlist.cards[12], "blue");
    var card5 = new Card(cardlist.cards[11], "blue");
    
    card1.render();
    card2.render();
    card3.render();
    card4.render();
    card5.render();
    playerHand.add(card1.sprite);
    playerHand.add(card2.sprite);
    playerHand.add(card3.sprite);
    playerHand.add(card4.sprite);
    playerHand.add(card5.sprite);
    playerHand.align(1,5,192,145);


    /*var card1 = game.add.sprite(width * 0.024, height * 0.06, "cards1b", 0);
    var card2 = game.add.sprite(width * 0.024, height * 0.2125, "cards1b", 1);
    var card3 = game.add.sprite(width * 0.024, height * 0.365, "cards1b", 2);
    var card4 = game.add.sprite(width * 0.024, height * 0.5175, "cards1b", 3);
    var card5 = game.add.sprite(width * 0.024, height * 0.67, "cards1b", 4);
    
    var card6 = game.add.sprite(width * 0.874, height * 0.06, "cards1r", 0);
    var card7 = game.add.sprite(width * 0.874, height * 0.21, "cards1r", 1);
    var card8 = game.add.sprite(width * 0.874, height * 0.37, "cards1r", 2);
    var card9 = game.add.sprite(width * 0.874, height * 0.52, "cards1r", 3);
    var card10 = game.add.sprite(width * 0.874, height * 0.67, "cards1r", 4);*/
    
    
    /*card1.inputEnabled = true;
    card1.input.enableDrag(true);
    card1.input.enableSnap(32, 32, false, false);
    card2.inputEnabled = true;
    card2.input.enableDrag(true);
    card3.inputEnabled = true;
    card3.input.enableDrag(true);
    card4.inputEnabled = true;
    card4.input.enableDrag(true);
    card5.inputEnabled = true;
    card5.input.enableDrag(true);
    card6.inputEnabled = true;
    card6.input.enableDrag(true);
    card7.inputEnabled = true;
    card7.input.enableDrag(true);
    card8.inputEnabled = true;
    card8.input.enableDrag(true);
    card9.inputEnabled = true;
    card9.input.enableDrag(true);
    card10.inputEnabled = true;
    card10.input.enableDrag(true);*/
    
    //var comCards = [card6,card7, card8, card9, card10];
    
    //var playerHand = new Phaser.DisplayObjectContainer();
    //playerHand.width = 237;
    //playerHand.height = 919;
    
    /*playerHand.addChild(new Phaser.Sprite(0, 0, "cards1r", 0));
    playerHand.addChild(new Phaser.Sprite(0, 0, "cards1r", 1));
    playerHand.addChild(new Phaser.Sprite(0, 0, "cards1r", 2));
    playerHand.addChild(new Phaser.Sprite(0, 0, "cards1r", 3));
    playerHand.addChild(new Phaser.Sprite(0, 0, "cards1r", 4));*/
    /*playerHand.add(card6);
    playerHand.add(card7);
    playerHand.add(card8);
    playerHand.add(card9);
    playerHand.add(card10);*/
}

function update() {
    
}
