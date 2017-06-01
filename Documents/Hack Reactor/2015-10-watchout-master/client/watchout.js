//General Settings

var settings = {
  w: window.innerWidth,
  h: window.innerHeight,
  radius: 15,
  nEnemies: 30,
  duration: 1500
};

// var mouse = {x: settings.w/2, y:settings.h/2};

var score = 0;
var highScore = 0;
var collisionCount = 0;


var updateScore = function() {
  d3.select('.scoreboard .current span').text(score);
  d3.select('.scoreboard .highscore span').text(highScore);
  d3.select('.scoreboard .collisions span').text(collisionCount);
}

//create the board

var board = d3.select('.board')  //select the DIV Class board
    .append('svg') //appending the svg element
    .attr('height',settings.h) //
    .attr('width',settings.w)
   .style('display', 'block')
    .style('margin', 'auto');

//Enemy Data
var enemies = board.selectAll('enemies')
  .data(d3.range(settings.nEnemies))
  .enter()
  .append('ellipse')
  .attr('rx',5)
  .attr('ry',14)
  .attr('cx', function() {
    return (Math.random() * settings.w);
  })
  .attr('cy',function() {
    return (Math.random() * settings.w)
  })
  .attr('fill','deepPink');

var moveEnemies = function() {
  enemies.transition()
  .duration(settings.duration)
  .attr('cx',function() {
    return (Math.random() * settings.w);
  })
  .attr('cy', function() {
    return (Math.random() * settings.w);
  })
  // .tween('custom',tweenWithCollisionDetection)
}

// MAKE STUFF MOVE!!
// setInterval(transformOriginRotation, 2000);
setInterval(moveEnemies, 2000);
// setInterval(increaseScore, 1000);

//Player

var player = board.append('image')
  .attr('x',settings.w/2)
  .attr('y',settings.h/2)
  .attr('height', '100px')
  .attr('width', '100px')
  .attr('xlink:href','https://media3.giphy.com/media/3oGRFkmoqoui9nzL2g/giphy.gif')

var checkForCollsion = function(enemy) {
  var enemyCx = parseFloat(enemy.attr('cx'));
  var enemyCy = parseFloat(enemy.attr('cy'));
  var playerCx = parseFloat(enemy.attr('x'));
  var playerCy = parseFloat(enemy.attr('y'));

   if (Math.hypot(enemyCx - playerCx, enemyCy - playerCy) <= 25) {
    resetScore();
    renderScore();
  }
};
