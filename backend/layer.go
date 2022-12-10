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
	Name		string		`form:"name"`
	Description	string		`form:"description"`
	Artist		string		`form:"artist"`
	ParentLayer	string		`form:"parent"`
	ChildLayers	[]string	`form:"children"`
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
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
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

func uploadFile(c *gin.Context, fileKey string, client *mongo.Client, objectID primitive.ObjectID) {
	data, fileHeader, _ := c.Request.FormFile(fileKey)
	buf := bytes.NewBuffer(nil)
	if _, err := io.Copy(buf, data); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"Success": false})
	    return
	}
	file := buf.Bytes()
	//if filepath.Ext(file.Filename)
	var dbName string
	if (fileKey=="audio") {
		dbName = "songDB"
	} else {
		dbName = "albumCovers"
	}
	bucket, err := gridfs.NewBucket(
		client.Database(dbName),
	)
    if err != nil {
        log.Fatal(err)
        os.Exit(1)
    }
    uploadStream, err := bucket.OpenUploadStreamWithID(objectID, fileHeader.Filename)
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
func createLayer(c *gin.Context) {
	session, _ := sessionStore.Get(c.Request, "session-name")
	currentUser := session.Values["username"]
	if (currentUser==nil) {
		c.JSON(http.StatusOK, gin.H{"Error": "Not Logged In"})
		return
	}
	c.Request.ParseMultipartForm(0)
	parent := c.Request.FormValue("parentid")
	name := c.Request.FormValue("name")
	description := c.Request.FormValue("description")
	log.Printf(name)
	client, merr := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if merr != nil {
		log.Printf("panicking");
		panic(merr)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
	db := client.Database("songDB")
	coll := db.Collection("layers");
	newLayer := Layer{
		Name: name, 
		Description: description, 
		Artist: currentUser.(string), 
		ParentLayer: parent, 
		LayerCut: 0, 
		ChildLayers: make([]string, 0)}
	insertResult, _ := coll.InsertOne(context.TODO(), newLayer)
	objectID:= insertResult.InsertedID.(primitive.ObjectID)

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
		parentChildren = append(parentChildren, objectID.Hex())
		coll.UpdateOne(
			context.TODO(),
			bson.D{{"_id", parentID}},
			bson.D{{"$set", bson.D{{"childlayers", parentChildren}}}},
		)
	}
	
	uploadFile(c, "audio", client, objectID)
	uploadFile(c, "cover", client, objectID)
	c.JSON(http.StatusOK, gin.H{"Success": true})
	return
}

func playSong(c *gin.Context) {
	songID, _ := primitive.ObjectIDFromHex(c.Query("songid"))
	client, merr := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if merr != nil {
		log.Printf("panicking");
		panic(merr)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
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
	for true {
		fileBytes := make([]byte, 1024)
		if _, err := downloadStream.Read(fileBytes); err != nil {
			log.Printf(err.Error())
			return
		}

		c.Data(http.StatusOK, "audio/mpeg", fileBytes)
	}
	
}

func getCover(c *gin.Context) {
	coverID, _ := primitive.ObjectIDFromHex(c.Query("coverid"))
	client, merr := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if merr != nil {
		log.Printf("panicking");
		panic(merr)
	}
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
	db := client.Database("albumCovers")
	bucket, bucketErr := gridfs.NewBucket(db)
	if bucketErr != nil {
		log.Printf(bucketErr.Error())
	}
	downloadStream, downloadErr := bucket.OpenDownloadStream(coverID)
	if downloadErr != nil {
		log.Printf("panicking")
		log.Printf(downloadErr.Error())
		
	}
	for true {
		fileBytes := make([]byte, 1024)
		if _, err := downloadStream.Read(fileBytes); err != nil {
			log.Printf(err.Error())
			return
		}

		c.Data(http.StatusOK, "image/png", fileBytes)
	}
}

func getChildren(c *gin.Context) {
	layerID, _ := primitive.ObjectIDFromHex(c.Query("layerid"))

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
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

func searchLayer(c *gin.Context) {
	name := c.Query("search");
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Printf("panicking2");
			panic(err)
		}
	}()
	coll := client.Database("songDB").Collection("layers")
	filter := bson.D{{"name", primitive.Regex{Pattern: name, Options: ""}}}
	var resultsArray []Layer
	searchResult, err := coll.Find(context.TODO(), filter)
	if err != nil {
		log.Printf(err.Error())
		c.JSON(http.StatusOK, gin.H{"Error": "No Results Found"});
		return
	}
	searchResult.All(context.TODO(), &resultsArray);
	c.JSON(http.StatusOK, gin.H{"searchResults": resultsArray})
	return
}
