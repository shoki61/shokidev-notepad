<template>
    <div class="container-fluid">
            <router-link class="backButton" to="/notes">
                <img height="20" src="../backIcon.png"/>
            </router-link>
        <div class="containerDiv">
            <h1 class="title">{{lists.title}}</h1>
            <p class="description">{{lists.text}}</p>
            <p class="date">{{lists.date}}-{{lists.time}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                lists : ""
            }
        },
        created(){
            this.lists = JSON.parse(localStorage.getItem("note"))
        }
    }
</script>

<style scoped>
    .backButton{
        height: 50px;
        width: 50px;
        background-color: #ccc;
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        top:150px;
        left:200px;
        transition: background-color .2s ease-in-out;
    }
    .backButton:hover{
        background-color: #5c5c5c;
        box-shadow: 1px 1px 10px 0 grey;
    }
    .container-fluid{
        min-height: 100vh;
    }
    .containerDiv{
        margin: 150px auto auto;
        width: 550px;
    }
    .title{
        margin-bottom: 35px;
        color: #505050;
        border-bottom: 1px solid #636363;
        text-align: center;
        padding-bottom: 10px

    }
    .description{
        font-size:18px;
        color: #636363;
        margin-bottom: 50px;
    }
    .date{
        font-family: Bahnschrift,sans-serif;
        font-size: 12px;
        color:#636363;
        text-align: right;
    }

    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
         .title{
            font-size: 80px;
             text-align: center;
             border:none;
             margin-top:180px!important;
             margin-bottom:50px;
         }
        .description{
            font-size: 55px;
        }
        .date{
            font-size: 40px;
        }
    }
</style>
