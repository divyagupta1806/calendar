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
    <header className="bg-gray-600 py-6 px-6 sm:px-8 md:py-8 md:px-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <i className="ri-calendar-2-line text-yellow-400 text-3xl sm:text-4xl md:text-5xl"></i>
          <div className="text-white text-3xl sm:text-4xl md:text-5xl">
            Full Calendar
          </div>
        </div>

        <div className="flex items-center justify-center mb-4 md:mb-0 md:ml-10">
          <i
            onClick={prevMonth}
            className="ri-arrow-left-s-line cursor-pointer text-xl text-white"
            data-testid="prev-button"
          ></i>
          <span className="text-xl font-bold text-center w-[180px] text-white">
            {getMonthName(selectedMonth)} {selectedYear}
          </span>
          <i
            onClick={nextMonth}
            className="ri-arrow-right-s-line cursor-pointer text-xl text-white"
            data-testid="next-button"
          ></i>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-4 md:mb-0">
          <button
            onClick={() => changeView("year")}
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white h-10 flex items-center justify-center"
          >
            Year
          </button>
          <button
            onClick={() => changeView("month")}
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white h-10 flex items-center justify-center"
          >
            Month
          </button>

          <button
            onClick={goToToday}
            className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-500 text-white h-10 flex items-center justify-center"
          >
            Today
          </button>
          <div className="flex justify-center mb-4 md:mb-0">
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="relative px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white w-full md:w-auto h-10 flex items-center justify-center"
            >
              {years.map((year) => (
                <option
                  key={year}
                  value={year}
                  className="py-2 px-8 bg-gray-400"
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
