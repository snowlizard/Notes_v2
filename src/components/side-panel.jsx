import React from 'react';
import myApp from '../js/firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  Appbar,
  Button,
  List,
  ListItem,
  Link,
  Panel,
  Searchbar,
  theme,
} from 'framework7-react';

const auth = getAuth(myApp);
const provider = new GoogleAuthProvider();

const SidePanel = () => (
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
                Login
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

const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

export default SidePanel;