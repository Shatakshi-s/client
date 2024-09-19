import React, { useState } from 'react';
import axios from 'axios';

const VerificationCode = () => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (value, index) => {
        if (/^\d$/.test(value) || value === '') {
            const newCode = [...code];
            newCode[index] = value;
            setCode(newCode);

            if (value && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }

            setError('');
        } else {
            setError('Only digits are allowed');
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData('text').slice(0, 6).split('');
        const newCode = pasteData.map((char, index) => /^\d$/.test(char) ? char : '');
        setCode(newCode);
        newCode.forEach((char, index) => {
            if (char && index < 5) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const codeString = code.join('');
        try {
            const response = await axios.post('http://localhost:5000/verify', { code: codeString });
            if (response.status === 200) {
                setSuccess(true);
                // Redirect to success page (not implemented here)
            }
        } catch (error) {
            setError('Verification Error');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {code.map((digit, index) => (
                    <input
                        key={index}
                        id={`input-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onPaste={handlePaste}
                        style={{ borderColor: error ? 'red' : 'black' }}
                    />
                ))}
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit</button>
            {success && <p>Verification Successful!</p>}
        </form>
    );
};

export default VerificationCode;
