package models

import (
	"encoding/json"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/mux"
	_ "github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
)

type Employee struct {
	ID                     int     `json:"id"`
	FullName               string  `json:"full_name"`
	BirthDate              string  `json:"birth_date"`
	PhoneNumber            string  `json:"phone_number"`
	Email                  string  `json:"email"`
	PassportData           string  `json:"passport_data"`
	HourlyRate             float64 `json:"hourly_rate"`
	RegionalTaxes          float64 `json:"regional_taxes"`
	IncomeTax              float64 `json:"income_tax"`
	SocialInsurance        float64 `json:"social_insurance"`
	HealthInsurance        float64 `json:"health_insurance"`
	TotalTaxesWithheld     float64 `json:"total_taxes_withheld"`
	InsuranceDeductions    float64 `json:"insurance_deductions"`
	OtherRegularDeductions float64 `json:"other_regular_deductions"`
	TotalRegularDeductions float64 `json:"total_regular_deductions"`
	DepartmentID           int     `json:"department_id"`
	RoleId                 int     `json:"role_id"`
	PositionID             int     `json:"position_id"`
	IsAuthorized           bool    `json:"is_authorized"`
	Login                  string  `json:"login"`
	Password               string  `json:"password"`
}

type AuthUser struct {
	User struct {
		ID           int    `json:"id"`
		FullName     string `json:"full_name"`
		DepartmentId int    `json:"department_id"`
		RoleId       int    `json:"role_id"`
		PositionId   int    `json:"position_id"`
	} `json:"user"`
	Token string `json:"token"`
}

var employees []Employee
var employee Employee
var authUser AuthUser

func GetEmployees() []Employee {
	db.Raw("select * from employees").Scan(&employees)
	return employees
}

func GetEmployee(id string) Employee {
	db.Raw("SELECT * FROM employees WHERE id = ?", id).Scan(&employee)
	return employee
}

func DeleteEmployee(id string) {
	employee = Employee{}
	db.Exec("DELETE FROM employees WHERE id = ?", id)
	employee = GetEmployee(id)

	messageSuccess := "Сотрудник успешно удалён"
	messageError := "Не удалить удалить сотрудника"
	notification = Validate(employee.ID, messageSuccess, messageError, "delete", reports)

	AddNotification(notification)

	db.Exec(fmt.Sprintf("DROP USER %s", employee.Login))
	employee = Employee{}
}

func AddEmployee(r *http.Request) Employee {
	_ = json.NewDecoder(r.Body).Decode(&employee)
	employee.ID = 0
	if authUser.User.RoleId == 1 && employee.IsAuthorized {
		CreateDbUser(employee)
		hash, _ := bcrypt.GenerateFromPassword([]byte(employee.Password), bcrypt.DefaultCost)
		employee.Password = string(hash)
	}

	db.Omit("id").Create(&employee)

	messageSuccess := "Сотрудник успешно добавлен"
	messageError := "Не удалось добавить сотрудника"
	notification = Validate(employee.ID, messageSuccess, messageError, "add", reports)

	AddNotification(notification)

	return employee
}

func UpdateEmployee(r *http.Request) Employee {
	employee = Employee{}
	_ = json.NewDecoder(r.Body).Decode(&employee)

	params := mux.Vars(r)
	currentEmployee := employee

	if authUser.User.RoleId == 1 {
		UpdateDbUser(employee.Login, employee.Password, employee.ID)
	}

	if authUser.User.RoleId == 1 && len(currentEmployee.Password) < 15 && len(currentEmployee.Password) != 0 {
		hash, _ := bcrypt.GenerateFromPassword([]byte(currentEmployee.Password), bcrypt.DefaultCost)
		currentEmployee.Password = string(hash)
	}

	db.Model(Employee{}).
		Where("id = ?", params["id"]).
		Omit("id").
		Update(&currentEmployee).
		Scan(&currentEmployee)

	messageSuccess := "Данные сотрудника успешно изменены"
	messageError := "Не удалось изменить данные сотрудника"
	notification = Validate(currentEmployee.ID, messageSuccess, messageError, "update", reports)

	AddNotification(notification)

	return currentEmployee
}

func CreateDbUser(employee Employee) {
	db.Exec(fmt.Sprintf("CREATE USER %s WITH PASSWORD '%s'",
		employee.Login, employee.Password))
	if employee.RoleId == 2 {
		db.Exec(fmt.Sprintf("GRANT general_accountant TO %s", employee.Login))
	} else if employee.RoleId == 4 {
		db.Exec(fmt.Sprintf("GRANT accountant TO %s", employee.Login))
	}
}

func UpdateDbUser(currentLogin, currentPassword string, id int) {
	db.Raw("SELECT * FROM employees WHERE id = ?",
		id).Scan(&employee)

	prevLogin := employee.Login
	prevPassword := employee.Password

	if prevLogin != currentLogin {
		db.Exec(fmt.Sprintf("ALTER USER %s RENAME TO %s",
			prevLogin, currentLogin))
	}

	if prevLogin != currentLogin && prevPassword != currentPassword {
		db.Exec(fmt.Sprintf("ALTER USER %s WITH PASSWORD '%s'",
			currentLogin, currentPassword))
	}

	if prevPassword != currentPassword {
		db.Exec(fmt.Sprintf("ALTER USER %s WITH PASSWORD '%s'",
			currentLogin, currentPassword))
	}
}

func GenerateJWT(login, password string, key []byte) AuthUser {
	// init token generation
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["login"] = login
	claims["password"] = password

	// verifying auth data
	db.Raw("SELECT * FROM employees WHERE login = ?",
		login).Scan(&employee)

	err := bcrypt.CompareHashAndPassword([]byte(employee.Password), []byte(password))
	if err != nil {
		log.Println(err)
	} else {

		fmt.Println(employee)

		// if incorrect data, function returns empty user
		if employee.ID == 0 {
			return AuthUser{}
		}

		// else generates token and returns authUser
		tokenString, _ := token.SignedString(key)

		//fullName := user.Cuserfamilyname + " " + user.Cuserfirstname + " " + user.Cusersurname

		authUser.User.ID = employee.ID
		authUser.User.FullName = employee.FullName
		authUser.User.DepartmentId = employee.DepartmentID
		authUser.User.RoleId = employee.RoleId
		authUser.User.PositionId = employee.PositionID
		authUser.Token = tokenString

		// it is KASTIL to drop last auth user data from memory:)
		employee = Employee{}
	}
	return authUser
}

func Login(r *http.Request, key []byte) (AuthUser, string) {
	_ = json.NewDecoder(r.Body).Decode(&employee)

	dbUser := employee.Login
	dbPass := employee.Password

	hash, _ := bcrypt.GenerateFromPassword([]byte(employee.Password), bcrypt.DefaultCost)
	fmt.Print(string(hash))

	conn := DbConnect(dbUser, dbPass)

	if conn {
		authUser := GenerateJWT(employee.Login, employee.Password, key)
		if authUser.User.ID == 0 {
			return authUser, "User not found"
		} else {
			fmt.Println(authUser)
			return authUser, ""
		}

	} else {
		return authUser, "Authorization error"
	}
}

func Logout() {
	authUser = AuthUser{}
}

func GetAuthUser() AuthUser {
	return authUser
}
