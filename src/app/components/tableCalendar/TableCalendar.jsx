/* eslint-disable react/prop-types */
const TableCalendar = (props) => {
    const today = new Date();
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
                        {week.map((day, idx) => (
                            <td
                                key={idx}
                                onClick={() => props.handleClick(day)}
                                style={{
                                    cursor: 'pointer',
                                    backgroundColor:
                                        day === today.getDate()
                                            ? 'lightblue'
                                            : 'transparent',
                                }}>
                                {day !== null ? day : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableCalendar;
