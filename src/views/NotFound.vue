<template>
  <div style="text-align:center;" v-if="user">
    <p id="notfoundtitle">4<font-awesome-icon id='erroricon' icon="circle-exclamation" size="2xs"/>4</p>
    <pre id="notfoundcontent" rows="5" cols="100">
        catch  ( <p id='error'>Error 404</p> )  {
            <p id='message'>message</p> = <p id='pagenotfound'>' Page Not Found '</p> ;
        }
    </pre><br>
    <button @click='redirect'> Home </button>
    <br>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
    name:"NotFound",
    data() {
        return {
            user:false,        
        }
    },
    methods: {
        redirect() {
            this.$router.push('/');
        }
    },
    beforeMount() {
        const auth = getAuth();      
        this.user = auth.currentUser;
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.user = user;      
            } else {
                this.$router.push('/login');
            }
        })
    }
}   
</script>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Noto+Sans:400,700,400italic,700italic&subset=latin,latin-ext);

#notfoundtitle, #notfoundcontent {
    color: #ADBAC7;
    font-family: 'Noto Sans';
    font-weight: bold;
}

div {
    margin-top: 4rem;
    text-align: center;
}

#notfoundtitle {
    font-size: 256px;
    color: #ec8f7a;
}

#erroricon {
    color:#b9c7d5;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
}

#notfoundcontent {
    background: none;
    display: inline-block;
    text-align: left;
    font-size: 20px;
}

#error {
    color:#E27178;
    display: inline;
}

#pagenotfound {
    color: #C3DB60;
    display: inline;
}

#message {
    color: #C776A4;
    display: inline;
}

button {
    background-color: #373E47;
    border-radius: 5px;
    font-family: 'Noto Sans';
    padding: 0.5rem;
    margin-top: 1.2rem;
    color:#ADBAC7;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border: 1px solid #444c56;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
}

button:hover {
    background-color: #444c56;
}
</style>