package main
import (
	"github.com/gin-gonic/gin"
)

func main() {
	Connect()

	r:= gin.Default()

	Routes(r)

	r.Run(":3000")
}


