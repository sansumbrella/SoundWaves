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
	// var that = this;
	var context;
	var particles = [];
	return {
		// why can't these functions see each other/themselves?
		setup: function () {
			console.log("Setup Pacific");
		},
		update: function () {
			console.log("update");
			draw();
		},
		draw: function () {
			console.log("draw");
		},
		run: function () {
			console.log("Running Pacific");
			var canvas = document.getElementById("pacific");
			context = canvas.getContext('2d');
			context.fillStyle = "rgb(200,0,0)";
			context.fillRect( 50, 10, 100, 100 );
			update();
		}
	};
}();

$(document).ready( function(){
	console.log("Ready for action, mister");
	pacific.setup();
	pacific.run();
	console.log( pacific.value );
})



