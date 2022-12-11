package main
import (
	"context"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
	"github.com/gorilla/sessions"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

type User struct  {
	Username	string		`json:"username"`
	Password	string		`json:"password"`
	Songs	string		`json:"songs"`
}
type Auth struct {
	Username	string		`json:"username"`
	Password	string		`json:"password"`
}

const uri = "mongodb+srv://cdevadhar:skry1ueRxZzmsBmr@cluster0.7dce6fw.mongodb.net/?retryWrites=true&w=majority"
var key = []byte("abcdefghijklmnop")
var sessionStore = sessions.NewCookieStore(key)

func Login(c *gin.Context) {
	session, _ := sessionStore.Get(c.Request, "session-name")
	var body Auth
	c.BindJSON(&body)
	username := body.Username
	password:= []byte(body.Password)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Printf("panicking");
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
	coll := client.Database("auth").Collection("users")
	var result User
	err = coll.FindOne(context.TODO(), bson.D{{"username", username}}).Decode(&result)
	if (err==mongo.ErrNoDocuments) {
		c.JSON(http.StatusOK, gin.H{"Error": "No user with that username exists"})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(password))
	if (err!=nil) {
		c.JSON(http.StatusOK, gin.H{"Error": "Incorrect Password"})
		return
	}
	session.Values["username"] = username
	session.Save(c.Request, c.Writer)
	c.JSON(http.StatusOK, gin.H{"Success": "Logged in"})
}

func LoginGet(c *gin.Context) {
	session, _ := sessionStore.Get(c.Request, "session-name")
	currentUser := session.Values["username"]
	if (currentUser==nil) {
		c.JSON(http.StatusOK, gin.H{"Error": "Not Logged In"})
		return
	}
	currUsername := currentUser.(string)
	c.JSON(http.StatusOK, gin.H{"Current user": currUsername})
}

func Logout(c *gin.Context) {
	session, _ := sessionStore.Get(c.Request, "session-name")
	session.Values["username"] = nil
	session.Save(c.Request, c.Writer)
}

func Signup(c *gin.Context) {
	session, _ := sessionStore.Get(c.Request, "session-name")
	var body Auth
	c.BindJSON(&body)
	username := body.Username
	password:= []byte(body.Password)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Printf("panicking");
		panic(err)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
	coll := client.Database("auth").Collection("users")
	var result bson.M
	err = coll.FindOne(context.TODO(), bson.D{{"username", username}}).Decode(&result)
	if (err!=mongo.ErrNoDocuments) {
		c.JSON(http.StatusOK, gin.H{"Error": "A user with that username already exists"})
		return
	}
	log.Printf(err.Error())
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
	log.Printf(string(hashedPassword))
	newUser := User{Username: username, Password: string(hashedPassword), Songs: ""}
	coll.InsertOne(context.TODO(), newUser)
	session.Values["username"] = username
	session.Save(c.Request, c.Writer)
	c.JSON(http.StatusOK, gin.H{"Success": true})
}
