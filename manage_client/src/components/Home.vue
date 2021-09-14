<template>
  <el-container class="home_container">
    <!--头部-->
    <el-header>
      <div>
        <img src="../assets/heima.png"/>
        <span>电商管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体-->
    <el-container>
      <!-- 侧边栏-->
      <el-aside :width="isToggle ? '64px' : '200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409BFF" unique-opened
                 :collapse-transition="false" :collapse="isToggle" router :default-active="activePath">
          <!-- 一级菜单-->
          <el-submenu :index="item.path + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单-->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
                          @click="saveState('/' + subItem.path)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题-->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isToggle: false,
      activePath: ''
    }
  },

  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },

  methods: {
    logout () {
      // window.sessionStorage.clear();
      this.$router.push('/login')
    },

    async getMenuList () {
      const {
        data: res
      } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menuList = res.data
    },

    toggle () {
      this.isToggle = !this.isToggle
    },

    saveState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}

</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
      font-size: 20px;
      color: #fff;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-left: 10px;
  padding-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}

</style>
