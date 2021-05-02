export function getTaxesAndDeductions(employee, report) {
    const taxes_and_deductions =  Number(employee.total_taxes_withheld) / 100
        * Number(report.total_salary) + Number(employee.total_regular_deductions)
    return taxes_and_deductions.toFixed(2)

}