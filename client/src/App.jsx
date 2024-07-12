import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
import ScrollToTopButton from "./components/ScrollToTop";
function App() {
  return (
    <>
    
      <div>
        <Navbar />
        <ScrollToTopButton />
        <Home />
        <div className="md:hidden">
          <BottomNav />
        </div>
      </div>
    </>
  );
}

export default App;
