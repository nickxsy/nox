import type { IncomingMessage, ServerResponse } from "node:http";
import { Nox } from "../../src/http/server";

const app = new Nox();

app.get("/users", (req, res) => {
  res.end("Users");
});

async function getPosts(req: IncomingMessage, res: ServerResponse) {
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

app.listen(8000);
