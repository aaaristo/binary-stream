var binaryStream= require('..'),
    bin= binaryStream.serialize();

bin.pipe(process.stdout);

bin.write(new Buffer('andrea','utf8'));
bin.write(new Buffer(Array(100).join('andrea'),'utf8'));
bin.write(new Buffer('elena','utf8'));
bin.end();
