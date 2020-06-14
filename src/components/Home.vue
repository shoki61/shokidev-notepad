<template>
    <div class="container-fluid">
        <div align="center" class="containerDiv">
            <div class="animated bounceInDown">
                <router-link to="/notes" tag="span">
                    <p class="text-center noteText">Notes</p>
                </router-link>
            </div>
           <div class="line">

           </div>
            <div class="animated animated bounceInUp">
                <router-link to="/budget" tag="span">
                    <p class="text-center budgetText">Budget</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .container-fluid{
        height: 100vh;
        padding-top: 150px;
        background:  url("/src/backgroundImg.png") no-repeat center;
        background-size: cover;
    }
   .containerDiv{
       margin: 150px auto auto;
     display: flex;
     justify-content: center;
   }
   p{
       color: #fff;
       cursor: pointer;
       font-size: 25px;
       padding:18px 75px;
       border:2px solid #fff;
     border-radius: 100px;
       transition:margin-top .3s ease-in-out, color .3s ease-in-out, background-color .3s ease-in-out;
   }
   p:hover{
       color: #00ccf5;
       background-color: #fff;
       position: relative;
       margin-top:-10px;
   }
   .line{
     background-color: #fff;
     height:80px;
     width: 3px;
   }
   .noteText{
     margin-right: 150px;
   }
   .budgetText{
     margin-left: 150px;
   }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        span{
            font-size: 90px;
        }
        .containerDiv{
            margin-top: 470px;
        }
    }
</style>
