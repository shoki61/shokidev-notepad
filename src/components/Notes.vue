<template>
    <div class="container-fluid">
        <div v-if="status===null" class="loadingDiv" align="center">
            <h2 class="ml-5 mb-5">Loading...</h2>
            <div class="spinner-grow" role="status"></div>
        </div>
        <div v-else>
            <h1 class="text-center" v-if="lists.length>0">Notes</h1>

            <router-link to="/newnode" tag="p">
                <p class="text-center addedText1"
                   v-if="show"
                >
                    You haven't any note <br>
                    Click for a new one <br>
                    <a><i class='fa fa-plus mr-2'></i></a>
                </p>
                <p v-else-if="lists.length>0" class="text-center addedText">
                    <a><i class='fa fa-plus mr-2'></i>Add new note</a>
                </p>
            </router-link>

            <div v-for="list in lists">
                <div class="containerDiv">
                    <div @click="push(list)" style="height: 100%;">
                        <p class="text-center titleText" >{{list.data.title}}</p>
                        <p class="description">{{list.data.text}}</p>
                        <p class="dateText">{{list.data.date}} {{list.data.time}}</p>
                    </div>
                    <button class="btn" @click="deleteNote(list.key)"><i class="material-icons">close</i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        data(){
            return{
                lists : [],
                show: false,
                status:null
            }
        },
        created(){
            axios.get("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+".json")
                .then(response=>{
                        setTimeout(()=>{
                            let data = response.data;
                            if(response.status===200){
                                this.status=200
                            }
                            if(data===null){
                                this.show=true
                            }
                            for(let key in data){
                                this.lists.push(
                                    {
                                        key : key,
                                        data : data[key]
                                    }
                                )
                            }
                        },1000)
                })
        },
        methods : {
            push(value){
                localStorage.setItem("note",JSON.stringify(value.data));
                this.$router.push("/note")
            },
            deleteNote(value){
                axios.delete("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+"/"+value+".json")
                    .then(response=>{
                        window.location.reload();
                    })
            }

        }


    }
</script>

<style scoped>
    h2{
        color:grey;
    }
    h1{
        display: block;
        color: #6b6b6b;
    }
    .container-fluid{
        min-height: 100vh;
        margin-bottom: 25px;
    }
    .spinner-grow{
        width: 60px;
        height: 60px;
        background-color: #ff4d00;
    }
    .containerDiv{
        width: 600px;
        height: 140px;
        border:1px solid #a9a9a9;
        margin: 10px auto 30px;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        background-color: #ffe3c5;
        transition: box-shadow 0.3s ease-in-out;
    }
    .containerDiv:hover{
        box-shadow: 0 0 20px 0 #ff4d00;
    }
    button{
        position: absolute;
        top:0;
        right:0;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        color:#f00000!important;
    }
    button:hover i{
        font-weight:900!important;
    }
    button:focus{
        box-shadow: none!important;
        outline: none!important;
    }
    .containerDiv:hover button{
        opacity: 1;
    }
    a{
        color:grey;
        transition: padding-bottom .3s ease-in-out, color .3s ease-in-out;
    }
    .addedText{
        font-size: 17px;
        color:grey;
        margin: 30px;
        cursor: pointer;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    a:hover {
        color: #ff4d00;
        padding-bottom: 15px;
        text-decoration: underline;
    }
    .titleText{
        font-size: 30px;
        color: #ff5e00;
        padding:10px 50px;
        background-color: #cae8ff;
        border-bottom: 1px solid #c4c4c4;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .description{
        font-size: 17px;
        color: #4c4c4c;
        padding-left: 30px;
        padding-right: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .dateText{
        font-family: Bahnschrift,sans-serif;
        font-weight: 100;
        position: absolute;
        bottom:0;
        font-size: 15px;
        right: 15px;
        margin-bottom: 5px!important;
    }
    .addedText1{
        font-size: 30px;
        margin-top: 150px;
        color: #6b6b6b;
    }
    .addedText1 a{
        font-size: 50px;
    }
    .loadingDiv{
        height: 400px;
        width: 400px;
        margin: auto;
        padding-top: 130px;
    }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        h2{
            font-size: 70px;
            margin-top: 100px;
        }
        h1{
            font-size: 90px;
            margin-top: 100px;
            margin-bottom: 40px;
        }
        .addedText{
            font-size: 45px;
            margin-top: 60px;
            margin-bottom: 50px;
        }
        .addedText a{
            color: #939393;
        }
        .addedText1{
            margin-top: 250px;
            font-size: 60px;
        }
        .addedText1 .fa-plus{
            font-size: 100px;
            margin-top: 25px;
        }
        .containerDiv{
            width: 95%;
            height: 300px;
            border-radius: 15px;
            margin-bottom: 50px;
        }
        .titleText{
            font-size: 65px;
        }
        .description{
            font-size: 50px;
        }
        .dateText{
            font-size: 40px;
        }
        button{
            opacity: 1;
        }
        i{
            font-size: 45px;
        }
        button:hover i{
            font-weight: 100!important;
        }
        .spinner-grow{
            margin-top: 70px;
            width: 150px;
            height: 150px;
        }
        .btn i{
            font-size: 75px;
        }
    }
</style>