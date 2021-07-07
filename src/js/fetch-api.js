import debounce from 'lodash.debounce';

import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import API from './api-service';
import getRefs from './get-refs';
const refs = getRefs();

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { defaults } from '@pnotify/core';
defaults.delay = 3000;

refs.inputField.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;

  if (searchQuery === '') {
    return;
  }

  API.fetchCountry(searchQuery).then(renderCountryCard).catch(onFetchError);
}

function renderCountryCard(country) {
  if (country.length > 10) {
    makeNotification('Too many mathes found. Please enter a more specific query!');
  } else if (country.length > 1 && country.length < 11) {
    makeMarkup(countryListTpl(country));
  } else if (country.length === 1) {
    makeMarkup(countryCardTpl(country[0]));
  } else if (country.status === 404) {
    makeNotification('Country not found. Please enter correct query!');
  }
}

function onFetchError(error) {
  makeNotification('Thomething wrong!');
}

function makeMarkup(markup) {
  refs.cardContainer.innerHTML = markup;
}

function makeNotification(textNotif) {
  alert({
    title: textNotif,
    type: 'info',
  });
}
