export function getTotalRegularDeductions(employee) {
    const total_regular_deductions =  Number(employee.insurance_deductions)
        + Number(employee.other_regular_deductions)
    return total_regular_deductions.toFixed(2)

}