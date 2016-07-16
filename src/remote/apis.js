const API = {
  getDashboard (email) {
    email = email.toLowerCase().trim();
    return fetch(`https://cheapass.in/api/dashboard/tracks/${email}`)
    .then((response) => response.json());
  },

  getProductPriceHistory ({seller, id}) {
    return fetch(`https://cheapass.in/track/${seller}/${id}?app=1`)
    .then(response => response.json())
    .then(response => {
      console.log('getProduct success ', response);
      return response;
    })
    .catch(e => console.log(`error hitting https://cheapass.in/track/${seller}/${id}?app=1`, e));
  },

  requestAppInstallation (data) {
    return fetch('https://cheapass.in/mobile/register', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log('requestAppInstallation success ', response);
      return response;
    })
    .catch(e => console.log('error hitting /mobile/register ', e));
  },

  requestOTP (data) {
    return fetch('https://cheapass.in/mobile/initiate', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log('requestOTP success ', response);
      return response;
    })
    .catch(e => console.log('error hitting /mobile/initiate ', e));
  },

  verifyOTP (data) {
    return fetch('https://cheapass.in/mobile/verify', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      console.log('verifyOTP success ', response);
      return response;
    })
    .catch(e => console.log('error hitting /mobile/verify ', e));
  },

  addProduct ({email, url}) {
    return fetch(`https://cheapass.in/inputurl?url=${encodeURIComponent(url)}`)
      .then(response => response.json())
      .then(response => {
        if (response.error) {
          /* globals Promise */
          return Promise.resolve({
            code: 'error',
            status: response.error
          })
        }
        return fetch(`https://cheapass.in/alert?email=${encodeURIComponent(email)}&url=${encodeURIComponent(url)}`)
          .then(response => response.json())
      })
  },

  deleteProduct ({id, seller}) {
    return fetch(`https://cheapass.in/unsubscribe?seller=${seller}&id=${id}`)
      .then(response => response.json())
      .then(response => {
        console.log('deleteProduct success', response);
        return response;
      })
      .catch(e => console.log('error hitting /unsubscribe', e));
  }
};

export default API;
