
import { createStore } from 'framework7/lite';

const store = createStore({
  state: {
    notes: [],
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
    initNotes({state}, notes) {
      state.notes = notes;
    },

    addNote({ state }, note) {
      state.notes = [...state.notes, note];
    },

    updateNote({state}, note) {
      state.notes = state.notes.map( sNote => sNote.title === note.title ? note : sNote);
    },

    deleteNote({state}, index) {
      state.notes = state.notes.filter( note => note.index !== index);
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
