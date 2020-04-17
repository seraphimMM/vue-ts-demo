<template>
  <div class="d-flex flex-fill flex-column home-container">
    <header class="home-header d-flex flex-none justify-content-between">
      <nav class="d-flex align-items-center">
        <a href="javascript:void(0)" @click="go2UserMgr">User Management</a>
        <a href="javascript:void(0)" @click="go2ControlPanel">Control Panel</a>
        <a href="javascript:void(0)" @click="go2SystemMgr">System Management</a>
        <a href="javascript:void(0)" @click="go2CustomerService">Customer Service</a>
      </nav>

      <div class="user-panel text-right">
        <el-dropdown @command="dropdownClick">
          <span class="el-dropdown-link">
            <span>{{ username }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">Sign out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <div class="home-content d-flex flex-fill">
      <div>
        <div class="card-items d-flex flex-none flex-wrap">
          <div
            class="card-item d-flex flex-column flex-none"
            v-for="item in items"
            :key="item.name"
          >
            <div class="card-item-title">{{ item.title }}</div>
            <div v-if="item.value" class="card-item-number">{{ item.value | number }}</div>
            <div class="card-item-content">{{ item.text }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer class="home-footer flex-none text-center">
      Welcome to vue-ts-demo, please feel free to contact us via
      <a href="#">demo@vue.com</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Direction } from '@/router'
import { userController } from './user-controller'

interface ICardItem {
  name: string
  title: string
  text: string
  value?: number
}

// 主页设计，其实可以采用二级 router-view 来实施，因为完成登陆后大多数系统都有独立且多页面共享的导航菜单，这些可以作为共享设计的

// 我这里暂时来不及这样弄了，作为一个遗留的结构设计优化点

// 其他的还有权限校验，错误页面设计等，路由守卫也没有进一步深入

// 这里的首页只做了一个简单的框架结构设计，主要是 html / css ，基本没有业务逻辑代码

@Component({ components: {} })
export default class Home extends Vue {
  private username = userController.getCurrentUsername()

  private items: ICardItem[] = []

  private mounted() {
    if (!this.username) {
      this.popup.info(
        `Your login session is expired, system is navigating you to the login page.`
      )
      return this.go(Direction.Login)
    }

    this.controlLoading(true)
    setTimeout(() => {
      this.items = [
        {
          name: 'sales',
          title: '总销售额',
          value: Math.floor(Math.random() * 100000),
          text: `当月(${new Date().getMonth() + 1}月份)同比增长${Math.floor(
            Math.random() * 100
          )}%`
        },
        {
          name: 'visitors',
          title: '访问量',
          value: Math.floor(Math.random() * 100000),
          text: `当月(${new Date().getMonth() + 1}月份)同比增长${Math.floor(
            Math.random() * 100
          )}%`
        },
        {
          name: 'payments',
          title: '支付笔数',
          value: Math.floor(Math.random() * 100000),
          text: `当月(${new Date().getMonth() + 1}月份)同比增长${Math.floor(
            Math.random() * 100
          )}%`
        },
        {
          name: 'activities',
          title: '运营活动情况',
          text: `用户运营指以用户为中心，遵循用户的需求设置运营活动与规则，制定运营战略与运营目标，以达到预期所设置的运营目标与任务。`
        }
      ]

      this.controlLoading(false)
    }, 1500)
  }

  private go2UserMgr() {
    this.go(Direction.UserManager)
  }

  private go2ControlPanel() {
    this.go(Direction.ControlPanel)
  }

  private go2SystemMgr() {
    this.go(Direction.SystemManager)
  }

  private go2CustomerService() {
    this.go(Direction.CustomerService)
  }

  private dropdownClick(command: string) {
    if (command === 'logout') {
      userController.logout()
      this.go(Direction.Login)
      this.popup.info('You have signed out the system safely.')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/variables.less';

.home-container {
  header {
    background-color: #20232a;
    padding: 10px 20px;
    height: 40px;

    nav {
      a {
        text-decoration: none;
        color: #fff;
        white-space: nowrap;

        &:hover {
          color: gray;
        }

        & + a {
          margin-left: 20px;
        }
      }
    }

    .user-panel {
      margin-left: 10px;
      cursor: pointer;

      .el-dropdown {
        color: #fff;
      }
    }
  }

  .home-content {
    padding: 20px;

    .card-items {
      .card-item {
        border-radius: 4px;
        border: 1px solid @primary-border-color;
        margin: 0 15px 15px 0;
        padding: 10px;
        width: 200px;
        transition: all 0.3s;

        .card-item-title {
          font-weight: 400;
          font-size: 14px;
        }

        .card-item-number {
          font-size: 20px;
          margin: 5px 0;
        }

        .card-item-text {
          color: @primary-info-color;
        }
      }
    }
  }

  footer {
    padding: 10px;
  }
}
</style>

<style lang="less">
// 把默认的全局loading 向下偏移 nav 的高度，这样可以允许用户在当前页面处于loading 状态时依旧可以切换至其他页面
.home-container + .el-loading-mask {
  top: 40px;
}
</style>
