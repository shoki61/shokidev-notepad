<template>
    <div align="center" class="container-fluid">

        <input class="inputTitle" placeholder="Title..." type="text" v-model="title">
        <textarea rows="1" cols="50" class="description" placeholder="Description..." v-model="text"></textarea>
        <button class="btn" @click="push" :disabled="$v.$invalid">Save</button>
    </div>
</template>

<script>
    import axios from "axios"
    import {required} from "vuelidate/lib/validators"
    export default {
        data(){
            return{
                title : "",
                text : ""
            }
        },
        methods : {
            push(){
                axios.post("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+".json",
                    {title:this.title,text:this.text,date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()}
                ).then(response=> {
                    this.$router.push("/notes");
                })

            }
        },
        validations : {
            title : {
                required
            },
            text : {
                required
            }
        }

    }
</script>

<style scoped>
    .container-fluid{
        min-height: 100vh;
        padding-top: 40px;
    }
    .inputTitle{
        display: block;
        width: 300px;
        border:none;
        border-bottom:1px solid grey;
        outline: none;
        padding:5px;
        background-color: transparent;
        text-align: center;
        font-size: 30px;
        margin-bottom: 35px;
        color: #ff4d00;
        transition: color 1s ease-in-out;
        letter-spacing: 1px;
    }
    ::placeholder{
        color:grey;
        font-size: 25px;
        transition: color .3s ease-in-out;
    }
    input:focus::placeholder{
        color:transparent;
    }
    input:focus{
        border-bottom: 1px solid #ff4d00;
    }
    textarea:focus::placeholder{
        color:transparent;
    }
    .description{
        display:block;
        border:none;
        background-color: transparent;
        border-bottom:1px solid grey;
        outline: none;
        resize: none;
        font-size: 20px;
        text-align: center;
        letter-spacing: 1px;
        padding-bottom: 10px;
    }
    .btn{
        border:1px solid #ff4000;
        color:#ff4000;
        margin-top: 40px;
        border-radius: 5px;
        letter-spacing: 1px;
    }
    .btn:focus{
        outline: none!important;
        box-shadow: none!important;
    }
    .btn:hover{
        background-color: #ff4d00;
        color: #e9e9e9;
    }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        .inputTitle{
            font-size: 65px;
            margin-top: 110px;
            width: 600px;
            border-bottom: 2px solid grey;
        }
        .description{
            font-size: 55px;
            width: 800px;
            border-bottom: 2px solid grey;
        }
        .btn{
            font-size: 45px;
            padding: 15px 30px;
            border-radius: 10px;
        }
        ::placeholder{
            font-size: 48px;
        }
    }
</style>