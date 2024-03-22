import { useState, useEffect } from 'react';
import TableCalendar from '../../components/tableCalendar/TableCalendar';
import ModalCreateActivity from '../../components/modalCreateActivity/ModalCreateActivity';

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const [clickDate, setClickDate] = useState({});
    const [tasks, setTasks] = useState([]);
    const [showTask, setShowTask] = useState([]);

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

        onRequest();

        // addTask();
    }, [currentDate]);

    // const addTask = async () => {
    //     try {
    //         const response = await fetch(
    //             'https://0400f065-1685-4af7-9b42-63572cc950c4.mock.pstmn.io/calendar',
    //             {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({ date: '2024-3-29', task: 'Hello!' }),
    //             }
    //         );
    //         if (!response.ok) {
    //             throw new Error('Failed to add task');
    //         }
    //         const responseData = await response.json();
    //         console.log('Task added successfully:', responseData);
    //     } catch (error) {
    //         console.error('Error adding task:', error);
    //     }
    // };

    const onRequest = async () => {
        const response = await fetch(
            `https://0400f065-1685-4af7-9b42-63572cc950c4.mock.pstmn.io/calendar`
        );
        const data = await response.json();
        console.log(data);
        setTasks(data);
        console.log(tasks);
    };

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

    const handleClick = (day) => {
        const date = {
            day: day,
            month: currentDate.getMonth() + 1,
            year: currentDate.getFullYear(),
        };

        setShowTask([]);

        if (Array.isArray(tasks)) {
            // Проверка на массив
            const tasksForSelectedDate = tasks.filter(
                (task) =>
                    task.date ===
                    `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`
            );
            if (tasksForSelectedDate.length > 0) {
                // Если есть задачи на выбранную дату, выполните соответствующие действия
                setShowTask((prevTask) => [
                    ...prevTask,
                    ...tasksForSelectedDate.map((task) => task.task),
                ]);
                // tasksForSelectedDate.forEach((taskArray) => {
                //     setShowTask((prevTask) => [...prevTask, ...taskArray.task]); // Вывод каждой задачи в консоль
                // });
                console.log(showTask);
            } else {
                // Если задач на выбранную дату нет, выполните другие действия
                console.log('No tasks for selected date');
            }
        } else {
            console.log('Tasks is not an array');
        }

        setClickDate(date);
        setModalActive(true);
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

    const onChangeModal = () => {
        setModalActive(!modalActive);
    };

    const calendar = renderCalendar();

    return (
        <div>
            {modalActive ? (
                <ModalCreateActivity
                    onChangeModal={onChangeModal}
                    clickDate={clickDate}
                    showTask={showTask}
                />
            ) : null}
            <h2>
                {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <TableCalendar
                calendar={calendar}
                handleClick={handleClick}
                daysOfWeek={daysOfWeek}
                currentDate={currentDate}
            />
            <button onClick={nextMonth}>next</button>
            <button onClick={prevMonth}>prev</button>
        </div>
    );
};

export default Calendar;
