import {dateFormat} from "../dateFormat";

export function getConvertedCsvData(csvData) {
    let convertedCsvData = []

    for (let i = 0; i < csvData.length; i++) {
        convertedCsvData.push({
            "№": csvData[i]["id"],
            "Начало срока": dateFormat(csvData[i]["start_date"], "UTC:dd.mm.yyyy"),
            "Конец срока": dateFormat(csvData[i]["expiry_date"], "UTC:dd.mm.yyyy"),
            "Отработанные нормативные часы": csvData[i]["standard_hours_worked"],
            "Отпускные часы": csvData[i]["vacation_hours"],
            "Больничные часы": csvData[i]["hospital_hours"],
            "Сверхурочные часы": csvData[i]["overtime"],
            "Сверхурочная ставка": csvData[i]["overtime_rate"],
            "Общая зарплата": csvData[i]["total_salary"],
            "Налоги и вычеты": csvData[i]["taxes_and_deductions"],
            "Другие вычеты": csvData[i]["other_deductions"],
            "Чистая зраплата": csvData[i]["net_salary"],
            "Номер сотрудника": csvData[i]["employee_id"],
            "Положительные отзывы": csvData[i]["positive_reviews"],
            "Прирост клиентов": csvData[i]["customer_growth"],
            "Задач выполнено": csvData[i]["task_completed"],
            "Производительность": csvData[i]["performance"],
            "Эффективность": csvData[i]["efficiency"],
            "Участие в мероприятиях": csvData[i]["participation_in_events"],
            "Опыт": csvData[i]["experience"],
            "Инициатива": csvData[i]["initiative"],
            "Креативность": csvData[i]["creativity"]
        })
    }

    return convertedCsvData
}