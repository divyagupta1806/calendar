import "./App.css";
import "remixicon/fonts/remixicon.css";
import Header from "./components/Header";
import Calender from "./pages/Calender";
import Footer from "./components/Footer";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <Calender />
      <Footer />
    </div>
  );
}

export default App;
