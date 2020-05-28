const weatherForm = document.querySelector('form');
const search = document.querySelector('form input');
const result = document.querySelector('.result');
const locP = document.querySelector('#location');
const desP = document.querySelector('#describe');
const temP = document.querySelector('#temperature');
const feeP = document.querySelector('#feelslike');
const err = document.querySelector('.err');
const errP = document.querySelector('#err');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then(res => {
      res.json().then(({ error = undefined, location, forecast }) => {
        if (error) {
          result.style.display = 'none';
          errP.textContent = error;
          return err.style.display = 'flex';
        }

        err.style.display = 'none';
        locP.textContent = location;
        desP.textContent = forecast.description;
        temP.textContent = forecast.temperature + 'º C';
        feeP.textContent = forecast.feelslike + 'º C';
        result.style.display = 'flex';
      });
    });
});