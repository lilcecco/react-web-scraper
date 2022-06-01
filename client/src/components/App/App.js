import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import ProcessesHistory from '../ProcessesHistory';
import Scraper from '../Scraper';
import Footer from '../Footer';
import Auth from '../Auth';
import Home from '../Home';
import Pricing from '../Pricing';
import Error from '../Error';
import PrivateArea from '../PrivateArea';
import './App.css';

export const ProcessesContext = React.createContext();
export const BlacklistContext = React.createContext();

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    const [isLogged, setIsLogged] = useState(false);

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

        // Check if the user is logged
        const isLogged = async () => {
            const res = await fetch('/api/auth/logged');
            const data = await res.json();
            if (data?.error) return;
            setIsLogged(true);
        }

        getProcesses();
        getBlacklist();
        isLogged();
    }, []);

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

        if (data?.error) return alert(data.error);

        setProcesses([process, ...processes]);
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

        if (data?.error) return alert(data.error);

        // update processes
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

        if (data?.error) return alert(data.error);

        setBlacklist([blacklistElem, ...blacklist]);
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

        if (data?.error) return alert(data.error);

        setBlacklist(blacklist.filter(blacklistElem => blacklistElem.id !== id));
    }

    // Scrape Data
    const scrapeData = async (id) => {
        const res = await fetch('/api/scraper', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, blacklist: blacklist.map(blacklistElem => blacklistElem.url) })
        });
        const data = await res.json();

        if (data?.error) return alert(data.error);

        // update processes
        setProcesses(processes.map(process => process.id === id ? data : process));
    }

    // Login (must be updated)
    const onLogin = async (user) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        if (data?.error) return alert(data.error);

        setIsLogged(true);
        return data;
    }

    // Register (must be updated)
    const onRegister = async (user) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        if (data?.error) return alert(data.error);

        return data;
    }

    // Logout (must be updated)
    const logout = async () => {
        const res = await fetch('/api/auth/logout');
        const data = await res.json();

        if (data?.error) return alert(data.error);

        setIsLogged(false);
    }

    const providerProcesses = useMemo(() => { return { processes, addProcess } }, [processes]);
    const providerBalcklist = useMemo(() => { return { blacklist, deleteBlacklistElem, addBlacklistElement } }, [blacklist]);

    return (
        <Router>
            <div className='container' style={darkMode ? { backgroundColor: '#171C2B' } : {}}>
                <Header
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                    isLogged={isLogged}
                    logout={logout} />
                <Routes >
                    <Route path='/' element={<Home />} />
                    <Route path='pricing' element={<Pricing isLogged={isLogged} />} />
                    {isLogged && <Route path='/processes-history' element={(
                        <ProcessesContext.Provider value={providerProcesses}>
                            <ProcessesHistory />
                        </ProcessesContext.Provider>
                    )} />}
                    <Route path='/process/:id' element={(
                        <BlacklistContext.Provider value={providerBalcklist} >
                            <Scraper
                                processes={processes}
                                setProcesses={setProcesses}
                                deleteProcess={deleteProcess}
                                scrapeData={scrapeData}
                            />
                        </BlacklistContext.Provider>
                    )} />
                    <Route path='/auth/:page' element={<Auth onLogin={onLogin} onRegister={onRegister} />} />
                    {isLogged && <Route path='/private-area' element={<PrivateArea logout={logout} />} />}
                    <Route path='*' element={<Error />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}