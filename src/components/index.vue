<template>
    <el-container style="height: 610px; border: 1px solid #eee;">
        <el-header style="text-align: right; font-size: 12px">
            <el-menu :default-active="activeIndex" background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" mode="horizontal" @select="handleSelect" style="width:500px;float:left;">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3" disabled>消息中心</el-menu-item>
                <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
            </el-menu>
            <div style="float:right;">
                <router-link to="/login">登陆</router-link>
                <span>您好！</span>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>导航一</template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>导航二</template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-setting"></i>导航三</template>
                    <el-menu-item-group>
                    <template slot="title">分组一</template>
                    <el-menu-item index="3-1">选项1</el-menu-item>
                    <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                    <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="3-4-1">选项4-1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <el-table :data="tableData" stripe border height="300">
                    <el-table-column prop="date" label="日期" width="140" fixed>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="地址">
                    </el-table-column>
                </el-table>
                <!-- 需要写个组件整合table和pagination组件 -->
                <el-pagination background
                  layout="prev, pager, next" :page-size="3"
                  :total="total">
                </el-pagination>
            </el-main>
        </el-container>
        <el-footer>
            footer
        </el-footer>
    </el-container>
</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      tableData: [],
      activeIndex: '1',
      total: 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      alert(key + '>>>' + keyPath)
    }
  },
  mounted () {
    // 查询数据列表
    this.axios.get('/api/getlist').then(res => {
      this.tableData = res.data
      this.total = res.data.length
    })
  }
}
</script>
<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
  .el-footer {
    line-height: 60px;
    background-color: #409EFF;
  }
</style>
