const BASE_URL = 'https://restcountries.eu/rest/v2';

import axios from 'axios';

export default async function fetchCountries(query) {
  //   return fetch(`${BASE_URL}/name/${name}?fields=name;capital;population;flag;languages`).then(
  //     response => {
  //       return response.ok ? response.json() : Promise.reject();
  //     },
  //   );
  const options = {
    method: 'get',
    baseURL: BASE_URL,
    url: `/name/${query}`,
    params: {
      fields: `name;capital;population;flag;languages`,
    },
  };
  const response = await axios.request(options);

  return response.data;
}
