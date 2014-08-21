binary-stream
=============

A stream of binary values separated by a fixed length header,
containing the chunk size. So you can stream a list of binary
values. 

See [node-binary](https://github.com/substack/node-binary) for details.

## serialize

```javascript
    var binaryStream= require('binary-stream'),
        bin= binaryStream.serialize();

    bin.pipe(process.stdout);

    bin.write(new Buffer('andrea','utf8'));
    bin.write(new Buffer(Array(100).join('andrea'),'utf8'));
    bin.write(new Buffer('elena','utf8'));
    bin.end();
```

## deserialize

```javascript
    var binaryStream= require('binary-stream');

    process.stdin.pipe(binaryStream.deserialize())
                 .on('data',function (data)
                 {
                    console.log(data.toString('utf8'));
                 });
```

