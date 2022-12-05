package main
import (
	"strings"
	"context"
	"log"
	"net/http"
	"mime/multipart"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	guuid "github.com/google/uuid"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

type Layer struct {
	_id		string
	ParentLayer	string		`json:"parent"`
	ChildLayers	[]string	`json:"children"`
	LayerAudio	*multipart.FileHeader	`form:"file"`
	LayerCut	float32		`json:"desired_cut"`
}

func createLayer(c *gin.Context) {
	var layer Layer
	file, _ := c.FormFile("file")
	c.BindJSON(&layer)

	parent := layer.ParentLayer


	//if filepath.Ext(file.Filename)
	client, merr := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if merr != nil {
		log.Printf("panicking");
		panic(merr)
	}
	defer func() {
		if merr := client.Disconnect(context.TODO()); merr != nil {
			log.Printf("panicking2");
			panic(merr)
		}
	}()
	coll := client.Database("songDB").Collection("layers")

	id := guuid.New().String()
        id = strings.Replace(id, "-", "", -1)
	newLayer := Layer{_id:id, ParentLayer: parent, LayerAudio: file, LayerCut: 0, ChildLayers:make([]string, 0)}
	coll.InsertOne(context.TODO(), newLayer)

	c.JSON(http.StatusOK, gin.H{"Success": true})
}
