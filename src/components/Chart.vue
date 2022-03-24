<template>

    <span>Daily Blood Pressure: <b>{{ bpdisplay }}</b></span><br><br>
    <span>Daily Weight: <b>{{ wgdisplay }}</b></span><br><br>

    <label for="healthinput">Choose what you want to input: </label>
    <select id="healthinput" v-model="health">
    <option value=""></option>
    <option>Blood Pressure</option>
    <option>Weight</option>
    <option>Both</option>
    </select><br><br>

    <div class="input" v-if="health=='Blood Pressure'">
        <label for="bpinput">Blood Pressure Today </label>
        <input type="number" id="bpinput" v-model.lazy="savedbp" required><br><br>
        <button id = "bpsave" type = "button" @click = "savetofb($event, this.bpdoc, this.savedbp, 'Blood Pressure')"><b>Save</b></button><br><br>
    </div>

    <div class="input" v-if="health=='Weight'">
        <label for="wginput">Weight Today </label>
        <input type="number" id="wginput" v-model.lazy="savedwg" required><br><br>
        <button id = "wgsave" type = "button" @click = "savetofb($event, this.wgdoc, this.savedwg, 'Weight')"><b>Save</b></button><br><br>
    </div>

    <div class="input" v-if="health=='Both'">
        <label for="bpinput">Blood Pressure Today </label>
        <input type="number" id="bpinput" v-model.lazy="savedbp" required><br>
        <label for="wginput">Weight Today </label>
        <input type="number" id="wginput" v-model.lazy="savedwg" required><br><br>
        <button id = "bsave" type = "button" @click = "save($event, this.bpdoc, this.wgdoc, this.savedbp, this.savedwg);"><b>Save</b></button><br><br>
    </div>

    <br>
    <label for="graphinput">Choose graph: </label>
    <select id="graphinput" v-model="selected">
    <option value=""></option>
    <option>Blood Pressure</option>
    <option>Weight</option>
    <option>Both</option>
    </select><br><br>

    <div v-if="selected=='Blood Pressure'">
        <h1>{{selected}} Line Chart</h1>
        <line-chart id="bpchart" class='user' width=500px :data="bpfilter"> </line-chart><br>
        <input type="checkbox" id="bpcheckbox" value="true" v-model="filter" @change="filterby">
        <label for="bpcheckbox">show only the past 7 days</label>
    </div>

    <div v-if="selected=='Weight'">
        <h1>{{selected}} Line Chart</h1>
        <line-chart id="wgchart" class='user' width=500px :data="wgfilter"> </line-chart>
        <input type="checkbox" id="bpcheckbox" value="true" v-model="filter" @change="filterby">
        <label for="bpcheckbox">show only the past 7 days</label>
    </div>

    <div v-if="selected=='Both'">
        <h1>Blood Pressure Line Chart</h1>
        <line-chart id="bpchart" class='user' width=500px :data="bpfilter"> </line-chart><br>
        <h1>Weight Line Chart</h1>
        <line-chart id="wgchart" class='user' width=500px :data="wgfilter"> </line-chart>
        <input type="checkbox" id="bpcheckbox" value="true" v-model="filter" @change="filterby">
        <label for="bpcheckbox">show only the past 7 days</label>
    </div>

</template>

<script>
import firebaseApp from "../firebase.js";
import { getFirestore } from '@firebase/firestore';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getFirestore(firebaseApp);

export default {
    name:'Chart',
    data(){
        return{
            // {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2, 'Thursday': 5, 'Friday':6},artdata: 
            bp: {},
            wg: {},
            bpfilter: {},
            wgfilter: {},
            filter: false,
            // bpdoc: doc(db, "HealthStatus", "BloodPressure"),
            // wgdoc: doc(db, "HealthStatus", "Weight"),
            bpdoc: null,
            wgdoc: null,
            savedbp:"",
            savedwg:"",
            selected:"",
            bpdisplay:"",
            wgdisplay:"",
            health:""
        }
    },
    beforeMount() {
        const auth = getAuth();
        this.bpdoc = doc(db, auth.currentUser.email, "BloodPressure");
        this.wgdoc = doc(db, auth.currentUser.email, "Weight"); 
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;
                this.bpdoc = doc(db, auth.currentUser.email, "BloodPressure");
                this.wgdoc = doc(db, auth.currentUser.email, "Weight"); 
            }
        });
        this.display();
    },
    methods:{
        async savetofb(event, doc, value, message) {

            let isExecuted = confirm("Do You Want To Save Today's " + message + " To Firebase?");
 
            if (isExecuted) {
                try {
                    let today = new Date();
                    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                    const docRef = await setDoc(doc, {[date]: value}, {merge: true});
                    console.log(docRef);
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
            this.bpfilter = this.bp;
            if (z.data() === undefined) {
                alert("You have no past data of blood pressure");
                this.bp = {};
                this.bpfilter = {};
                this.bpdisplay = "-";
            } else {
                if (z.data()[date] === undefined) {
                    this.bpdisplay = "-";
                }
                this.bpdisplay = z.data()[date];
            }
            
            
            this.wg = y.data();
            this.wgfilter = this.wg;
            if (y.data() === undefined) {
                alert("You have no past data of weight");
                this.wg = {};
                this.wgfilter = {}
                this.wgdisplay = "-";
            } else {
                if (y.data()[date] === undefined) {
                    this.wgdisplay = "-";
                }
                this.wgdisplay = y.data()[date];
            }
        },
        filterby() {
            if (this.filter) {
                let today = new Date();
                let ago = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));

                var tempbp = Object.assign({}, this.bp);
                var tempwg = Object.assign({}, this.wg);
                for (const property in tempbp) {
                    if (new Date(property) < ago) {
                        delete tempbp[property];
                    }
                }
                for (const property in tempwg) {
                    if (new Date(property) < ago) {
                        delete tempwg[property];
                    }
                }

                this.bpfilter = tempbp;
                this.wgfilter = tempwg;
            } else {
                this.bpfilter = this.bp;
                this.wgfilter = this.wg;
            }
        }
    }
}
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,latin-ext);
* {
    font-family: 'Noto Sans';
}
.user {
    margin: auto;
    border: 3px solid grey;
}

.input {
    margin: auto;
    width: 60%;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 5px 1.5px;
}

.input label {
    display: inline-block;
    text-align: right;
    width: 30%;
    font-weight: bold;
    font-size: 14px;
}

.input input {
    display: inline-block;
    text-align: left;
    margin: 10px;
}

span {
    font-size: 1.4rem;
    font-weight: bold;
}

label {
    font-weight: bold;
    font-size: 16px;
}


</style>