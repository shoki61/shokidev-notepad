<template>
    <div class="container-fluid">

        <div class="containerForm">
          <input class="inputTitle" placeholder="title..." type="text" v-model="title">
          <textarea  class="description" placeholder="description..." v-model="text"></textarea>
          <div class="buttonContainer">
            <button class="btn" @click="push" >Save</button>
          </div>
        </div>
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
  .containerForm{
    width: 50%;
    padding: 20px 50px;
    box-shadow: 2px 2px 4px 0 #c7c7c7;
    border-radius: 5px;
    margin: auto;
    background-color: #fff;
  }
  .buttonContainer{
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: flex-end;
  }
    .container-fluid{
        min-height: 100vh;
        padding-top: 150px;
    }
    .inputTitle{
        display: block;
        width: 100%;
        border:none;
        border-bottom:2px solid #d9d9d9;
        outline: none;
        padding:0px 5px;
        background-color: transparent;
        font-size: 25px;
        margin-bottom: 35px;
        color:#5e5e5e;
        transition: color 1s ease-in-out;
        letter-spacing: 1px;
    }
    ::placeholder{
        transition: color .3s ease-in-out;
    }
    input:focus::placeholder{
        color:transparent;
    }
    input:focus{
        border-bottom: 2px solid #0eede2;
    }
    textarea:focus::placeholder{
        color:transparent;
    }
  textarea:focus{
    border:1px solid #0eede2;
  }
    .description{
        display:block;
        border:1px solid #d9d9d9;
        color:#5e5e5e;
        outline: none;
        resize: none;
        font-size: 20px;
        letter-spacing: 1px;
        width: 100%;
        height: 120px;
        border-radius: 5px;
        padding:10px  15px;
    }
    .btn{
        color:#fff;
        letter-spacing: 1px;
      border-radius: 3px;
        background-color: #2adb9a;
      width: 140px;
      height: 45px;
    }
    .btn:focus{
        outline: none!important;
        box-shadow: none!important;
    }
    .btn:hover{
        background-color: #26c98e;
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
