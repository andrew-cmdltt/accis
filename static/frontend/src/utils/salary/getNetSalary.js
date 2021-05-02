export function getNetSalary(report) {
    let net_salary = (Number(report.total_salary)
        - Number(report.taxes_and_deductions)
        - Number(report.other_deductions))

    return net_salary.toFixed(2)
}