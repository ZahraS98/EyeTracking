import logo from './logo.svg';
import './App.css';
import {useEffect} from "react";
import webgazer from 'webgazer';

function App() {
    useEffect(() => {
        const eyeTracker = webgazer;
        eyeTracker.setGazeListener((data, clock) => {
            console.log(data, clock);
        }).begin();
    });

    return (
        <div className="App">
            Webgazer Test
        </div>
    );
}

export default App;
