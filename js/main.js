/*var spriteSheets = [];
spriteSheets.push(new Image());
spriteSheets.push(new Image());
spriteSheets.push(new Image());
spriteSheets.push(new Image());
spriteSheets[0].src = "/img/cards_1_b.jpg";
spriteSheets[1].src = "/img/cards_1_r.jpg";
spriteSheets[2].src = "/img/cards_2_b.jpg";
spriteSheets[3].src = "/img/cards_2_r.jpg";*/

/*if($(spriteSheets[3]).ready()){
    function draw(x,y){
        var str = "<canv id='canvas' width='192' height='247'></canvas>";
        $("#board").append(str);
        let canvas = new Canvas();
        var canv = document.getElementById("canvas");
        var ctx = canv.getContext("2d");
        //ctx.drawImage(spriteSheets[0],x*191,y*247,0,191,247,0,0,191,247);
        ctx.drawImage(spriteSheets[0],x*192,y*247,192,247,0,0,192,247);
    }
}*/

///////////////////////////

var width = window.innerWidth;
var height = window.innerHeight;
var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update });

function preload() {
    game.load.image("board", "/img/board6.png");
    game.load.image("background", "/img/background2.jpg"),
    game.load.spritesheet('cards1b', "/img/cards_1_b.jpg", 192, 247);
    game.load.spritesheet('cards1r', "/img/cards_1_r.jpg", 192, 247);
    game.load.spritesheet('cards2b', "/img/cards_2_b.jpg", 192, 247);
    game.load.spritesheet('cards2r', "/img/cards_2_r.jpg", 192, 247);
    game.load.image("handContainer", "/img/handContainer.png");
}

function create() {
    var background = game.add.sprite(0, 0, "background");
    var board = game.add.sprite(width * 0.32, height * 0.08, "board");
    var hand1 = game.add.sprite(width * 0.00, 0, "handContainer");
    var hand2 = game.add.sprite(width * 0.85, 0, "handContainer");
    var card1 = game.add.sprite(width * 0.024, height * 0.06, "cards1b", 0);
    var card2 = game.add.sprite(width * 0.024, height * 0.2125, "cards1b", 1);
    var card3 = game.add.sprite(width * 0.024, height * 0.365, "cards1b", 2);
    var card4 = game.add.sprite(width * 0.024, height * 0.5175, "cards1b", 3);
    var card5 = game.add.sprite(width * 0.024, height * 0.67, "cards1b", 4);
    var card6 = game.add.sprite(width * 0.874, height * 0.06, "cards1r", 0);
    var card7 = game.add.sprite(width * 0.874, height * 0.21, "cards1r", 1);
    var card8 = game.add.sprite(width * 0.874, height * 0.37, "cards1r", 2);
    var card9 = game.add.sprite(width * 0.874, height * 0.52, "cards1r", 3);
    var card10 = game.add.sprite(width * 0.874, height * 0.67, "cards1r", 4);

    card1.inputEnabled = true;
    card1.input.enableDrag(true);
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

    

    hand1.scale.setTo(0.8,0.9);
    hand2.scale.setTo(0.8,0.9);
    board.scale.setTo(1.2,1.05);
    
}

function update() {

}
