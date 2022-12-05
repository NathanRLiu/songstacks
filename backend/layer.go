package main
import (
	"strings"
	"context"
	"log"
	"bytes"
	"io"
	"net/http"
	//"mime/multipart"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/bson"
	guuid "github.com/google/uuid"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

type Layer struct {
	_id		string
	ParentLayer	string		`form:"parent"`
	ChildLayers	[]string	`form:"children"`
	LayerAudio	[]byte	`form:"file"`
	LayerCut	float32		`form:"desired_cut"`
}
type getLayerReq struct {
	layerID	string	`json:"layerid"`
}

func getLayer(c *gin.Context) {
	//var res [][]byte
	layerID, _ := primitive.ObjectIDFromHex(c.Query("layerid"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	coll := client.Database("songDB").Collection("layers")

	var curr Layer
	var layers []Layer
	err = coll.FindOne(context.TODO(), bson.M{"_id": layerID}).Decode(&curr)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Success": false})
		return
	}

		layers = append(layers, curr)
	for curr.ParentLayer != "" {
		
		_ = coll.FindOne(context.TODO(), bson.M{"_id": layerID}).Decode(&curr)
		layers = append(layers, curr)
	}
	c.JSON(http.StatusOK, gin.H{
		"Layers" : layers,
		"success": true,
	})
	return
}
func createLayer(c *gin.Context) {
	file_not_binary,_, _ := c.Request.FormFile("file")

	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, file_not_binary); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Success": false})
    return 
	}
	file := buf.Bytes()

	parent := c.Request.PostForm["parentid"][0]
	log.Printf(parent)
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
	id := guuid.New().String()
    id = strings.Replace(id, "-", "", -1)
	coll := client.Database("songDB").Collection("layers")
	if (parent!="") {
		var parentLayer Layer
		parentID, _ := primitive.ObjectIDFromHex(parent)
		parentErr := coll.FindOne(context.TODO(), bson.M{"_id": parentID}).Decode(&parentLayer)
		if parentErr != nil {
			log.Printf(parentErr.Error())
			c.JSON(http.StatusNotFound, gin.H{"Error": "Parent layer not found"})
			return
		}
		parentChildren := parentLayer.ChildLayers
		parentChildren = append(parentChildren, id)
		coll.UpdateOne(
			context.TODO(),
			bson.D{{"_id", parentID}},
			bson.D{{"$set", bson.D{{"childLayers", parentChildren}}}},
		)

	}
	
	newLayer := Layer{_id:id, ParentLayer: parent, LayerAudio: file, LayerCut: 0, ChildLayers:make([]string, 0)}
	coll.InsertOne(context.TODO(), newLayer)

	c.JSON(http.StatusOK, gin.H{"Success": true})
	return
}
