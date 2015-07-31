var $tagline = $('.tagline');
var randomTagline;
var $beginButton = $('.begin-button');
var $startOverButton = $('.startover-button');
var $randomButton = $('.random-button');
var $tagContainer = $('.tag-container');
var $tagged; 
var $content = $('.content');
var $contentImage = $('.content-image');
var $loadingImage = $('.loading-image');
var randomTag;
var tagCount = 1;

// adds tagline to header
var createRandomTagline = function() {
  var taglineList = ['For the brain-dead human.', 'Weird things courtesy of Tumblr.', 'Who knew there were so many gifs on the Internet?', 'Powered by pizza.']
  randomTagline = taglineList[Math.floor(Math.random() * taglineList.length)];
  $tagline.text(randomTagline);
};

createRandomTagline();

// tags for photos
var tagList = ['funny-gif', 'lol-gif', 'dog', 'dog-gif', 'cat-gif', 'animals', 'animal-gif', 'puppy', 'puppy-gif', 'kitten', 'kitten-gif', 'corgi', 'space-gif', 'goat-gif', 'cute-overload', 'kawaii-gif', 'rilakkuma-gif', 'pusheen', 'spongebob-gif', 'pinterest-fail', 'harry-potter-gif', 'mesmerizing-gif', 'pizza-gif', 'arrested-development-gif', 'donut-gif', '30-rock-gif', 'tina-fey-gif'];

// creates range of timestamps from which to pull posts from - increase variety
var timestamp = [];
var currentMs = Math.floor((new Date()).getTime()/1000);
  for (var i = 1300000000; i < currentMs; i += 1000000) {
    timestamp.push(i);
  }

// creates random tag 
var createRandomTag = function() {
  randomTag = tagList[Math.floor(Math.random() * tagList.length)];
  console.log('random tag: ', randomTag);
}

// loads image with random tag & pulled from random time
var loadRandomImage = function(tag) {
  var randomTime = timestamp[Math.floor(Math.random() * timestamp.length)];
  console.log('random time: ', randomTime);

  //$tagContainer.append($('<button>'+tag+'</button>').addClass(tag + ' tagged'));
  $tagged = $('.tagged');

  // max 10 tag bubbles & maintain bouncing animation
  if (tagCount === 1) {
    $('.10').removeClass('animated');
    $('.'+(tagCount-1)+'').removeClass('animated');
    $('.'+tagCount+'').text(tag).removeClass('hide').addClass(''+tag+' animated');
    tagCount++
  } else if (tagCount < 10) {
    $('.'+(tagCount-1)+'').removeClass('animated');
    $('.'+tagCount+'').text(tag).removeClass('hide').addClass(''+tag+' animated');
    tagCount++
  } else if (tagCount === 10) {
    $('.'+(tagCount-1)+'').removeClass('animated');
    $('.10').text(tag).removeClass('hide').addClass(''+tag+' animated');
    tagCount = 1;
  }

  $loadingImage.show();
  $.ajax({
    url: 'http://api.tumblr.com/v2/tagged?tag='+tag+'&before='+randomTime+'&api_key=dlqISFs67gOticMc5ReDbzBDSAAkvVlnzIepQ42qhwD7m1rtYp', 
    dataType: 'jsonp',
    success: function(results) {
      console.log('tumblr result: ', results);

      // make sure it's a photo post & post
      var responseIndex = 0;

      var postImage = function() {
        if (results.response[responseIndex].photos) {
          $contentImage.attr('src', results.response[responseIndex].photos[0].alt_sizes[0].url);
        } else {
          responseIndex++
          console.log('trying again');
          postImage();
        }
      }
      postImage();
    },
    complete: function() {
      $loadingImage.hide();
    }
  });

  // load image with selected tag
  $tagged.click(function() {
    var tagClass = $(this).closest('button').attr('class').split(' ')[3];
    loadRandomImage(tagClass);
  });
};

$beginButton.click(function() {
  $startOverButton.removeClass('hide');
  $randomButton.removeClass('hide');
  $beginButton.addClass('hide');

  tagCount = 1;
  createRandomTag();
  loadRandomImage(randomTag);
});

$randomButton.click(function() {
  createRandomTag();
  loadRandomImage(randomTag);
  createRandomTagline();
});

$startOverButton.click(function() {
  $contentImage.attr('src', '');
  createRandomTagline();
  $startOverButton.addClass('hide');
  $randomButton.addClass('hide');
  $beginButton.removeClass('hide');
  $tagged.addClass('hide');
});


