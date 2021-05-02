package models

import (
	"encoding/json"
	"errors"
	"fmt"
	_ "fmt"
	"github.com/gorilla/mux"
	"github.com/tealeg/xlsx"

	"io/ioutil"
	"net/http"
)

type Report struct {
	ID                    int     `json:"id" xlsx:"0"`
	StartDate             string  `json:"start_date" xlsx:"1"`
	ExpiryDate            string  `json:"expiry_date" xlsx:"2"`
	StandardHoursWorked   int     `json:"standard_hours_worked" xlsx:"3"`
	VacationHours         int     `json:"vacation_hours" xlsx:"4"`
	HospitalHours         int     `json:"hospital_hours" xlsx:"5"`
	Overtime              int     `json:"overtime" xlsx:"6"`
	OvertimeRate          int     `json:"overtime_rate" xlsx:"7"`
	TotalSalary           float64 `json:"total_salary" xlsx:"8"`
	TaxesAndDeductions    float64 `json:"taxes_and_deductions" xlsx:"9"`
	OtherDeductions       float64 `json:"other_deductions" xlsx:"10"`
	NetSalary             float64 `json:"net_salary" xlsx:"11"`
	EmployeeId            int     `json:"employee_id" xlsx:"12"`
	PositiveReviews       int     `json:"positive_reviews" xlsx:"13"`
	CustomerGrowth        int     `json:"customer_growth" xlsx:"14"`
	TaskCompleted         int     `json:"task_completed" xlsx:"15"`
	Performance           int     `json:"performance" xlsx:"16"`
	Efficiency            int     `json:"efficiency" xlsx:"17"`
	ParticipationInEvents int     `json:"participation_in_events" xlsx:"18"`
	Experience            int     `json:"experience" xlsx:"19"`
	Initiative            int     `json:"initiative" xlsx:"20"`
	Creativity            int     `json:"creativity" xlsx:"21"`
}

type Params struct {
	StartDate    string `json:"start_date"`
	ExpiryDate   string `json:"expiry_date"`
	DepartmentId int    `json:"department_id"`
}

var reports []Report
var report Report
var params Params

func GetReports() []Report {
	db.Raw("SELECT * FROM reports").Scan(&reports)
	return reports
}

func GetReport(id string) Report {
	db.Raw("SELECT * FROM reports WHERE id = ?", id).Scan(&report)
	return report
}

func DeleteReport(id string) {
	db.Exec("DELETE FROM reports WHERE id = ?", id)
	report = Report{}
}

func AddReport(r *http.Request) Report {
	// Преобразование тела запроса в структуру
	_ = json.NewDecoder(r.Body).Decode(&report)

	// Добавление заиси отчётности
	report.ID = 0
	db.Omit("id").Create(&report)

	// Формирование уведомление
	messageSuccess := "Запись по расчёту ЗП успешно добавлена"
	messageError := "Не удалось добавить запись по расчёту ЗП"
	notification = Validate(report.ID, messageSuccess, messageError, "add", reports)

	AddNotification(notification)

	// Возврат добавленной записи отчётности
	return report
}

func UpdateReport(r *http.Request) Report {
	report = Report{}
	_ = json.NewDecoder(r.Body).Decode(&report)

	params := mux.Vars(r)

	db.Model(Report{}).
		Where("id = ?", params["id"]).
		Omit("id").
		Update(&report).
		Update(&report).
		Scan(&report)

	messageSuccess := "Запись по расчёту ЗП успешно изменена"
	messageError := "Не удалось изменить запись по расчёту ЗП"
	notification = Validate(report.ID, messageSuccess, messageError, "update", reports)

	AddNotification(notification)

	return report
}

func GenerateReport(r *http.Request) []Report {
	reports = []Report{}
	_ = json.NewDecoder(r.Body).Decode(&params)

	db.Raw("SELECT * FROM reports as r "+
		"INNER JOIN employees as e "+
		"ON r.employee_id = e.id "+
		"WHERE (r.start_date >= ? and r.expiry_date <= ?)"+
		"and e.department_id = ?",
		params.StartDate,
		params.ExpiryDate,
		params.DepartmentId).Scan(&reports)

	messageSuccess := "Очёт успешно сформирован"
	messageError := "Не удалось сформировать отчёт"
	notification = Validate(0, messageSuccess, messageError, "generate", reports)

	AddNotification(notification)

	return reports
}

func ImportReport(r *http.Request) []Report {
	reports = []Report{}
	file, _, _ := r.FormFile("xlsx")

	fileBytes, _ := ioutil.ReadAll(file)

	fmt.Println("== xlsx package tutorial ==")
	rowStuff(fileBytes)

	return reports
}

func cellVisitor(c *xlsx.Cell) error {
	value, err := c.FormattedValue()
	if err != nil {
		fmt.Println(err.Error())
	} else {
		fmt.Println("Cell value:", value)
	}
	return err
}

func rowVisitor(r *xlsx.Row) error {
	fmt.Print(r.ReadStruct(&report))
	fmt.Print(report)

	//startDate, _ := time.Parse(reportXLSX.StartDate, "1999-12-31")
	//reportXLSX.StartDate = startDate.Format("1999-12-31")
	//
	//expiryDate, _ := time.Parse(reportXLSX.ExpiryDate, "1999-12-31")
	//reportXLSX.ExpiryDate = expiryDate.Format("1999-12-31")
	db.Omit("id").Create(&report)
	return r.ForEachCell(cellVisitor)
}

func rowStuff(fileBytes []byte) {
	wb, err := xlsx.OpenBinary(fileBytes)
	if err != nil {
		panic(err)
	}
	sh, ok := wb.Sheet["data"]
	if !ok {
		panic(errors.New("Sheet not found"))
	}

	fmt.Println("Max row is", sh.MaxRow)
	sh.ForEachRow(rowVisitor)
}