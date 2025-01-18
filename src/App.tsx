import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {app} from "./firebase";

const App = () => {

    useEffect(() => {
        const test = app
    }, []);

    return (
        <>
            <Header />
            <AppRouter />
            <Footer />
        </>
    );
};

export default App;