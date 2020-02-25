<template>
    <div class="login-wrap">
        <el-form class="login-form" label-position="top" label-width="80px" :model="formLabelAlign">
            <h2>用户登录</h2>
            <el-form-item label="用户名">
                <el-input v-model="formLabelAlign.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="formLabelAlign.password"></el-input>
            </el-form-item>
            <el-button class="login-btn" type="primary" @click="loginIn">登录</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    loginIn () {
      // this.$http.post('login', this.formLabelAlign).then(res => {
      //   // 1.登陆成功，跳转home
      //   // 2.提示登陆成功
      // })
      this.$router.push({name: 'home'})
      this.$message.success('登录成功')
      localStorage.setItem('token', 123456)
    }
  }
}
</script>

<style>
.login-wrap{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #324152;
}
.login-wrap .login-form{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}
.login-wrap .login-btn {
    width: 100%;
}
</style>
