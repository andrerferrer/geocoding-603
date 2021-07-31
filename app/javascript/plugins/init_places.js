import places from 'places.js';

const initPlaces = () => {
  const addressInput = document.getElementById('flat_address');
  if (addressInput) {
    places({ container: addressInput });
  }
};

export { initPlaces };
