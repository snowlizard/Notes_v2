
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    notes: [
      {title: 'Acura', index: 0, body: 'acura is ok'},
      {title: 'bmw', index: 1, body: 'bmw\'s are awesome!'}
    ],
    currNote: {},
    login: false,
  },

  getters: {
    notes({ state }) {
      return state.notes;
    },

    currNote({state}) {
      return state.currNote;
    },

    login({state}) {
      return state.logged_in;
    },

  },

  actions: {
    addNote({ state }, note) {
      state.notes = [...state.notes, note];
    },

    setCurrNote({state}, index) {
      state.currNote = state.notes[index];
    },

    setLogin({state}) {
      state.logged_in = !state.logged_in;
    },

  },
})
export default store;
