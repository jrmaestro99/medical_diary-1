<template>

  <div style="text-align:center;" v-if="user">   

  <div> <h3> <strong> This is the profile page </strong> </h3> </div> 

  <div v-if="user">
    <div > 
      <img src="@/assets/logo.png" style="width:75px;height:75px;border-radius:50%;border:4px solid #333" /> 
    </div>

    <div>
        <div >
          <p> Name: <strong>{{user.displayName}}</strong><br/>
            Email:<strong>{{user.email}}</strong><br>
            Uid:<strong>{{user.uid}}</strong> <br>
            Provider: <strong>{{user.providerData[0].providerId}}</strong> </p>
        </div>
    </div>
  </div> 

<LogOut/>

</div>     


</template>

<script>
import LogOut from '@/components/Logout.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  name: 'Profile',

  components:{
    LogOut
  },

  data() {
      return {
          user: null,
      };
  },
  beforeCreate() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user;      
      }
    })  
  }
}

</script>