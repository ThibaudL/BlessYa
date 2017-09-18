<template>
  <div class="hello">
    <img v-if="link" :src="link" style="width: 300px;" />
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    this.initWs();
    return {
      'link' : null
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
          console.log(e.data);
          this.link = e.data;
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
