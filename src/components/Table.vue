<template>
<h2><u>My Reminders</u></h2>
<div id="tablebg">
<table id="table">
  <tr>
    <th>Medication</th>
    <th>Function</th>
    <th>Dosage</th>
    <th>Taken Today?</th>
    <!-- two headers for edit and delete -->
    <th></th>
    <th></th>
  </tr>
</table>
</div>
  
    <!-- <div class="container">
      <ul class="responsive-table">
        <li class="table-header">
          <div class="col col-1">Medication</div>
          <div class="col col-2">Function</div>
          <div class="col col-3">Dosage</div>
          <div class="col col-4">Taken Today?</div>
        </li>
      </ul>
    </div> -->

</template>

<script>
import firebaseApp from "../firebase.js";
import { getDocs, getFirestore, deleteDoc } from '@firebase/firestore';
import { doc, setDoc, collection } from "firebase/firestore"; //collection, getDoc, 
import { getAuth } from "firebase/auth";
const db = getFirestore(firebaseApp)

export default {
  name: "Table",

  mounted() {
      const auth = getAuth();
      this.user = auth.currentUser.email;

      async function display(user) {
      let z = await getDocs(collection(db, user))
        let index = 1;
        let tb = document.getElementById("table");
        while (tb.rows.length > 1){
            tb.deleteRow(1)
        }
        z.forEach((docs) => {
          let yy = docs.data();
          //try using await or then
          var table = document.getElementById("table");
          var row = table.insertRow(index);
          row.id = "row"
          //css of row 

          var styleRow = document.createElement('style');
          styleRow.type = 'text/css';
          styleRow.innerHTML = '#row { background-color: rgb(242, 250, 255);' + 'border-bottom: 5px solid #22272e;' + 'height: 45px;}'
          document.head.appendChild(styleRow);

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
          deleteButton.onclick = function() {
           confirmDelete(String(medName), user);
          };
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
                editReminder(medName, medFunction, medDosage, cell1, cell2, cell3, cell6)
            }
          cell6.appendChild(editButton);
          index += 1;
        })
        tb.deleteRow(1)
        tb.deleteRow(1)
      }
      display(String(this.user))

      async function delReminder(reminder, user) {
        await deleteDoc(doc(db, user, reminder))
        console.log("deleted ", reminder);
        let table = document.getElementById("table");
        while (table.rows.length > 1){
          table.deleteRow(1)
        }
        display(user)
        }
      
      async function confirmDelete(reminder, user) {
        let isConfirmed = confirm("Delete this reminder?")
        if (isConfirmed) {
            delReminder(reminder, user)
        }
      }

    async function editReminder(medName, medFunction, medDosage, cell1, cell2, cell3, cell6) {
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
      //newMedName.width = 20;

      var newMedFunction = document.createElement("input");
      newMedFunction.value = medFunctionData;
      newMedFunction.id = "newmedfunction";
      //newMedFunction.width = 20;

      var newMedDosage = document.createElement("input");
      newMedDosage.value = medDosageData;
      newMedDosage.id = "newmeddosage";
      //newMedDosage.width = 10;
      //delete old cell1, cell2 and cell3 
      cell1.innerHTML = "";
      cell2.innerHTML = "";
      cell3.innerHTML = "";
      cell6.innerHTML = "";
      //change the specific row to the new input fields
      cell1.appendChild(newMedName) 
      cell2.appendChild(newMedFunction)
      cell3.appendChild(newMedDosage)

      var saveButton = document.createElement("button");
      saveButton.id = "saveButton";
      saveButton.innerHTML = "Save";
      var styleSave = document.createElement('style');
      styleSave.type = 'text/css';
      styleSave.innerHTML = '#saveButton { background-color: #FFFFFF;' + 'border: 1px solid rgb(209,213,219);' + 'border-radius: .5rem;'
          + 'box-sizing: border-box;' + 'color: #111827;'
          + 'font-family: "Inter var",ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";' + 'font-size: .875rem;'
          + 'font-weight: 600;' + 'line-height: 0.25rem;' + 'padding: .75rem 1rem;' 
          + 'text-align: center;' + 'text-decoration: none #D1D5DB solid;' + 'text-decoration-thickness: auto;' 
          + 'box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);' + 'cursor: pointer;' + 'user-select: none;' + '-webkit-user-select: none;' + 'touch-action: manipulation; }'
      document.head.appendChild(styleSave);      
      cell6.appendChild(saveButton)
      saveButton.onclick = function(){
        savechanges()
      }

    }

    async function savechanges() {
      const auth = getAuth();
      const user = auth.currentUser.email;
        var newMedName=document.getElementById("newmedname").value;
        var newMedDosage=document.getElementById("newmeddosage").value;  
        var newMedFunction=document.getElementById("newmedfunction").value;
        alert("Saving your reminder");

        try{
          const docRef = await setDoc(doc(db, user, newMedName),{
          Function:newMedFunction, Dosage: newMedDosage, "MedicineName": newMedName,
          })
          console.log(docRef)
          }
          catch(error) {
            console.error("Error adding document: ", error);
          }
        display(user);
    }
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
/* #tablebg {
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 20px;
  border-color: black;
} */
table {
    margin-left: auto;
    margin-right: auto;
    width: 95%;
    /* align-self: center; */
    /* border-collapse: collapse; */
    border-radius: 0.25em;
    border-collapse: collapse;
    margin: 1em;
    align-self: center;
    background-color: rgb(60, 85, 102);
}
th {
    /* border: 1px solid black; */
    border-bottom: 5px solid #22272e;
    padding: 10px;
    border-radius: 20px;
    background-color: none;
    align-self: center;
    /* border: none; */
}
</style>