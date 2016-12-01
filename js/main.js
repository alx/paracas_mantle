$(function() {

  var selection = false;

  $('#download').click(function(e) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([$("#output").html().replace(/<br>/g,"\n")], {type: 'text/csv'}));

    a.download = "mantle.csv";

    // Append anchor to body.
    document.body.appendChild(a)
    a.click();

    // Remove anchor from body
    document.body.removeChild(a)
  });

  $('img').click(function(e) {

    if(!this.canvas) {
      this.canvas = $('<canvas />')[0];
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }
    var pixelData = this.canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 3, 3).data;

    var content = [e.offsetX, e.offsetY]
    content.push(pixelData[0]);
    content.push(pixelData[1]);
    content.push(pixelData[2]);
    content.push($("#line").val());
    content.push($("#col").val());
    content.push($("#level").val());

    $(".level" + $("#level").val()).css({"background-color": "rgb(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + ")"});

    $('#output').html($('#output').html() + '<br>' + content.join(','));

    $("#level").val($("#level").val() == 3 ? 0 : parseInt($("#level").val()) + 1);
    $("#col").val($("#level").val() == 0 ? parseInt($("#col").val()) + 1 : $("#col").val());
    if(parseInt($("#col").val()) == 20) {
      $("#col").val(0);
      $("#line").val(parseInt($("#line").val()) + 1);
    }
  });

  $('img').mousemove(function(e) {

    $(".square").css({top: e.offsetY - 30, left: e.offsetX + 20});

    if(!this.canvas) {
      this.canvas = $('<canvas />')[0];
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.getContext('2d').drawImage(this, 0, 0, this.width, this.height);
    }

    var pixelData = this.canvas.getContext('2d').getImageData(e.offsetX, e.offsetY, 3, 3).data;

    var currentLevel = $("#level").val();

    while(currentLevel < 4) {
      $(".level" + currentLevel).css({"background-color": "rgb(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + ")"});
      currentLevel++;
    }

  });



});
