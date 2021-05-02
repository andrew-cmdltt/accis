package models

import (
	"fmt"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
	"os"
)

var db *gorm.DB //база данных

func DbConnect(dbUser string, dbPass string) bool {

	// Загрузка файл .env
	e := godotenv.Load()
	if e != nil {
		fmt.Print(e)
	}

	dbName := os.Getenv("db_name")
	dbHost := os.Getenv("db_host")
	dbPort := os.Getenv("db_port")

	// Создание строки подлючения
	dbUri := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", dbHost,
		dbPort, dbUser, dbName, dbPass)
	fmt.Println(dbUri)

	// Проверка соединения с бахой данных
	conn, err := gorm.Open("postgres", dbUri)
	if err != nil {
		fmt.Print(err)
		return false
	}

	db = conn
	return true
}


// возвращает дескриптор объекта DB
func GetDB() *gorm.DB {
	return db
}
