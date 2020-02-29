<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-input placeholder="请输入内容" v-model="query" class="inputsearch" clearable>
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
      </el-input>
      <el-button type="success" plain @click="addUser()">添加用户</el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          type="index"
          label="序列"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
              {{scope.row.date | formdate}}
          </template>
        </el-table-column>
        <el-table-column label="用户状态">
            <template slot-scope="scope">
                <el-switch
                    v-model="scope.row.status"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="edit(scope.row)"></el-button>
                <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="yes(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="del(scope.row)"></el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4">
      </el-pagination>
    </div>
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAdd()">取 消</el-button>
        <el-button type="primary" @click="confirmAdd()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        tel: '',
        email: '',
        address: ''
      },
      dialogFormVisibleAdd: false,
      query: '',
      tableData: [{
        date: 1486720211,
        name: '王小一',
        address: '上海市普陀区金沙江路 1518 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: true
      }, {
        date: 1486720211,
        name: '王小二',
        address: '上海市普陀区金沙江路 1517 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: false
      }, {
        date: 1486720211,
        name: '王小三',
        address: '上海市普陀区金沙江路 1519 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: true
      }, {
        date: 1486720211,
        name: '王小四',
        address: '上海市普陀区金沙江路 1516 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: false
      }],
      total: 0,
      pagenum: 1, // 指的就是第几页
      pagesize: 2 //

    }
  },
  created () {
    this.initInfo()
  },
  methods: {
    cancelAdd() {
      this.dialogFormVisibleAdd = false
      this.form = {}
    },
    confirmAdd() {
      console.log(this.form)
      //请求数据
      //成功后从新获取页面
      this.dialogFormVisibleAdd = false
      this.form = {}
    },
    addUser () {
      this.dialogFormVisibleAdd = true
    },
    searchUser () {
      // 搜索用户
    },
    initInfo () {
      this.total = this.tableData.length
    },
    handleSizeChange (val) { // 每页显示条数变化时触发
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.initInfo()
    },
    handleCurrentChange (val) { // 当前页改变时触发
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.info()
    },
    edit (a) {
      console.log(a)
    },
    yes (a) {
      console.log(a)
    },
    del (a) {
      console.log(a)
    }

  }
}
</script>

<style>
.box-card {
    width: 100%;
    height: 100%;
  }
.inputsearch {
    width: 300px;
}

</style>
