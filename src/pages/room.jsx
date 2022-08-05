import React, { useRef, useContext,useEffect,useState } from 'react';
import axios from "axios";
import $ from 'jquery';
import Noty from 'noty';
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/metroui.css"; 
import '../styles/home.css'
import {SocketContext} from '../socket';
import { useSearchParams,useNavigate } from 'react-router-dom';

export default function Home() {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const room = useRef(null);

    useEffect(() => {
        socket.emit('getroomid', (response)=> {
            room.current=response.room;
            if(room.current===null)
                navigate("../", { replace: true });
        });
    },[socket,navigate]);

    
    function copy() {
        let link = 'localhost:3000?room='+room.current;
        navigator.clipboard.writeText(link);
      }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6'>Waiting Room</div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <button onClick={ copy }>Copy URL</button>
                </div>
            </div>
        </div>
    );
}