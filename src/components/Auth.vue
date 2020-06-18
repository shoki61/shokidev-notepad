<template>
    <div>
        <div class="containerDiv">
            <div class="card card-primary p-3 ">
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <input v-model="email"
                               @blur="$v.email.$touch()"
                               type="email"
                               placeholder="e-mail...">
                    </div>
                    <div class="form-group">
                        <input v-model="password"
                               @blur="$v.password.$touch()"
                               :class="{'borderLogin' : isUser, 'borderSignup' : !isUser,'border-danger' : $v.password.$error}"
                               type="password"
                               placeholder="password...">

                    </div>
                    <div class="button-container ">
                        <button type="submit"
                                :class="{'loginButton' : isUser, 'signupButton' : !isUser }"
                                class="btn mt-5">
                            {{isUser ?'Log in':'Sign up'}}
                        </button><br>
                        <a href="#" @click.prevent="isUser=!isUser">
                            {{isUser ?"I'm not a member" : "I'm a member"}}
                        </a>
                        <div v-if="showDangerMessage" class="dangerContainer">
                            <i style="color:#ff4545;font-size: 35px" class="fas fa-exclamation-circle"></i>
                            <span class="dangerMessage">Incorrect e-mail or password!</span>
                        </div>
                    </div>
                </form>
            </div>
          <img height="550px" width="550px" src="/src/noteImg.png" alt="">
        </div>

    </div>
</template>


<script>
    import axios from "axios"
    import {required, email, numeric, minLength, maxLength} from "vuelidate/lib/validators"
    export default {
        data(){
            return{
                email: null,
                password: null,
                isUser: false,
                showDangerMessage:false
            }
        },
        methods : {
            onSubmit(){
                let apiKey= "AIzaSyBK3Y6NAZV-mLMg02obchWySe2aDa28O7o";
                let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=";
                if(this.isUser) {
                    url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
                }
                axios.post(url+apiKey,
                        {email : this.email, password : this.password, returnSecureToken : true}
                ).then(response=>{
                        localStorage.setItem("token",response.data.localId);
                        this.$store.commit("setToken",response.data.localId );
                        this.$router.push("/");
                }).catch(()=>{
                    this.showDangerMessage = true
                    setTimeout(()=>{
                        this.showDangerMessage=false
                    },5000)
                });

            }
        },
        validations : {
            email : {
                required,
                email,
            },
            password : {
                required,
                numeric,
                minLength : minLength(6),
                maxLength : maxLength(12)
            },
        }
    }
</script>

<style scoped>
    .containerDiv{
        width: 100%;
        padding-top: 100px;
        height: 100vh;
        background:url("/src/homeBackImg.png") no-repeat center center;
      background-size:cover;
      display: flex;
    }
    input:focus{
        box-shadow:none;
        outline: none;
    }
    .dangerContainer{
        margin-top: 20px;
        align-items: center;
        display: flex;
    }
    .dangerMessage{
        font-size: 17px;
        color: #fff;
        margin-left: 10px;
    }
    .loginButton{
        background-color: #37bfed !important;
        color:#fff;
    }
    .signupButton{
        background-color:#21cc6b !important;
        color:#fff;
    }
    .card{
        background-color: transparent!important;
        border: none;
      margin-top: 140px;
      width: 50%!important;
      padding-left: 150px!important;
    }
    input{
        background-color: transparent;
        box-shadow: none;
        border:1px solid #fff !important;
        padding:10px;
        border-radius: 5px;
        font-size: 20px;
        color:#fff;
        width: 400px;
    }
    a{
        font-size: 20px;
        padding:0!important;
        color:#ededed!important;
    }
    button:focus{
        box-shadow: none!important;
    }
    button{
        outline: none!important;
        width: 400px;
        height: 55px;
        border-radius: 5px!important;
        font-size: 20px;
        margin-bottom: 15px;
    }
    small{
        font-size: 15px;
    }
    ::placeholder{
      color:#ededed
    }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        .containerDiv{
            width: auto;
        }
        .card{
            width: 750px!important;
            margin:auto;
            margin-top: 180px;
        }
        span{
            font-size: 65px;
        }
        input{
            font-size: 48px;
            display: block;
            width: 100%;
        }
        small{
            font-size: 35px;
        }
        button{
            font-size: 45px;
            border-radius: 10px;
        }
        a{
            font-size: 40px;
            margin-top: 20px;
        }


    }
</style>
