export function getTextFieldType(keyName) {
    switch (keyName) {
        case "login":
            return "login"
        case "password":
            return "password"
        case "birth_date":
            return "date"
        default:
            return "text"
    }
}