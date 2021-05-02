export function getEmployeeFullName(employees, id) {
    for (let i = 0; i < employees.length; i++) {
        if (id === employees[i]['id']) {
            return employees[i]['full_name']
        }
    }
}