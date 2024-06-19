import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="main-div">
      <Navbar/>
    <Home/>
</div>
  )
}

export default App
