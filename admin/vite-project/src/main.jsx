
import { createRoot } from 'react-dom/client'//This imports the function that starts your React application.
import './index.css'//This loads the global CSS.Think of it as applying styles to your entire website.
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"//It allows your app to have URLs like
//  /
//  /login
//  /about
//without reloading the page.

createRoot(document.getElementById('root')).render(
       //main.jsx is the entry point of a React application—it loads global styles, imports the root App component, enables routing with BrowserRouter, 
       // and renders the entire application into the div id="root" in index.html.
    <BrowserRouter>
  
    <App />
    </BrowserRouter>
    
);
//Think of main.jsx as the starting point of your React application. It's the first file that runs when your app starts.