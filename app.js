const express = require("express");
const app = express();
const path = require("path");
// const fs = require("fs");
// const { createServer: createViteServer } = require("vite");

// async function createServer() {
//   const vite = await createViteServer({
//     server: { middlewareMode: 'ssr'}
//   });
//   app.use(vite.middlewares)

//   app.use("*", async (req, res) => {
//     res.render(__dirname, "index");
    // const url = req.originalUrl;

    // try {
    //   let template = fs.readFileSync(
    //     path.resolve(__dirname, "C:/Users/David/Desktop/firstThree/firstThree/index.html"),
    //     "utf-8"
    //   )
    //     template = await vite.transformIndexHtml(url, template);

    //     const { render } = await vite.ssrLoadModule("/public/index.js");

    //     const appHtml = await render(url);

    //     const html = template.replace(`<!--ssr-outlet-->`, appHtml);

    //     res.status(200).set({ "Content-Type": "text/html "}).end(html);
    // } catch (e) {
    //   vite.ssrFixStacktrace(e);
    //   console.error(e);
    //   res.status(500).end(e.message)
    // }

//   });
// }

// createServer();/

app.use(express.static(__dirname = "public"));

app.get("*", (req, res) => {
  res.render(__dirname, "index.html")
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));

