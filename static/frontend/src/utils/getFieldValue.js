import {getTextFieldType} from "./getTextFieldType";
const dateFormat = require('dateformat')

export function getFieldValue(key, value) {
    switch (getTextFieldType(key)) {
        case "date":
            return dateFormat(value, "UTC:yyyy-mm-dd")
        default:
            return value
    }
}