import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import Home from '../Home';
import Scraper from '../Scraper';
import Footer from '../Footer';
import './App.css';

export const ProcessesContext = React.createContext();
export const BlacklistContext = React.createContext();

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [blacklist, setBlacklist] = useState([]);

    useEffect(() => {
        const getProcesses = async () => {
            const res = await fetch('/api/data/processes');
            const data = await res.json();
            setProcesses(data);
        }

        const getBlacklist = async () => {
            const res = await fetch('/api/data/blacklist');
            const data = await res.json();
            setBlacklist(data);
        }

        getProcesses();
        getBlacklist();
    }, []);

    const getProcess = (id) => {
        const process = processes.find(process => process.id === id);
        return process;
    }

    // Add New Process
    const addProcess = async (process) => {
        const res = await fetch('/api/data/processes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(process)
        });
        const data = await res.json();

        if (data?.error) {
            alert(data.error);
            return;
        }

        setProcesses([ process, ...processes ]);
    }

    // Delete Process
    const deleteProcess = async (id) => {
        const res = await fetch('/api/data/process', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data?.error) {
            alert(data.error);
            return;
        }

        setProcesses(processes.filter(process => process.id !== id));
    }

    // Add Blacklist Element
    const addBlacklistElement = async (blacklistElem) => {
        const res = await fetch('/api/data/blacklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blacklistElem)
        });
        const data = await res.json();

        if (data?.error) {
            alert(data.error);
            return;
        }

        setBlacklist([ blacklistElem, ...blacklist ]);
    }

    // Delete Blacklist Element
    const deleteBlacklistElem = async (id) => {
        const res = await fetch('/api/data/blacklist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data?.error) {
            alert(data.error);
            return;
        }
        
        setBlacklist(blacklist.filter(blacklistElem => blacklistElem.id !== id));
    }

    // Scrape Data
    const scrapeData = async (id) => {
        const res = await fetch('/api/scraper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data?.error) {
            alert(data.error);
            return;
        }

        setProcesses(processes.map(process => process.id === data.id ? { ...process, status: data.status, results: data.results } : process));
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
                    <Route path='/process/:id' element={(
                        <BlacklistContext.Provider value={providerBalcklist} >
                            <Scraper getProcess={getProcess} deleteProcess={deleteProcess} scrapeData={scrapeData} />
                        </BlacklistContext.Provider>
                    )} />
                    <Route path='*' element={<div>404 error</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}