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
        <div class="ui stackable grid">
          <!--左侧-->
          <div class="three wide column base_mobile_hide">
            <DataCard :cardInfo="cardInfo" v-show="!this.focusMode"/>
            <Notice v-if="false"/>
          </div>
          <!--中间-->
          <div class="ten wide column">
            <keep-alive include="Home">
              <!-- <transition name="fade-transform" mode="out-in"> -->
              <router-view/>
              <!-- </transition> -->
            </keep-alive>
          </div>
          <!--右侧-->
          <div class="three wide column base_mobile_hide">
            <RandomArticle :randomArticles="randomArticles" v-show="!this.focusMode"/>
            <TagList :tags="tags" v-show="!this.focusMode"/>
          </div>
          <!-- 回到顶部 -->
          <el-backtop></el-backtop>
        </div>
      </div>
    </div>

    <!-- APlayer -->
    <!-- <div>
      <MyAPlayer/>
    </div> -->

    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/common/Header"
import Nav from "@/components/common/Nav"
import DataCard from "@/components/common/DataCard"
import Notice from "@/components/common/Notice"
import RandomArticle from "@/components/common/RandomArticle"
import TagList from "@/components/common/TagList"
import Footer from "@/components/common/Footer"
import MyAPlayer from "@/components/common/MyAPlayer";

import {getIndexSetting} from "@/request/api/Index";
import {getRandomArticles} from "@/request/api/Article"
import {getCategories} from "@/request/api/Category"
import {getTags} from "@/request/api/Tag"

import {SAVE_CLIENT_SIZE, SET_WEB_TITLE_SUFFIX} from "@/store/mutations-types";
import {mapState} from "vuex";

export default {
  data() {
    return {
      blogName: '',
      headerTitle: '',
      headerImage: '',
      bodyImage: '',
      cardInfo: {
        cardAvatar: '',
        cardName: '',
        cardSignature: '',
        github: null,
        qq: null,
        bilibili: null,
        netease: null,
        email: null
      },
      randomArticles: [],
      tags: [],
      categories: []
    }
  },
  mounted() {
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
    //延时一秒后设置博客背景，否则拿不到bodyImage的值。
    //因为created里面的请求是异步的，mounted并不会等待请求结束才开始。
    setTimeout(e => {
      if (this.bodyImage === null) {
        document.body.style.backgroundColor = '#efefef';
      } else {
        //先创建一个背景图容器
        const backgroundImageDiv = document.createElement('div');
        backgroundImageDiv.classList.add('base_background_image_div');
        document.body.appendChild(backgroundImageDiv);
        //使用img预加载图片
        const img = new Image();
        img.src = this.bodyImage;
        img.onload = () => {
          //图片加载完成才显示
          backgroundImageDiv.style.backgroundImage = `url(${this.bodyImage})`;
        };
      }
    }, 1000);
  },
  computed: {
    ...mapState(['focusMode'])
  },
  created() {
    getIndexSetting().then(res => {
      if (res.success) {
        //博客名称
        this.blogName = res.data.blogName;
        //首图和首图标题
        this.headerTitle = res.data.headerTitle;
        this.headerImage = res.data.headerImage;
        //整体背景图
        this.bodyImage = res.data.bodyImage;
        //资料卡信息
        this.cardInfo.cardAvatar = res.data.cardAvatar;
        this.cardInfo.cardName = res.data.cardName;
        this.cardInfo.cardSignature = res.data.cardSignature;
        this.cardInfo.github = res.data.github;
        this.cardInfo.qq = res.data.qq;
        this.cardInfo.bilibili = res.data.bilibili;
        this.cardInfo.netease = res.data.netease;
        this.cardInfo.email = res.data.email;
        //这里获取网页标题后缀立刻设置一下标题，依旧是因为同步问题
        this.$store.commit(SET_WEB_TITLE_SUFFIX, res.data.webTitleSuffix);
        document.title = this.$route.meta.title + res.data.webTitleSuffix
      } else {
        this.$message.error(res.msg);
      }
    })
    getCategories().then(res => {
      //res.data就是后台返回的Result
      //concat是数组的一个方法，使用此方法后，赋值的对象只能是数组
      if (res.success) {
        this.categories = res.data;
      } else {
        this.$message.error(res.msg);
      }
    })
    getTags().then(res => {
      if (res.success) {
        this.tags = this.tags.concat(res.data);
      } else {
        this.$message.error(res.msg);
      }
    })
    getRandomArticles().then(res => {
      if (res.success) {
        this.randomArticles = res.data;
      } else {
        this.$message.error(res.msg);
      }
    })
  },
  components: {
    Nav,
    Header,
    DataCard,
    Notice,
    RandomArticle,
    TagList,
    MyAPlayer,
    Footer
  }
}
</script>

<style scoped>
.base_site {
  display: flex;
  min-height: 100vh; /* 没有元素时，把页面撑开至100% */
  flex-direction: column;
}

.base_main {
  flex: 1;
  margin-top: 80px;
}

.ui.container {
  width: 1400px;
}

.three.wide {
  padding: 0px !important;
}

.ten.wide {
  padding-top: 0px !important;
}

/*.indexAnimate {*/
/*	animation-name: fadeIn;*/
/*	animation-duration: 0.5s;*/
/*}*/

@media screen and (max-width: 750px) {
  .ui.grid {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
</style>
