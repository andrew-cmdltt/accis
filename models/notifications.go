package models

import (
	"encoding/json"
	"fmt"
	_ "fmt"
	"github.com/gorilla/mux"
	"net/http"
	"time"
)

type Notification struct {
	ID          int    `json:"id"`
	EmployeeId  int    `json:"employee_id"`
	SendingDate string `json:"sending_date"`
	Message     string `json:"message"`
	Type        string `json:"type"`
}

type Concat1Args struct {
	id int
}

var notifications []Notification
var notification Notification

func GetNotifications() []Notification {
	db.Raw("SELECT * FROM notifications WHERE employee_id = ?", authUser.User.ID).
		Scan(&notifications)
	return notifications
}

func GetNotification(id string) Notification {
	db.Raw("SELECT * FROM notifications WHERE id = ?", id).Scan(&notification)
	return notification
}

func DeleteNotification(id string) {
	db.Exec("DELETE FROM notifications WHERE id = ?", id)
	notification = Notification{}
}

func AddNotification(notification Notification) Notification {
	db.Omit("id").Create(&notification)

	return notification
}

func UpdateNotification(r *http.Request) Notification {
	_ = json.NewDecoder(r.Body).Decode(&notification)

	params := mux.Vars(r)

	db.Model(Notification{}).
		Where("id = ?", params["id"]).
		Omit("id").
		Update(&notification).
		Scan(&notification)

	return notification
}

func Validate(id int, messageSuccess string, messageError string, action string, reports []Report) Notification {
	notification.EmployeeId = authUser.User.ID
	notification.SendingDate = time.Now().Format("01-02-2006")

	switch action {
	case "delete":
		fmt.Print("delete")

		if id == 0 {
			notification.Message = messageSuccess
			notification.Type = "success"
		} else {
			notification.Message = messageError
			notification.Type = "danger"
		}
		return notification
	case "generate":
		fmt.Print("generate")

		if len(reports) != 0 {
			notification.Message = messageSuccess
			notification.Type = "success"
		} else {
			notification.Message = messageError
			notification.Type = "danger"
		}
		return notification
	default:
		fmt.Print("add")
		if id != 0 {
			notification.Message = messageSuccess
			notification.Type = "success"
		} else {
			notification.Message = messageError
			notification.Type = "danger"
		}
		return notification
	}

}
