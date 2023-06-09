// Import stylesheets
import './style.css';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import template from './template.html';

// Write Javascript code!
const appDiv = document.getElementById('app');

appDiv.innerHTML = template;

element('[name="metric"]').onclick = () => {
 if (element('[name="metric"]').checked) {
  element('#inches').classList.add('visually-hidden')
  element('#height').textContent = "cm";
  element('#mass').textContent = "kg"
 }
 else {
  element('#inches').classList.remove('visually-hidden')
  element('#height').textContent = "Feet";
  element('#mass').textContent = "lbs"
 }
}

element('[name="get"]').onclick = () => {
  const metric = element('[name="metric"]').checked;
  let height = +element('[name="height"]').value;
  const inches = +element('[name="inches"]').value;
  const weight = +element('[name="weight"]').value;
  height = metric ? height / 100 : (height * 12) + inches

  const bmi = getBmi(weight, height, metric);
  const max = getBmiWeight(18.5, height, metric);
  const min = getBmiWeight(25, height, metric);

  element('#bmi').textContent = bmi.toLocaleString('en');
  element('#target').textContent = `
  ${Math.floor(max)} and ${Math.ceil(min)}
  `;

  element('#results').classList.remove('visually-hidden');

  const spectrum = getSpectrum(height, metric);
  const legend = [...document.querySelectorAll('#legend i')];
  legend.forEach((li, i) => {
    li.textContent = (`= (${spectrum[i].join(' - ')}) lbs`)
  })
}

function getBmi (mass, height, metric) {
  const bmi = mass / (height * height);
  return metric ? bmi : 703 * bmi;
}

function getBmiWeight (bmi, height, metric) {
  const weight = +bmi * (height * height);
  return metric ? weight : (weight / 703);
}

function element (q) {
  return document.querySelector(q)
}

function getSpectrum (height, metric) {
  const h = +height;
  const levels = getLevels();
  const spectrum = [];
  levels.forEach(l => {
    spectrum.push(
      [
        Math.floor(getBmiWeight(l[0], h, metric)), 
        Math.ceil(getBmiWeight(l[1], h, metric))
      ]
    )
  })
  return spectrum;
}

function getLevels () {
  return [
    [0, 15.8],
    [16, 16.8],
    [17, 18.3],
    [18.5, 25],
    [25.2, 30],
    [30.2, 35],
    [35.2, 40],
    [40.2, 1000]
  ]
}