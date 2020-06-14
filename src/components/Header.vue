<template>
        <nav class="navbar navbar-expand-lg navbar-light">
            <router-link to="/" class="navbar-brand">
                <img height="45px" src="/src/logo.png" alt="logo">
                <span>notePad</span>
            </router-link>

            <a @click="logout" :class="logoutClass" class="nav-link" href="#">Log out</a>
        </nav>
</template>

<script>
    export default {
        methods : {
            logout(){
                this.$store.commit("clearToken");
                this.$router.push("/auth")
            },
        },
        computed : {
            logoutClass(){
                return{
                    'd-none' : !this.$store.getters.isAuth
                }
            }
        }
    }
</script>

<style scoped>
   .navbar{
       border-radius: 0!important;
       background-color: #2b2b2b;
       width: 100%;
       margin-bottom: 0!important;
       height: 65px;
       padding-left:30px;
     position: fixed;
     z-index: 35000;
   }
   .navbar-brand{
       display: flex!important;
       align-items: center!important;
   }
   .nav-link{
       position: absolute;
       right: 10px;
   }
   .nav-link{
       font-size:20px;
       color: #fff;
   }
   .nav-link:hover{
       color: #fff;
   }
    span{
        color: #fff;
        margin-left: 0px;
        font-size: 50px;
        font-family: Forte;
    }
   @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
     .navbar{
       height: 130px;
     }
     .fa-book{
       font-size: 70px;
     }
     span{
       font-size: 70px;
     }
     .navbar-brand{
       position: relative;
     }
     a{
       font-size: 45px!important;
     }
   }

</style>
