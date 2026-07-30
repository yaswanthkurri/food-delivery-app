import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import Siderbar from './components/Sidebar/Siderbar.jsx';
import {Routes,Route} from 'react-router-dom';
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Order/Order.jsx';
import { ToastContainer} from 'react-toastify'; //used to add notification msgs
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const url="http://localhost:4000"
  return (
    <div>
 <ToastContainer/>
      <Navbar/>
      <hr />
    <div className="app-content">
      <Siderbar/>
      <Routes> {/*Routes is container which contain all route*/}
<Route path='/add' element={<Add url={url}/>}/> {/*if path (or) url='/add ' then display Add element*/}
<Route path='/list' element={<List url={url} />}/>
<Route path='/orders' element={<Order url={url} />} />
      </Routes>
    </div>

    </div>
  )
}

export default App;
