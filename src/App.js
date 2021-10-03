import React from 'react'
import NoteList from './components/NoteList'
import { useState, useEffect } from "react"
import { nanoid } from 'nanoid' 
import Search from './components/Search'
import Header from './components/Header'

export default function App() {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first note!",
      date: "15/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my second note!",
      date: "16/04/2021",
    },
    {
      id: nanoid(),
      text: "This is my third note!",
      date: "18/04/2021",
    },
  ]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes-app-data'));
    if(savedNotes){
      setNotes(savedNotes);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem('notes-app-data', JSON.stringify(notes));
  }, [notes])

  const [searchText, setSearchText] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text, 
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);

  }

   
  const deleteNote = id => {
    const newNotes = notes.filter(note => {
      return note.id !== id;
    })
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NoteList handleAddNote={addNote} handleDeleteNote={deleteNote} notes={notes.filter(note => note.text.toLocaleLowerCase().includes(searchText))} />
      </div>
    </div>
  )
}
