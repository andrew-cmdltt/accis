export function getIgnorableKeys(is_authorized) {
    let ignorable = ["open", "id", "role_id", "is_authorized"]

    if (!is_authorized) {
        ignorable.push("login", "password")
    }

    return ignorable

}