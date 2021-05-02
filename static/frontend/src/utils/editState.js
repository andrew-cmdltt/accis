export function editState(state, stringKey, payloadKey, payload) {
    let elements = state
    let element
    for (let i = 0; i < elements.length; i++) {
        element = elements[i]
        for (let key in element) {
            if (element[stringKey] === payloadKey) {
                elements[i] = payload
            }
        }
    }
}