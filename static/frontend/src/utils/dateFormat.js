export function dateFormat(date) {
    console.log('date')
    date = new Date(date)
    console.log(date.getDay())

    let dd = date.getUTCDay();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getUTCMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();

    return dd + '.' + mm + '.' + yyyy
}