import React, { useState, useEffect } from "react";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import Calendar from "./pages/Calendar";
import Footer from "./components/Footer";

function App() {
  const [view] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    document.title = "Full Calendar";
  }, []);

  return (
    <div style={{ minHeight: "100vh" }}>
      <Calendar
        view={view}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <Footer />
    </div>
  );
}

export default App;
