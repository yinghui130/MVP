<template>
    <div class="hello">
        <h1>{{ msg}}</h1>
    </div>
</template>

<script>
export default {
  name: 'cell',
  data () {
    return {
      msg: '多页面测试'+this.$myconfig.api_url
    }
  }
}
</script>
