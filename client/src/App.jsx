import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
function App() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
        <div className="sm:hidden">
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default App;
