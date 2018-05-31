<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  height: 100%;
}
html,
body {
  height: 100%;
  margin: 0px;
  background-color: #F4F4F4;
  color: #373737;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

a[class*="btn"] {text-decoration: none;}



.gradient {
    text-decoration: none;
    color: #F4F4F4;
    padding: 10px 30px;
    display: inline-block;
    height: 100%;
    position: relative;
    border: 1px solid rgba(0,0,0,0.21);
    border-bottom: 4px solid rgba(0,0,0,0.21);
    border-radius: 4px;
    text-shadow: 0 1px 0 rgba(0,0,0,0.15);
}

.gradient.black{ 
    background: rgba(55,55,54,1);
    background: -webkit-gradient(linear, 0 0, 0 100%, from(rgba(55,55,54,1)), to(rgba(35,35,36,1)));
    background: -webkit-linear-gradient(rgba(55,55,54,1) 0%, rgba(35,35,36,1) 100%);
    background: -moz-linear-gradient(rgba(55,55,54,1) 0%, rgba(35,35,36,1) 100%);
    background: -o-linear-gradient(rgba(55,55,54,1) 0%, rgba(35,35,36,1) 100%);
    background: linear-gradient(rgba(55,55,54,1) 0%, rgba(35,35,36,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#373737', endColorstr='#232324', GradientType=0 );
}

.btn{
  font-weight: bolder;
}


.btn.gradient.black:active{
  background: #000000;
}

.btn.gradient:hover{
  cursor: pointer;
}
</style>
