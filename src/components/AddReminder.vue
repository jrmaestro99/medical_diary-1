<template>
  <div class="container">
      <form id="myform">
          <h2 id="header">Add New Reminder</h2>
          <br>

          <div class="formlist">
                <label for = "medicine name"> <h3>Medicine : </h3> </label>
                <input type = "text" id="medname" required="" placeholder="E.g. Vitamin C">
                <br><br>
                <label for = "medicine function"> <h3>Function : </h3> </label>
                <input type = "text" id="medfunction" required="" placeholder="E.g. Boost immunity">
                <br><br>
                <label for = "medicine dosage"> <h3>Dosage : </h3> </label>
                <input type = "text" id="meddosage" required="" placeholder="E.g. Twice a day">
                <br><br>

                <div class="save">
                    <button id="saveButton" type="button" @click="savetofs()"> Save Reminder </button>
                </div>
          </div>
      </form>
  </div>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from '@firebase/firestore';
import { doc, setDoc } from "firebase/firestore"; //collection, getDoc
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp)

export default {
    data(){
        return{
            medName:"", medDosage:"", medFunction:""
        }
    },
    mounted() {
        this.showReminder()
    },

    methods : {
        showReminder() {
            alert("Have you taken your medicine today?")
        },

        async savetofs() {
            const auth = getAuth();
            this.user = auth.currentUser.email;
            let key = String(this.user) + '.medicine'
                var medName=document.getElementById("medname").value;
                var medDosage=document.getElementById("meddosage").value;  
                var medFunction=document.getElementById("medfunction").value;
                alert("Saving your reminder");

                try{
                const docRef = await setDoc(doc(db, key, medName),{
                Function:medFunction, Dosage: medDosage, MedicineName: medName, Taken: false
                })
                document.getElementById('myform').reset();
                console.log(docRef)
                this.$emit("added")
                }
                catch(error) {
                    console.error("Error adding document: ", error);
                }
        }
    }
}

</script>

<style scoped>

.container {
    margin-right: 50px;
}

#myform {      
    text-align: center;
    align-items: center;
    margin: auto;
}

label{
    display: inline-block;
    text-align: right;
    width: 100px;
}

input{
    width: auto;
    margin-left: 10px;
}

#saveButton{
  display: inline-block;
  background-color: #373E47;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color:#ADBAC7;
  border: 1px solid #444c56;
  /* font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; */
  font-size: .875rem;
  font-weight: 600;
  line-height: 0.25rem;
  padding: 1rem;
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
#saveButton:hover,
#saveButton:focus {
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  color: white;
}

#saveButton:hover {
  transform: translateY(-1px);
}

#saveButton:active {
  background-color: rgb(202, 202, 202);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
  color: rgba(0, 0, 0, 0.65);
  transform: translateY(0);
}
</style>