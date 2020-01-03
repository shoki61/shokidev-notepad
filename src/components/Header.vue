<template>
        <nav class="navbar navbar-expand-lg navbar-light">
            <router-link to="/" class="navbar-brand">
                <i class="fa fa-book"></i>
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
       background: rgb(249, 249, 249);
       width: 100%;
       border-bottom: 1px solid #ff4d00;
       margin-bottom: 0!important;
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
       font-size:17px;
       color: #626262;
   }
   .nav-link:hover{
       color: #4c4c4c;
   }
    i{
        font-size: 40px;
        color: #ff4d00;
    }
    span{
        color: #434343;
        margin-left: 5px;
        font-size: 28px;
    }
    .navbar-brand:hover span{
        color:#ff4d00
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