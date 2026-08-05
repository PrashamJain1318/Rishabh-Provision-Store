import { app } from "./app";

const PORT = Number(process.env.PORT) || 5001;

const server = app.listen(PORT, () => {
  console.log(`[Server] Rishabh Provision Store API listening on http://localhost:${PORT}`);
});

server.on("error", (err: any) => {
  if (err.code === "EADDRINUSE") {
    const ALT_PORT = PORT + 1;
    console.log(`[Server] Port ${PORT} in use, trying ${ALT_PORT}...`);
    app.listen(ALT_PORT, () => {
      console.log(`[Server] Rishabh Provision Store API listening on http://localhost:${ALT_PORT}`);
    });
  } else {
    console.error("[Server] Error:", err);
  }
});
