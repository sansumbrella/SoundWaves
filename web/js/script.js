/* Author: David Wicks

*/

var particle = function ( startX, startY ) {
	var x = startX;
	var y = startY;
	var vx = 0;
	var vy = 1;
	return {
		setPos: function(tx, ty){
			x = tx;
			y = ty;
		},
		update: function () {
			x += vx;
			y += vy;
		},
		draw: function (context) {
			context.fillStyle = "rgb(200,200,0)";
			context.fillRect( x, y )
		}
	};
};

window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var pacific = function () {
	var app = {};
	var context;
	var particles = [];
	app.setup = function() {
		console.log("Setup Pacific");
	}
	app.update = function() {
		console.log("update");
		app.draw();
		requestAnimFrame(app.update);
	}
	app.draw = function() {
		console.log("draw");
	}
	app.run = function() {
		console.log("Running Pacific");
		var canvas = document.getElementById("pacific");
		context = canvas.getContext('2d');
		context.fillStyle = "rgb(200,0,0)";
		context.fillRect( 50, 10, 100, 100 );
		app.update();
	}
	
	return app;
}();

$(document).ready( function(){
	console.log("Ready for action, mister");
	for( var i in pacific ){
		console.log( i + " : " + pacific[i])
	}
	pacific.setup();
	pacific.run();
})



