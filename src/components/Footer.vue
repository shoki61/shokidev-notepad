<template>
    <footer>
        <p class="title">Developed by</p>
        <p class="by">Sohrat Jumadurdyyev ©2019</p>
        <a href="" target="_blank"><i class="fab fa-github"></i></a>
    </footer>
</template>

<script>
    export default {
    }
</script>

<style scoped>

    footer{
        text-align: center;
        line-height: 13px;
        color: #7f7f7f;
        cursor: default;
        background-color: #252525;
        padding: 15px;
        margin-top: 0!important;
        border:none!important;
    }
    .by{
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color .2s ease-in-out;
    }
    .by:hover{
        color:#ff4d00;
    }
    .title{
        font-size:18px;
        color: #919191;
    }
    a{
        color: #9a9a9a;
        font-size: 20px;
        margin-left: 15px;
    }
    a:hover{
        color: #ff4d00;
    }
    @media only screen and (min-device-width : 200px)and (max-device-width : 1200px) {
        footer{
            padding-top: 15px;
            font-size: 33px;
            line-height: normal;
        }
        .title{
            font-size: 45px!important;
        }
        a{
            font-size: 40px;
        }
    }
</style>