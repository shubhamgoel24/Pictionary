const db = require('../config/firebase');
const rooms = db.collection('rooms');

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

module.exports.nameroom= async function(req,res){
    try{
        if(req.body.room){
            const doc=await rooms.doc(req.body.room).get();
            if(!doc.exists){
                return res.status(200).json({
                    room : false,
                    message: "Room Id Invalid"
                });
            }else{
                return res.status(200).json({
                    room : true,
                    message: req.body.room
                });
            }
            
        }
        if(!req.body.room){
            let id = makeid();
            const doc=await rooms.doc(id).get();
            if(doc.exists)
                id=makeid();
            try{
                const resp = await rooms.doc(id).set({
                    start : false,
                    host : req.body.id
                });
            }catch(err){
                return res.status(200).json({
                    room : false,
                    message: "Error Creating Room"
                });
            }
            return res.status(200).json({
                room : true,
                message: id
            });
        }
    }catch(err){
        console.log("Error:", err);
        return;
    }
    
}

// module.exports.joinroom= async function(req,res){
//     try{
//         const room=await rooms.doc(req.params.id).get();
//         if(room){
//             return res.status(200).json({
//                 room : true,
//                 message: req.params.id
//             });
//         }
//     }catch(err){
//         if(err){
//             console.log(err);
//         }
//         return res.status(200).json({
//             room : false,
//             message: "Invalid Room Id"
//         });
//     }
// }