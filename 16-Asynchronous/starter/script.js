'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const URL = 'https://countries-api-836d.onrender.com/countries';

///////////////////////////////////////

const renderCountry = function (data, className) {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flag}" />
      <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1_000_000
        ).toFixed(1)}</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/*
///////////////////////////////////////////////////////
// Callback hell 

const getCountryAndNeighbour = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `${URL}/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    // render first country
    const [data] = JSON.parse(this.responseText);
    renderCountry(data);

    // get neighbour country
    const neighbour = data.borders?.[0];

    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `${URL}/alpha/${neighbour}`);
    request2.send();

    // request second country
    request2.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      renderCountry(data, 'neighbour');
    });
  });
};

getCountryAndNeighbour('USA');
*/

///////////////////////////////////////////////////////////////////////////////

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
    return response.json();
  });
};

const getCountryData = function (country) {
  // fetch(`${URL}/name/${country}`)
  getJSON(`${URL}/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data?.[0]);
      const neighbour = data?.[0].borders?.[0];
      if (!neighbour) throw new Error('Neighbour not found');
      // return fetch(`${URL}/alpha/${neighbour}`);
      return getJSON(`${URL}/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(error => {
      console.error(`${error}: 💥💥💥`);
      renderError(`💥Something went wrong: ${error.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// getCountryData('germany');

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// Coding challenge 1
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(response => {
//       if (!response.ok) throw new Error(`Problem with GeoCoding ${res.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`${URL}/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${res.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(error => {
//       console.error(error.message, '💥');
//     })
// };

// whereAmI(52.508, 13.381);

///////////////////////////////////////////////////////////////////////////////////////
// const lotteryPromisse = new Promise(function (resolve, reject) {
//   console.log('La loteria esta pasando');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WON the lottery 🙌🏽');
//     } else {
//       reject('You LOST your money 💩');
//     }
//   }, 1000);
// });

// lotteryPromisse.then(res => console.log(res)).catch(err => console.error(err));
// lotteryPromisse.then(res => console.log(res)).catch(err => console.error(err));

// Promesifying setTimeout

// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   })
// }

// wait(2).then(() => {
//   console.log('aver espere dos segundos ')
//   return wait(1)
// }).then(() => console.log('espere un segundo'))

///////////////////////////////////////////////////////////////////////////////////////////////

// navigator.geolocation.getCurrentPosition(position => console.log(position), error => console.error(error));

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = function (lat, lng) {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Problem with GeoCoding ${res.status}`);
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return fetch(`${URL}/name/${data.country}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${res.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0]))
//     .catch(error => {
//       console.error(error.message, '💥');
//     });
// };

// btn.addEventListener('click', whereAmI);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding challenge 2

// const imgContainer = document.querySelector('.images');

// const wait = function(seconds) {
//   return new Promise(function(resolve) {
//     setTimeout(resolve, seconds * 1000);
//   })
// }

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function() {
//       reject(new Error('Image not found'));
//     })
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
// .then(img => {
//   currentImg = img;
//   console.log('img 1 loaded');
//   return wait(2);
// })
// .then(() => {
//   currentImg.style.display = 'none';
//   return createImage('img/img-2.jpg');
// })
// .then(img => {
//   currentImg = img;
//   console.log('img 2 loaded');
//   return wait(2);
// })
// .then(() => {
//   currentImg.style.display = 'none';
// })
// .catch((error) => {
//   console.error(error)
// })

////////////////////////////////////////////////////////////////////////////////////////

// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   try {
//     const pos = await getPosition();
//     const { latitude: lat, longitude: lng } = pos.coords;

//     const resgeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     if (!resgeo.ok) throw new Error('Geocode error');
//     const datageo = await resgeo.json();

//     const res = await fetch(`${URL}/name/${datageo.country}`);
//     if (!res.ok) throw new Error('Error getting country');
//     const data = await res.json();

//     renderCountry(data[0]);
//     return `You are in ${datageo.city}, ${datage.country}`;
//   } catch (error) {
//     console.error(error, '💥');
//     renderError('something went wrong 💥')
//   }
// };

// (async function() {
//   try{
//     const city = await whereAmI();
//     console.log('city', city);
//   } catch(error) {
//     console.error(error.message, '💥')
//   }
//   console.log('finished getting location');
// })()

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// const get3Countries = async function(c1, c2, c3) {
//   try {
//     // const [data1] = await getJSON(`${URL}/name/${c1}`);
//     // const [data2] = await getJSON(`${URL}/name/${c1}`);
//     // const [data3] = await getJSON(`${URL}/name/${c1}`);

//     // console.log(data1.capital, data1.capita2, data1.capita3);

//     const data = await Promise.all([
//       getJSON(`${URL}/name/${c1}`),
//       getJSON(`${URL}/name/${c2}`),
//       getJSON(`${URL}/name/${c3}`),
//     ])

//     const capitals = data.map(d => d[0].capital);

//     console.log('aver data ', capitals);
//   } catch(error) {
//     console.error(error);
//   }
// }

// get3Countries('portugal', 'canada', 'tanzania');

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// const timeout = function (sec) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long!'));
//     }, sec * 1000);
//   });
// };

// Promise.race([getJSON(`${URL}/name/tanzania`), timeout(0.2)]).then(res => console.log(res)).catch(err => console.error(error));

// Promise.allSettled([
//   Promise.resolve('success'),
//   Promise.reject('success'),
//   Promise.resolve('success 2'),
// ])

///////////////////////////////////////////////////////////////////////////////////////////////////////////

// Coding challenge

const imgContainer = document.querySelector('.images');

const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  })
}

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function() {
      reject(new Error('Image not found'));
    })
  });
};

// const loadNPause = async function() {
//   try {
//     let img = await createImage('img/img-1.jpg');
//     console.log('aver load img 1 ', );
//     await wait(2);
//     img.style.display = 'none';
    
//     img = await createImage('img/img-2.jpg');
//     console.log('aver load img 2 ', );
//     await wait(2);
//     img.style.display = 'none';
//   } catch(error) {
//     console.error(error);
//   }
// } 

// loadNPause();

const loadAll = async function(imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImage(img));
    const imgsEl = await Promise.all(imgs);
    imgsEl.forEach(img => img.classList.add('parallel'));

  } catch(error) {
    console.error(error);
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])