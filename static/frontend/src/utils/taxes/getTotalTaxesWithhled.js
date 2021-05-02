export function getTotalTaxesWithheld(employee) {
    const total_taxes_withheld = Number(employee.regional_taxes)
    + Number(employee.income_tax)
    + Number(employee.social_insurance)
    + Number(employee.health_insurance)
    return total_taxes_withheld.toFixed(2)

}