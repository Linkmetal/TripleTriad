var Game = function (game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
};

var score = [5, 5];
var scoreSprites = [];
var scoreGroup;

var playerHand;

var comHand;
var comCards = [];


var lastMoved;

var turn = -1;
var cardsPlayed = 0;
let boardo;

var music;
var music2;

var gameEnded = false;

Game.prototype = {
    preload: function () {
        game.load.image("board", "img/board6.png");
        game.load.image("background", "img/background2.jpg");
        game.load.image("dialogWindow", "img/dialogWindow.png");
        game.load.spritesheet('cards1b', "img/cards_1_b.jpg", 192, 247);
        game.load.spritesheet('cards1r', "img/cards_1_r.jpg", 192, 247);
        game.load.spritesheet('cards2b', "img/cards_2_b.jpg", 192, 247);
        game.load.spritesheet('cards2r', "img/cards_2_r.jpg", 192, 247);
        game.load.image("handContainer", "img/handContainer.png");
        game.load.image("bscore", "img/blue_card.png");
        game.load.image("rscore", "img/red_card.png");
        game.load.audio('music', 'music/theme.mp3');
        game.load.audio('victory', 'music/victory.mp3');
    },
    create: function () {
        $("#resetButton").show();
        if(loaded == false){
            $("#resetButton").click(function(){
                $("#resetButton").hide();
                scoreSprites = [];
                gameEnded = false;
                cardsPlayed = 0;
                loaded = true;
                turn = -1;
                score = [5,5];
                playerCards = [];
                comCards = [];
                boardo.slots = [];
                game.state.remove("Game");
                game.state.add('DeckSelector', DeckSelector);
                game.state.start("DeckSelector");
            });
        }
        
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
        for (let i = 0; i < playerCards.length; i++) {
            playerCards[i].render(playerHand, boardo.slots);
        }

        for(let i = 0; i < 5; i++){
            var rnd = 0;

            if(dificulty == "easy"){
                rnd = Math.floor(Math.random() * (56 - 1 + 1)) + 1;
            }
            if(dificulty == "normal"){
                rnd = Math.floor(Math.random() * (89 - 57 + 1)) + 57;
            }
            if(dificulty == "hard"){
                rnd = Math.floor(Math.random() * (110 - 90 + 1)) + 90;
            }
            var crd = new Card(cardlist.cards[rnd], 'r');
            comCards.push(crd);
        }

        for (let i = 0; i < comCards.length; i++) {
            comCards[i].render(comHand, boardo.slots);
        }

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
            if (gameEnded == false) {
                if (score[0] == 5) {
                    notification("warning", "EMPATE");
                    currentUser.ties++;
                    // game.paused = true;
                    // game.state.restart();
                }
                if (score[0] < 5) {
                    notification("error", "PERDISTE");
                    currentUser.loses++;
                    // game.paused = true;
                    // game.state.restart();
                }
                if (score[0] > 5) {
                    currentUser.wins++;
                    music.pause();
                    music2.play();
                    notification("success", "GANASTE");
                    // game.paused = true;
                    // game.state.restart();
                }
                userList[currentUser.username] = currentUser;
                localStorage.setItem("userList", JSON.stringify(userList));
                gameEnded = true;
            }
        }
    }
};