import React from 'react';
import myApp from '../js/firebase';
import store from '../js/store';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import {
  Appbar,
  Button,
  List,
  ListItem,
  Link,
  Panel,
  Searchbar,
  theme,
  useStore
} from 'framework7-react';

const auth = getAuth(myApp);
const provider = new GoogleAuthProvider();

const SidePanel = () => {
    const loggedIn = useStore('login');
    const notes    = useStore('notes');

    const signIn = () => {
        if (loggedIn) {
            signOut(auth).then( () => {
                store.dispatch('setLogin');
            });
        } else {
            signInWithPopup(auth, provider)
            .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            store.dispatch('setLogin');
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            })
        }
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
                        iconMaterial='note_add_outlined_icon'/>
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
                        <Button text={note.title}
                            key={note.title}
                            onClick={ () => setCurrentNote(note.index) }/>
                    ))
                }
            </List>
        </Panel>
    );
};

export default SidePanel;