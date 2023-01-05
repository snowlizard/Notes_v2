import React from 'react';
import {
  Appbar,
  Button,
  List,
  ListItem,
  Navbar,
  Page,
  Panel,
  Subnavbar,
  Searchbar,
  TextEditor,
  theme,
} from 'framework7-react';

const HomePage = () => (
  <Page>
    <Appbar>
      <div className="left">
        <Button small panelToggle="left" className="display-flex" iconF7="bars" />
      </div>
    </Appbar>

    <Panel left>
      <Page>
          <Subnavbar>
            <Searchbar
              searchContainer=".notes-list"
              searchIn=".item-title">
            </Searchbar>
          </Subnavbar>

        <List className="searchbar-not-found">
          <ListItem title="Nothing found"></ListItem>
        </List>

        <List className="notes-list">
          <ListItem title="Acura"></ListItem>
          <ListItem title="Audi"></ListItem>
          <ListItem title="BMW"></ListItem>
        </List>
      </Page>
    </Panel>

    <Page id="main-page">
      <TextEditor placeholder="Type here..."
        mode="popover"
        >      
      </TextEditor>
    </Page>
  </Page>
);
export default HomePage;