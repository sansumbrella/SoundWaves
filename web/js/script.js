/* Author: David Wicks

*/

var Station = function(startX, startY){
	var x = startX;
	var y = startY;
	var style = "rgb(55,55,55)";
	
	var emit = function(){
		
	};
	
	return {
		update: function(){
			
		},
		draw: function(context){
			context.fillStyle = style;
			context.font = "12pt Helvetica";
			context.fillText("128.004,76.012", x, y);
		}
	};
};

var Particle = function ( startX, startY ) {
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
	var emitters = [];
	var w = 960;
	var h = 540;
	var fillStyle = "rgb(255,200,255)";
	
	var createParticles = function(){
		console.log("Yo, got some context: " + context);
		console.log("Creating particles");
		
		for( var i = 0; i != 10; ++i ){
			particles.push( Particle( Math.random()*w, Math.random()*h/2 ) );
		}
	}
	var createEmitters = function(){
		for( var i = 0; i != 10; ++i ){
			emitters.push( Station( Math.random() * w * 0.5, Math.random() * h ) );
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
		createEmitters();
	}
	app.update = function() {
		context.fillStyle = fillStyle;
		context.fillRect(0,0,w,h);
		for( var i in particles ){
			particles[i].update();
		}
		for( var i in emitters ){
			emitters[i].update();
		}
		app.draw();
		requestAnimFrame(app.update);
	}
	app.draw = function() {
		for( var i in particles ){
			particles[i].draw(context);
		}
		for( var i in emitters ){
			emitters[i].draw(context);
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



