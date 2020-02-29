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
          type="expand"
          width="100">
            <template slot-scope="scope">
              <el-row v-for="(item1,index1) in scope.row.data" :key="index1">
                  <el-col :span="4">
                      <el-tag closable @close="closeTag(scope.row,item1.id)">{{item1.rowName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                      <el-row v-for="(item2,index2) in item1.children" :key="index2">
                          <el-col :span="4">
                              <el-tag type="success" closable @close="closeTag(scope.row,item2.id)">{{item2.rowName}}</el-tag>
                              <i class="el-icon-arrow-right"></i>
                          </el-col>
                          <el-col :span="20">
                              <el-tag type="warning" v-for="(item3,index3) in item2.children" :key="index3" closable @close="closeTag(scope.row,item3.id)">
                                  {{item3.rowName}}
                              </el-tag>
                          </el-col>
                      </el-row>
                  </el-col>
              </el-row>
              <span v-if="scope.row.data.length==0">该角色未分配权限</span>
            </template>
        </el-table-column>
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
        <el-table-column
          prop="address"
          label="操作">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" plain circle @click="edit(scope.row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" plain circle @click="del(scope.row)"></el-button>
                <el-button type="success" icon="el-icon-check" size="mini" plain circle @click="yes(scope.row)"></el-button> 
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
    <!-- 添加角色按钮 -->
    <!-- :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]" -->
    <el-dialog title="增加权限" :visible.sync="dialogAdd">
        <el-tree
            ref="trees"
            :data="dataTree"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :default-checked-keys="arrChoose">
        </el-tree>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cacelTree()">取 消</el-button>
            <el-button type="primary" @click="addTree()">确 定</el-button>
        </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      arrExpand: [],
      arrChoose: [],
      form: {
        name: '',
        tel: '',
        email: '',
        address: ''
      },
      dialogFormVisibleAdd: false,
      dialogAdd: false,
      query: '',
      tableData: [{
        date: 1486720211,
        name: '王小一',
        address: '上海市普陀区金沙江路 1518 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: true,
        data: [
          {
            rowName: '主管',
            id: '1',
            children: [
              {
                rowName: '商品管理',
                id: '11',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '111'
                  },
                  {
                    rowName: '删除商品',
                    id: '112'
                  },
                  {
                    rowName: '增加商品',
                    id: '113'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '12',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '121'
                  },
                  {
                    rowName: '删除应用',
                    id: '122'
                  },
                  {
                    rowName: '增加应用',
                    id: '123'
                  }
                ]
              }
            ]
          },
          {
            rowName: '工作人员',
            id: '2',
            children: [
              {
                rowName: '商品管理',
                id: '21',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '211'
                  },
                  {
                    rowName: '增加商品',
                    id: '212'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '22',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '221'
                  },
                  {
                    rowName: '增加应用',
                    id: '222'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        date: 1486720211,
        name: '王小二',
        address: '上海市普陀区金沙江路 1517 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: false,
        data: [
          {
            rowName: '主管',
            id: '1',
            children: [
              {
                rowName: '商品管理',
                id: '11',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '111'
                  },
                  {
                    rowName: '删除商品',
                    id: '112'
                  },
                  {
                    rowName: '增加商品',
                    id: '113'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '12',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '121'
                  },
                  {
                    rowName: '删除应用',
                    id: '122'
                  },
                  {
                    rowName: '增加应用',
                    id: '123'
                  }
                ]
              }
            ]
          },
          {
            rowName: '工作人员',
            id: '2',
            children: [
              {
                rowName: '商品管理',
                id: '21',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '211'
                  },
                  {
                    rowName: '增加商品',
                    id: '212'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '22',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '221'
                  },
                  {
                    rowName: '增加应用',
                    id: '222'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        date: 1486720211,
        name: '王小三',
        address: '上海市普陀区金沙江路 1519 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: true,
        data: [
          {
            rowName: '主管',
            id: '1',
            children: [
              {
                rowName: '商品管理',
                id: '11',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '111'
                  },
                  {
                    rowName: '删除商品',
                    id: '112'
                  },
                  {
                    rowName: '增加商品',
                    id: '113'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '12',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '121'
                  }
                ]
              }
            ]
          },
          {
            rowName: '工作人员',
            id: '2',
            children: [
              {
                rowName: '商品管理',
                id: '21',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '211'
                  },
                  {
                    rowName: '增加商品',
                    id: '212'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '22',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '221'
                  },
                  {
                    rowName: '增加应用',
                    id: '222'
                  }
                ]
              }
            ]
          }
        ]
      }, {
        date: 1486720211,
        name: '王小四',
        address: '上海市普陀区金沙江路 1516 弄',
        email: '27482392@qq.com',
        phone: '13813628337',
        status: false,
        data: [
          {
            rowName: '主管',
            id: '1',
            children: [
              {
                rowName: '商品管理',
                id: '11',
                children: [
                  {
                    rowName: '增加商品',
                    id: '113'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '12',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '121'
                  },
                  {
                    rowName: '删除应用',
                    id: '122'
                  },
                  {
                    rowName: '增加应用',
                    id: '123'
                  }
                ]
              }
            ]
          },
          {
            rowName: '工作人员',
            id: '2',
            children: [
              {
                rowName: '商品管理',
                id: '21',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '211'
                  },
                  {
                    rowName: '增加商品',
                    id: '212'
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '22',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '221'
                  },
                  {
                    rowName: '增加应用',
                    id: '222'
                  }
                ]
              }
            ]
          },
          {
            rowName: '财务',
            id: '3',
            pid: '0',
            children: [
              {
                rowName: '财务管理',
                id: '31',
                pid: '3',
                children: [
                  {
                    rowName: '删除财务',
                    id: '312',
                    pid: '31',
                  },
                  {
                    rowName: '增加财务',
                    id: '313',
                    pid: '31',
                  }
                ]
              },
              {
                rowName: '财务审核',
                id: '32',
                pid: '3',
                children: [
                  {
                    rowName: '审核引用',
                    id: '321',
                    pid: '32',
                  },
                  {
                    rowName: '审核来源',
                    id: '322',
                    pid: '32',
                  },
                  {
                    rowName: '审核用处',
                    id: '323',
                    pid: '32',
                  }
                ]
              }
            ]
          },
        ]
      }],
      total: 0,
      pagenum: 1, // 指的就是第几页
      pagesize: 2, //
      dataTree: [
          {
            rowName: '主管',
            id: '1',
            pid: '0',
            children: [
              {
                rowName: '商品管理',
                id: '11',
                pid: '1',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '111',
                    pid: '11',
                  },
                  {
                    rowName: '删除商品',
                    id: '112',
                    pid: '11',
                  },
                  {
                    rowName: '增加商品',
                    id: '113',
                    pid: '11',
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '12',
                pid: '1',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '121',
                    pid: '12',
                  },
                  {
                    rowName: '删除应用',
                    id: '122',
                    pid: '12',
                  },
                  {
                    rowName: '增加应用',
                    id: '123',
                    pid: '12',
                  }
                ]
              }
            ]
          },
          {
            rowName: '工作人员',
            id: '2',
            pid: '0',
            children: [
              {
                rowName: '商品管理',
                id: '21',
                pid: '2',
                children: [
                  {
                    rowName: '编辑商品',
                    id: '211',
                    pid: '21',
                  },
                  {
                    rowName: '增加商品',
                    id: '212',
                    pid: '21',
                  }
                ]
              },
              {
                rowName: '应用管理',
                id: '22',
                pid: '2',
                children: [
                  {
                    rowName: '编辑引用',
                    id: '221',
                    pid: '22',
                  },
                  {
                    rowName: '增加应用',
                    id: '222',
                    pid: '22',
                  }
                ]
              }
            ]
          },
          {
            rowName: '财务',
            id: '3',
            pid: '0',
            children: [
              {
                rowName: '财务管理',
                id: '31',
                pid: '3',
                children: [
                  {
                    rowName: '编辑财务',
                    id: '311',
                    pid: '31',
                  },
                  {
                    rowName: '删除财务',
                    id: '312',
                    pid: '31',
                  },
                  {
                    rowName: '增加财务',
                    id: '313',
                    pid: '31',
                  }
                ]
              },
              {
                rowName: '财务审核',
                id: '32',
                pid: '3',
                children: [
                  {
                    rowName: '审核引用',
                    id: '321',
                    pid: '32',
                  },
                  {
                    rowName: '审核来源',
                    id: '322',
                    pid: '32',
                  },
                  {
                    rowName: '审核用处',
                    id: '323',
                    pid: '32',
                  }
                ]
              }
            ]
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'rowName'
        }
    }
  },
  created () {
    this.initInfo()
  },
  methods: {
    closeTag (role, id) {
        //点击删除后传角色id和相应的权限id
        //返回一个该角色的剩余所有权限
      //传给后台(role.date,id)=>获取res.data.data(新的所有权限)
      //  role.children=res.data.data 就可以更新视图，免刷新，属于优化
      console.log(role.date.id)
    },
    cancelAdd () {
      this.dialogFormVisibleAdd = false
      this.form = {}
    },
    confirmAdd () {
      console.log(this.form)
      // 请求数据
      // 成功后从新获取页面
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
      this.dialogAdd = true
      //树形结构存在一个小bug，应该只需要最内层的就可以了
      let newarr = []
      a.data.forEach(item1 => {
        //   newarr.push(item1.id)
          item1.children.forEach(item2 => {
            //   newarr.push(item2.id)
              item2.children.forEach(item3 => {
                  newarr.push(item3.id)
              })
          })
      })
      console.log(newarr,444)
    //   this.arrExpand = newarr
      this.arrChoose = newarr
      

    },
    del (a) {
      console.log(a)
    },
    cacelTree() {
        this.dialogAdd = false;
        this.arrChoose = []

    },
    addTree() {
        //获取选中的所有节点id
        let arr1 = this.$refs.trees.getCheckedKeys()
        let arr2 = this.$refs.trees.getHalfCheckedKeys()
        let arr = [...arr1,...arr2]
        console.log(arr)
        this.dialogAdd = false;
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
