import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
function App() {
  return (
    <>
    
      <div className="dark:bg-spot-dark pt-4 h-screen ">
        <Navbar />
        <Home />
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default App;
