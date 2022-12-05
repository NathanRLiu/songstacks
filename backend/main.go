package main
import (
	"github.com/gin-gonic/gin"
)

func main() {

	r:= gin.Default()

	r.MaxMultipartMemory = 10 << 20

	Routes(r)

	r.Run(":8000")
}


