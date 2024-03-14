import { useState, useEffect } from 'react';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);

    useEffect(() => {
        const daysInMonthValue = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        ).getDate();
        setDaysInMonth(daysInMonthValue);

        const firstDayOfMonthValue = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        ).getDay();
        setFirstDayOfMonth(firstDayOfMonthValue === 0 ? 6 : firstDayOfMonthValue - 1);
    }, [currentDate]);

    const nextMonth = () => {
        setCurrentDate((prevDate) => {
            const nextMonthDate = new Date(prevDate);
            nextMonthDate.setMonth(prevDate.getMonth() + 1);
            return nextMonthDate;
        });
    };

    const prevMonth = () => {
        setCurrentDate((prevDate) => {
            const prevMonthDate = new Date(prevDate);
            prevMonthDate.setMonth(prevDate.getMonth() - 1);
            return prevMonthDate;
        });
    };

    const renderCalendar = () => {
        const calendar = [];
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) {
            const week = [];
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDayOfMonth) || dayCounter > daysInMonth) {
                    week.push(null);
                } else {
                    week.push(dayCounter);
                    dayCounter++;
                }
            }
            calendar.push(week);
        }

        return calendar;
    };

    const calendar = renderCalendar();

    return (
        <div>
            <h2>
                {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <table>
                <thead>
                    <tr>
                        {daysOfWeek.map((day) => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {calendar.map((week, index) => (
                        <tr key={index}>
                            {week.map((day, idx) => (
                                <td key={idx}>{day !== null ? day : ''}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={nextMonth}>next</button>
            <button onClick={prevMonth}>prev</button>
        </div>
    );
};

export default Calendar;
