<template>
  <div class="ui centered grid">
    <!--左侧占位-->
    <div class="two wide column"/>
    <!--中间-->
    <div class="eleven wide column">
      <div class="ui segments">
        <div class="ui attached segment base_padding_tb_large">
          <div class="ui middle aligned mobile reversed stackable">
            <div class="ui grid">
              <!--标题-->
              <div class="row base_padding_tb_small">
                <h2 class="ui header base_center">{{ article.title }}</h2>
              </div>
              <!--文章简要信息-->
              <div class="row base_padding_tb_small">
                <div class="ui horizontal link list base_center">
                  <div class="item">
                    <div class="ui label">
                      <i class="small folder open icon"/><span class="base_text_500">分类：{{ article.categoryName }}</span>
                    </div>
                  </div>
                  <div class="item">
                    <div class="ui label">
                      <i class="small calendar icon"/>发布于：{{ article.createTime | dateFormat('YYYY-MM-DD') }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="ui label">
                      <i class="small eye icon"/>阅读量：{{ article.views }}
                    </div>
                  </div>
                  <div class="item">
                    <div class="ui label">
                      <i class="small pencil icon"/>字数≈{{ article.words }}字
                    </div>
                  </div>
                  <div class="item">
                    <div class="ui label">
                      <i class="small clock icon"/>阅读时长≈{{ article.readTime }}分
                    </div>
                  </div>
                  <a class="item base_common_black" @click.prevent="bigFontSize = !bigFontSize">
                    <el-tooltip effect="dark" content="切换字体大小" placement="top">
                      <i class="font icon"/>
                    </el-tooltip>
                  </a>
                  <a class="item base_common_black" @click.prevent="showCatalog = !showCatalog">
                    <el-tooltip effect="dark" content="隐藏/显示右侧版块" placement="top">
                      <i class="book icon"/>
                    </el-tooltip>
                  </a>
                </div>
              </div>
              <articleContent v-viewer :article-content="article.content" :bigFontSize="bigFontSize"/>
            </div>
          </div>
        </div>
        <!--文章信息-->
        <div class="ui segment blue">
          <div class="ui list">
            <div class="item">本文作者：{{ article.authorName }}
              <router-link to="/about">（联系作者）</router-link>
            </div>
            <div class="item">发表时间：{{ article.createTime | dateFormat('YYYY-MM-DD') }}</div>
            <div class="item">最后修改：{{ article.editTime | dateFormat('YYYY-MM-DD') }}</div>
            <div class="item">本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议。你可自由转载、引用，且允许商业性使用。但需署名作者且注明文章出处。</div>
          </div>
        </div>
        <!--评论区-->
        <div class="ui segment blue" v-if="isCloseComment">
          <h3 class="ui header">评论区已关闭</h3>
        </div>
        <Comment v-else :count="count" :comments="comments"></Comment>
      </div>
    </div>
    <!--右侧文章目录-->
    <div class="two wide column">
      <div v-show="showCatalog" class="base_catalog base_mobile_hide">
        <div class="ui segments">
          <div class="ui segment">
            <span>🧾 文章目录</span>
          </div>
          <div class="ui blue segment" style="padding: 7px">
            <div class="ui selection list">
              <!-- 在方法中传入$event，可以获取到这个事件的调用者 -->
              <div v-for="(x, index) in catalog" :key="index" @click="scrollTo(x.id)" class="item" :class="{ active: activeCatalog === x.id }">{{x.title}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment"
import {getReadArticleById} from "@/request/api/Article"
import {SET_COMMENT_QUERY_PAGE, SET_COMMENT_QUERY_ARTICLE_ID, SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
import {mapState} from 'vuex'
import Vue from "vue"

export default {
  name: "ReadArticle",
  data() {
    return {
      article: {},
      isCloseComment: true,
      bigFontSize: false,
      showCatalog: true,
      activeCatalog: null,
      isManualScroll: false,
      catalog: []
    }
  },
  computed: {
    ...mapState(['count', 'comments', 'focusMode']),
    articleId() {
      return parseInt(this.$route.params.id)
    }
  },
  beforeRouteUpdate(to, from, next) {
    //解决浏览器地址变化，但文章内容不会变的bug
    if (to.path !== from.path) {
      this.commitParam(to.params.id)
      this.getArticle(to.params.id)
      next()
    }
  },
  beforeDestroy() {
    //离开此页销毁滚动监听
    window.removeEventListener('scroll', this.beforeRouteUpdate);
  },
  created() {
    this.init()
    this.getArticle()
  },
  mounted() {
    //监听滚动事件（添加节流优化）
    window.addEventListener('scroll', this.throttle(this.updateCatalogActive, 300));
  },
  methods: {
    //初始化
    init() {
      this.$store.commit(SET_COMMENT_QUERY_PAGE_NO, 1)
      this.$store.commit(SET_COMMENT_QUERY_PAGE, 1)
      this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID, this.articleId)
    },
    //获取文章
    getArticle(id = this.articleId) {
      getReadArticleById(id).then((res) => {
        if (res.success) {
          this.article = res.data;
          this.category = this.article.category
          this.catalog = this.article.catalog
          this.isCloseComment = !this.article.isCommentEnabled;
          //如果允许评论则获取评论数据
          if (this.article.isCommentEnabled) {
            this.$store.dispatch('getComments');
          }
          //渲染完成后执行
          this.$nextTick(() => {
            //为所有的Code块加上line-numbers类名，以展示每行的行号
            let codes = document.querySelectorAll('code')
            for (let i = 0; i < codes.length; i++) {
              codes[i].classList.add('line-numbers')
            }
            //渲染代码高亮
            Prism.highlightAll()
          })
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    //文章内点目录跳转
    scrollTo(catalogId) {
      this.isManualScroll = true
      this.activeCatalog = catalogId
      const target = document.querySelector("#" + catalogId)
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
      setTimeout(() => {
        this.isManualScroll = false;
      }, 1500);
    },
    //节流函数
    throttle(fn, delay) {
      let timer = null;
      return () => {
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(this);
            timer = null;
          }, delay);
        }
      };
    },
    //更新右侧目录的激活状态，这个方法被滚动监听调用
    updateCatalogActive() {
      if (this.isManualScroll) return;
      const scrollPos = window.scrollY + 60
      let activeSection = null
      //遍历章节元素判断位置
      this.catalog.forEach(item => {
        const element = document.querySelector("#" + item.id)
        const top = element.offsetTop
        if (scrollPos >= top) {
          activeSection = element.id
        }
      })
      this.activeCatalog = activeSection
    },
    //更新路由时，提交文章ID，以获取评论
    commitParam(id) {
      this.$store.commit(SET_COMMENT_QUERY_ARTICLE_ID, id)
    }
  },
  components: {
    Comment,
    'articleContent': {
      props: {
        articleContent: {
          type: String
        },
        bigFontSize: {
          type: Boolean
        }
      },
      render(h) {
        const com = Vue.extend({
          template: `<div id="article-content" class="typo" :class="{'base_big_fontsize':${this.bigFontSize}}">${this.articleContent}</div>`
        })
        return h(com, {})
      }
    }
  }
}
</script>

<style scoped>
h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
  display: block;
  content: " ";
  height: 55px;
  margin-top: -55px;
  visibility: hidden;
}
.eleven.wide {
  padding: 0 !important;
}
.two.wide {
  padding-top: 0 !important;
}
.base_catalog {
  position: fixed;
  width: 17.5rem;
  text-align: left;
  animation-name: scaleIn;
  animation-duration: 0.2s;
}
.ui.selection.list>.item.active {
  color: #42b983;
}
</style>
