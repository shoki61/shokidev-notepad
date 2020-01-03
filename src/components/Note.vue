<template>
    <div class="container-fluid">
        <div class="containerDiv">
            <h1 class="title">{{lists.title}}</h1>
            <p class="description">{{lists.text}}</p>
            <hr>
            <p class="date">{{lists.date}} <span>{{lists.time}}</span></p>
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
    .container-fluid{
        min-height: 100vh;
    }
    .containerDiv{
        margin: 80px auto auto;
        width: 700px;
    }
    .title{
        color: #903300;
        border-left:6px solid #ff4d00;
        padding-left: 10px;
        margin-bottom: 35px;
    }
    .description{
        font-size:20px;
        color: #444444;
        margin-bottom: 20px;
    }
    .date{
        padding-right: 40px;
        font-family: Bahnschrift,sans-serif;
        font-size: 15px;
        font-weight: 100;
    }
    span{
        margin-left: 5px;
    }
    hr{
        border-bottom: 1px solid #ff4d00;
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