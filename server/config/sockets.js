module.exports = function(io){
    io.on('connection', onConnection);
    // let host = false;
    function onConnection(socket){
        console.log("Connection received ",socket.id);
        // if(!host){
        //     host = socket.id;
        //     io.to(socket.id).emit('DrawOrNot');
        // }
        socket.on('joinroom',(roomid)=>{
            socket.join(roomid);
            const arr = Array.from(socket.rooms);
            console.log(arr[1]);
        });

        socket.on('getroomid',(callback)=>{
            const arr = Array.from(socket.rooms);
            console.log(arr[1]);
            if(arr[1]===undefined){
                callback({
                    room: null
                });
            }else{
                callback({
                    room: arr[1]
                });
            }
            
            // io.to(socket.id).emit('hereisroom',arr[1]);
        })

        socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
        socket.on('disconnect',()=>{
            // if(socket.id === host)
            //     host = false
            console.log("Connection Disconnected " + socket.id);
        })
    }
}