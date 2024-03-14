/* eslint-disable react/prop-types */
const TableCalendar = (props) => {
    const today = new Date();
    const selectedDate = {
        day: props.currentDate.getDate(),
        month: props.currentDate.getMonth(),
        year: props.currentDate.getFullYear(),
    };

    return (
        <table>
            <thead>
                <tr>
                    {props.daysOfWeek.map((day) => (
                        <th key={day}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.calendar.map((week, index) => (
                    <tr key={index}>
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
                                <td
                                    key={idx}
                                    onClick={() => props.handleClick(day)}
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: isSelected
                                            ? 'lightblue'
                                            : 'transparent',
                                    }}>
                                    {day}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableCalendar;
