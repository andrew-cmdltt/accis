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
        case "full_name":
            return "Фамилия, имя и отчество"
        case "birth_date":
            return "Дата рождения"
        case "phone_number":
            return "Номер телефона"
        case "email":
            return "Email"
        case "passport_data":
            return "Паспортные данные"
        case "department_id":
            return "Отдел"
        case "position_id":
            return "Должность"
        default:
            return ""
    }
}