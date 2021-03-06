export function getNumberedFields(report) {
    report.standard_hours_worked = Number(report.standard_hours_worked)
    report.vacation_hours = Number(report.vacation_hours)
    report.hospital_hours = Number(report.hospital_hours)
    report.overtime = Number(report.overtime)
    report.overtime_rate = Number(report.overtime_rate)
    report.total_salary = Number(report.total_salary)
    report.taxes_and_deductions = Number(report.taxes_and_deductions)
    report.other_deductions = Number(report.other_deductions)
    report.net_salary = Number(report.net_salary)
    report.positive_reviews = Number(report.positive_reviews)
    report.customer_growth = Number(report.customer_growth)
    report.task_completed = Number(report.task_completed)
    report.performance = Number(report.performance)
    report.efficiency = Number(report.efficiency)
    report.participation_in_events = Number(report.participation_in_events)
    report.experience = Number(report.experience)
    report.initiative = Number(report.initiative)
    report.creativity = Number(report.creativity)
    return report
}