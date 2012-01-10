/* Author: David Wicks

*/

var Station = function(system, startX, startY){
	var particleSystem = system;
	var x = startX;
	var y = startY;
	var style = "rgb(55,55,55)";
	var frequency = 2000 + Math.random() * 5000;
	var time = new Date().getTime();
	
	var emit = function(){
		particleSystem.push( Particle(x, y) );
	};
	
	return {
		update: function(){
			var now = new Date().getTime();
			if( now - time > frequency ){
				emit();
				time = now;
			}
		},
		draw: function(context){
			context.fillStyle = style;
			context.font = "12pt Helvetica";
			context.fillText("Arena Cove", x, y);
		}
	};
};

var Particle = function ( startX, startY ) {
	var x = startX;
	var y = startY;
	var vx = 0;
	var vy = 1;
	var style = "rgb(0,0,0)";
	var life = 100;
	return {
		setPos: function(tx, ty){
			x = tx;
			y = ty;
		},
		update: function () {
			x += vx;
			y += vy;
			life -= 1;
		},
		draw: function (context) {
			context.fillStyle = style;
			// context.fillRect( x, y, 6, 6 );
			context.beginPath();
			context.arc(x, y, 6, 0, 360);
			context.fill();
		},
		isDead: function(){
			return life < 1;
		}
	}
}

// curry for error handling
function onError(location){
	return function(err){
		console.log( location + ": " + err );
	}
}

function loadSound(url, context, outputBuffer){
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';
	
	request.onload = function(){
		context.decodeAudioData(request.response, function(buffer){
			outputBuffer = buffer;
			playSound(context, buffer);
		}, onError("loadSound") );
	}
	request.send();
}

function playSound(context, buffer){
	var source = context.createBufferSource();
	source.buffer = buffer;
	source.connect( context.destination );
	source.noteOn(0);
}

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
	var audioContext;
	var audioBuffer;
	var particles = [];
	var emitters = [];
	var w = 960;
	var h = 540;
	var fillStyle = "rgb(200,200,220)";
	
	var createEmitters = function(){
		for( var i = 0; i != 10; ++i ){
			emitters.push( Station( particles, Math.random() * w * 0.5, Math.random() * h ) );
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
		
		try{
			audioContext = new webkitAudioContext();
		} catch (e) {
			console.log("no audio in this browser...");
		}
		
		if(audioContext){
			loadSound("data/feist.mp3", audioContext, audioBuffer);
		}
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
		for( var i = particles.length - 1; i >= 0; --i ){
			if( particles[i].isDead() ){
				particles.splice(i,1);
			}
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
	pacific.setup();
	pacific.run();
})



