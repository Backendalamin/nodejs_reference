const fs = require("fs");//there are different kinds of streams like readable, writable, duplex, transform
(async () => {
  try {
    const filename = "cpu.txt";
    if (fs.existsSync(filename)) {
      const readableStream = fs.createReadStream(filename);
      readableStream.on("data", (chunk) => {
        console.log(chunk.toString());
      });
      readableStream.on("end", (chunk) => {
        console.log("stream completed reading");
      });
      readableStream.on("error", (chunk) => {
        console.log("Error", error);
      });
    } else {
      await fs.createWriteStream(filename, JSON.stringify(cpuInfo));
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
})();
