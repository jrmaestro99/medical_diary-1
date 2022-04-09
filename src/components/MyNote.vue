<template>
    <h2 id = "noteheader">Add New Note</h2>
    <br>
    <div class = "container">
        
        <form id="myform">
            
            <div class = "formli" id="form">
                <input type="text" id="title" placeholder="Enter title" required v-model ="a"><br>
                <textarea placeholder="Enter description" type="text" id="content" autocomplete="off" v-model="b"></textarea>
                <div class="save">
                    <button id="savebutton" type="button" @click="savetofs()">Save Note</button>
                </div>
              
              <hr>
              
            </div>
            
        </form>
    </div>
    <br>
    <h2 id = "noteheader2">My Notes</h2>
</template>
    

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore" 
import {getAuth} from "firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    data() {
        return{
            a:"", 
            b:"",  
            user:""
        }
    },
    methods: {
        async savetofs() {
            const auth = getAuth();
            this.user = auth.currentUser.email;
            // var a = document.getElementById("title").value
            // var b = document.getElementById("content").value
            var c = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            var d = new Date()
            try{
                var notecollection  = String(this.user)+'.notes';
                const docRef = await setDoc(doc(db, notecollection, this.a), {
                title: this.a, content: this.b, dateandtime: c, timeStamp: d
                })
                console.log(docRef)
                document.getElementById("myform").reset();
                this.$emit("added")
            }
            catch(error) {
                alert("Please fill in title.")
                console.error("Error adding note", error);
            }
        }
    }    
}
</script>

<style scoped>
.container {
  max-width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0;
  
}

#title{
  width: 70%;
  min-height: 50px;
  padding:0 10px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid #000;
  font-size: 18px;
  /* font-family: 'Noto Sans'; */
  border-bottom-color: rgb(202, 202, 202);
  font-weight: bold;
}
#content{
  width: 70%;
  min-height: 70px;
  padding:0 10px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid #000;
  font-size: 18px;
  /* font-family: 'Noto Sans'; */
  border-top-style:none;
  text-align: left;
  color: #000;
  margin-bottom: 10px;
  border-radius: 0;
}

#savebutton {
    background-color: #373E47;
    border-radius: 5px;
    /* font-family: 'Noto Sans'; */
    padding: 0.5rem;
    margin: 1.5rem;
    color:#ADBAC7;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border: 1px solid #444c56;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
}

#savebutton:hover {
  background-color: #444c56;
}

#savebutton:hover {
  transform: translateY(-1px);
}
</style>
