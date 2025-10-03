import http from "http"
import app from "./server.ts"
import { cliError } from "./utils.ts"

let PORT = (process.env.PORT || 3000) as number

const server = http.createServer(app)
server.listen(PORT)


server.on("listening", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})


let retryCount = 5
server.on('error', (err) => {
  const e = err as NodeJS.ErrnoException;
  if (e.code === "EADDRINUSE") {
    console.error(`Port ${PORT} in use. Retrying on port ${++PORT}`)
    console.error(`Retries left: ${retryCount}`)

    retryCount-- > 0 ?
      setTimeout(() => {
        server.close()
        server.listen(PORT)
      }, 1000) :
      cliError("Couldn't find unused port", { hint: "Use another port address" })
  }
})

export default server;
