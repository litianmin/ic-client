<template>
  <div>
    <div id="iframe">
      <iframe v-if="test" class="map-item"  id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7" style="width:100%; height:100%; position: absolute; border:0;">
      </iframe>
      
    </div>
    <!-- <div style="width:2rem; height:2rem; background:green; position:fixed; top:0; left:0; z-index:"></div> -->
    <button @click="ontheway">mytest</button>
  </div>
</template>

<script>
  export default {
    props: ["ismap"],
    data() {
      return {
        test: false,
        locationData: {}
      }
    },
    created() {

    },
    methods: {
      loadiframe() {
        let iframe = document.getElementById('getAddress').contentWindow;
        iframe.postMessage('hello', 'https://m.amap.com/picker/');
        window.addEventListener("message", function (e) {
          if (e.data.command != "COMMAND_GET_TITLE") {
            //业务代码
            this.$toast.message(e.data.name)
            console.log(e)     
          }

        }.bind(this), false);
      },
      ontheway () {
        this.test = true
      }
    }
  }
</script>
<style>
  .map-item {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #fff;
  }
</style>