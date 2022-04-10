<template>
    <div id='login' style="text-align:center;">
        <div id="mainHeadLink" @click="main">
            <h1 id="mainHead">Medical Diary</h1>
        </div>
        <div id="firebaseui-auth-container"></div>
        <div id="pagecontent">
            Medical Diary is an app to keep track of your prescriptions and appointments. <br>
            Login to explore more.
        </div>
        <!-- <h5>copyright@cpp-2021</h5> -->
    </div>   
</template>

<script>
import firebase from '@/uifire.js'
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
    name:"Login",
    methods: {
        main() {
            this.$router.push('/');
        }
    },
    mounted() {
        
        var ui = firebaseui.auth.AuthUI.getInstance();
        console.log("first ui is",ui)
        if (!ui){
            ui = new firebaseui.auth.AuthUI(firebase.auth());
            console.log("Inside !ui is ", ui)
        }      

        var uiConfig = {
            signInSuccessUrl: '/about',
            // signInSuccessUrl: this.$router.replace("/profile"),
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                // firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
            ]
            
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>

<style scoped>

#firebaseui-auth-container{
  margin-top: 50px;;
  margin-bottom: 50px;;
}

#login {
    margin-top: 6rem;
}

#pagecontent{
    height: 100px;
    font-size: larger;
    font-weight: bolder;
    text-align: center;
    /* font-style: italic; */
    /* font-family: 'Noto Sans'; */
    color:#E5C6B3;
    font-size: 0.8rem;
    
}

#mainHead{
    text-align: center;
    /* font-family: 'Noto Sans'; */
    color:#E5C6B3;
    cursor: pointer;
}

#mainHead:hover{
    color:#fbe4d5;
}

#bg{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
}
</style>