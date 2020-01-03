<template>
    <div>
        <div class=" mt-5 containerDiv">
            <div class="card card-primary p-3 ">
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <span>Your E-mail</span>
                        <input v-model="email"
                               @blur="$v.email.$touch()"
                               type="email"
                               :class="{'borderLogin' : isUser, 'borderSignup' : !isUser,'border-danger' : $v.email.$error}"
                               placeholder="e-mail...">

                        <small v-if="!$v.email.required" class="text-danger" >required</small>
                        <small v-if="!$v.email.email" class="text-danger" >please enter a valid e-mail</small>

                    </div>
                    <div class="form-group">
                        <span>Your Password</span>
                        <input v-model="password"
                               @blur="$v.password.$touch()"
                               :class="{'borderLogin' : isUser, 'borderSignup' : !isUser,'border-danger' : $v.password.$error}"
                               type="password"
                               placeholder="password...">
                        <small v-if="!$v.password.required" class="text-danger" >required</small>
                        <small v-if="!$v.password.numeric" class="text-danger" >password should become numbers only!</small>
                        <small v-if="!$v.password.minLength" class="text-danger" >
                            your password should be at least {{$v.password.$params.minLength.min}} digits
                        </small>
                        <small v-if="!$v.password.maxLength" class="text-danger" >
                            your password should be maximum  {{$v.password.$params.maxLength.max}} digits
                        </small>
                    </div>
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit"
                                :disabled="$v.$invalid"
                                :class="{'loginButton' : isUser, 'signupButton' : !isUser }"
                                class="btn btn-block mb-2">
                            {{isUser ?'Log in':'Sign up'}}
                        </button>
                        <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
                            {{isUser ?"I'm not a member" : "I'm a member"}}
                        </a>
                    </div>
                </form>
            </div>

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
        width: 400px;
        margin: auto;
        min-height: 90vh;
    }
    input:focus{
        box-shadow:none;
        outline: none;
    }
    .border-red{
        border:none;
        border-bottom:2px solid #ff0010 !important;
    }
    .loginButton{
        background-color: #c12eff !important;
        color:white;
    }
    .signupButton{
        background-color: #00ad00 !important;
        color:white;
    }
    .card{
        background-color: transparent!important;
        border: none;
        font-family: sans-serif !important;
        color: #555555;
        font-size: 17px;
    }
    .borderLogin{
        border:none;
        border-bottom:2px solid #c12eff;
    }
    .borderSignup{
        border: none;
        border-bottom:2px solid #00ad00
    }
    input{
        background-color: transparent;
        box-shadow: none;
        border-radius: 0;
        font-size: 15px;
        display: block;
        width: 100%;
    }
    input:focus{
        background-color: transparent;
    }
    a{
        text-decoration: underline;
    }
    button:focus{
        box-shadow: none!important;
    }
    button{
        outline: none!important;
    }
    .loginButton:hover{
        background-color: #8a2ec1!important;
    }
    .signupButton:hover{
        background-color: #007e00 !important;
    }
    small{
        font-size: 15px;
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