export function getNumberedFields(employee) {
    employee.hourly_rate = Number(employee.hourly_rate)
    employee.regional_taxes = Number(employee.regional_taxes)
    employee.income_tax = Number(employee.income_tax)
    employee.social_insurance = Number(employee.social_insurance)
    employee.health_insurance = Number(employee.health_insurance)
    employee.total_taxes_withheld = Number(employee.total_taxes_withheld)
    employee.insurance_deductions = Number(employee.insurance_deductions)
    employee.other_regular_deductions = Number(employee.other_regular_deductions)
    employee.total_regular_deductions = Number(employee.total_regular_deductions)

    return employee
}