<template>
    <footer>
        <p class="title">Developed by</p>
        <p class="by">Sohrat Jumadurdyyev 2020</p>
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
        color: #fff;
        cursor: default;
        background-color: #2b2b2b;
        padding: 15px;
        margin-top: 0!important;
        border:none!important;
    }
    .by{
        display: flex;
        justify-content: center;
        align-items: center;
        transition: color .2s ease-in-out;
        font-size: 15px;
        margin:0!important;
        color:#dbdbdb
    }
    .by:hover{
        color:#fff;
    }
    .title{
        font-size:20px;
        margin: 0!important;
    }
    a{
        color: #dbdbdb;
        font-size: 25px;
        margin-left: 15px;
    }
    a:hover{
        color: #fff;
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
