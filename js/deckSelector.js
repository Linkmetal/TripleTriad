
var DeckSelector = function (game) {
    console.log("%cStarting my awesome game", "color:white; background:red");
};
var data_;
var card;
var cardlist;
let style = {
    font: "18px Calibri",
    fill: "#ffffff",
    align: "center"
};

DeckSelector.prototype = {
    preload: function () {
        readTextFile("data/cards.json", function (text) {
            data_ = JSON.parse(text);
        });
        this.game.load.image("background", "img/background2.jpg");
        this.game.load.spritesheet('cards1b', "/img/cards_1_b.jpg", 192, 247);
        this.game.load.spritesheet('cards1r', "/img/cards_1_r.jpg", 192, 247);
        this.game.load.spritesheet('cards2b', "/img/cards_2_b.jpg", 192, 247);
        this.game.load.spritesheet('cards2r', "/img/cards_2_r.jpg", 192, 247);
        this.game.load.image("handContainer", "/img/handContainer.png");

    },
    create: function () {
        cardlist = new CardList();
        var background = this.game.add.sprite(0, 0, "background");
        var hand = game.add.sprite(width * 0.00, 0, "handContainer");
        this.game.state.add('Game', Game);
        hand.scale.setTo(0.8, 0.9);
        $("#cardSelector").show();
        card = new Card(cardlist.cards[55], "b");
        card.renderNoGroup();
        card.sprite.top += height * 0.25;
        card.sprite.left += width * 0.70;
        card.sprite.scale.setTo(1.7, 1.7);
        loadCardData();
        // this.game.state.start('Game');
    },
    inputFocus: function (sprite) {
        sprite.canvasInput.focus();
    },
    createInput: function (x, y) {
        var bmd = this.add.bitmapData(400, 50);
        var myInput = this.game.add.sprite(x, y, bmd);

        myInput.canvasInput = new CanvasInput({
            canvas: bmd.canvas,
            fontSize: 30,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 400,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            placeHolder: 'Enter message here...'
        });
        myInput.inputEnabled = true;
        myInput.input.useHandCursor = true;
        myInput.events.onInputUp.add(this.inputFocus, this);

        return myInput;
    },
    update: function () {

    }
}

function loadCardData(){
    for(let i = 0; i < cardlist.cards.length; i++){
        if(cardlist.cards[i].name != "none"){
            $("#cardSelector").append("<div id='card" + cardlist.cards[i].id + "' class='cardDiv'>" + cardlist.cards[i].name +  "</div>");
        }
    }
    $(".cardDiv").hover(function(e){
        var trigger = e.currentTarget;
        var id = trigger.id.split("card");
        id = parseInt(id[1]);
        if(id <= 55){
            card.sprite.loadTexture("cards1b", id - 1);
        }
        else{
            card.sprite.loadTexture("cards2b", id - 57);
        }
    },
     function(e){
        card.sprite.loadTexture("cards1b", 56);
    });
}
