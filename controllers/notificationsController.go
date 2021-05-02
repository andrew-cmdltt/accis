package controllers

import (
	"accis/models"
	_"accis/utils"
	"encoding/json"
	"github.com/gorilla/mux"
	"net/http"
)

func GetNotifications(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	notifications := models.GetNotifications()

	json.NewEncoder(w).Encode(notifications)
}

func GetNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	notification := models.GetNotification(params["id"])

	json.NewEncoder(w).Encode(notification)
}

func DeleteNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteNotification(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddNotification(w http.ResponseWriter, r *http.Request) {
	//w.Header().Set("Content-Type", "application/json")
	//
	//notification := models.AddNotification(r)
	//
	//json.NewEncoder(w).Encode(notification)
}

func UpdateNotification(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	notification := models.UpdateNotification(r)

	json.NewEncoder(w).Encode(notification)
}



