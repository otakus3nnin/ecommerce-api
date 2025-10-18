import http from "http";
import app from "./server.js";
import { cliError } from "./core/utils/misc.js";

let PORT = (process.env.PORT || 3000) as number;

const server = http.createServer(app);
server.listen(PORT);

server.on("listening", () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

let retryCount = 5;
server.on("error", (err) => {
  const e = err as NodeJS.ErrnoException;
  if (e.code === "EADDRINUSE") {
    console.error(`Port ${PORT} in use. Retrying on port ${++PORT}`);
    console.error(`Retries left: ${retryCount}`);

    if (retryCount-- > 0) {
      setTimeout(() => {
        server.close();
        server.listen(PORT);
      }, 1000);
    } else
      cliError("Couldn't find unused port", {
        hint: "Use another port address",
      });
  }
});

export default server;
