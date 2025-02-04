import React, { useState } from "react";
import Header from "../components/Header";
import GlobalDialog from "../components/GlobalDialog";

const Calendar = () => {
  const [view, setView] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [popupDate, setPopupDate] = useState(null);

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

  const goToToday = () => {
    setSelectedMonth(todayMonth);
    setSelectedYear(todayYear);
    setView("month");
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

  const handleDateClick = (
    event,
    day,
    monthIndex = selectedMonth,
    year = selectedYear
  ) => {
    event?.stopPropagation();
    event?.preventDefault();
    if (day) {
      setPopupDate({
        day,
        month: monthIndex,
        year: selectedYear,
      });
    }
  };

  const renderMonthView = () => {
    const calendarDays = generateCalendarDays();

    return (
      <div
        className="mt-8 overflow-x-hidden py-2 px-4 "
        data-testId="month-view"
      >
        <table className="table-auto w-full max-w-4xl mx-auto border-2 border-gray-500 sm:w-full md:max-w-4xl bg-gray-100">
          <thead>
            <tr>
              {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                <th
                  key={day}
                  className="border p-2 text-center text-[10px] sm:text-xl md:text-xl border-b-2 border-gray-400 border-x-0 "
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
                      className="border p-1 sm:p-4 md:p-4 text-center cursor-pointer"
                      onClick={(event) => handleDateClick(event, day)}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          day === todayDate &&
                          selectedMonth === todayMonth &&
                          selectedYear === todayYear
                            ? "bg-yellow-400 text-black font-bold"
                            : "hover:bg-gray-300"
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
  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex);
    setView("month");
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
      <div
        className="grid grid-cols-1 bg-gray-100 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 py-8 px-8"
        data-testid="year-view"
      >
        {Array.from({ length: 12 }).map((_, monthIndex) => {
          const calendarDays = getCalendarForMonth(monthIndex);
          return (
            <div
              key={monthIndex}
              className="p-4 border-2 border-gray-500 rounded shadow cursor-pointer"
              onClick={() => handleMonthClick(monthIndex)}
            >
              <h3 className="text-center font-bold mb-2">
                {getMonthName(monthIndex)}
              </h3>
              <table className="table-auto w-full ">
                <thead>
                  <tr>
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <th
                          key={day}
                          className="text-xs font-medium text-center border-b-2 border-gray-400"
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
                            className="text-xs text-center p-1 cursor-pointer"
                            onClick={(event) =>
                              handleDateClick(
                                event,
                                day,
                                monthIndex,
                                selectedYear
                              )
                            }
                          >
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                                day === todayDate &&
                                monthIndex === todayMonth &&
                                selectedYear === todayYear
                                  ? "bg-yellow-400 text-black font-bold"
                                  : "hover:bg-gray-300"
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
      <Header
        changeView={changeView}
        goToToday={goToToday}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
        getMonthName={getMonthName}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {view === "month" && renderMonthView()}
      {view === "year" && renderYearView()}

      {popupDate && (
        <GlobalDialog>
          <div
            className="bg-gray-300 p-4 rounded shadow-lg text-center"
            data-testid="date-popup"
          >
            <p data-testid="selected-date">
              {popupDate.day} {getMonthName(popupDate.month)} {popupDate.year}
            </p>
            <button
              onClick={() => setPopupDate(null)}
              data-testId="1"
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              data-testid="close-popup"
            >
              Close
            </button>
          </div>
        </GlobalDialog>
      )}
    </div>
  );
};

export default Calendar;
