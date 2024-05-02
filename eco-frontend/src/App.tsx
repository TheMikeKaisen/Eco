import { BrowserRouter as Router,
        Routes, Route} 
from "react-router-dom"


const App = () => {
  return <Router>

    {/* Header */}
    <Routes>
      <Route path='/' element={<Home />}/>

    </Routes>
  </Router>
}

export default App
