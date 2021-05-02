package main

import (
	"accis/controllers"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"html/template"
	"log"
	"net/http"
	"os"
)

func main() {
	r := mux.NewRouter()
	http.Handle("/api/", r)
	http.Handle("/static/", http.StripPrefix("/static", http.FileServer(http.Dir("./static/"))))
	http.HandleFunc("/", mainPage)

	// departments
	r.HandleFunc("/api/departments/", controllers.GetDepartments).Methods("GET")
	r.HandleFunc("/api/departments/", controllers.AddDepartment).Methods("POST")
	r.HandleFunc("/api/department/{id}/", controllers.GetDepartment).Methods("GET")
	r.HandleFunc("/api/department/{id}/", controllers.DeleteDepartment).Methods("DELETE")
	r.HandleFunc("/api/department/{id}/", controllers.UpdateDepartment).Methods("PUT")

	// positions
	r.HandleFunc("/api/positions/", controllers.GetPositions).Methods("GET")
	r.HandleFunc("/api/positions/", controllers.AddPosition).Methods("POST")
	r.HandleFunc("/api/position/{id}/", controllers.GetPosition).Methods("GET")
	r.HandleFunc("/api/position/{id}/", controllers.DeletePosition).Methods("DELETE")
	r.HandleFunc("/api/position/{id}/", controllers.UpdatePosition).Methods("PUT")

	// employees
	r.HandleFunc("/api/employees/", controllers.GetEmployees).Methods("GET")
	r.HandleFunc("/api/employees/", controllers.AddEmployee).Methods("POST")
	r.HandleFunc("/api/employee/{id}/", controllers.GetEmployee).Methods("GET")
	r.HandleFunc("/api/employee/{id}/", controllers.DeleteEmployee).Methods("DELETE")
	r.HandleFunc("/api/employee/{id}/", controllers.UpdateEmployee).Methods("PUT")
	r.HandleFunc("/api/auth/login/", controllers.Login).Methods("POST")
	r.HandleFunc("/api/auth/logout/", controllers.Logout).Methods("GET")

	// notifications
	r.HandleFunc("/api/notifications/", controllers.GetNotifications).Methods("GET")
	r.HandleFunc("/api/notifications/", controllers.AddNotification).Methods("POST")
	r.HandleFunc("/api/notification/{id}/", controllers.GetNotification).Methods("GET")
	r.HandleFunc("/api/notification/{id}/", controllers.DeleteNotification).Methods("DELETE")
	r.HandleFunc("/api/notification/{id}/", controllers.UpdateNotification).Methods("PUT")

	// reports
	r.HandleFunc("/api/reports/", controllers.GetReports).Methods("GET")
	r.HandleFunc("/api/reports/", controllers.AddReport).Methods("POST")
	r.HandleFunc("/api/report/{id}/", controllers.GetReport).Methods("GET")
	r.HandleFunc("/api/report/{id}/", controllers.DeleteReport).Methods("DELETE")
	r.HandleFunc("/api/report/{id}/", controllers.UpdateReport).Methods("PUT")
	r.HandleFunc("/api/generate-report/", controllers.GenerateReport).Methods("POST")
	r.HandleFunc("/api/import/", controllers.ImportReport).Methods("POST")


	e := godotenv.Load() //Загрузить файл .env
	if e != nil {
		fmt.Print(e)
	}

	port := os.Getenv("PORT")

	println("Server is started on port:", port)
	err := http.ListenAndServe(port, nil)

	if err != nil {
		log.Fatal("ListenAndServe", err)
	}
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	tmpl, err := template.ParseFiles("static/frontend/templates/frontend/index.html")

	if err != nil {
		http.Error(w, err.Error(), 400)
		return
	}

	if err := tmpl.Execute(w, nil); err != nil {
		http.Error(w, err.Error(), 400)
		return
	}
}
