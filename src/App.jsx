// src/App.jsx
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;