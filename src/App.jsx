// src/App.jsx
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#0f1419]">
        <Navbar />
        <main>
          <Home />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;