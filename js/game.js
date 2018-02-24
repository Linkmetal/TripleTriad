var Game = function (game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
};

var score = [5, 5];
var scoreSprites = [];
var scoreGroup;

var playerHand;
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

var music;
var music2;

var gameEnded = false;

Game.prototype = {
    preload: function () {
        game.load.image("board", "/img/board6.png");
        game.load.image("background", "/img/background2.jpg"),
        game.load.image("dialogWindow", "/img/dialogWindow.png"),
        game.load.spritesheet('cards1b', "/img/cards_1_b.jpg", 192, 247);
        game.load.spritesheet('cards1r', "/img/cards_1_r.jpg", 192, 247);
        game.load.spritesheet('cards2b', "/img/cards_2_b.jpg", 192, 247);
        game.load.spritesheet('cards2r', "/img/cards_2_r.jpg", 192, 247);
        game.load.image("handContainer", "/img/handContainer.png");
        game.load.image("bscore", "/img/blue_card.png");
        game.load.image("rscore", "/img/red_card.png");
        game.load.audio('music', 'music/theme.mp3');
        game.load.audio('victory', 'music/victory.mp3');
    },
    create: function () {
        var background = this.game.add.sprite(0, 0, "background");

        music = game.add.audio('music');
        music2 = game.add.audio('victory');
        music.play();


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

        scoreGroup = new Phaser.Group(game);
        scoreGroup.top += height * 0.0250;
        scoreGroup.left += width * 0.4155;
        for (let i = 0; i < 10; i++) {
            if (i < 5) {
                scoreSprites.push(game.add.sprite(0, 0, "bscore"));
            } else {
                scoreSprites.push(game.add.sprite(0, 0, "rscore"));
            }
            scoreGroup.add(scoreSprites[i]);
        }
        scoreGroup.align(10, 1, 32, 32);


        //Layer 2
        
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


        for(let i = 0; i < playerCards.length; i++){
            playerCards[i].render(playerHand, boardo.slots);
        }

        card6.render(comHand, boardo.slots);
        card7.render(comHand, boardo.slots);
        card8.render(comHand, boardo.slots);
        card9.render(comHand, boardo.slots);
        card10.render(comHand, boardo.slots);
    },

    update: function () {
        if (cardsPlayed < 9) {
            if (turn == -1) {
                turn = 0;
            }
            if (turn == 0) {
                // eDrag();
            } else {
                dDrag();
                turn = 0;
                setTimeout(comMove, 2000);
            }
        } else {
            if(gameEnded == false){
                if (score[0] == 5) {
                    notification("warning", "EMPATE");
                    // game.paused = true;
                    // game.state.restart();
                }
                if (score[0] < 5) {
                    notification("error", "PERDISTE");
                    // game.paused = true;
                    // game.state.restart();
                }
                if (score[0] > 5) {
                    music.pause();
                    music2.play();
                    notification("success", "GANASTE");
                    // game.paused = true;
                    // game.state.restart();
                }
                gameEnded = true;
            }
        }
    }
}

