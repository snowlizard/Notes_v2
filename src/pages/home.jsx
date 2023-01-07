import React from 'react';
import {
  Appbar,
  Button,
  Page,
  TextEditor,
  useStore
} from 'framework7-react';
import SidePanel from '../components/side-panel';

const HomePage = () => {
  const currentNote = useStore('currNote');
  const loggedIn    = useStore('login');

  return (
    <Page>
      <Appbar>
        <div className="left">
          <Button small panelToggle="left" className="display-flex" iconF7="bars" />
        </div>
        <div className='app-title'>Notes v2</div>
        <div className='right'>
          <Button small iconF7='floppy_disk' />
        </div>
      </Appbar>

      <SidePanel />

      {
        loggedIn ? <p>Logged in</p> :
        <p>please login</p>
      }

      <TextEditor placeholder="Type here..."
        value={currentNote.body}
        mode="popover"
        >      
      </TextEditor>
    </Page>
  );
}
export default HomePage;