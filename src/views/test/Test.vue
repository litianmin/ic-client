<template>
    <div class="image-view">
        <div class="addbox">
            <input type="file" @change="getImgBase()">
            <div class="addbtn">+</div>
        </div>

        <div class="view">
            <div class="item">
                <span class="cancel-btn" @click="delImg">x</span>
                <img :src="imgBase64">
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: 'imageView',
        data (){
            return {
                imgBase64: ''    //存储img base64的值将值传给后端处理
            }
        },
        methods: {
            //获取图片base64实现预览
            getImgBase(){
                var _this = this;
                var event = event || window.event
                var file = event.target.files[0]
                var reader = new FileReader()
                //转base64
                reader.onload = function(e) {
                    _this.imgBase64 = e.target.result
                }
                reader.readAsDataURL(file);
            },
            //删除图片
            delImg () {
                this.imgBase64 = ''
            }
        }
    }
</script>
<style scoped>
    *{margin:0 auto;padding:0;font-family:"微软雅黑";}
    .clearboth::after{
        content:"";
        display:block;
        clear:both;
    }
    .image-view{
        width:400px;
        height:300px;
        margin:50px auto;
    }
    .image-view .addbox{
        float:left;
        position:relative;
        height:100px;
        width:100px;
        margin-bottom:20px;
        text-align:center;
    }
    .image-view .addbox input{
        position:absolute;
        left:0;
        height:100px;
        width:100px;
        opacity:0;
    }
    .image-view .addbox .addbtn{
        float:left;
        height:100px;
        width:100px;
        line-height:100px;
        color:#fff;
        font-size:40px;
        background:#ccc;
        border-radius:10px;
    }
    .image-view .item {
        position:relative;
        float:left;
        height:100px;
        width:100px;
        margin:10px 10px 0 0;
    }
    .image-view .item .cancel-btn{
        position:absolute;
        right:0;
        top:0;
        display:block;
        width:20px;
        height:20px;
        color:#fff;
        line-height:20px;
        text-align:center;
        background:red;
        border-radius:10px;
        cursor:pointer;
    }
    .image-view .item img{
        width:100%;
        height:100%;
    }
    .image-view .view{
        clear:both;
    }
</style>