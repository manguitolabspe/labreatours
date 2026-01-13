
import React, { useState } from 'react';

interface CalendarProps {
  onSelect: (date: string) => void;
  selectedDate: string;
}

export const CustomCalendar: React.FC<CalendarProps> = ({ onSelect, selectedDate }) => {
  const [viewDate, setViewDate] = useState(new Date());
  
  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth());
  const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth());

  const handlePrev = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNext = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));

  const isSelected = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0];
    return d === selectedDate;
  };

  const isPast = (day: number) => {
    const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today;
  };

  const renderDays = () => {
    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const past = isPast(day);
      cells.push(
        <button
          key={day}
          type="button"
          disabled={past}
          onClick={() => {
            const d = new Date(viewDate.getFullYear(), viewDate.getMonth(), day).toISOString().split('T')[0];
            onSelect(d);
          }}
          className={`h-10 w-10 rounded-full text-xs font-bold transition-all flex items-center justify-center
            ${past ? 'text-gray-200 cursor-not-allowed' : 'hover:bg-sky-100 text-black'}
            ${isSelected(day) ? 'bg-black text-white hover:bg-black shadow-lg scale-110' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    return cells;
  };

  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h4 className="font-bold text-sm uppercase tracking-widest">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</h4>
        <div className="flex space-x-2">
          <button type="button" onClick={handlePrev} className="p-2 hover:bg-white rounded-lg border border-gray-100 transition-colors">
            <i className="fa-solid fa-chevron-left text-xs"></i>
          </button>
          <button type="button" onClick={handleNext} className="p-2 hover:bg-white rounded-lg border border-gray-100 transition-colors">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {days.map(d => <div key={d} className="text-[10px] uppercase font-bold text-gray-400">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};
