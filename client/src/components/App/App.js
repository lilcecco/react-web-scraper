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
import ResetPassword from '../ResetPassword';
import './App.css';

export const ProcessesContext = React.createContext();
export const BlacklistContext = React.createContext();

export const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [processes, setProcesses] = useState([]);
    const [blacklist, setBlacklist] = useState([]);
    const [notices, setNotices] = useState([]);
    const [user, setUser] = useState(null);

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

        const getNotices = async () => {
            const res = await fetch('/api/data/notices');
            const data = await res.json();
            setNotices(data);
        }

        // Check if the user is logged
        const getUser = async () => {
            const res = await fetch('/api/data/user');
            const data = await res.json();

            if (data?.error) return; // update error handler

            // console.log(data);
            setUser(data);
        }

        getProcesses();
        getBlacklist();
        getNotices();
        getUser();
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [darkMode]);

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

    // Scrape Email From Websites
    const scrapeEmailFromWebsites = async (id) => {
        const res = await fetch('/api/scraper/websites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, blacklist: blacklist.map(blacklistElem => blacklistElem.url) })
        });
        const data = await res.json();

        if (data?.error) {
            setProcesses(processes.map(process => process.id === id ? { ...process, status: 'start' } : process));
            return alert(data.error);
        }

        setProcesses(processes.map(process => process.id === id ? data : process));
    }

    // Scrape Data From Google Maps
    const scrapeDataFromGoogleMaps = async (id) => {
        const res = await fetch('/api/scraper/google-maps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });
        const data = await res.json();

        if (data?.error) {
            // if (notices[data.error]) {
            //     return setProcesses(processes.map(process => process.id === id ? { ...process, status: 'start', notices: [data.error, ...process.notices] } : process));
            // }
            setProcesses(processes.map(process => process.id === id ? { ...process, status: 'start' } : process));
            return alert(data.error);
        }

        setProcesses(processes.map(process => process.id === id ? data : process));
    }

    // Login
    const onLogin = async (user) => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        return data;
    }

    // Register
    const onRegister = async (user) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const data = await res.json();

        return data;
    }

    // Logout
    const logout = async () => {
        const res = await fetch('/api/auth/logout');
        const data = await res.json();

        if (data?.error) return alert(data.error);

        setUser(null);
    }

    // check user subscription status
    const subscribed = () => {
        if (user) {
            switch (user.status) {
                case 'active':
                    return user.prod_name;
                case 'trialing':
                    return 'free trial';
                default:
                    return;
            }
        }
    }

    const providerProcesses = useMemo(() => { return { processes, addProcess } }, [processes]);
    const providerBalcklist = useMemo(() => { return { blacklist, deleteBlacklistElem, addBlacklistElement } }, [blacklist]);

    return (
        <Router>
            <Header
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                user={user}
                logout={logout}
                subscribed={subscribed}
            />
            <Routes >
                <Route path='/' element={<Home />} />
                {!subscribed() && <Route path='/pricing' element={<Pricing user={user} />} />}
                {subscribed() && <Route path='/processes-history' element={(
                    <ProcessesContext.Provider value={providerProcesses}>
                        <ProcessesHistory user={user} />
                    </ProcessesContext.Provider>
                )} />}
                <Route path='/process/:id' element={(
                    <BlacklistContext.Provider value={providerBalcklist} >
                        <Scraper
                            processes={processes}
                            setProcesses={setProcesses}
                            deleteProcess={deleteProcess}
                            scrapeEmailFromWebsites={scrapeEmailFromWebsites}
                            scrapeDataFromGoogleMaps={scrapeDataFromGoogleMaps}
                            notices={notices}
                            user={user}
                        />
                    </BlacklistContext.Provider>
                )} />
                {!user && <Route path='/auth/:page' element={<Auth onLogin={onLogin} onRegister={onRegister} />} />}
                {user && <Route path='/private-area/:page' element={<PrivateArea logout={logout} user={user} subscribed={subscribed} />} />}
                <Route path='/reset-password/:page' element={<ResetPassword />} />
                <Route path='*' element={<Error />} />
            </Routes>
            <Footer />
        </Router>
    );
}