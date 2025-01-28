import React from "react";

const Header = ({
  changeView,
  goToToday,
  prevMonth,
  nextMonth,
  getMonthName,
  selectedMonth,
  selectedYear,
  setSelectedYear,
}) => {
  const years = Array.from({ length: 20 }, (_, i) => selectedYear - 10 + i);

  return (
    <header className="bg-gray-600 py-6 px-6 sm:py-6 sm:px-6 md:py-8 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <i className="ri-calendar-2-line text-yellow-400 text-2xl sm:text-3xl "></i>
          <div className="text-white text-2xl sm:text-3xl md:text-4xl">
            Full Calendar
          </div>
        </div>
        <div className="flex items-center gap-4 justify-center ml-[200px] sm:justify-center">
          <i
            onClick={prevMonth}
            className="ri-arrow-left-s-line cursor-pointer text-xl text-white"
          ></i>
          <span className="text-xl font-bold text-center w-[180px] text-white">
            {getMonthName(selectedMonth)} {selectedYear}
          </span>
          <i
            onClick={nextMonth}
            className="ri-arrow-right-s-line cursor-pointer text-xl text-white"
          ></i>
        </div>

        <div className="flex gap-2 ml-auto text-right">
          <button
            onClick={() => changeView("year")}
            className="bg-gray-400 mt-2 ml-2 px-4 py-2 rounded hover:bg-gray-500 text-white"
          >
            Year
          </button>
          <button
            onClick={() => changeView("month")}
            className="bg-gray-400 mt-2 px-4 py-2 rounded hover:bg-gray-500 text-white"
          >
            Month
          </button>
          <button
            onClick={goToToday}
            className="bg-gray-400 mt-2 px-4 py-2 rounded  hover:bg-gray-500 text-white"
          >
            Today
          </button>
        </div>

        <div className="flex gap-4 mb-4 justify-left ml-4">
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="relative px-4 py-2 rounded bg-gray-400  hover:gray-500 text-white mt-6 mr-8"
          >
            {years.map((year) => (
              <option key={year} value={year} className="py-8 px-8 bg-gray-500">
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
