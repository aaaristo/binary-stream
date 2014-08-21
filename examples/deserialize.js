var binaryStream= require('..');

process.stdin.pipe(binaryStream.deserialize())
             .on('data',function (data)
             {
                console.log(data.toString('utf8'));
             });
