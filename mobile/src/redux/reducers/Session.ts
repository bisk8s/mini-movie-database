export type AuthData = {
  token: string;
  email: string;
  password: string;
};

const DEFAULT_STATE: AuthData = {
  token: '',
  email: 'email',
  password: 'password'
};

const Session = (state: AuthData = DEFAULT_STATE, action: string) => {
  switch (action) {
    default:
      return state;
  }
};

export default Session;
