import React, { useState, useMemo, useEffect } from 'react';
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
    const [processes, setProcesses] = useState([]);

    const [blacklist, setBlacklist] = useState([]);

    useEffect(() => {
        const getProcesses = async () => {
            const res = await fetch('/data/processes');
            const data = await res.json();
            setProcesses(data);
        }

        const getBlacklist = async () => {
            const res = await fetch('/data/blacklist');
            const data = await res.json();
            setBlacklist(data);
        }

        getProcesses();
        getBlacklist();
    }, []);

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