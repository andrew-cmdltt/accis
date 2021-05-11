export function getIgnorableKeys(ignorable, is_authorized) {
    if (!is_authorized) {
        ignorable.push("login", "password")
    }

    return ignorable

}