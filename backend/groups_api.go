package main
import (
        "net/http"
        "github.com/gin-gonic/gin"
	//"github.com/go-pg/pg/v9"
)
func groups_create(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
                "status":  200,
                "message": "Group Created",
        })
        return
}
func groups_join(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
                "status":  200,
		"message": "Group Joined: ",
        })
        return

}
