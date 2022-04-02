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
import { getAuth } from "firebase/auth";
//import func from 'vue-editor-bridge';
const db = getFirestore(firebaseApp)

export default {
  name: "Table",

  mounted() {
    const auth = getAuth();
    this.user = auth.currentUser.email;
    async function display(user) {
        let z = await getDocs(collection(db, user));
        let tb = document.getElementById("table");
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

          var styleDelete = document.createElement('style');
          styleDelete.type = 'text/css';
          styleDelete.innerHTML = '#deleteButton { background-color: #FFFFFF;' + 'border: 1px solid rgb(209,213,219);' + 'border-radius: .5rem;'
          + 'box-sizing: border-box;' + 'color: #111827;'
          + 'font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";' + 'font-size: .875rem;'
          + 'font-weight: 600;' + 'line-height: 0.25rem;' + 'padding: .75rem 1rem;' 
          + 'text-align: center;' + 'text-decoration: none #D1D5DB solid;' + 'text-decoration-thickness: auto;' 
          + 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);' + 'cursor: pointer;' + 'user-select: none;' + '-webkit-user-select: none;' + 'touch-action: manipulation; }'

          document.head.appendChild(styleDelete);

          deleteButton.onclick = function(){
                confirmDelete(String(medName), user)
            }
          cell5.appendChild(deleteButton);

          var cell6 = row.insertCell(4);
          var editButton = document.createElement("button");
          editButton.id = "editButton";
          editButton.innerHTML = "Edit";

          var style = document.createElement('style');
          style.type = 'text/css';
          style.innerHTML = '#editButton { background-color: #FFFFFF;' + 'border: 1px solid rgb(209,213,219);' + 'border-radius: .5rem;'
          + 'box-sizing: border-box;' + 'color: #111827;'
          + 'font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";' + 'font-size: .875rem;'
          + 'font-weight: 600;' + 'line-height: 0.25rem;' + 'padding: .75rem 1rem;' 
          + 'text-align: center;' + 'text-decoration: none #D1D5DB solid;' + 'text-decoration-thickness: auto;' 
          + 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);' + 'cursor: pointer;' + 'user-select: none;' + '-webkit-user-select: none;' + 'touch-action: manipulation; }'

          document.head.appendChild(style);

          editButton.onclick = function(){
                editReminder(medName, medFunction, medDosage, cell1, cell2, cell3)
            }
          cell6.appendChild(editButton);

          index += 1;
          
        })
        tb.deleteRow(1)
    }
    display(String(this.user))
    this.showReminder()

    async function delReminder(reminder, user) {
      await deleteDoc(doc(db, user, reminder))
      console.log("deleted ", reminder);
      let table = document.getElementById("table");
      while (table.rows.length > 1){
        table.deleteRow(1)
      }
      display(String(user))
    }

    async function confirmDelete(reminder, user) {
      let isConfirmed = confirm("Delete this reminder?")
      if (isConfirmed) {
        delReminder(reminder, user)
      }
    }

  //edit entry should get the doc data from the fs based on medname which is the key

    async function editReminder(medName, medFunction, medDosage, cell1, cell2, cell3) {
      const auth = getAuth();
      const user = auth.currentUser.email;      
      //getting all the previous data in the fields
      var medNameData = medName;
      //medNameData.id = "mednametodelete"
      var medFunctionData = medFunction;
      var medDosageData = medDosage;
      //deleting original entry in preparation of creating new one
      deleteDoc(doc(db, user, medNameData));
      //creating new fields
      var newMedName = document.createElement("input");
      newMedName.value = medNameData;
      newMedName.id = "newmedname";
      var newMedFunction = document.createElement("input");
      newMedFunction.value = medFunctionData;
      newMedFunction.id = "newmedfunction";
      var newMedDosage = document.createElement("input");
      newMedDosage.value = medDosageData;
      newMedDosage.id = "newmeddosage";
      //delete old cell1, cell2 and cell3 
      cell1.innerHTML = "";
      cell2.innerHTML = "";
      cell3.innerHTML = "";
      //change the specific row to the new input fields
      cell1.appendChild(newMedName) 
      cell2.appendChild(newMedFunction)
      cell3.appendChild(newMedDosage)
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
      // var cell5 = row.insertCell();
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

      //testing to create a new textbox on click
      medName.onclick = document.createElement("input");
      cell1.appendChild(medName);
      cell2.appendChild(medFunction);
      cell3.appendChild(medDosage);

    },

    async savetofs() {

      const auth = getAuth();
      this.user = auth.currentUser.email;

      if (document.getElementById("medname") != null) { //if table cell is not null
        var medName=document.getElementById("medname").value;
        var medDosage=document.getElementById("meddosage").value;  
        var medFunction=document.getElementById("medfunction").value;
        alert("Saving your reminder");

        try{
          const docRef = await setDoc(doc(db, String(this.user), medName),{
          Function:medFunction, Dosage: medDosage, "MedicineName": medName,
          })
          console.log(docRef)
          }
          catch(error) {
            console.error("Error adding document: ", error);
          }
        //location.reload();
      } else { //if the original table cell;s entry has been deleted and is now null     
        var newMedDosage=document.getElementById("newmeddosage").value;
        var newMedFunction=document.getElementById("newmedfunction").value;
        var newMedName=document.getElementById("newmedname").value;
        alert("Saving your reminder");

        try{
          const docRef = await setDoc(doc(db, String(this.user), newMedName),{
          Function:newMedFunction, Dosage: newMedDosage, "MedicineName": newMedName,
          })
          console.log(docRef)
            //this.$emit("added")
          }
          catch(error) {
            console.error("Error adding document: ", error);
          }
        location.reload();
      }
    },
  } 
}
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,latin-ext);
* {
    font-family: 'Noto Sans';
}
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




#addbutton {
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 0.25rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* #addbutton:hover {
  background-color: rgb(249,250,251);
}

#addbutton:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

#addbutton:focus-visible {
  box-shadow: none;
} */

#savebutton {
  background-color: #FFFFFF;
  border: 1px solid rgb(209,213,219);
  border-radius: .5rem;
  box-sizing: border-box;
  color: #111827;
  font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: .875rem;
  font-weight: 600;
  line-height: 0.25rem;
  padding: .75rem 1rem;
  text-align: center;
  text-decoration: none #D1D5DB solid;
  text-decoration-thickness: auto;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

/* #savebutton:hover {
  background-color: rgb(249,250,251);
}

#savebutton:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

#savebutton:focus-visible {
  box-shadow: none;
} */
</style>
