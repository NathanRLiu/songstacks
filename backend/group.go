package main
import (
	"strings"
	"fmt"
	"log"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
	orm "github.com/go-pg/pg/v9/orm"
	"github.com/go-pg/pg/v9"
	guuid "github.com/google/uuid"
)

type Event struct {
	ID		string		`json:"id"`
	GroupID		string		`json:"groupId"`
	Title		string		`json:"title"`
	Time		string		`json:"time"`
	Date		Date		`json:"date"`
	Description	string		`json:"description"`
	PeopleGoing	[]string	`json:"going"`
	PeopleNotGoing	[]string	`json:"not_going"`
}
type Date struct {
	Month	int8	`json:"month"`
	Day	int8	`json:"day"`
	Year	int16	`json:"year"`
}
type Group struct {
	ID		string			`json:"id"`
	Name		string			`json:"name"`
	LastUpdated	time.Time		`json:"last_updated"`
	CreatedAt	time.Time		`json:"created_at"`
	Events		map[string][]Event	`json:"events"`
}
var dbConnect *pg.DB
func InitiateDB(db *pg.DB) {
	dbConnect = db
}

func AddEvent(c *gin.Context){
	var event Event
	c.BindJSON(&event)
	groupId := event.GroupID
	log.Println(groupId)
	group := &Group{ID: groupId}
	err := dbConnect.Select(group)
	if err != nil {
		log.Printf("Error selecting group for AddEvent: %v\n", err)
		c.JSON(http.StatusNotFound, gin.H{
			"status": http.StatusNotFound,
			"message": "Group not found",
		})
		return
	}
	events := group.Events
	eventsForDay := events[fmt.Sprint(event.Date.Month , "/" , event.Date.Day , "/" , event.Date.Year)]

	time := event.Time
	title := event.Title
	description := event.Description
	id := guuid.New().String()
	id = strings.Replace(id, "-", "", -1)
	eventBlargh := Event{
		ID:	id,
		Title:	title,
		Time:	time,
		Description:	description,
	}

	eventsForDay = append(eventsForDay, eventBlargh)
	group.Events[fmt.Sprint(event.Date.Month , "/" , event.Date.Day , "/" , event.Date.Year)] = eventsForDay
	dbConnect.Model(group).
		Column("events").
		Where("id = ?", group.ID).
		Update()
	c.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"message":"Todo created Successfully",
	})
}
func ViewGroup(c *gin.Context){
	group := new(Group)
	err := dbConnect.Model(group).
		Where("id = ?", c.Query("groupid")).
		Select()
	if err != nil{
		log.Printf("view group events error: %v\n", err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": http.StatusOK,
		"message":"Group found successfully",
		"group":group,
	})
	return
}
func CreateGroup(c *gin.Context){
	var group Group
	c.BindJSON(&group)
	name := group.Name
	id := guuid.New().String()
	id = strings.Replace(id, "-", "", -1)
	insertError := dbConnect.Insert(&Group{
		ID:	id,
		Name:	name,
		CreatedAt: time.Now(),
		LastUpdated: time.Now(),
		Events: make(map[string][]Event),
	})
	if insertError != nil {
		log.Printf("Error while inserting new group into db, Reason: %v\n", insertError)
		c.JSON(http.StatusInternalServerError, gin.H{
			"status": http.StatusInternalServerError,
			"message": "Something went wrong",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"status": http.StatusCreated,
		"message":"Todo created Successfully",
	})
	return
}

func CreateGroupTable(db *pg.DB) error {
	opts := &orm.CreateTableOptions{
		IfNotExists:true,
	}
	createError := db.CreateTable(&Group{}, opts)

	if createError!= nil{
		log.Printf("Error while creating group table, Reason: &v`n", createError)
		return createError
	}
	log.Printf("Group created")
	return nil
}
