var binary= require('binary'),
    es= require('event-stream');

exports.serialize= function ()
{
    var s= es.through(function (data)
           {
                var len = new Buffer(4);
                len.writeInt32LE(data.length, 0);
                this.emit('data',len); 
                this.emit('data',data); 
           },
           function ()
           {
                var len = new Buffer(4);
                len.writeInt32LE(-1, 0);
                this.emit('data',len); 
                this.emit('end'); 
           });

    return s;
};

exports.deserialize= function ()
{
    var s= es.through();

    return es.duplex(binary()
                     .loop(function (end,vars)
                     {
                         this.word32ls('size')
                             .tap(function (vars)
                             {
                                if (vars.size==-1)
                                {
                                  end();
                                  s.end();
                                }
                                else
                                  this.buffer('val',vars.size)
                                      .tap(function (vars)
                                      {
                                         
                                         s.write(vars.val);
                                      });
                             });
                     }),s);
};
