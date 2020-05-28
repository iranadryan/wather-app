const weatherForm = document.querySelector('form');
const search = document.querySelector('form input');
const result = document.querySelector('.result');
const locP = document.querySelector('#location');
const desP = document.querySelector('#describe');
const temP = document.querySelector('#temperature');
const feeP = document.querySelector('#feelslike');
const err = document.querySelector('.err');
const errP = document.querySelector('#err');
const loadP = document.querySelector('#load');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  err.style.display = 'none';
  result.style.display = 'none';
  loadP.style.display = 'flex';

  const location = search.value;

  fetch(`/weather?address=${location}`)
    .then(res => {
      res.json().then(({ error = undefined, location, forecast }) => {
        if (error) {
          loadP.style.display = 'none';
          result.style.display = 'none';
          errP.textContent = error;
          return err.style.display = 'flex';
        }

        loadP.style.display = 'none';
        err.style.display = 'none';
        locP.textContent = location;
        desP.textContent = forecast.description;
        temP.textContent = forecast.temperature + 'º C';
        feeP.textContent = forecast.feelslike + 'º C';
        result.style.display = 'flex';
      });
    });
});