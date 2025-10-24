import { AuthProvider } from "./context/AuthContext";
import { RoomProvider } from "./context/RoomContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <div className="min-h-screen bg-[#0f1419]">
          <Navbar />
          <main>
            <Home />
          </main>
          <Footer />
        </div>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;
