<template>

    <span>Today's Blood Pressure: <b>{{ bpdisplay }}</b></span><br><br>
    <span>Today's Weight: <b>{{ wgdisplay }}</b></span><br><br>

    <select v-model="health">
    <option value=""></option>
    <option>Blood Pressure</option>
    <option>Weight</option>
    <option>Both</option>
    </select><br><br>

    <div v-if="health=='Blood Pressure'">
        <label for="bpinput">Enter Your Blood Pressure Today: </label>
        <input type="number" id="bpinput" v-model.lazy="savedbp" required>
        <button id = "bpsave" type = "button" @click = "savetofb($event, this.bpdoc, this.savedbp, 'Blood Pressure')"><b>Save</b></button><br><br>
    </div>

    <div v-if="health=='Weight'">
        <label for="wginput">Enter Your Weight Today: </label>
        <input type="number" id="wginput" v-model.lazy="savedwg" required>
        <button id = "wgsave" type = "button" @click = "savetofb($event, this.wgdoc, this.savedwg, 'Weight')"><b>Save</b></button><br><br>
    </div>

    <div v-if="health=='Both'">
        <label for="bpinput">Enter Your Blood Pressure Today: </label>
        <input type="number" id="bpinput" v-model.lazy="savedbp" required><br><br>
        <label for="wginput">Enter Your Weight Today: </label>
        <input type="number" id="wginput" v-model.lazy="savedwg" required><br><br>
        <button id = "bsave" type = "button" @click = "save($event, this.bpdoc, this.wgdoc, this.savedbp, this.savedwg);"><b>Save</b></button><br><br>
    </div>

    <select v-model="selected">
    <option value=""></option>
    <option>Blood Pressure</option>
    <option>Weight</option>
    <option>Both</option>
    </select><br><br>

    <div v-if="selected=='Blood Pressure'">
        <h1>{{selected}} Line Chart</h1>
        <line-chart class = 'user' width =500px :data = "bp"> </line-chart>
    </div>

    <div v-if="selected=='Weight'">
        <h1>{{selected}} Line Chart</h1>
        <line-chart class = 'user' width =500px :data = "bp"> </line-chart>
    </div>

    <div v-if="selected=='Both'">
        <h1>Blood Pressure Line Chart</h1>
        <line-chart class = 'user' width =500px :data = "bp"> </line-chart>
        <h1>Weight Line Chart</h1>
        <line-chart class = 'user' width =500px :data = "wg"> </line-chart>
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
            bp: {},
            wg: {},
            bpdoc: doc(db, "HealthStatus", "BloodPressure"),
            wgdoc: doc(db, "HealthStatus", "Weight"),
            savedbp:"",
            savedwg:"",
            selected:"",
            bpdisplay:"",
            wgdisplay:"",
            health:""
        }
    },
    methods:{
        async updateMe() {
            let z = await getDoc(this.bpdoc);
            console.log(z.data());

            //this.bp = {'Monday': Math.random()*5, 'Tuesday': 5, 'Wednesday': Math.random()* 5, 'Thursday': 5, 'Friday':6};                            
            this.bp = z.data();
        },
        async savetofb(event, doc, value, message) {

            let isExecuted = confirm("Do You Want To Save Today's " + message + " To Firebase?");
 
            if (isExecuted) {
                try {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const docRef = await setDoc(doc, {[date]: value}, {merge: true});
                    console.log(docRef);
                    //this.bpdisplay = null;
                    //this.$emit("added");
                }
                catch(error) {
                    console.error("Error adding document: ", error);
                }
            }
            this.savedbp = "";
            this.savedwg = "";
            alert("Saved Successfully");
            this.display();
        },

        async save(event, bpdoc, wgdoc, bpvalue, wgvalue) {
            let isExecuted = confirm("Do You Want To Save Today's Blood Pressure and Weight To Firebase?");
 
            if (isExecuted) {
                try {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const docRef1 = await setDoc(bpdoc, {[date]: bpvalue}, {merge: true});
                    const docRef2 = await setDoc(wgdoc, {[date]: wgvalue}, {merge: true});
                    console.log(docRef1, docRef2);
                    //this.bpdisplay = null;
                    //this.$emit("added");
                }
                catch(error) {
                    console.error("Error adding document: ", error);
                }
            }
            this.savedbp = "";
            this.savedwg = "";
            alert("Saved Successfully");
            this.display();
        },
        async display() {
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let z = await getDoc(this.bpdoc);
            let y = await getDoc(this.wgdoc);
            this.bp = z.data();
            if (z.data() === undefined) {
                alert("You have no past data of blood pressure");
                this.bp = {};
                this.bpdisplay = "-";
            } else {
                if (z.data()[date] === undefined) {
                    this.bpdisplay = "-";
                }
                this.bpdisplay = z.data()[date];
            }
            

            this.wg = y.data();
            if (y.data() === undefined) {
                alert("You have no past data of weight");
                this.wg = {};
                this.wgdisplay = "-";
            } else {
                if (y.data()[date] === undefined) {
                    this.wgdisplay = "-";
                }
                this.wgdisplay = y.data()[date];
            }
        }
    },
    beforeMount() {
        this.display();
    }
}
</script>

<style scoped>
.user {
    margin: auto;
    border: 3px solid grey;
}
</style>