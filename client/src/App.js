import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";

const webgazer = require('webgazer');

function App() {
    useEffect(() => {
        const eyeTracker = webgazer;
        eyeTracker.setGazeListener((data, clock) => {
            console.log(data, clock);
        })
    });

    return (
        <div className="App">
            Webgazer Test
        </div>
    );
}

export default App;
