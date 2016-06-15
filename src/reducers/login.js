const initialLoginForm = {
  email: '',
  errors: {},
}

const loginForm = (state = initialLoginForm, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default loginForm;

export const getLoginForm = (state) => state;
