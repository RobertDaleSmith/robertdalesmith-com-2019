
// on 404/403 error pages, countdown redirect to home
function initCountdown() {
  // grabs countdown element
  var countdownEl = document.querySelector('.countdown');

  // no countdown element so bail
  if (!countdownEl) return;

  // gets init countdown time length
  var seconds = parseInt(countdownEl.innerHTML) || 10;

  // updates remaining time every second
  var interval = setInterval(function(){

    // stops updates and redirects home
    if (seconds <= 0) {
      clearInterval(interval);
      window.location.href='/';
    }

    // updates countdown element
    countdownEl.innerHTML = seconds;

    // decrement remaining time
    seconds--;

  }, 1000);
}

// initialize countdown if error page loaded
if (document.querySelector('.page.error')) initCountdown();
