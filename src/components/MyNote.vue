<template>
    <h2 id = "noteheader">Add New Note</h2>
    <br>
    <div class = "container">
        
        <form id="myform">
            
            <div class = "formli" id="form">
                <input type="text" id="title" placeholder="Enter title" v-model ="a"><br>
                <textarea placeholder="Enter description" type="text" id="content" autocomplete="off" v-model="b"></textarea>
                <div class="save">
                    <button id="savebutton" type="button" @click="savetofs()">Save Note</button>
                </div>

            </div>
            
        </form>
    </div>
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
  font-family: 'Noto Sans';
  border-bottom-color: rgb(202, 202, 202);
}
#content{
  width: 70%;
  min-height: 70px;
  padding:0 10px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid #000;
  font-size: 18px;
  font-family: 'Noto Sans';
  border-top-style:none;
  text-align: left;
  color: #000;
  margin-bottom: 5px;
  border-radius: 0;
}

#savebutton {
 
  display: inline-block;
  background-color: #373E47;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color:#ADBAC7;
  border: 1px solid #444c56;
  font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 0.25rem;
  padding: .75rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

#savebutton:hover,
#savebutton:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: white;
}

#savebutton:hover {
  transform: translateY(-1px);
}

#savebutton:active {
  background-color: rgba(0, 0, 0, 0.15);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
