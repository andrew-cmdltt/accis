package controllers

import (
	"accis/models"
	_"accis/utils"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func GetPositions(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	departments := models.GetPositions()

	json.NewEncoder(w).Encode(departments)
}

func GetPosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	department := models.GetPosition(params["id"])

	json.NewEncoder(w).Encode(department)
}

func DeletePosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeletePosition(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddPosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	department := models.AddPosition(r)

	json.NewEncoder(w).Encode(department)
}

func UpdatePosition(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	department := models.UpdatePosition(r)

	json.NewEncoder(w).Encode(department)
}



