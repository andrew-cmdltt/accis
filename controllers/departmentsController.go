package controllers

import (
	"accis/models"
	_ "accis/utils"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

func GetDepartments(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("ответ пришёл")

	departments := models.GetDepartments()

	json.NewEncoder(w).Encode(departments)
}

func GetDepartment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	department := models.GetDepartment(params["id"])

	json.NewEncoder(w).Encode(department)
}

func DeleteDepartment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteDepartment(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddDepartment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	department := models.AddDepartment(r)

	json.NewEncoder(w).Encode(department)
}

func UpdateDepartment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	department := models.UpdateDepartment(r)

	json.NewEncoder(w).Encode(department)
}
