
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    notes: [
      {title: 'Acura', index: 0, body: 'acura is ok'},
      {title: 'bmw', index: 1, body: 'bmw\'s are awesome!'}
    ],
    currNote: {},
    login: false,
    token: '',
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

    token({state}) {
      return state.token;
    }

  },

  actions: {
    addNote({ state }, note) {
      state.notes = [...state.notes, note];
    },

    updateNote({state}, note) {
      state.notes = state.notes.map( sNote => sNote.title === note.title ? note : sNote);
    },

    setCurrNote({state}, index) {
      state.currNote = state.notes[index];
    },

    setLogin({state}) {
      state.logged_in = !state.logged_in;
    },

    setToken({state}, token) {
      state.token = token;
    },
  },
})
export default store;
