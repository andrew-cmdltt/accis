package models

import (
	"encoding/json"
	_ "fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type Position struct {
	ID                  int    `json:"id"`
	PositionName        string `json:"position_name"`
	PositionDescription string `json:"position_description"`
}

var positions []Position
var position Position

func GetPositions() []Position {
	db.Raw("SELECT * FROM positions").Scan(&positions)
	return positions
}

func GetPosition(id string) Position {
	db.Raw("SELECT * FROM positions WHERE id = ?", id).Scan(&position)
	return position
}

func DeletePosition(id string) {
	position = Position{}
	db.Exec("DELETE FROM positions WHERE id = ?", id)
	position = GetPosition(id)

	messageSuccess := "Должность успешно удалена"
	messageError := "Не удалить удалить должность"
	notification = Validate(position.ID, messageSuccess, messageError, "delete", reports)

	AddNotification(notification)

	position = Position{}
}

func AddPosition(r *http.Request) Position {
	_ = json.NewDecoder(r.Body).Decode(&position)
	position.ID = 0
	db.Omit("id").Create(&position)

	messageSuccess := "Должность успешно добавлена"
	messageError := "Не удалось добавить должность"
	notification = Validate(position.ID, messageSuccess, messageError, "add", reports)

	AddNotification(notification)

	return position
}

func UpdatePosition(r *http.Request) Position {
	position = Position{}
	_ = json.NewDecoder(r.Body).Decode(&position)

	params := mux.Vars(r)

	db.Model(Position{}).
		Where("id = ?", params["id"]).
		Omit("id").
		Update(&position).
		Update(&position).
		Scan(&position)

	messageSuccess := "Данные по должности успешно изменены"
	messageError := "Не удалось изменить данные по должности"
	notification = Validate(position.ID, messageSuccess, messageError, "update", reports)

	AddNotification(notification)

	return position
}
