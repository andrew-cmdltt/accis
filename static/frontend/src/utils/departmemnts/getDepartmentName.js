export function getDepartmentName(departments, id) {
    for (let i = 0; i < departments.length; i++) {
        if (id === departments[i]['id']) {
            return departments[i]['department_name']
        }
    }
}