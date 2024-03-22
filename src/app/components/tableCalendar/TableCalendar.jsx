/* eslint-disable react/prop-types */
const TableCalendar = (props) => {
    const today = new Date();
    const selectedDate = {
        day: props.currentDate.getDate(),
        month: props.currentDate.getMonth(),
        year: props.currentDate.getFullYear(),
    };

    return (
        <>
            <ol>
                <li>
                    {props.daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </li>
            </ol>
            <ul>
                {props.calendar.map((week, index) => (
                    <li key={index}>
                        {week.map((day, idx) => {
                            if (day === null) {
                                return <td key={idx}></td>;
                            }

                            const cellDate = new Date(
                                selectedDate.year,
                                selectedDate.month,
                                day
                            );

                            const isSelected =
                                day === selectedDate.day &&
                                cellDate.getMonth() === today.getMonth() &&
                                cellDate.getFullYear() === today.getFullYear();

                            return (
                                <li
                                    key={idx}
                                    onClick={() => props.handleClick(day)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: isSelected
                                            ? 'lightblue'
                                            : 'transparent',
                                    }}>
                                    {day}
                                </li>
                            );
                        })}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default TableCalendar;
