var $beginButton = $('.begin-button');
var $startOverButton = $('.startover-button');
var $randomButton = $('.random-button');
var $nav = $('nav');
var $content = $('.content');
var $contentImage = $('.content-image');

var tagList = ['funny', 'cute-gif', 'lol', 'dog', 'dog-gif', 'cat', 'cat-gif', 'dog-gif', 'lol-gif', 'animals'];
var tagIndex = [];
  for (var i = 0; i < 20; i++) {
  tagIndex.push(i);
  }

var timestamp = [];
var currentMs = Math.floor((new Date()).getTime()/1000);
  for (var i = 1300000000; i < currentMs; i += 1000000) {
    timestamp.push(i);
  }

var loadRandomImage = function() {
  var randomTag = tagList[Math.floor(Math.random() * tagList.length)];
  console.log('random tag: ', randomTag);
  var randomIndex = tagIndex[Math.floor(Math.random() * tagIndex.length)];
  console.log('random index: ', randomIndex);
  var randomTime = timestamp[Math.floor(Math.random() * timestamp.length)];
  console.log('random time: ', randomTime);

  $nav.append($('<button>'+randomTag+'</button>'));
  
  $.ajax({
    url: 'http://api.tumblr.com/v2/tagged?tag='+randomTag+'&before='+randomTime+'&api_key=dlqISFs67gOticMc5ReDbzBDSAAkvVlnzIepQ42qhwD7m1rtYp', 
    dataType: 'jsonp',
    success: function(results) {
      console.log(results);
      $contentImage.attr('src', results.response[0].photos[0].alt_sizes[0].url);
    }
  });
}

$beginButton.click(function() {
  $startOverButton.removeClass('hide');
  $randomButton.removeClass('hide');
  $beginButton.addClass('hide');

  loadRandomImage();

});

$randomButton.click(function() {
  loadRandomImage();
});

$startOverButton.click(function() {
  $contentImage.attr('src', '');
  $nav.html('');
  $startOverButton.addClass('hide');
  $beginButton.removeClass('hide');
});


