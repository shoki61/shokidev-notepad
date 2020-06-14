<template>
    <div class="container-fluid">
        <div v-if="status===null" class="loadingDiv" align="center">
            <h2 class="ml-5 mb-5">Loading...</h2>
            <div class="spinner-grow" role="status"></div>
        </div>

        <div v-else align="center">
          <img height="150" v-if="show" src="/src/null.png" alt="">
            <div style="display: flex;justify-content: space-between">
              <h1  v-if="lists.length>0">Notes</h1>

              <router-link :class="{'addButtonContainer':show}" to="/newnode" tag="p">

                <p class="addedText1"
                   v-if="show"
                >
                  You haven't any note <br>
                  Click for a new one <br>
                  <a><i class='fa fa-plus mr-2'></i></a>
                </p>
                <p v-else-if="lists.length>0" class="text-center addedText">
                  <a><i class='fa fa-plus mr-2'></i> new note</a>
                </p>
              </router-link>
            </div>




            <div class="postsContainer">
              <div v-for="list in lists">
                <div class="containerDiv">
                  <div @click="push(list)" style="height: 100%;">
                    <p class="text-center titleText" >{{list.data.title}}</p>
                    <p class="description">{{list.data.text}}</p>
                    <p class="dateText">{{list.data.date}}-{{list.data.time}}</p>
                  </div>
                  <button class="btn" @click="deleteNote(list.key)"><i class="material-icons">close</i></button>
                </div>
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
  img{
    opacity: 0.7;
    margin: 70px auto auto;
  }
    h2{
        color:grey;
      font-size: 35px;
    }
    .addButtonContainer{
      width: 100%;
    }
    .postsContainer{
      margin-top: 15px;
      display: flex;
      flex-wrap: wrap;
    }
    h1{
        display: flex;
        color: #6b6b6b;
        font-size: 45px;
        margin-left: 30px;
    }
    .container-fluid{
        padding-top: 90px;
        min-height: 100vh;
        padding-bottom: 25px;
    }
    .spinner-grow{
        width: 50px;
        height: 50px;
        background-color: #404040;
    }
    .containerDiv{
        width: 320px;
        height: 200px;
        margin:15px;
        border-radius: 7px;
        position: relative;
        cursor: pointer;
        background-color: #fff;
        box-shadow: 1px 1px 3px 0 #dbdbdb;
        transition: box-shadow 0.3s ease-in-out;
    }
    .containerDiv:hover{
      box-shadow: 1px 1px  10px 5px #dbdbdb;
    }
    button{
        position: absolute;
        top:0;
        right:0;
        opacity: 0;
        transition: opacity .3s ease-in-out;
        color:#fff!important;
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
        color:#fff;
        font-size: 17px;
        transition: color .3s ease-in-out;
      text-decoration: none;
    }
    .addedText{
        cursor: pointer;
        height: 45px;
        border-radius: 5px;
        width: 140px;
        background-color:  #2adb9a;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .addedText:hover{
      background-color: #26c98e;
    }
    .titleText{
        font-size: 30px;
        color: #fff;
        padding:10px 50px;
        background-color: #404040;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      border-radius: 7px 7px 0 0;
    }
    .description{
        font-size: 17px;
        color: #4c4c4c;
        padding-left: 30px;
        padding-right: 30px;
        text-align: left;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow:hidden;
        -webkit-line-clamp: 4;
    }
    .dateText{
        font-family: Bahnschrift,sans-serif;
        font-weight: 100;
        position: absolute;
        bottom:0;
        font-size: 14px;
        right: 15px;
        color:grey;
        margin-bottom: 5px!important;
    }
    .addedText1{
        font-size: 25px;
        margin-top: 30px;
        color: #6b6b6b;
      text-align: center;
    }
    .addedText1 a{
        font-size: 50px;
      color:#6b6b6b
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
