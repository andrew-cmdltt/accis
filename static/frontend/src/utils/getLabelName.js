export function getLabelName(keyName) {
    switch (keyName) {
        case "login":
            return "Логин"
        case "password":
            return "Пароль"
        case "department_name":
            return "Название"
        case "department_description":
            return "Описание"
        default:
            return ""
    }
}