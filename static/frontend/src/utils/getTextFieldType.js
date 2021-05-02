export function getTextFieldType(keyName) {
    switch (keyName) {
        case "login":
            return "login"
        case "password":
            return "password"
        default:
            return "text"
    }
}