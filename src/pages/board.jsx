import React, { useRef, useContext,useEffect,useState } from 'react';
import CanvasDraw from "react-canvas-draw";
import {SocketContext} from '../socket';
import '../styles/board.css'
const Board = () => {
    const socket = useContext(SocketContext);
    const [color,setColor]=useState("#000000");
    const [brushRadius,setradius]=useState(10);
    const [candraw,setdraw]=useState(false);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        try {
            socket.on('DrawOrNot', () => {
                    setdraw(true)
            });
            socket.on('drawing',(data)=>{
                const x = canvasRef.current;
                x.loadSaveData(data,true);
            })
            
        } catch (error) {
          console.log(error);
        }
    }, [socket]);

    const updatedraw = ()=>{
        const x = canvasRef.current.getSaveData();
        socket.emit('drawing',x);
    }

    const set0 = ()=>{
        setColor("#000000")
    }
    const set1 = ()=>{
        setColor("#ff0000")
    }
    const set2 = ()=>{
        setColor("#00ff00")
    }
    const set3 = ()=>{
        setColor("#0000ff")
    }
    const set4 = ()=>{
        setColor("#ffff00")
    }
    const undo = ()=>{
        canvasRef.current.undo()
    }
    const clall = ()=>{
        canvasRef.current.eraseAll()
    }
    return (
        <div className='container'>

            <div className='row align-items-center justify-content-center'>
                <div className='col canvasc'>
                {candraw
                    ?<CanvasDraw
                        ref={canvasRef}
                        hideGrid
                        onChange = {updatedraw}
                        brushRadius = {brushRadius}
                        brushColor = {color}
                        style={{
                            cursor:'none',
                            width:'100%',
                            height:'100%',
                            boxShadow:
                            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                    />
                    :<CanvasDraw
                        ref={canvasRef}
                        disabled
                        hideGrid
                        hideInterface
                        style={{
                            width:'100%',
                            height:'100%',
                            boxShadow:
                            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
                        }}
                    />
                }
                </div>
            </div>
            {candraw && 
                <div className='row align-items-center justify-content-center'>
                    <div className='col-1 buttonDiv black'
                        onClick={set0}
                    ></div>
                    <div className='col-1 buttonDiv red'
                        onClick={set1}
                    ></div>
                    <div className='col-1 buttonDiv green'
                        onClick={set2}
                    ></div>
                    <div className='col-1 buttonDiv blue'
                        onClick={set3}
                    ></div>
                    <div className='col-1 buttonDiv yellow'
                        onClick={set4}
                    ></div>
                    <div className='col-1 buttonDiv other'
                        onClick={() => setradius(brushRadius+5)}
                    >+</div>
                    <div className='col-1 buttonDiv other'
                        onClick={() => {
                            if(brushRadius>5)
                                setradius(brushRadius-5)
                        }}
                    >-</div>
                    <button className='col-1 buttonDiv'
                        onClick={undo}
                    >Undo</button>
                    <button className='col-1 buttonDiv'
                        onClick={clall}
                    >EraseAll</button>
                </div>
            }
            
        </div>
    );
};
export default Board;