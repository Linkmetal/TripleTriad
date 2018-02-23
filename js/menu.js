var Menu = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};


  
Menu.prototype = {
	preload: function(){
		  this.game.load.image("background","img/background2.jpg");
		  this.game.load.image("logo","img/tripleTriadLogo.jpg");
		  this.game.load.image("login","img/login.png");
		  this.game.load.image("register","img/register.png");


	},
  	create: function(){
		var background = this.game.add.sprite(0, 0, "background");
		var logo = this.game.add.sprite(game.world.centerX - 340, 0, "logo");
		this.usernameInput = this.createInput(this.game.world.centerX, 400);
		this.usernameInput.anchor.set(0.5);
		this.usernameInput.canvasInput.placeHolder("Username");
		this.usernameInput.canvasInput.value("");
		this.passInput = this.createInput(this.game.world.centerX, 475);
		this.passInput.anchor.set(0.5);
		this.passInput.canvasInput.placeHolder("Password");
		this.passInput.canvasInput.value("");
		
		button = game.add.button(game.world.centerX - 240, 525, 'login', login, this, 2, 1, 0);
		button = game.add.button(game.world.centerX - 155, 625, 'register', showForm, this, 2, 1, 0);

		// this.game.state.add('Game', Game);
        // this.game.state.start('Game');
	},
	inputFocus: function(sprite){
		sprite.canvasInput.focus();
	},
	createInput: function(x, y){
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
	}
}

function login(){

}

