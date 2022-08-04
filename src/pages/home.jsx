import React, { useRef, useContext,useEffect,useState } from 'react';
import axios from "axios";
import $ from 'jquery';
import Noty from 'noty';
import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/metroui.css"; 
import '../styles/home.css'
import {SocketContext} from '../socket';

const url = 'http://localhost:5000/nameroom';
export default function Home() {
  const socket = useContext(SocketContext);

  const getaroom = async (e) => {
    e.preventDefault();
    let nameroom = $('#nameroomForm');
    nameroom=nameroom.serialize();
    nameroom+=("&id="+socket.id)
    await axios({
      method: 'post',
      url: url,
      data: nameroom
    })
    .then((response) => {
      if(response.status === 200){
        if(response.data.room){
          new Noty({
            theme: 'metroui',
            text: response.data.message,
            type: 'success',
            layout: 'topRight',
            // timeout: 1500,
            // container: '.custom-container'
          }).show();
        }else{
          new Noty({
            theme: 'metroui',
            text: response.data.message,
            type: 'error',
            layout: 'topRight',
            // timeout: 1500,
            // container: '.custom-container'
          }).show();
        }
        
      }
    });
  }
    return (
      <div className='main'>
        <div className='container fluid'>
          <div className='row justify-content-center'>
            <div className='col text-center heading'>
              Pictionary
            </div>
          </div>
              
          <form id='nameroomForm' onSubmit={getaroom}>

            <div className='row justify-content-center'>
              <div className='col-8 text-center'>
                <input type="text" name='name' placeholder='Name' required/>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-8 text-center'>
                <input type="text" name="room" id="room" placeholder='Room Id'/>
              </div>
            </div>
            <div className='row justify-content-center'>
              <div className='col-8 text-center'>
                <button type="submit" >Submit</button>
              </div>
            </div>  
          </form>

          <div className='row justify-content-center'>
            <div className='col text-center'>
              Don't be the Sheldon of Game..
            </div>
          </div>
        </div>
      </div>
    );
}