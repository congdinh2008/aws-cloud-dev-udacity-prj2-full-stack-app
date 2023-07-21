import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { deleteLocalFiles, filterImageFromURL, validateURL } from "./helpers/util";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send('try GET /filteredimage?image_url={{}}');
});

// @TODO1 IMPLEMENT A RESTFUL ENDPOINT
// GET /filteredimage?image_url={{URL}}
// endpoint to filter an image from a public url.
// IT SHOULD
//    1
//    1. validate the image_url query
//    2. call filterImageFromURL(image_url) to filter the image
//    3. send the resulting file in the response
//    4. deletes any files on the server on finish of the response
// QUERY PARAMATERS
//    image_url: URL of a publicly accessible image
// RETURNS
//   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
/**************************************************************************** */

app.get("/filteredimage", async (req: Request, res: Response) => {
  const image_url: any = req.query.image_url;
  if (typeof image_url == "undefined" || !validateURL(image_url)) {
    return res
      .status(422)
      .send({ message: "Unable to process the requested image url." });
  }
  const filteredpath: string = await filterImageFromURL(image_url);

  return res.status(200).sendFile(filteredpath, async () => {
    await deleteLocalFiles([filteredpath]);
  });
});

//! END @TODO1

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  console.log(`press CTRL+C to stop server`);
});