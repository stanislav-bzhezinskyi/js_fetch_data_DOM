'use strict';

const listURL = 'https://mate-academy.github.io/phone-catalogue-static/api';
const list = document.createElement('ul');

const request = (url) => {
  return fetch(`${listURL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} --- ${response.statusText}`);
      }

      return response.json();
    });
};

const getPhones = () => request(`/phones.json`);

const getPhonesDetails = (phones) => {
  const phonesWithDetails = [];

  phones.map(phone => {
    request(`/phones/${phone.id}.json`)
      .then(response => {
        list.insertAdjacentHTML('beforeend', `
          <li>${response.name}</li>
        `);

        phonesWithDetails.push(
          {
            ...phone,
            details: response,
          }
        );
      });
  });
  document.body.append(list);

  return phonesWithDetails;
};

getPhones()
  .then(result => getPhonesDetails(result))
  .catch(error => {
    setTimeout(() => document.body.append(error), 5000);
  });
