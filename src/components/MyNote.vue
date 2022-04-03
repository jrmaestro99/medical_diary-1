<template>
    <div class = "container">
        <h1 id = "mainheader">Medical Diary</h1>
        <form id="myform">
            <h2 id ="header">your notes</h2>
            <div class = "formli" id="form">
                <input type="text" id="title" placeholder="add title"><br>
                <textarea type="text" id="content" placeholder="add description"></textarea> <br>
                <div class="save">
                    <button id="savebutton" type="button" @click="savetofs()">add note</button>
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
    // data() {
    //     return{
    //         title:"", 
    //         content:"",  
    //         fbuser:""
    //     }
    // },
    methods: {
        async savetofs() {
            const auth = getAuth();
            this.user = auth.currentUser.email;
            var a = document.getElementById("title").value
            var b = document.getElementById("content").value
            var c = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
            var d = new Date()
            try{
                const docRef = await setDoc(doc(db, String(this.user), a), {
                title: a, content: b, dateandtime: c, timeStamp: d
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
}
#mainheader {
    font-family:serif ;
  text-align: center;
  font-weight: 500;
  letter-spacing: 2px;
  margin-bottom: 30px;
}
#header {
  font-family:serif ;
  text-align: center;
  font-weight: 400;
  font-size: 32px;
  letter-spacing: 2px;
  margin-bottom: 30px;
}

#title{
  width: 70%;
  min-height: 50px;
  padding:0 10px;
  box-sizing: border-box;
  outline: none;
  border: 2px solid #000;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
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
  font-family: "Montserrat", sans-serif;
  border-top-style:none;
}

#savebutton {
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-flex;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  margin: 0;
  min-height: 3rem;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  position: relative;
  text-decoration: none;
  transition: all 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: baseline;
  width: auto;
}

#savebutton:hover,
#savebutton:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: rgba(0, 0, 0, 0.65);
}

#savebutton:hover {
  transform: translateY(-1px);
}

#savebutton:active {
  background-color: #F0F0F1;
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>
