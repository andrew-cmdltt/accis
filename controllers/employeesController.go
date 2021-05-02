package controllers

import (
	"accis/models"
	"accis/utils"
	_ "accis/utils"
	"encoding/json"
	"github.com/gorilla/mux"
	_ "github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"net/http"
)

var mySigningKey = []byte("yy11yy11yu")

func GetEmployees(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	employees := models.GetEmployees()

	json.NewEncoder(w).Encode(employees)
}

func GetEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	employee := models.GetEmployee(params["id"])

	json.NewEncoder(w).Encode(employee)
}

func DeleteEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)

	models.DeleteEmployee(params["id"])

	json.NewEncoder(w).Encode(http.StatusOK)
}

func AddEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	employee := models.AddEmployee(r)

	json.NewEncoder(w).Encode(employee)
}

//func SearchUsers(w http.ResponseWriter, r *http.Request) {
//	w.Header().Set("Content-Type", "application/json")
//
//	users := models.SearchUsers(r)
//
//	json.NewEncoder(w).Encode(users)
//}
//
func UpdateEmployee(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	employee := models.UpdateEmployee(r)

	json.NewEncoder(w).Encode(employee)
}

func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	authUser, message := models.Login(r, mySigningKey)

	if message != "" {
		utils.Respond(w, utils.Message(false, message))
	} else {
		json.NewEncoder(w).Encode(authUser)
	}
}

func Logout(w http.ResponseWriter, r *http.Request) {
	hash ,_ := bcrypt.GenerateFromPassword([]byte("YU158iJk245"), bcrypt.DefaultCost)
	print(string(hash))
	models.Logout()
}


