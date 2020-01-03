<template>
    <div class="container-fluid">
        <div align="center" class="containerDiv">
            <div class="animated bounceInDown">
                <router-link to="/notes" tag="span">
                    <span class="text-center ">Notes</span>
                </router-link>
            </div>
            <div class="animated animated bounceInUp">
                <router-link to="/budget" tag="span">
                    <span class="text-center ">Budget</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .container-fluid{
        min-height: 100vh;
        background:  url("/src/backgroundImg.jpg") no-repeat center;
        background-size: cover;
    }
   .containerDiv{
       margin: 150px auto auto;
   }
   span{
       color: #98d1e8;
       cursor: pointer;
       font-size: 35px;
       font-weight: 100!important;
   }
   span:hover{
       color: #00cdff;
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