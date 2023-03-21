const generateButton = document.getElementById('generateButton');

function animateText(element) {
  element.classList.add('fade-in');
  setTimeout(function () {
    element.classList.remove('fade-in');
  }, 800);
}

function startCountdown() {
  const now = new Date().getTime();
  const nextClickTime = now + 24 * 60 * 60 * 1000;
  localStorage.setItem('nextClickTime', nextClickTime);
  updateCountdown(nextClickTime);
}

function updateCountdown(nextClickTime) {
    const interval = setInterval(function () {
      const now = new Date().getTime();
      const timeLeft = nextClickTime - now;

      if (timeLeft <= 0) {
        localStorage.removeItem('nextClickTime');
        enableButton();
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      generateButton.innerHTML = `Осталось: ${hours}ч ${minutes}м ${seconds}с`;
    }, 1000);
  }


function disableButton() {
  generateButton.disabled = true;
  generateButton.style.opacity = 0.5;
  startCountdown();
}

function enableButton() {
  generateButton.disabled = false;
  generateButton.style.opacity = 1;
  generateButton.innerHTML = 'Кто сегодня Венде';
}

function savePhrase(phrase) {
    localStorage.setItem('phrase', phrase);
  }

  function getSavedPhrase() {
    return localStorage.getItem('phrase');
  }

  function changeBackgroundImage() {
    document.body.style.backgroundImage = "url('https://i.ibb.co/qr5TQT9/photo-2022-02-17-20-35-03-2.jpg')";
  }

  generateButton.addEventListener('click', function () {
    const phrases = ['казел', 'казлина', 'говнюк'];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const heading = document.querySelector('h1');
    heading.innerHTML = `Ваня сегодня ${randomPhrase}`;
    animateText(heading);
    disableButton();
    savePhrase(heading.innerHTML);
    changeBackgroundImage();
  });

document.addEventListener('DOMContentLoaded', function () {
  const nextClickTime = localStorage.getItem('nextClickTime');
  const now = new Date().getTime();
  const savedPhrase = getSavedPhrase();
  const heading = document.querySelector('h1');

  if (savedPhrase) {
    heading.innerHTML = savedPhrase;
  }

  if (!nextClickTime || now >= parseInt(nextClickTime, 10)) {
    enableButton();
  } else {
    disableButton();
    updateCountdown(parseInt(nextClickTime, 10));
  }
});
