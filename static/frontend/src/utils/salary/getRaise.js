import {getNetSalary} from "./getNetSalary";

export function getRaise(report) {

    // Основные показатели
    let main_indicators = [
        report.positive_reviews,
        report.customer_growth,
        report.task_completed
    ]

    // Общие показатели
    let other_indicators = [
        [report.performance, 0.1],
        [report.efficiency, 0.1],
        [report.participation_in_events, 0.05],
        [report.experience, 0.05],
        [report.initiative, 0.1],
        [report.creativity, 0.1]
    ]

    // Вычисление индексов основных показателей (Вес * Факт / Цель)
    main_indicators[0] = 0.1 * (main_indicators[0] - 100) / 35
    main_indicators[1] = 0.1 * (100 / (150 / (main_indicators[1] - 150))) / 20
    main_indicators[2] = 0.3 * (100 / (15 / (main_indicators[2] - 15))) / 20

    // Вычисление индексов основных показателей (Вес * Факт / Цель)
    for (let i = 0; i < other_indicators.length; i++) {
        other_indicators[i] = other_indicators[i][1] * (100 / (5 / other_indicators[i][0])) / 100
    }

    // Вычисление суммы индексов
    main_indicators = main_indicators.reduce((sum, current) => sum + current, 0);
    other_indicators = other_indicators.reduce((sum, current) => sum + current, 0);
    const sum_of_indexes = main_indicators + other_indicators

    // Если сумма индексов превышает 100%, надбавка = ЗП / 100 * (сумма индексов * 100 - 100)
    let raise = 0
    if (sum_of_indexes > 1) {
        raise = (Number(getNetSalary(report)) / 100 * (sum_of_indexes * 100 - 100))
    }

    return raise.toFixed(2)
}