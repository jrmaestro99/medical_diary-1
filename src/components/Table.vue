<template>
    <div id="header"><b>My Reminders</b></div>
    <table id="table">
    <tr>
    <th>Medication</th>
    <th>Function</th>
    <th>Dosage</th>
    <th>Taken Today?</th>
    </tr>
    </table>
    <br><br>
    <button id = "addbutton" type = "button" @click = "createReminder()"><b>Add Reminder</b></button>
    <button id = "savebutton" type = "button" @click = "savetofs()"><b>Save Changes</b></button>
</template>

<script>
import firebaseApp from "../firebase.js";
import { getDocs, getFirestore, deleteDoc } from '@firebase/firestore';
import { doc, setDoc, collection } from "firebase/firestore"; //collection, getDoc
const db = getFirestore(firebaseApp)

export default {
  name: "Table",

  mounted() {
    async function display() {
        let z = await getDocs(collection(db, "Reminders"));
        //print(z)
        let index = 1;
        z.forEach((docs) => {
          let yy = docs.data();
          var table = document.getElementById("table");
          var row = table.insertRow(index);
          var medName = (yy.MedicineName);
          var medFunction = (yy.Function);
          var medDosage = (yy.Dosage);
          var cell1 = row.insertCell(0); var cell2 = row.insertCell(1); var cell3 = row.insertCell(2);
          var cell4 = row.insertCell(3);

          cell1.innerHTML = medName;
          cell2.innerHTML = medFunction;
          cell3.innerHTML = medDosage;

          //creating checkbox
          var checkBox = document.createElement("input");
          checkBox.type = "checkbox";
          checkBox.id = "checkBox";
          cell4.appendChild(checkBox);

          //creating delete button for each reminder
          var cell5 = row.insertCell(4);
          var deleteButton = document.createElement("button");
          deleteButton.id = "deleteButton";
          deleteButton.innerHTML = "Delete";
          deleteButton.onclick = function(){
                confirmDelete(String(medName))
            }
          cell5.appendChild(deleteButton);

          index += 1;
        })
    }
    display()
    this.showReminder()

    async function delReminder(reminder) {
      await deleteDoc(doc(db, "Reminders", reminder))
      console.log("deleted ", reminder);
      let table = document.getElementById("table");
      while (table.rows.length > 1){
        table.deleteRow(1)
      }
      display()
    }

    async function confirmDelete(reminder) {
      let isConfirmed = confirm("Delete this reminder?")
      if (isConfirmed) {
        delReminder(reminder)
      }
    }

  },
  methods: {
    showReminder() {
      alert("Have you taken your medicine?")
    },
    async createReminder() {
      let table = document.getElementById("table")
      var row = table.insertRow(-1);
      var cell1 = row.insertCell();
      var cell2 = row.insertCell();
      var cell3 = row.insertCell();
      var cell4 = row.insertCell();
      cell4.innerHTML = "";
      // var cell5 = row.insertCell();
      // Creating empty fields for when user clicks "add reminder" button
      var medName = document.createElement("input");
      medName.type = "text";
      medName.id = "medname";
      medName.placeholder = "Enter Medicine Name"
      var medFunction = document.createElement("input");
      medFunction.type = "text";
      medFunction.id = "medfunction";
      medFunction.placeholder = "Enter Medicine Function"
      var medDosage = document.createElement("input");
      medDosage.type = "text";
      medDosage.id = "meddosage";
      medDosage.placeholder = "Enter Required Dosage"
      
      cell1.appendChild(medName);
      cell2.appendChild(medFunction);
      cell3.appendChild(medDosage);

    },
    async savetofs() {
    var medDosage=document.getElementById("meddosage").value;
    var medFunction=document.getElementById("medfunction").value;
    var medName=document.getElementById("medname").value;
    alert("Saving your reminder");

    try{
      const docRef = await setDoc(doc(db, "Reminders", medName),{
        Function:medFunction, Dosage: medDosage, "MedicineName": medName,
      })
      console.log(docRef)
        this.$emit("added")
      }
      catch(error) {
        console.error("Error adding document: ", error);
      }
      location.reload();
    }
  } 
}
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
