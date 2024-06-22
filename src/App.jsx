import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";
import Trending from "./pages/Trending";
import AppRoutes from "./pages/Routes";

function App() {
  return (
    <div className="main-div">
      <Navbar />
      <Home />
      {/* Hidden on medium and larger screens, shown on small screens */}
      <div className="sm:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

export default App;
