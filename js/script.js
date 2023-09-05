const inputDay = document.querySelector('#day');
const inputMonth = document.querySelector('#month');
const inputYear = document.querySelector('#year');
const arrBtn = document.querySelector('.btn');
const [resDay] = document.querySelectorAll('.day');
const [resMonth] = document.querySelectorAll('.month');
const [resYear] = document.querySelectorAll('.year');
const result = document.querySelectorAll('.result');
const atualDate = new Date();
const messageDay = document.querySelector('.message--day');
const messageMonth = document.querySelector('.message--month');
const messageYear = document.querySelector('.message--year');
const inputs = document.querySelectorAll('input');

const calcAge = (bDate, aDate) => {
  const birthDate = new Date(bDate);
  const currentDate = new Date(aDate);

  let years = currentDate.getFullYear() - birthDate.getFullYear();
  let months = currentDate.getMonth() - birthDate.getMonth();
  let days = currentDate.getDate() - birthDate.getDate();

  if (days < 0) {
    const lastMonthDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );
    days =
      lastMonthDate.getDate() - birthDate.getDate() + currentDate.getDate();
    months--;
  }

  if (months < 0) {
    months = 12 + months;
    years--;
  }

  class Age {
    constructor(day, month, year) {
      this.day = day;
      this.month = month;
      this.year = year;
    }
  }

  return new Age(days, months, years);
};

const renderAge = function (day, month, year) {
  resDay.textContent = day;
  resMonth.textContent = month;
  resYear.textContent = year;
};

const renderError = function (err, errSMS = 'this field is required') {
  //err.classList.add('error');
  const input = err.closest('.input');
  const label = input.querySelector('label');
  const message = input.querySelector('.message');

  err.style.border = '1px solid hsl(0, 100%, 67%)';
  message.textContent = errSMS;
  label.style.color = ' hsl(0, 100%, 67%)';
};

const renderErrorFC = function (err, errSMS = 'this field is required') {
  //err.classList.add('error');
  const input = err.closest('.input');
  const label = input.querySelector('label');
  const message = input.querySelector('.days');

  err.style.border = '1px solid hsl(0, 100%, 67%)';

  if (message) {
    message.textContent = errSMS;
  }
  label.style.color = ' hsl(0, 100%, 67%)';
};

const removeStyle = function (...err) {
  err.forEach((el) => {
    const input = el.closest('.input');
    const label = input.querySelector('label');
    const message = input.querySelector('.message');
    message.textContent = '';
    label.style.color = '  hsl(0, 1%, 44%)';
    el.style.border = '1px solid hsl(0, 0%, 86%)';
    message.textContent = '';
  });
};

const verifyInputs = function (date) {
  const [...Errors] = document.querySelectorAll('input');
  const monthDays = new Date(inputYear.value, inputMonth.value, 0);

  if (inputDay.value > monthDays.getDate()) {
    renderError(inputDay, 'Must be a valid day');
  }
  if (inputMonth.value > 12) {
    renderError(inputMonth, 'Must be a valid month');
  }
  if (inputYear.value > atualDate.getFullYear()) {
    renderError(inputYear, 'Must be in the past');
  }

  if (!isNaN(date) && inputMonth.value - 1 !== date.getMonth()) {
    inputs.forEach((input) => renderErrorFC(input, 'Must be a valid date'));
  }

  if (Errors.some((err) => !err.value)) {
    Errors.forEach((err) => (!err.value ? renderError(err) : removeStyle(err)));
  }
};

arrBtn.addEventListener('click', function () {
  const [...inputs] = document.querySelectorAll('input');
  const date = new Date(
    `${inputMonth.value - 1 === 0 ? 'jan' : inputMonth.value} ${
      inputDay.value
    } ${inputYear.value} `
  );

  verifyInputs(date);
  if (inputs.some((el) => !el.value)) {
    verifyInputs(date);
    return;
  }
  if (isNaN(date) || inputMonth.value - 1 !== date.getMonth()) {
    verifyInputs(date);
    return;
  }
  const age = calcAge(date, atualDate);
  console.log(age.day);
  renderAge(age.day, age.month, age.year);

  inputs.forEach((el) => {
    removeStyle(el);
  });
});
