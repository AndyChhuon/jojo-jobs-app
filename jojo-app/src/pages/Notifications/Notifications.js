import "./Notifications.less";
import React, { useEffect, useState, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import jojoLogo from "../../Images/jojo-black.png";
import { LinkContainer } from "react-router-bootstrap";
import { gapi } from "gapi-script";
import { useLocation, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { userLogin } from "../../App";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";


export default function Notifications() {
//     const unreadMessages = document.querySelectorAll(".unread");
// const unread = document.getElementById("notifes");
// const markAll = document.getElementById("mark_all");
// unread.innerText=unreadMessages.length

// unreadMessages.forEach((message) => {
//     message.addEventListener("click", () => {
//         message.classList.remove("unread");
//         const newUnreadMessages = document.querySelectorAll(".unread");
//         unread.innerText = newUnreadMessages.length;
//     })
// })
// markAll.addEventListener("click", () => {
//     unreadMessages.forEach(message => message.classList.remove("unread"))
//     const newUnreadMessages = document.querySelectorAll(".unread");
//     unread.innerText = newUnreadMessages.length;
// })

  return (
    <div className="Notifications">
        <div class="container">
      <header>
        <div class="notif_box">
          <h2 class="title">Notifications</h2>
          <span id="notifes"></span>
        </div>
        <p id="mark_all">Mark all as read</p>
      </header>
      <main>
        <div class="notif_card unread">
    
          <div class="description">
            <p class="user_activity">
              <strong>Someone </strong> recently viewed your profile.
              
            </p>
            <p class="time">1m ago</p>
          </div>
        </div>
        <div class="notif_card unread">
    
          <div class="description">
            <p class="user_activity">
              <strong>You</strong> recently applied for this job.
              <b>Click here to view more details </b>
            </p>
            <p class="time">10m ago</p>
          </div>
        </div>

        
      
             
        </main>
    </div>
    </div>
    
  );
}
