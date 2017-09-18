<template>
  <div class="hello">
    <img v-if="index==link.index"  v-for="link in links" :src="link.data" style="width: 300px;" />
  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
  name: 'hello',
  data () {
    this.initWs();
    return {
      'links' : [],
      index : -1
    };
  },
  methods : {
    initWs(){
      new Promise((resolve, reject) => {
        let obj;
        var BrowserWebSocket = require('browser-websocket');
        var ws = new BrowserWebSocket('ws://localhost:9000');

        ws.on('open', () => {
          ws.emit('hello world');
        });

        ws.on('message', (e) => {
          this.links = this.links || [];
          this.index = ((this.index !== null && this.index !== undefined) ? this.index : -1)+1;
          this.links.push({data : e.data, index : this.index});
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
