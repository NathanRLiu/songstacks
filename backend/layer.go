package main
import (
	// "strings"
	"context"
	"fmt"
	"os"
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
	"go.mongodb.org/mongo-driver/mongo/gridfs"
	// "go.mongodb.org/mongo-driver/mongo/readpref"
)

type Layer struct {
	ID		primitive.ObjectID `bson:"_id"`
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
	log.Printf(c.Query("layerid"))
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	coll := client.Database("songDB").Collection("layers")

	var curr Layer
	var layers []Layer
	err = coll.FindOne(context.TODO(), bson.M{"_id": layerID}).Decode(&curr)
	if err != nil {
		log.Printf(err.Error());
		c.JSON(http.StatusNotFound, gin.H{"Success": false})
		return
	}

	layers = append(layers, curr)
	for curr.ParentLayer != "" {
		parentID, _ := primitive.ObjectIDFromHex(curr.ParentLayer)
		_ = coll.FindOne(context.TODO(), bson.M{"_id": parentID}).Decode(&curr)
		layers = append(layers, curr)
	}
	c.JSON(http.StatusOK, gin.H{
		"Layers" : layers,
		"success": true,
	})
	return
}
func createLayer(c *gin.Context) {
	data,_, _ := c.Request.FormFile("file")
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, data); err != nil {
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
	//objectID := primitive.NewObjectID()
    bucket, err := gridfs.NewBucket(
        client.Database("songDB"),
    )
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    uploadStream, err := bucket.OpenUploadStream(
        "2390",
    )
    if err != nil {
        fmt.Println(err)
        os.Exit(1)
    }
    defer uploadStream.Close()

    fileSize, err := uploadStream.Write(file)
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    log.Printf("Write file to DB was successful. File size: %d M\n", fileSize)
}

func playSong(c *gin.Context) {
	songID, _ := primitive.ObjectIDFromHex(c.Query("songid"))
	client, merr := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if merr != nil {
		log.Printf("panicking");
		panic(merr)
	}
	db := client.Database("songDB")
	bucket, bucketErr := gridfs.NewBucket(db)
	if bucketErr != nil {
		log.Printf(bucketErr.Error())
	}
	downloadStream, downloadErr := bucket.OpenDownloadStream(songID)
	if downloadErr != nil {
		log.Printf("panicking")
		log.Printf(downloadErr.Error())
		
	}
	fileBytes := make([]byte, 1024)
	if _, err := downloadStream.Read(fileBytes); err != nil {
		log.Printf(err.Error())
	}
	
	c.JSON(http.StatusOK, gin.H{"Song": fileBytes})
}

func getChildren(c *gin.Context) {
	layerID, _ := primitive.ObjectIDFromHex(c.Query("layerid"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	coll := client.Database("songDB").Collection("layers")

	var curr Layer
	err = coll.FindOne(context.TODO(), bson.M{"_id": layerID}).Decode(&curr)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"Success": false})
		return
	}

	c.JSON(http.StatusOK, gin.H{"children": curr.ChildLayers})
	return
}
