<template>

    <input type="number" id="bpinput" placeholder="Enter Your Blood Pressure Today" v-model.lazy="bpdisplay">
    <button id = "save" type = "button" @click = "savebptofb()"><b>Save</b></button><br><br>

    <select v-model="selected">
    <option value="">Please select one</option>
    <option>BloodPressure</option>
    <option></option>
    </select>,<br><br>

    <span>Selected: {{ selected }}</span>

    <div v-if="selected=='BloodPressure'">
    <h1>Line Chart</h1>
    <button @click="updateMe()">Click to update the Line chart</button>
    <line-chart class = 'user' width =500px :data = "bp"> </line-chart>
    </div>

</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from '@firebase/firestore';
import { doc, setDoc, getDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export default {
    name:'Chart',
    data(){
        return{
            // {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2, 'Thursday': 5, 'Friday':6},artdata: 
            bp: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2, 'Thursday': 5, 'Friday': 6},
            selected:"",
            bpdisplay:null,
        }
    },
    methods:{
        async updateMe() {
            let bpdoc = doc(db, "HealthStatus", "BloodPressure");
            let z = await getDoc(bpdoc);
            console.log(z.data());

            this.bp = {'Monday': Math.random()*5, 'Tuesday': 5, 'Wednesday': Math.random()* 5, 'Thursday': 5, 'Friday':6};                            
        },
        async savebptofb() {

            let isExecuted = confirm("Are you sure to save today's blood pressure : "+(this.bpdisplay) + "?");
 
            if (isExecuted && this.bpdisplay != null) {
                try {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const bloodPressure = doc(db, "HealthStatus", "BloodPressure");
                    const docRef = await setDoc(bloodPressure, {[date]: this.bpdisplay}, {merge: true});
                    console.log(docRef);
                    this.bpdisplay = null;
                    //this.$emit("added");
                }
                catch(error) {
                    console.error("Error adding document: ", error);
                }
            }
        }
    }
}
</script>

<style scoped>
.user {
    margin: auto;
    border: 3px solid grey;
}
</style>