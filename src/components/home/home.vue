<template>
    <el-container class="container">
        <el-header class="header" style="padding:0 !important;">
            <el-row>
                <el-col :span="2">
                    <div class="grid-content bg-purple" >
                        <img src="../../assets/img/logo.png" alt="无法显示图片" style="width:199px;height:60px;">
                    </div>
                </el-col>
                <el-col :span="20" class="middle">
                    <h3>电商后台管理系统</h3>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content bg-purple">
                        <a href="#" class="loginout" @click.prevent="loginOut()">退出</a>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-container class="container">
            <el-aside width="200px" class="side">
                <el-menu
                 :router="true"
                 :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="users">
                                <i class="el-icon-info"></i>
                                <span>用户列表</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="roles">
                                <i class="el-icon-camera-solid"></i>
                                <span>角色列表</span>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <i class="el-icon-upload"></i>
                                <span>权限列表</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-goods"></i>
                            <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-s-order"></i>
                                <span>商品列表</span>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <i class="el-icon-s-fold"></i>
                                <span>分类参数</span>
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                <i class="el-icon-s-operation"></i>
                                <span>商品分类</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-shop"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-s-data"></i>
                                <span>订单列表</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-finance"></i>
                            <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <i class="el-icon-menu"></i>
                                <span>数据报表</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  // 获取token，判断，有-》继续，无->返回登录页
  beforeCreate () {
    const token = localStorage.getItem('token')
    if (!token) {
    //   console.log(111222)
      this.$router.push({name: 'login'})
    }
  },
  methods: {
    loginOut () {
      // 清除token，并增加提示，定向到登录
      localStorage.clear()
      this.$alert('确定要退出登录吗', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `退出成功`
          })
          this.$router.push({name: 'login'})
        }
      })
    }
  }
}
</script>

<style>
.header{
    background-color: #d3dce6;
}
.container{
    height: 100%;
}
.side{
    background-color: #ffffff;
}
.main{
    background-color: #e9eef3;
    height:100%;
}
.middle{
    display: flex;
    justify-content: center;
    align-items: center;
}
.loginout{
    text-decoration: none;
    line-height: 60px;
    display: block;
    width: 100%;
    text-align: center;
    color: rgb(36, 33, 33);
}
</style>
