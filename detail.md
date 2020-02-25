# vue-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### 项目准备说明
1/src
2/build  与webpack相关
3/config   本地服务器配置
4/ .eslintignore  eslint排除文件
5/ .eslintrc.js  eslint配置文件
### 准备-代码规范-自定义指令lintfix
1. 结尾没有；
2. 必须用全等
3. 不允许出现未使用的变量
4. 不允许出现一个以上空格
5. 字符串使用单引号
6. 关键字/函数后要加空格

>自定义指令：npm run lintfix（在package.json中的scripts中）
>自动打开浏览器，在dev后加--open
>开发过程中可以先将规范关掉-webpack.base.conf.js中注释掉
...(config.dev.useEslint ? [createLintingRule()] : []),

### 引入elementui
1. npm i element-ui -S
2. 在main.js中引入并使用
删除在项目中用不到的代码

### 关联git
1. git init
2. git add .
3. git commit -m 'beizhu'
4. git remote add origin git@github.com:lululu222/vue-admin.git
5. git push -u origin master
6. 之后再推送直接 git push

### 关于登录跳转
登陆成功，进行跳转使用js编程式导航  this.$router.push({name: 'home'})
App.vue是否有router-view
新建home组件
路由index.js进行配置

保存token，用于验证
在进入首页之前，判断是否有token，没有就直接跳转至登录页面

退出功能：// 清除token，并增加提示，定向到登录

### 关于侧边栏的路由
1.侧边栏el-menu开启路由模式
  因为组件要通过路由显示，所以在el-menu里面点击相应的文字，给其index添加有意义的名字，index值也-》path值
2.建立好要添加的页面（例如users.vue）
3.在哪里显示就要在哪里添加<router-view>
4.在哪里显示，就在哪里配置子路由





For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
