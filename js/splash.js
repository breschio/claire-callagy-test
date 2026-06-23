// Pick the splash background video, cycling to the next one on each reload
(function () {
  var videos = [
    'videos/cloudbreak.mp4',
    'videos/reflection.mp4',
    'videos/sunset.mp4'
  ];

  var index;
  try {
    var last = parseInt(localStorage.getItem('splashVideoIndex'), 10);
    index = Number.isInteger(last) ? (last + 1) % videos.length
                                   : Math.floor(Math.random() * videos.length);
    localStorage.setItem('splashVideoIndex', index);
  } catch (e) {
    // localStorage unavailable (e.g. private mode) — just randomize
    index = Math.floor(Math.random() * videos.length);
  }

  var video = document.getElementById('splash-video');
  if (video) {
    video.src = videos[index];
    video.load();
    var play = video.play();
    if (play && play.catch) { play.catch(function () {}); }
  }
})();
