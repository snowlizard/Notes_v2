
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    notes: [],
    login: false,
  },

  getters: {
    notes({ state }) {
      return state.notes;
    },
    
    login({state}) {
      return state.logged_in;
    }
  },

  actions: {
    addNote({ state }, note) {
      state.notes = [...state.notes, note];
    },

    setLogin({state}) {
      state.logged_in = !state.logged_in;
    }
  },
})
export default store;
