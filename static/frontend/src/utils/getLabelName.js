export function getLabelName(keyName) {
    switch (keyName) {
        case "login":
            return "Логин"
        case "password":
            return "Пароль"
        case "department_name":
        case "position_name":
            return "Название"
        case "department_description":
        case "position_description":
            return "Описание"
        default:
            return ""
    }
}