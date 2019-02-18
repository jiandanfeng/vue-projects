<template>
    <el-form ref="form" :model="form" label-width="80px" label-position="right">
        <el-form-item label="账号" prop="name" :rules="[{required: true, message: '账号不能为空'}]">
            <el-input v-model="form.name" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" :rules="[{required: true, message: '密码不能为空'}]">
            <el-input v-model="form.pwd" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onLogin">登陆</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    onLogin () {
      // 验证表单
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.form).then(() => {
            this.$router.push({
              path: '/'
            })
          }).catch(error => {
            alert(error)
          })
          /* this.axios({
            method: 'post',
            url: '/api/login'
          }).then(res => {
            console.log(res.data)
            if (res.data === 'login success') {
              // 跳转到首页
              this.$router.push({
                path: '/index'
              })
            }
          }).catch(error => { alert(error) }) */
        }
      })
    }
  }
}
</script>
<style scoped>
  .el-form {
      width: 300px;
      margin: 200px auto;
  }
  .el-form-item, .el-input, .el-button {
      width: 200px;
  }
</style>
