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
	LayerAudio	*multipart.FileHeader	`json:"audio"`
	LayerCut	float32		`json:"desired_cut"`
}

func createLayer(c *gin.Context) {
	var layer Layer
	c.BindJSON(&layer)
	parent := layer.ParentLayer
	file, fileErr := c.FormFile("audio")
	if fileErr != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		    "message": "No file is received",
		})
		log.Printf(fileErr.Error())
		return
	}

	//if filepath.Ext(file.Filename)
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
	coll := client.Database("songDB").Collection("layers")

	log.Printf(err.Error())
	id := guuid.New().String()
        id = strings.Replace(id, "-", "", -1)
	newLayer := Layer{_id:id, ParentLayer: parent, LayerAudio: file, LayerCut: 0, ChildLayers:make([]string, 0)}
	coll.InsertOne(context.TODO(), newLayer)

	c.JSON(http.StatusOK, gin.H{"Success": true})
}
