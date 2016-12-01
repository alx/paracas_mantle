(function(d3) {
  'use strict';

  var smallestSize = 5;
  var squareSize = smallestSize * 7;

  var Color = net.brehaut.Color;

  var width = squareSize * 20;
  var height = squareSize * 12;

  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  d3.csv('csv/all.csv', function(error, dataset) {
    var squares = svg.selectAll("rect")
                              .data(dataset)
                              .enter()
                              .append("rect");

    var squareAttributes = squares
                           .attr("x", function (d) {
                             var origin = parseInt(d.col) * squareSize;
                             var shift = parseInt(d.level) * smallestSize;
                             //console.log("origin/shift: " + origin + "/" + shift);
                             return origin + shift;
                           })
                           .attr("y", function (d) {
                             var origin = parseInt(d.line) * squareSize;
                             var shift = parseInt(d.level) * smallestSize;
                             //console.log("origin/shift: " + origin + "/" + shift);
                             return origin + shift;
                           })
                           .attr("width", function (d) {
                             var size = 0
                             switch(parseInt(d.level)) {
                               case 3:
                                 size = smallestSize;
                                 break;
                               case 2:
                                 size = smallestSize * 3;
                                 break;
                               case 1:
                                 size = smallestSize * 5;
                                 break;
                               case 0:
                                 size = smallestSize * 7;
                                 break;
                             }
                             return size;
                           })
                           .attr("height", function (d) {
                             var size = 0
                             switch(parseInt(d.level)) {
                               case 3:
                                 size = smallestSize;
                                 break;
                               case 2:
                                 size = smallestSize * 3;
                                 break;
                               case 1:
                                 size = smallestSize * 5;
                                 break;
                               case 0:
                                 size = smallestSize * 7;
                                 break;
                             }
                             return size;
                           })
                           .style("fill", function(d) {
                             var color = Color([d.r, d.g, d.b]);
                             return color.lightenByRatio(0.8).saturateByRatio(1.2).toCSS();
                           });
  });

})(window.d3);
