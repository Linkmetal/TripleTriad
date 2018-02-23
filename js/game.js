var Game = function (game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
};
var width = window.innerWidth;
var height = window.innerHeight;
var data_;
var cardlist;
var style = {
    font: "18px Calibri",
    fill: "#ffffff",
    align: "center"
};
var score = [5, 5];
var scoreSprites = [];
var scoreGroup;

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

var music;
var music2;

Game.prototype = {
    preload: function () {
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
            if (score[0] == 5) {
                notification("warning", "EMPATE");
                game.paused = true;
                // game.state.restart();
            }
            if (score[0] < 5) {
                notification("error", "PERDISTE");
                game.paused = true;
                // game.state.restart();
            }
            if (score[0] > 5) {
                music.pause();
                music2.play();
                notification("success", "GANASTE");
                game.paused = true;
                // game.state.restart();
            }
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

function dDrag() {
    for (let i = 0; i < playerCards.length; i++) {
        playerCards[i].sprite.inputEnabled = false;
        playerCards[i].sprite.input.enableDrag(false);
    }
}

function eDrag() {
    for (let i = 0; i < playerCards.length; i++) {
        if (boardo.slots.indexOf(playerCards[i]) == -1) {
            playerCards[i].sprite.inputEnabled = true;
            playerCards[i].sprite.input.enableDrag(true);
        }
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

function comMove() {
    let randomCard = comHand.getRandom();
    let randomSlot = 0;
    do {
        randomSlot = Math.floor(Math.random() * (9 - 1) + 1);
    } while (boardo.slots[randomSlot].name != "none");
    var aux = false;
    var it = 0;
    while (aux != true) {
        if (comCards[it].sprite == randomCard) {
            aux = true;
        } else {
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
    checkMove("");
    eDrag();
}


function checkMove(mov) {
    let slots = boardo.slots;
    let index = slots.indexOf(lastMoved);
    let type = index % 3;
    let plus = [];
    let same = [];
    let flipStack = [];

    if (type != 2) {
        if (slots[index + 1].name != "none") {
            if (lastMoved.right == slots[index + 1].left) {
                same.push(index + 1);
            }
            if (lastMoved.right > slots[index + 1].left) {
                flipStack.push([slots[index + 1], mov]);
            }
            let aux = [];
            aux.push(index + 1);
            aux.push(lastMoved.right + slots[index + 1].left);
            plus.push(aux);
        }
    }
    if (type != 0) {
        if (slots[index - 1].name != "none") {
            if (lastMoved.left == slots[index - 1].right) {
                same.push(index - 1);
            }
            if (lastMoved.left > slots[index - 1].right) {
                flipStack.push([slots[index - 1], mov]);
            }
            let aux = [];
            aux.push(index - 1);
            aux.push(lastMoved.left + slots[index - 1].right);
            plus.push(aux);
        }
    }
    if (index - 3 >= type) {
        if (slots[index - 3].name != "none") {
            if (lastMoved.top == slots[index - 3].down) {
                same.push(index - 3);
            }
            if (lastMoved.top > slots[index - 3].down) {
                flipStack.push([slots[index - 3], mov]);
            }
            let aux = [];
            aux.push(index - 3);
            aux.push(lastMoved.top + slots[index - 3].down);
            plus.push(aux);
        }
    }
    if (index + 3 <= type + 6) {
        if (slots[index + 3].name != "none") {
            if (lastMoved.down == slots[index + 3].top) {
                same.push(index + 3);
            }
            if (lastMoved.down > slots[index + 3].top) {
                flipStack.push([slots[index + 3], mov]);
            }
            let aux = [];
            aux.push(index + 3);
            aux.push(lastMoved.down + slots[index + 3].top);
            plus.push(aux);
        }
    }
    //Regla Igual
    if (same.length >= 2) {
        for (let i = 0; i < same.length; i++) {
            flipCard(slots[same[i]], "IGUAL");
            lastMoved = slots[same[i]];
            checkMove("CADENA");
        }
    }
    //Regla Suma
    for (let i = 0; i < plus.length - 1; i++) {
        for (let j = i + 1; j < plus.length; j++) {
            if (plus[i][1] == plus[j][1]) {
                let aux = false;
                let aux2 = false;
                aux = flipCard(slots[plus[i][0]], "SUMA");
                aux2 = flipCard(slots[plus[j][0]], "SUMA");
                if (aux == true) {
                    lastMoved = slots[plus[i][0]];
                    checkMove("CADENA");
                }
                if (aux2 == true) {
                    lastMoved = slots[plus[j][0]];
                    checkMove("CADENA");
                }
            }
        }
    }
    //Regla carta mayor
    for (let i = 0; i < flipStack.length; i++) {
        let aux = flipCard(flipStack[i][0], mov);
    }
}

function flipCard(card, mov) {
    let flipped = false;
    if (turn == 1 && card.color == 'r') {
        card.sprite.loadTexture("cards1b", card.id - 1);
        card.color = 'b';
        flipped = true;
        score[0]++;
        score[1]--;
        if (mov != "") {
            notification("info", mov + ": '" + card.name + "' girada").css({
                "font-size": "150%",
                "width": "50vw",
                "height": "6vh",
                "text-align": "center",
            });
        }
        refreshScore();
    }
    if (turn == 0 && card.color == 'b') {
        card.sprite.loadTexture("cards1r", card.id - 1);
        card.color = 'r';
        flipped = true;
        score[0]--;
        score[1]++;
        if (mov != "") {
            notification("info", mov + ": '" + card.name + "' girada").css({
                "font-size": "150%",
                "width": "50vw",
                "height": "6vh",
                "text-align": "center",
            });
        }
        refreshScore();
    }
    return flipped;
}

function refreshScore() {
    for (let i = 0; i < scoreSprites.length; i++) {
        if (i < score[0]) {
            scoreSprites[i].loadTexture("bscore");
        } else {
            scoreSprites[i].loadTexture("rscore");
        }
    }
}


toastr.options.closeButton = true;
toastr.options.positionClass = "toast-bottom-center";

function notification(type, message) {
    if (type == 'success') {
        toastr.success(message).css({
            "font-size": "150%",
            "width": "50vw",
            "height": "6vh",
            "text-align": "center",
        });
    } else if (type == 'error') {
        toastr.error(message).css({
            "font-size": "150%",
            "width": "50vw",
            "height": "6vh",
            "text-align": "center",
        });
    } else if (type == 'warning') {
        toastr.warning(message).css({
            "font-size": "150%",
            "width": "50vw",
            "height": "6vh",
            "text-align": "center",
        });
    } else {
        toastr.info(message).css({
            "font-size": "150%",
            "width": "50vw",
            "height": "6vh",
            "text-align": "center",
        });
    }
}