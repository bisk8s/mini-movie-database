import { PersonData } from '../../services/Api';

const DEFAULT_STATE: PersonData = {
  id: 0,
  last_name: '',
  first_name: '',
  aliases: [],
  created_at: '',
  updated_at: ''
};

const Person = (state: PersonData = DEFAULT_STATE, action: string) => {
  switch (action) {
    default:
      return state;
  }
};

export default Person;
