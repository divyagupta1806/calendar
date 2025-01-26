import React, { useState } from "react";

const Calendar = () => {
  const [view, setView] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const today = new Date();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const changeView = (newView) => {
    setView(newView);
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const getMonthName = (month) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[month];
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth + 1, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const renderMonthView = () => {
    const calendarDays = generateCalendarDays();

    return (
      <div className="mt-12 overflow-x-hidden">
        <table className="table-auto w-full max-w-4xl mx-auto border-2 border-gray-500 sm:w-full md:max-w-4xl bg-gray-100">
          <thead>
            <tr>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <th
                  key={day}
                  className="border p-2 text-center text-[10px] sm:text-xl md:text-xl "
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {calendarDays
                  .slice(rowIndex * 7, rowIndex * 7 + 7)
                  .map((day, colIndex) => (
                    <td
                      key={colIndex}
                      className="border p-1 sm:p-4 md:p-4 text-center"
                    >
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          day === todayDate &&
                          selectedMonth === todayMonth &&
                          selectedYear === todayYear
                            ? "bg-yellow-400 text-black font-bold"
                            : ""
                        }`}
                      >
                        {day || ""}
                      </span>
                    </td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderYearView = () => {
    const getCalendarForMonth = (monthIndex) => {
      const daysInMonth = getDaysInMonth(monthIndex + 1, selectedYear);
      const firstDay = getFirstDayOfMonth(monthIndex, selectedYear);
      const days = [];

      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }

      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }

      return days;
    };

    return (
      <div className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {Array.from({ length: 12 }).map((_, monthIndex) => {
          const calendarDays = getCalendarForMonth(monthIndex);
          return (
            <div key={monthIndex} className="p-4 border rounded shadow">
              <h3 className="text-center font-bold mb-2">
                {getMonthName(monthIndex)}
              </h3>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <th
                          key={day}
                          className="text-xs font-medium text-center"
                        >
                          {day}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {calendarDays
                        .slice(rowIndex * 7, rowIndex * 7 + 7)
                        .map((day, colIndex) => (
                          <td
                            key={colIndex}
                            className={`text-xs text-center p-1`}
                          >
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                                day === todayDate &&
                                monthIndex === todayMonth &&
                                selectedYear === todayYear
                                  ? "bg-yellow-400 text-black font-bold"
                                  : ""
                              }`}
                            >
                              {day || ""}
                            </span>
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="pb-20">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => changeView("year")}
          className="bg-gray-400 mt-2 px-4 py-2 rounded hover:bg-gray-500"
        >
          Year
        </button>
        <button
          onClick={() => changeView("month")}
          className="bg-gray-400 mt-2 px-4 py-2 rounded hover:bg-gray-500"
        >
          Month
        </button>
      </div>

      <div className="flex items-center gap-4 justify-between sm:justify-center">
        <i
          onClick={prevMonth}
          className="ri-arrow-left-s-line cursor-pointer text-xl"
        ></i>
        <span className="text-xl font-bold text-center">
          {getMonthName(selectedMonth)} {selectedYear}
        </span>
        <i
          onClick={nextMonth}
          className="ri-arrow-right-s-line cursor-pointer text-xl"
        ></i>
      </div>

      {view === "month" && renderMonthView()}
      {view === "year" && renderYearView()}
    </div>
  );
};

export default Calendar;
