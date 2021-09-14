<template>
  <div class="login_container">
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!--登陆框-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-bussiness-man"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-password"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择登陆密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post('login', this.loginForm);
        if (res.meta.status !== 200) return this.$message.error('登陆失败！');
        this.$message.success('登陆成功！！！')
        window.sessionStorage.setItem('token', res.data.token);
        this.$router.push('/home');
      });
    }

  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      background-color: #eee;
      border-radius: 50%;
    }
  }
}

.login_form {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 0 20px;
  box-sizing: border-box;
}

.btn {
  display: flex;
  justify-content: flex-end;
}

</style>
