const os = require("os");
const fs = require("fs");
// console.log(os)
//return alot of objects like cpu, hostnames , etc
console.log(os.cpus()); //returns all cpus
const cpuInfo = os.cpus();
// if (fs.existsSync("cpu.txt")) {
//   fs.readFile("cpu.txt", (err, DATA) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(DATA.toString());
//     }
//   });
// } else {
//   fs.writeFile("cpu.txt", JSON.stringify(cpuInfo), (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

//lets put this code inside an immedietly invoked function
// (() => {})()
(async () => {
  try {
    if (fs.existsSync("cpu.txt")) {
      const data = await fs.promises.readFile("cpu.txt");
      console.log(data.toString());
    } else {
      await fs.promises.writeFile("cpu.txt", JSON.stringify(cpuInfo));
    }
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
})();
