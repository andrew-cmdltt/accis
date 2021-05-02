export function getRoleName(id) {
    switch (id) {
        case 1:
            return "Администратор"
        case 2:
            return "Главный бухгалтер"
        case 4:
            return "Бухгалтер"
        default:
            return "---"
    }
}