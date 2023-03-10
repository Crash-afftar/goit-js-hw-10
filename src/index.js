import './css/styles.css';
import { fetchCountries } from './js/fetchcountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const box = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

box.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput(event) {
  const inputTrimmed = box.value.trim();
  htmlCleaner();
  if (inputTrimmed !== '') {
    fetchCountries(inputTrimmed).then(searchValue => {
      handleSearchValue(searchValue);
    });
  }
}

function handleSearchValue(searchValue) {
  if (searchValue.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (searchValue.length === 0) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  } else if (searchValue.length > 2 && searchValue.length < 10) {
    renderCountries(searchValue);
  } else if (searchValue.length === 1) {
    renderCountry(searchValue);
  }
}
  
function renderCountry(countries) {
    const countryMainInfo = countries
        .map(country => {
            return `<li>
        ${country.flags.svg ? `<img src="${country.flags.svg}" alt="${country.flags.alt}" width="40" height="25">` : ""}
            <span style="font-size: 40px; font-weight: 700">${country.name.official ?? ""}</span>`;})
        .join();

    const countryInfo = countries
        .map(country => {
            return `<p>
        <b>Capital: </b>${country.capital ?? ""}</p>
            <p><b>Population: </b>${country.population ?? ""}</p>
            <p><b>Languages: </b>${Object.values(country.languages) ?? ""}</p>
            </li>`;})
        .join();

list.insertAdjacentHTML('beforeend', countryMainInfo);
info.insertAdjacentHTML('beforeend', countryInfo);
};

function renderCountries(countries) {
  const countryInfo = countries
    .map(country => {
      return `
        <li style="padding: 20px;">${
          country.flags.svg
            ? `<img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="20">`
            : ''
        }
        <span style="font-size: 20px; font-weight: 700";>${country.name.official ?? ''}</span>
        </li>`;
    })
    .join('');

    list.innerHTML = countryInfo;
}


function htmlCleaner() {
  list.innerHTML = '';
  info.innerHTML = '';
}


// function renderCountry(countries) {
//   const countryMainInfo = countries
//     .map(country => {
//       return `<li>
//       ${country.flags.svg ? `<img src="${country.flags.svg}" alt="${country.flags.alt}" width="30" height="20">` : ''}
//       <span>${country.name.official ?? ''}</span>
//       <p><b>Capital:</b>${country.capital ?? ''}</p>
//       <p><b>Population:</b>${country.population ?? ''}</p>
//       <p><b>Languages:</b>${Object.values(country.languages) ?? ''}</p>
//     </li>
//   `;
//     }).join('');
    
//   list.innerHTML = countryMainInfo;
// }

// {/* <input type="text" id="search-box" />
//     <ul class="country-list"></ul>
//     <div class="country-info"></div> */}

// box.addEventListener(
// 'input', 
// debounce( event => {
//   const inputTrimmed = box.value.trim();
//   htmlCleaner()
//   if (inputTrimmed !== '') {
//     fetchCountries(inputTrimmed).then(searchValue => {
//       if (searchValue.length > 10) {
//         Notiflix.Notify.info(
//           'Too many matches found. Please enter a more specific name.'
//         );
//       } else if (searchValue.length === 0) {
//         Notiflix.Notify.failure('Oops, there is no country with that name');
//       } else if (searchValue.length > 2 && searchValue.length < 10) {
//         renderCountries(searchValue);
//       } else if (searchValue.length === 1) {
//         renderCountry(searchValue);
//       }
//     });
//   }     
// },
//     DEBOUNCE_DELAY)
// );
