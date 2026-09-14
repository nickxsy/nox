import type { IncomingMessage, ServerResponse } from "node:http";
import { Nox } from "../../src/http/server.js";
import { URL, URLSearchParams } from "node:url";

const app = new Nox();

app.get("/users", (req, res) => {
  res.end("Users");
});

async function getPosts(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url!, "http://localhost");
  const params = new URLSearchParams(req.url);
  console.log(url, params);
  res.end(
    JSON.stringify([
      {
        id: 1,
        title: "Post title 1",
      },
      {
        id: 2,
        title: "Post title 2",
      },
    ]),
  );
}

async function createPost(req: IncomingMessage, res: ServerResponse) {
  res.end(
    JSON.stringify([
      {
        id: 1,
        title: "Post title 1",
      },
      {
        id: 2,
        title: "Post title 2",
      },
    ]),
  );
}

app.get("/posts", getPosts);
app.post("/posts", createPost);

app.listen(8000);
