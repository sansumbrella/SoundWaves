/* Author: David Wicks

*/

var createParticle = function ( startX, startY ) {
	var x = startX;
	var y = startY;
	var vx = 0;
	var vy = 1;
	var style = "rgb(200,200,0)";
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
			context.fillStyle = style;
			context.fillRect( x, y, 12, 12 );
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
	// private members
	var app = {};
	var context;
	var particles = [];
	var w = 960;
	var h = 540;
	var fillStyle = "rgb(255,200,255)";
	
	var createParticles = function(){
		console.log("Yo, got some context: " + context);
		console.log("Creating particles");
		
		for( var i = 0; i != 10; ++i ){
			particles.push( createParticle( Math.random()*w, Math.random()*h/2 ) );
		}
	}
	
	// public interface
	app.setup = function() {
		// get window width and height
		w = $(window).width();
		h = $(window).height();
		var canvas = document.getElementById("pacific");
		canvas.width = w;
		canvas.height = h;
		context = canvas.getContext('2d');
		createParticles();
	}
	app.update = function() {
		context.fillStyle = fillStyle;
		context.fillRect(0,0,w,h);
		for( var i in particles ){
			particles[i].update();
		}
		app.draw();
		requestAnimFrame(app.update);
	}
	app.draw = function() {
		for( var i in particles ){
			particles[i].draw(context);
		}
	}
	app.run = function() {
		console.log("Running Pacific");
		app.update();
	}
	
	return app;
}();

$(document).ready( function(){
	for( var i in pacific ){
		console.log( i + " : " + pacific[i])
	}
	pacific.setup();
	pacific.run();
})



