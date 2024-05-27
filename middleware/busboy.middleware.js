const { randomFillSync } = require("crypto");
const busboy = require("busboy");
const fs = require("fs");
const path = require("path");

const random = (() => {
  const buf = Buffer.alloc(16);
  return () => randomFillSync(buf).toString("hex");
})();

const busboyUpload = (req, res, next) => {
  //1mb = 1048576 bytes in binary || 1000000 decimal
  const bb = busboy({
    headers: req.headers,
    limits: { fields: 2, fileSize: 1048576 * 10, files: 2, parts: 3 },
  });

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(mimeType, encoding, filename);
    console.log(__dirname);
    const saveTo = path.join(
      __dirname,
      "..",
      "images",
      `busboy-upload-${random()}.${mimeType.split("/")[1]}`
    );
    console.log(saveTo);

    file.pipe(fs.createWriteStream(saveTo));
    file
      .on("data", (data) => {
        // console.log(data);
        // const base64Data = Buffer.from(data).toString("base64");
        // console.log(base64Data);
        // fileStream.write(base64Data);
      })
      .on("close", () => {
        console.log("File uploaded successfully");
      });
  });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  bb.on("close", () => {
    console.log("Done parsing form!");
    // res.writeHead(303, { Connection: "close", Location: "/" });
    res.end();
  });
  req.pipe(bb);
  next();
};

module.exports = busboyUpload;
