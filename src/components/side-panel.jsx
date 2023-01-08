import React from 'react';
import { useState } from 'react';
import myApp from '../js/firebase';
import { database } from '../js/firebase';
import { ref, onValue } from 'firebase/database';
import store from '../js/store';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  Appbar,
  Button,
  List,
  ListButton,
  ListItem,
  ListInput,
  Link,
  Panel,
  Searchbar,
  theme,
  useStore,
  Popup
} from 'framework7-react';

const auth = getAuth(myApp);
const provider = new GoogleAuthProvider();

const SidePanel = () => {
    const loggedIn = useStore('login');
    const notes    = useStore('notes');
    const [title, setTitle] = useState('');
    const [body, setBody]   = useState('');
    const [popup, setPopup] = useState(false);

    const signIn = () => {
        if (loggedIn) {
            signOut(auth).then( () => {
                store.dispatch('setLogin');
            });
        } else {
            signInWithPopup(auth, provider)
            .then((result) => {
            const user = result.user;
            store.dispatch('setToken', user.uid);
            store.dispatch('setLogin');
            
            // grab notes from database
            const myRef = ref(database, user.uid + '_notes');
            onValue(myRef, (snapshot) => {
                if(snapshot.val() !== null)
                    store.dispatch('initNotes', snapshot.val())
            },{ onlyOnce: true });
            });
        }
    };

    const addNewNote = () => {
        const newNote = {
            title,
            body,
            index: notes.length
        }
        store.dispatch('addNote', newNote);
    };

    const setCurrentNote = (index) => {
        store.dispatch('setCurrNote', index);
    };

    return (
        <Panel left>
            <Appbar>
                <div className='left'>
                    <Button
                        className='btn-bar'
                        small raised round
                        iconMaterial='note_add_outlined_icon'
                        popupOpen=".new-note-popup"/>
                {
                    !loggedIn ? 
                    <Button
                    className='btn-bar'
                    small raised round
                    iconMaterial='login'
                    onClick={ signIn }/> :
                    <Button
                    className='btn-bar'
                    small raised round
                    iconMaterial='logout'
                    onClick={ signIn }/>
                }
                </div>

                <div className='right'>
                    <Link
                    searchbarEnable=".searchbar-bar"
                    iconIos="f7:search"
                    iconAurora="f7:search"
                    iconMd="material:search"
                    ></Link>
                </div>
                <Searchbar
                    className="searchbar-bar"
                    expandable
                    searchContainer=".notes-list"
                    searchIn=".item-title"
                    disableButton={!theme.aurora}
                ></Searchbar>
            </Appbar>

            <List className="searchbar-not-found">
                <ListItem title="Nothing found"></ListItem>
            </List>

            <List className="notes-list searchbar-found">
                {   
                    notes.map( note => (
                        <ListItem
                            className='panel-btns'
                            title={note.title}
                            key={note.index}
                            onClick={ () => setCurrentNote(note.index) }
                        />
                    ))
                }
            </List>

            <Popup className='new-note-popup'
                opened={popup}
                onPopupClosed={ () => setPopup(false) }>
                <div>
                <List inlineLabels noHairlines>
                    <ListInput
                        type='text'
                        placeholder='Note title. . .'
                        onChange={ (event) => setTitle(event.target.value)}
                        clearButton/>
                    <ListInput
                        type='texteditor'
                        onChange={ (value) => setBody(value)}
                        placeholder='Note body. . .'/>
                    <Button
                        text='Submit'
                        onClick={ addNewNote }/>
                </List>
                </div>
            </Popup>
        </Panel>
    );
};

export default SidePanel;