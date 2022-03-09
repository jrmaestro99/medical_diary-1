<template>
    <h2 id="header">My Reminders</h2>
    <table id="table">
    <tr>
    <th>Medication</th>
    <th>Function</th>
    <th>Dosage</th>
    <th>Checkbox</th>
    </tr>
    </table>
    <br><br>
    <button id = "addbutton" type = "button" @click = "createReminder()"><b>Add Reminder</b></button>
</template>

<script>
// import firebaseApp from "../firebase.js";
// import { getFirestore } from '@firebase/firestore';
// import { doc, setDoc, getDoc } from "firebase/firestore";

// const db = getFirestore(firebaseApp)
export default {
  name: "Table",
  methods: {
    showReminder() {
      alert("Have you taken your medicine?")
    },
  },
  beforeMount() {
    this.showReminder();
  },
};
</script>

<style scoped>
#header {
    text-align: center;
} 

table {
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    align-self: center;
    border-collapse: collapse;
}
th, td {
    border: 1px solid black
}
</style>
