package main
import (
	"github.com/gin-gonic/gin"
)
func Routes(router *gin.Engine){
	router.POST("/api/login", Login)
	router.POST("/api/signup", Signup)
}

