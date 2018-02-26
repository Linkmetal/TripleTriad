//BUGS//
//El igual salta con cartas del mismo color
//Las notificaciones toastr dejan de funcionar si hace doble suma
let dificulty = "normal";
let width = window.innerWidth;
let height = window.innerHeight;
let game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', {
    preload: preload,
    create: create,
    update: update
});
let userList;


/////////////////////////////////////////////////////////////////////////////
///////////////////////////////////CLASES////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

class User {
    constructor(u, p) {
        this.username = u;
        this.password = p;
        this.wins = 0;
        this.loses = 0;
        this.ties = 0;
        this.decks = [];
    }
}


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
            this.slots.push(new Card(cardlist.cards[111], "blue"));
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
    renderNoGroup() {
        this.sprite = game.add.sprite(0, 0, "cards1" + this.color, this.id - 1);
        // this.sprite.inputEnabled = true;
        // this.sprite.input.enableDrag(true);
        this.sprite.width = 192;
        this.sprite.height = 247;
    }
    render(hand, slots) {
        //Create the sprite and drag property
        if (this.id <= 55) {
            this.sprite = game.add.sprite(0, 0, "cards1" + this.color, this.id - 1);
        } else {
            this.sprite = game.add.sprite(0, 0, "cards2" + this.color, this.id - 57);
        }
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
                            checkMove("");
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



/////////////////////////////////////////////////////////////////////////////
/////////////////////////FUNCIONES PHASER////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

function preload() {
   
}

function create() {
    game.state.add('Menu', Menu);
    game.state.start('Menu');
    game.add.sprite("spinner", "/img/spinner.gif", 880, 440);
    if (localStorage.getItem("userList") == null) {
        localStorage.setItem("userList", JSON.stringify({}));
    }



    
}

function update() {
    
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////METODOS GLOBALES///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        if((turn == 1 && (slots[same[0]].color == 'r' || slots[same[1]].color == 'r') || (turn == 0 && (slots[same[0]].color == 'b' || slots[same[1]].color == 'b')))){
            for (let i = 0; i < same.length; i++) {
                flipCard(slots[same[i]], "IGUAL");
                lastMoved = slots[same[i]];
                checkMove("CADENA");
            }
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
        if(aux == true){
            lastMoved = flipStack[i][0];
        }
        // if(mov == "CADENA" && aux == true){
        //     checkMove("CADENA");
        // }
    }
}

function flipCard(card, mov) {
    let flipped = false;
    if (turn == 1 && card.color == 'r') {
        if (card.id <= 55) {
            card.sprite.loadTexture("cards1b", card.id - 1);
        } else {
            card.sprite.loadTexture("cards2b", card.id - 57);
        }
        card.color = 'b';
        flipped = true;
        score[0]++;
        score[1]--;
        if (mov != "") {
            // notification("info", mov + ": '" + card.name + "' girada").css({
            //     "font-size": "150%",
            //     "width": "50vw",
            //     "height": "6vh",
            //     "text-align": "center",
            // });
        }
        refreshScore();
    }
    if (turn == 0 && card.color == 'b') {
        if (card.id <= 55) {
            card.sprite.loadTexture("cards1r", card.id - 1);
        } else {
            card.sprite.loadTexture("cards2r", card.id - 57);
        }
        card.color = 'r';
        flipped = true;
        score[0]--;
        score[1]++;
        if (mov != "") {
            // notification("info", mov + ": '" + card.name + "' girada").css({
            //     "font-size": "150%",
            //     "width": "50vw",
            //     "height": "6vh",
            //     "text-align": "center",
            // });
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

function showForm() {
    $("#registerForm").css("display", "flex");
}

function closeForm() {
    $("#registerForm").css("display", "none");
}

function register() {
    var valid = true;
    var username = $("#userInput").val();
    var password = $("#passwordInput").val();
    if (localStorage.getItem("userList") != null) {
        userList = JSON.parse(localStorage.getItem("userList"));
        if (userList == null) {
            userList = {};
        }
        if(userList[username] != null){
            valid = false;
        }
        if (valid == true) {
            var user = new User(username, password);
            userList[username] = user;
            console.log(userList);
            localStorage.setItem("userList", JSON.stringify(userList));
            toastr.success("Usuario registrado correctamente");
            $("#registerForm").css("display", "none");
        } 
        else {
            toastr.error("El usuario ya existe, elija otro nombre");
        }
    }
}

function changeDificulty(e) {
    dificulty = e.target.value;
}