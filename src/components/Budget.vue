<template>
    <div class="container-fluid">
        <div align="center" class="containerValue">
            <div @click="show=!show" class="form-group" style="margin:auto">
                <i :class="{'up' : !show,'down': show}" class="glyphicon glyphicon-arrow-down text-center"></i>
                <small class="animated zoomIn"  v-bind:key="show" :class="{'colorRed' : !show,'colorGreen' : show}">
                    {{show? 'income':'expense'}}
                </small>
            </div>
            <div>
                <form class="animated bounceInDown">
                    <input class="inputValue"
                           type="number"
                           placeholder="value..."
                           v-model="value"
                           :class="{'colorRed' : !show,'colorGreen' : show}"
                    >
                    <textarea
                            class="description"
                            type="text"
                            placeholder="description..."
                            v-model="description">
                    </textarea>
                    <br>
                        <button
                                class="btn "
                                @click="push"
                        >
                            Save
                        </button>
                </form>
            </div>
        </div>
        <div align="center" style="width: 70%">
            <div v-if="status===null" class="loadingDiv" align="center">
                <div class="spinner-grow" role="status">
                </div>
            </div>
            <div class="containerDiv animated bounceInUp" v-else>
                <h3 class="text-center mt-5" v-if="lists.length<=0">You haven't any note</h3>
                <ul v-for="list in lists" v-else>
                    <li>
                        <p class="valueText" :class="{'colorRed' : list.data.value<0,'colorGreen' : list.data.value>0}" >{{list.data.value}}</p>
                        <p class="desText">{{list.data.description}}</p>
                        <p class="dateText">{{list.data.date}} {{list.data.time}}</p>
                        <i class="material-icons closeButton" @click="deleteCal(list.key)">close</i>
                    </li>
                </ul>
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
                show : true,
                value:null,
                description : null,
                lists : [],
                x : "-",
                status: null,
                a : [],
                b : [],
                c : 0,
            }
        },
        methods : {
            push(){
                if(this.show===true){
                    this.x = "+"
                }
                let value = this.value.match(/\w/g).join("");
                axios.post("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+"cal.json",
                    {value:this.x+value,description:this.description,
                        date:new Date().toLocaleDateString(),time:new Date().toLocaleTimeString()})
                    .then(response=>{
                            window.location.reload();
                    });
            },
            deleteCal(value){
                axios.delete("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+"cal/"+value+".json")
                    .then(response=>{
                            window.location.reload()
                    })
            }
        },
        created(){
            axios.get("https://shokidev-notepad.firebaseio.com/"+localStorage.getItem("token")+"cal.json")
                .then(response=>{
                    setTimeout(()=>{
                        let data = response.data;
                        console.log(data);
                        if(response.status===200){
                            this.status=true
                        }
                        for(let key in data){
                            this.lists.push(
                                {
                                    key : key,
                                    data : data[key]
                                }
                            );
                        }
                        for(let key in data){
                            if(data[key].value<0) {
                                this.a.push(data[key].value)
                            }else{
                                this.b.push(data[key].value)
                            }
                        }
                        this.c = parseInt(this.a)
                    },1000)
                })
        },
        validations : {
            value : {
                required
            },
            description : {
                required
            }
        }

    }
</script>

<style scoped>
    h3{
        color:#4f4f4f;
        margin-top: 150px;
    }
    .containerValue{
        width: 350px;
        padding-top: 150px;
        background-color: #ebebeb;
        box-shadow: .5px -2px 10px 0 #a8a8a8;
    }
    .container-fluid{
        display: flex;
        min-height: 100vh;
        padding-left: 0!important;
        position: relative;
    }
    .containerDiv{
        width: 100%;
        margin:100px auto auto 50px;
    }
    i{
        font-size: 90px;
        padding-right: 8px;
        z-index: 1500;
    }
    .colorRed{
        color:#ff6161!important;
    }
    .colorGreen{
        color:#00d49b!important;
    }
    .up{
        animation-timing-function: ease-in-out;
        animation-name:ani;
        animation-duration: .5s;
        animation-fill-mode: forwards;
        color:#ff6161;
    }
    .down{
        animation-timing-function: ease-in-out;
        animation-name: ani1;
        animation-duration: .5s;
        animation-fill-mode: forwards;
        color:#00d49b;
    }
    .glyphicon-arrow-down{
        transition: ease-in-out .5s;
    }
    @keyframes ani {
        from{transform: rotateX(0deg)}
        to{transform: rotateX(180deg)}
    }
    @keyframes ani1 {
        from{transform: rotateX(180deg)}
        to{transform: rotateX(0deg)}
    }
    .form-group{
        cursor: pointer;
        margin-right: 50px;
    }
    input{
        border:none;
        border-bottom: 2px solid #bfbfbf;
        outline: none;
        background-color: transparent;
        width: 80%;
        font-size: 20px;
        margin-bottom: 30px;
    }
    .description{
        border :1px solid #bfbfbf;
        outline: none;
        background-color: #fff;
        padding:10px 15px;
        width: 80%;
        font-size: 15px;
        border-radius: 5px;
        resize: none;
        height: 100px;
    }
    .description::placeholder{
        color:grey;
        font-size: 17px;
        transition: color .3s ease-in-out;
    }
    textarea:focus{
        border-color: #969696;
    }
    textarea:focus::placeholder{
        color:transparent;
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
        border-bottom-color: #969696;
    }
    small{
        font-size: 25px;
        margin: auto !important;
        display: block;
        transition: color 1s ease-in-out;
    }
    .fa-check{
        font-size: 38px;
        color: #919191;
    }
    .fa-check:focus{
        box-shadow: none;
        outline: none;
    }
    .fa-check:hover{
        color: #ff4d00;
        text-shadow: 1px 1px 5px #8d8d8d;
    }
    li{
        border-bottom: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        position: relative;
        align-items: center;
        padding-top: 30px;
        margin-top: 0!important;
        margin-bottom: 0!important;
    }
    .btn{
        width: 80%;
        height: 40px;
        background-color: #2adb9a;
        color:#fff;
        margin-top:10px
    }
    .btn:hover{
        background-color: #26c98e;
    }
    .closeButton{
        font-size:25px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        right: 0;
        top:0;
        opacity: 0;
        transition: opacity .3s ease-in-out,padding-bottom .3s ease-in-out;
        cursor:pointer;
        color:#f00000;
    }
    li:hover .closeButton{
        opacity: 1;
    }
    li:hover{
        background-color: #f2f2f2;
    }
    .closeButton:hover{
        padding-bottom:10px;
        font-weight: 900;
    }

    .valueText{
        margin-right: 30px;
        font-size: 35px;
        width: 300px;
        color: #414141;
        overflow: auto;
        white-space: nowrap;
    }
    .valueText::-webkit-scrollbar{
        height: 6px;
    }
    .valueText::-webkit-scrollbar-thumb {
        background: grey;
        border-radius:100px;
    }
    .valueText::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px #959595;
        border-radius: 10px;
    }
    .valueText::-webkit-scrollbar-thumb:hover {
        background: #5f5f5f;
    }
    .desText{
        font-size: 20px;
        width: 100%;
        color:#787878;
        text-align: left;
    }
    .dateText{
        font-size: 15px;
        color:#565656;
        margin-left: 20px;
        margin-right: 10px;
        font-family: Bahnschrift,serif;
        font-weight: 100;
    }
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;

    }
    .loadingDiv{
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 175px;
    }
    .spinner-grow{
        width: 60px;
        height: 60px;
        background-color: #404040;
    }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        .containerValue{
            display: block;
        }
        .form-group{
            margin:auto;
            line-height: 1px;
        }
        .form-group i{
            font-size: 200px;
            margin-top: 60px;
            margin-bottom: 30px;
            padding-right: 15px;
        }
        .form-group small{
            font-size: 45px;
            margin-bottom: 50px;
        }
        input{
            display: block;
            font-size: 70px;
            text-align: center;
            margin:20px;
        }
        ::placeholder{
            font-size: 50px;
        }
        .inputValue{
            width: 350px;
            margin-top:50px;
        }
        .description{
            width: 700px;
        }
        .fa-check{
            font-size: 90px;
        }
        hr{
            width: 100%;
            border-top:2px solid #ffa400;
            margin-top: 100px;
            margin-bottom: 40px;
        }
        h3{
            font-size: 45px;
        }
        .containerDiv{
            width: 100%;
        }
        .valueText{
            font-size: 70px;
            width: 300px;
        }
        .desText{
            font-size: 55px;
            padding-left: 15px;
        }
        .dateText{
            font-size: 38px;
        }
        .closeButton{
            opacity: 1;
            font-size: 85px;
        }
        li{
            padding-top: 60px;
            margin-bottom: 40px;
        }
        .spinner-grow{
            margin-top: 500px;
            width: 140px;
            height: 140px;
        }
    }

</style>
