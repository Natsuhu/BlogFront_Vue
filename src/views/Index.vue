<template>
  <div class="base_site">
    <!--  导航菜单  -->
    <Nav :blogName="blogName" :categories="categories"/>
    <!--  首页大图  -->
    <div class="base_mobile_hide">
      <Header :headerTitle="headerTitle" :headerImage="headerImage" v-if="$route.name==='home' && headerImage != null"/>
    </div>
    <!--  主容器  -->
    <div class="base_main">
      <div class="ui container">
        <keep-alive include="Home">
          <router-view class="base_animate"/>
        </keep-alive>
        <el-backtop></el-backtop>
      </div>
    </div>
    <Footer :copyright="copyright" :icpInfo="icpInfo" :badgeList="badgeList"/>
  </div>
</template>

<script>
import Header from "@/components/common/Header"
import Nav from "@/components/common/Nav"
import Footer from "@/components/common/Footer"
import MyAPlayer from "@/components/common/MyAPlayer";

import {getIndexSetting} from "@/request/api/Index";
import {getCategories} from "@/request/api/Category"

import {SAVE_CLIENT_SIZE, SET_WEB_TITLE_SUFFIX, SET_ADMIN_COMMENT_LABEL} from "@/store/mutations-types";

export default {
  data() {
    return {
      blogName: '',
      headerTitle: null,
      headerImage: null,
      bodyImage: null,
      cardCustom: [],
      copyright: {},
      icpInfo: '',
      badgeList: [],
      randomArticles: [],
      tags: [],
      categories: []
    }
  },
  async mounted() {
    //同步，必须收集齐配置项才加载后续请求
    const res = await getIndexSetting()
    //TODO 判断如果超时或出错，弹框提醒博客后端程序挂掉了
    await this.assignment(res)
    //保存可视窗口大小
    this.$store.commit(SAVE_CLIENT_SIZE, {
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth
    })
    //VUE钩子函数，当窗口大小发送变化时，动态改变。
    window.onresize = () => {
      this.$store.commit(SAVE_CLIENT_SIZE, {
        clientHeight: document.body.clientHeight,
        clientWidth: document.body.clientWidth
      })
    }
    //设置博客背景
    document.body.style.backgroundColor = '#efefef';
    if (this.bodyImage != null) {
      //使用img预加载图片
      const img = new Image();
      img.src = this.bodyImage;
      img.onload = () => {
        //图片加载完成才显示
        const backgroundImageDiv = document.createElement('div');
        backgroundImageDiv.style.backgroundImage = `url(${this.bodyImage})`;
        backgroundImageDiv.classList.add('base_background_image_div');
        backgroundImageDiv.id = "bgDiv";
        //将这个div添加到vue节点中
        //this.$el.appendChild(backgroundImageDiv);
        document.body.appendChild(backgroundImageDiv);
      };
    }
  },
  created() {
    getCategories().then(res => {
      //res.data就是后台返回的Result
      //concat是数组的一个方法，使用此方法后，赋值的对象只能是数组
      if (res.success) {
        this.categories = res.data;
      } else {
        this.$message.error(res.msg);
      }
    })
  },
  beforeDestroy() {
    const bgDiv = document.getElementById("bgDiv");
    if (bgDiv != null) {
      bgDiv.parentNode.removeChild(bgDiv);
    }
  },
  methods: {
    assignment(res) {
      if (res.success) {
        //博客名称
        this.blogName = res.data.blogName;
        //首图和首图标题
        this.headerTitle = res.data.headerTitle;
        this.headerImage = res.data.headerImage;
        //整体背景图
        this.bodyImage = res.data.bodyImage;
        //页脚信息
        this.copyright = res.data.copyright;
        this.icpInfo = res.data.icpInfo;
        this.badgeList = res.data.badgeList;
        //这里获取网页标题后缀立刻设置一下标题，依旧是因为同步问题
        this.$store.commit(SET_WEB_TITLE_SUFFIX, res.data.webTitleSuffix);
        this.$store.commit(SET_ADMIN_COMMENT_LABEL, res.data.adminCommentLabel);
        document.title = this.$route.meta.title + res.data.webTitleSuffix
      } else {
        this.$message.error(res.msg);
      }
    },
  },
  components: {
    Nav,
    Header,
    MyAPlayer,
    Footer
  }
}
</script>

<style scoped>
.base_site {
  display: flex;
  min-height: 120vh; /* 没有元素时，把页面撑开至120% */
  flex-direction: column;
}

.base_main {
  flex: 1;
  margin-top: 80px;
}

.ui.container {
  width: 1400px;
}

@media screen and (max-width: 750px) {
  .ui.grid {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
