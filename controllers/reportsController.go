package controllers

import (
	"accis/models"
	_"accis/utils"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func GetReports(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	reports := models.GetReports()

	json.NewEncoder(w).Encode(reports)
}

func GetReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	report := models.GetReport(params["id"])

	json.NewEncoder(w).Encode(report)
}

func DeleteReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteReport(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddReport(w http.ResponseWriter, r *http.Request) {

	// Установка content type application/json для отпрвки данных на клиентскую часть в виде json
	w.Header().Set("Content-Type", "application/json")

	// Обращение к функции добавления записи отчётности
	report := models.AddReport(r)

	// Возврат записи отчётности на клиентскую чать в виде json
	json.NewEncoder(w).Encode(report)
}

func UpdateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	report := models.UpdateReport(r)

	json.NewEncoder(w).Encode(report)
}

func GenerateReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	reports := models.GenerateReport(r)

	json.NewEncoder(w).Encode(reports)
}

func ImportReport(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	test := models.ImportReport(r)

	json.NewEncoder(w).Encode(test)
}


