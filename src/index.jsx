import React from "react";
import ReactDOM from "react-dom";
import JapanItinerary from "./app.jsx";
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        // Show a prompt to the user
        if (confirm('New content available. Reload?')) {
            updateSW();
        }
    },
    onOfflineReady() {
        console.log('App ready to work offline');
    }
})

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

// Add meta viewport tag for better mobile rendering
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover';
document.getElementsByTagName('head')[0].appendChild(meta);

ReactDOM.render(
    <React.StrictMode>
        <JapanItinerary />
    </React.StrictMode>,
    document.getElementById("root")
);
