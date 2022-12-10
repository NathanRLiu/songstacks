package main
import (
	"github.com/gin-gonic/gin"
)
func Routes(router *gin.Engine){
	router.POST("/api/login", Login)
	router.GET("/api/login", LoginGet)
	router.GET("/api/logout", Logout)
	router.POST("/api/signup", Signup)
	router.POST("/api/layer/create", createLayer)
	router.GET("/api/layer/get/", getLayer)
	router.GET("/api/layer/getChildren", getChildren)
	router.GET("/api/layer/playSong", playSong)
	router.GET("/api/layer/search", searchLayer)
	router.GET("/api/layer/getCover", getCover)
}

