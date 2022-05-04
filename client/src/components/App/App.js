import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Scraper from '../Scraper';
import Footer from '../Footer';
import './App.css';

export const ProcessesContext = React.createContext();
export const BlacklistContext = React.createContext();

export function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [processes, setProcesses] = useState([
        {
            id: 1,
            name: "Nutrizionisti Milano",
            categories: [
                "email"
            ],
            urls: [],
            status: "START",
            results: []
        },
        {
            id: 2,
            name: "Nutrizionisti Roma",
            categories: [
                "email",
                "numbers"
            ],
            urls: [],
            status: "RESULT"
        },
    ]); // Da prendere dal database (array di oggetti)

    const [blacklist, setBlacklist] = useState([
        {
            id: 1,
            text: "maoce007@gmail.com"
        },
        {
            id: 2,
            text: "333 333 3333"
        },
    ]); // Da prendere dal database (array di oggetti)

    // Get Process
    const getProcess = (id) => {
        const process = processes.find(process => process.id == id);
        return process;
    }

    // Add New Process
    const addProcess = (process) => {
        setProcesses([ process, ...processes ]);

        // aggiungere richiesta server
    }

    // Delete Process
    const deleteProcess = (id) => {
        setProcesses(processes.filter(process => process.id != id));

        // aggiungere richiesta server
    }

    // Add Blacklist Element
    const addBlacklistElement = (blacklistElem) => {
        setBlacklist([ blacklistElem, ...blacklist ]);

        //aggiungere richiesta server
    }

    // Delete Blacklist Element
    const deleteBlacklistElem = (id) => {
        setBlacklist(blacklist.filter(blacklistElem => blacklistElem.id != id));
        
        //aggiungere richiesta server
    }

    const providerProcesses = useMemo(() => { return { processes, addProcess } }, [processes]);
    const providerBalcklist = useMemo(() => { return { blacklist, deleteBlacklistElem, addBlacklistElement } }, [blacklist]);

    return (
        <Router>
            <div className='container' style={darkMode ? { backgroundColor: '#171C2B' } : {}}>
                <Header darkMode={darkMode} setDarkMode={setDarkMode} />
                <Routes >
                    <Route path='/' element={(
                        <ProcessesContext.Provider value={providerProcesses}>
                            <Home />
                        </ProcessesContext.Provider>
                    )} />
                    <Route path='/scraper/:id' element={(
                        <BlacklistContext.Provider value={providerBalcklist} >
                            <Scraper getProcess={getProcess} deleteProcess={deleteProcess} />
                        </BlacklistContext.Provider>
                    )} />
                    <Route path='*' element={<div>404 error</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}