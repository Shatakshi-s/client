import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VerificationCode from './components/VerificationCode';
import Success from './components/Success';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<VerificationCode />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </Router>
    );
}

export default App;
