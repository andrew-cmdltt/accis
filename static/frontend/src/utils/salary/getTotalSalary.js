export function getTotalSalary(employee, report) {
    const total_salary =  Number(employee.hourly_rate)
        * (Number(report.standard_hours_worked) + Number(report.vacation_hours) + Number(report.hospital_hours))
        + Number(report.overtime) * Number(report.overtime_rate)
    return total_salary.toFixed(2)

}