import React from 'react';
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

const SidePanel = () => (
<Panel left>
    <Appbar>
        <div className='left'>
            <Button
                small round
                raised
                fill color='white'
                style={{color:'red'}}>
                Add File
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

export default SidePanel;