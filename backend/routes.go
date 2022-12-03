package main
import (
	"github.com/gin-gonic/gin"
)
func Routes(router *gin.Engine){
	router.POST("/api/groups/create", CreateGroup)
	router.POST("/api/events/join", EventJoin)
	router.POST("/api/events/leave", EventLeave)
	router.POST("/api/events/add", AddEvent)
	router.GET("/api/groups/info", ViewGroup)
}

