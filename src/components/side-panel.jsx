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

    return (
        <Panel left>
            <Appbar>
                <div className='left'>
                    <Button
                        small
                        raised
                        fill color='white'
                        style={{color:'red'}}>
                        Add File
                    </Button>
                    <Button
                        small
                        raised
                        fill color='white'
                        style={{color:'red', 'marginLeft': '4px'}}
                        onClick={signIn}>
                        { loggedIn ? 'Logout' : 'Login' }
                    </Button>
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
                <ListItem title="Acura"></ListItem>
                <ListItem title="Audi"></ListItem>
                <ListItem title="BMW"></ListItem>
            </List>
        </Panel>
    );
};

export default SidePanel;