package models

import (
	"encoding/json"
	_ "fmt"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm"
	"net/http"
)

type Department struct {
	ID                    int    `json:"id"`
	DepartmentName        string `json:"department_name"`
	DepartmentDescription string `json:"department_description"`
}

var departments []Department
var department Department

func GetDepartments() []Department {
	db.Raw("SELECT * FROM departments").Scan(&departments)
	return departments
}

func GetDepartment(id string) Department {
	db.Raw("SELECT * FROM departments WHERE id = ?", id).Scan(&department)
	return department
}

func DeleteDepartment(id string) {
	department = Department{}
	db.Exec("DELETE FROM departments WHERE id = ?", id)
	department = GetDepartment(id)

	messageSuccess := "Отдел успешно удалён"
	messageError := "Не удалить удалить отдел"
	notification = Validate(department.ID, messageSuccess, messageError, "delete", reports)

	AddNotification(notification)

	department = Department{}
}

func AddDepartment(r *http.Request) Department {
	_ = json.NewDecoder(r.Body).Decode(&department)
	department.ID = 0
	db.Omit("id").Create(&department)

	messageSuccess := "Отдел успешно добавлен"
	messageError := "Не удалось добавить отдел"
	notification = Validate(department.ID, messageSuccess, messageError, "add", reports)

	AddNotification(notification)

	return department
}

func UpdateDepartment(r *http.Request) Department {
	department = Department{}
	_ = json.NewDecoder(r.Body).Decode(&department)

	params := mux.Vars(r)

	db.Model(Department{}).
		Where("id = ?", params["id"]).
		Omit("id").
		Update(&department).
		Scan(&department)

	messageSuccess := "Данные по отделу успешно изменены"
	messageError := "Не удалось изменить данные по отделу"
	notification = Validate(department.ID, messageSuccess, messageError, "update", reports)

	AddNotification(notification)

	return department
}
