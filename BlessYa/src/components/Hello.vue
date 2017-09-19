<template>
  <div class="hello">
    <img v-if="index==link.index"  v-for="link in links" :src="link.data" style="height: 100%;" />
    <button class="btn orange" v-on:click="sendReload()">Bless Ya !</button>
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
        var BrowserWebSocket = require('browser-websocket');
        var ws = new BrowserWebSocket('ws://localhost:9000');

        ws.on('open', () => {
          ws.emit('hello world');
        });

        ws.on('message', (e) => {
          this.links = this.links || [];
          this.index = ((this.index !== null && this.index !== undefined) ? this.index : -1)+1;
          this.links.push({data : e.data, index : this.index});
          console.log('received', e.data);
          navigator.serviceWorker.controller.postMessage(e.data);
        });
    },
    sendReload(){
      fetch("http://localhost:9001/reload");
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

.btn {
  position: relative;

  display: block;
  margin: 30px auto;
  padding: 0;

  overflow: hidden;

  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .6);

  background-color: #2ecc71;
  color: #ecf0f1;

  transition: background-color .3s;

  font-size: 27px;
  background-color: #e67e22;
  width: 400px;
  cursor: pointer;
  height: 50px;
}

.btn:hover, .btn:focus {
  background-color: #27ae60;
}

.btn > * {
  position: relative;
}

.btn span {
  display: block;
  padding: 12px 24px;
}

.btn:before {
  content: "";

  position: absolute;
  top: 50%;
  left: 50%;

  display: block;
  width: 0;
  padding-top: 0;

  border-radius: 100%;

  background-color: rgba(236, 240, 241, .3);

  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.btn:active:before {
  width: 120%;
  padding-top: 120%;

  transition: width .2s ease-out, padding-top .2s ease-out;
}


.btn.orange {
  background-color: #e67e22;
}

.btn.orange:hover, .btn.orange:focus {
  background-color: #d35400;
}

.btn.red {
  background-color: #e74c3c;
}

.btn.red:hover, .btn.red:focus {
  background-color: #c0392b;
}
</style>
