<template>
  <h1> </h1>
  <FullCalendar id = "calendar" :options="calendarOptions" :events="events" />
  
  
  <div class = "modal-bg">
    <div class = "modal">
    <h2>Please input event details</h2>
    <label for = "eventName">Name of Medical Appointment: </label>
    <input type = "text" id = "eventName" required><br><br>
    <label for="time">Time of Medical Appointment:</label>
    <input type="time" id="time" required>
    <br><br>
    <button @click ="submitAddEvent"> Save Event </button >
    <span class = "modal-close">X</span>
    </div>
  </div>
  
</template>

<script>

import firebaseApp from "../firebase.js";
import {  getFirestore, deleteDoc } from '@firebase/firestore'; //Querysnapshot
import { doc, setDoc, collection, getDocs } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp)



import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid" 
import listPlugin from "@fullcalendar/list"



export default {

    
  components: {
        FullCalendar // make the <FullCalendar> tag available
    },
  data() {
        return {

          id : 1,
          selectInfo : "",
          calendarOptions: {
            plugins: [ dayGridPlugin, interactionPlugin,timeGridPlugin, listPlugin ],
            initialView: 'dayGridMonth',
            selectable:true,
            selectMirror: true,
            dayMaxEvents: false,
            eventDisplay : "block",
            editable : true,
            eventLimit : true,
            select: this.handleDateSelect,
            eventClick: this.handleEventClick,
            eventsSet: this.handleEvents,
            contentHeight: 'auto',

            height : 600,
            weekends : true,
            headerToolbar : {left : "prev, next today", center : "title", right : "dayGridMonth, dayGridWeek, listDay"},
            events : this.getEvents 
            },         
        }
    },

    methods : {
      async submitAddEvent() {
      var time = document.getElementById("time").value;
      var name = document.getElementById("eventName").value;
      console.log(time);
      console.log(name);
      
      //access userid

      console.log("hihi")
      const auth = getAuth();
      this.user = auth.currentUser.email;
        console.log("hihi")
        let start1 = this.selectInfo.startStr + " " + time;
        let end1 = this.selectInfo.endStr;
        console.log(start1)
  
  
 
       //const date = selectInfo.startStr;
       let title1 = name;
        
        let event = {title : title1, end : end1, start : start1};
        // initialise event with title, id and start date

        // primary key is the event name (must be unique)
        let key = this.user + ".date"
       try{
          const docRef = await setDoc(doc(db, key, title1),event)
          console.log(docRef)
          }
          
          catch(error) {
            console.error("Error adding to firebase!!! ", error)
        }


       let calendarApi = this.selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title1) {
        calendarApi.addEvent({
          id: this.id+=1,
          title : title1,
          start: this.selectInfo.startStr + " " + time,
          end: this.selectInfo.endStr,
          allDay: this.selectInfo.allDay
        })
      }

      var modalBg = document.querySelector(".modal-bg")
      modalBg.classList.remove("bg-active")
      alert("Event Added to Calendar!")
      modalBg.classList.remove("bg-active")
        document.getElementById("calendar").style.visibility = "visible"
    },
        async getEvents() {
                let eventList = []
                const auth = getAuth();
                this.user = auth.currentUser.email;

                let key = this.user + ".date"
                try{
                    let z = await getDocs(collection(db, key))
                    z.forEach((docs) => {
                        let yy = docs.data()
                        console.log(yy.title)
                        console.log(yy.id)
                        console.log(yy.start)
                        let obj = {start : yy.start, title : yy.title, id : yy.id}
                        eventList.push(obj)
                    })
                } 
                 catch (error){
                    console.error(error)
                 }
            return eventList
        },

        isValidDate(dateString) {
        var regEx = /^\d{4}-\d{2}-\d{2}$/;
        return dateString.match(regEx) != null;
      },

        
   

    async handleDateSelect(selectInfo) { /////////////////
        console.log(selectInfo)
        this.selectInfo = selectInfo
        console.log(this.selectInfo)
      // copy the rest of the properties into submit button function
      var modalBg = document.querySelector(".modal-bg")
      function displayModal(){
        modalBg.classList.add("bg-active");
        document.getElementById("calendar").style.visibility = "hidden"
      }
      displayModal()
      window.scrollTo(0, 0);
      var modalClose = document.querySelector(".modal-close")
      modalClose.addEventListener("click", function () {
        modalBg.classList.remove("bg-active")
        document.getElementById("calendar").style.visibility = "visible"
      })

  
      
      
    },
    async handleEventClick(clickInfo) {


      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        let key = this.user + ".date"
        try {
          await deleteDoc(doc(db, key, clickInfo.event.title))
        } catch (error) {
          console.error("Error deleting from firebase! ", error)
        }
        clickInfo.event.remove()
      }
    },
        
    },

    created() {
      //this.getEvents() ;
    },

    
  
}



</script>


<style>
.modal-bg{
  position : fixed;
  width : 100%;
  height : 100vh;
  top : 0;
  left : 0;
  background-color : rgba(0,0,0,0.5);
  display : flex;
  justify-content: center;
  align-items: center;
  visibility : hidden;
  opacity : 0;
  transition : visibility 0s,  opacity 0.5s;
}
.modal {
  position : relative;
  font-family: "Montserrat", sans-serif;
  background-color: white;
  width : 30%;
  height : 40%;
  display : flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}
.bg-active {
  visibility : visible;
  opacity : 1;
}

.modal button {
  padding : 10px 30px;
  background-color : #2980b9;
  color : white;
  border :none;
  font-family: "Montserrat", sans-serif;
  cursor : pointer
}
.modal-close {
  position : absolute;
  top : 10px;
  right : 10px;
  font-weight: bold;
  cursor : pointer;
}

.fc-event-time, .fc-event-title {
padding: 0 0px;
white-space: normal;
}
.fc-day-grid-event > .fc-content {
   white-space: nowrap;
   overflow: hidden;
}
.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child) {
  display : none
}
</style>