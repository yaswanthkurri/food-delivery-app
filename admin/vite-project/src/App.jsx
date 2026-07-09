import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx';
import Siderbar from './components/Sidebar/Siderbar.jsx';
import {Routes,Route} from 'react-router-dom';
import Add from './pages/Add/Add.jsx'
import List from './pages/List/List.jsx'
import Order from './pages/Order/Order.jsx';
const App = () => {
  return (
    <div>
      <Navbar/>
      <hr />
    <div className="app-content">
      <Siderbar/>
      <Routes> {/*Routes is container which contain all route*/}
<Route path='/add' element={<Add/>}/> {/*if path (or) url='/add ' then display Add element*/}
<Route path='/list' element={<List/>}/>
<Route path='/orders' element={<Order/>} />
      </Routes>
    </div>

    </div>
  )
}

export default App;
