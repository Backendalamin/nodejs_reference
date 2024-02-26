//imagine having a big file of data, reading it all at once 
//ismt effecient, its like instead of carrying whole sand 
//from a lorry, grab it bucket by bucket 

const fs = require('fs')
const path = require('path')


const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'), {encoding: 'utf8'})

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'newlorem.txt'))

// rs.on('data', (dataChunk) => {
//     ws.write(dataChunk)
// })

//better way
rs.pipe(ws)