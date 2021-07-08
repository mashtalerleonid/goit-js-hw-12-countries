import './css/style.css';

import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;

import countryCardTpl from './templates/country-card.hbs';
import countryListTpl from './templates/country-list.hbs';

import API from './js/fetchCountries';
import getRefs from './js/get-refs';
const refs = getRefs();

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  distance: '30px',
  fontSize: '20px',
  width: '400px',
  showOnlyTheLastOne: 'true',
});

refs.inputField.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchQuery = e.target.value;

  if (searchQuery === '') {
    clearMarkup(refs.countryInfo, refs.countryList);
    return;
  }

  API.fetchCountries(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  clearMarkup(refs.countryInfo, refs.countryList);

  if (country.length > 10) {
    makeNotificationInfo('Too many mathes found. Please enter a more specific name!');
  } else if (country.length > 1 && country.length < 11) {
    makeMarkup(refs.countryList, countryListTpl(country));
  } else if (country.length === 1) {
    makeMarkup(refs.countryInfo, countryCardTpl(country[0]));
  }
}

function onFetchError(error) {
  clearMarkup(refs.countryInfo, refs.countryList);
  makeNotificationError('Oops, there is no country with that name');
}

function makeMarkup(element, markup) {
  element.innerHTML = markup;
}

function clearMarkup(...args) {
  args.forEach(element => (element.innerHTML = ''));
}

function makeNotificationInfo(text) {
  Notiflix.Notify.info(text);
}

function makeNotificationError(text) {
  Notiflix.Notify.failure(text);
}
