const fs = require('fs')

function copyLargeFile(){
    const output = './zero'
    const fileSize =  2 * 1024 * 1024 * 1024
    const readSize = 1024
    let progress = 0
    const readStrem = fs.createReadStream('/dev/zero', { end: fileSize, highWaterMark: readSize })
        .on('close', () => {
            console.log('\n copy done');
        })
        .on('error', (err) => {
            console.error(err);
        })
        .on('data', (data) => {
            progress = (progress * fileSize + data.byteLength) / fileSize
            process.stdout.write(`${(progress * 100).toPrecision(4)}% \r`)
        })
    const writeStream = fs.createWriteStream(output)
    readStrem.pipe(writeStream)
}

copyLargeFile()