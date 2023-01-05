import React from 'react';
import {
  Appbar,
  Button,
  Page,
  TextEditor,
} from 'framework7-react';
import SidePanel from '../components/side-panel';

const HomePage = () => (
  <Page>
    <Appbar>
      <div className="left">
        <Button small panelToggle="left" className="display-flex" iconF7="bars" />
      </div>
      <div className='app-title'>Notes v2</div>
      <div className='right' />
    </Appbar>
    
    <SidePanel />

    <TextEditor placeholder="Type here..."
      mode="popover"
      >      
    </TextEditor>
  </Page>
);
export default HomePage;