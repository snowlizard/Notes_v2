import React from 'react';
import { database } from '../js/firebase';
import { ref, set } from 'firebase/database';
import { useState } from 'react';
import {
  Appbar,
  Button,
  Page,
  TextEditor,
  useStore,
  Popover,
  Input,
  Block
} from 'framework7-react';
import SidePanel from '../components/side-panel';
import store from '../js/store';

const HomePage = () => {
  const currentNote = useStore('currNote');
  const [title, setTitle]  = useState('');
  const [body, setBody]    = useState('');
  const [date, setDate]    = useState('');
  const token        = useStore('token');
  const notes        = useStore('notes');

  const updateNote = () => {
    if(currentNote){
      if(title !== '')
        currentNote.title = title;

      currentNote.body = body;
      store.dispatch('updateNote', currentNote);
      setDate(new Date().toLocaleString());

      // update database;
      const myRef = ref(database, token + '_notes');
      set(myRef, notes);
    }
  };

  return (
    <Page className='app-page'>
      <Appbar>
        <div className="left">
          <Button small panelToggle="left" className="display-flex" iconF7="bars" />
        </div>
        <div className='app-title'>Notes v2</div>
        <div className='right'>
          <Button 
            className='btn-bar'
            small raised round 
            iconMaterial='mode_edit'
            popoverOpen='.note-title'/>
          <Button 
            className='btn-bar'
            small raised round 
            iconMaterial='save_alt'
            onClick={updateNote}/>
          <Button 
            className='btn-bar'
            small raised round 
            iconMaterial='help_outline'/>
        </div>
      </Appbar>

      <Popover className='note-title'
        animate={false}>
        <Block>
          <Input
            style={{'background': '#e6e4e1', 'height': '30px'}}
            placeholder=' Title. . .' type='text' clearButton
            onChange={ (e) => setTitle(e.target.value) }/>
          <Button
            popoverClose
            style={{'marginTop': '15px', 'background':'#666666', 'color': 'white'}}
            small raised text='Edit'
            onClick={updateNote}/>
        </Block>
      </Popover>

      <SidePanel />

      <div id='timestamp'>
        <div>Last updated: {date}</div>
      </div>

      <TextEditor 
        id="texteditor"
        placeholder="Type here..."
        value={ currentNote ? currentNote.body : '' }
        onTextEditorChange={ (value) => setBody(value) }
        mode="popover"
        >      
      </TextEditor>
    </Page>
  );
}
export default HomePage;