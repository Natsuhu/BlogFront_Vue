<template>
  <div class="ui centered grid">
    <!--左侧-->
    <div class="three wide column base_mobile_hide">
      <DataCard :cardInfo="cardInfo" :cardCustom="cardCustom" v-show="!this.focusMode"/>
      <Notice v-if="false"/>
      <RandomArticle :randomArticles="randomArticles" v-show="!this.focusMode"/>
      <TagList :tags="tags" v-show="!this.focusMode"/>
    </div>
    <!--中间-->
    <div class="ten wide column">
      <!--加载器-->
      <div v-if="articles.length === 0" class="ui segment">
        <div class="ui placeholder">
          <div class="image header">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      </div>
      <ArticleItem v-for="(article , index) in articles" :key="index" :article="article" />
    </div>
    <!-- 底部分页 -->
    <div class="pagination base_margin_b" v-show="totalPage > 1">
      <el-pagination background layout="prev, pager, next" :page-count="totalPage"
                     :current-page="baseQueryParams.pageNo"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import DataCard from "@/components/common/DataCard"
import Notice from "@/components/common/Notice"
import RandomArticle from "@/components/common/RandomArticle"
import TagList from "@/components/common/TagList"
import ArticleItem from "@/components/articlelist/ArticleItem"
import {getHomeArticles} from "@/request/api/Article"
import {getRandomArticles} from "@/request/api/Article"
import {getTags} from "@/request/api/Tag"
import {getCardSetting} from "@/request/api/Index";

export default {
  name: "Home",
  data() {
    return {
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
      cardCustom: [],
      randomArticles: [],
      tags: [],
      articles: [],
      totalPage: 0,
      baseQueryParams: {
        pageNo: 1,
        pageSize: 3
      }
    }
  },
  computed: {
    ...mapState(['clientSize', 'focusMode'])
  },
  created() {
    getCardSetting().then(res => {
      if (res.success) {
        this.cardInfo.cardAvatar = res.data.cardAvatar;
        this.cardInfo.cardName = res.data.cardName;
        this.cardInfo.cardSignature = res.data.cardSignature;
        this.cardInfo.github = res.data.github;
        this.cardInfo.qq = res.data.qq;
        this.cardInfo.bilibili = res.data.bilibili;
        this.cardInfo.netease = res.data.netease;
        this.cardInfo.email = res.data.email;
        this.cardCustom = res.data.cardCustom;
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
    getHomeArticles(this.baseQueryParams).then(res => {
      if (res.success) {
        this.articles = res.data;
        this.totalPage = res.totalPage;
      } else {
        this.$message.error(res.msg);
      }
    })
  },
  methods: {
    handleCurrentChange(newPage) {
      window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
      this.baseQueryParams.pageNo = newPage
      getHomeArticles(this.baseQueryParams).then(res => {
        if (res.success) {
          this.articles = res.data;
          this.totalPage = res.totalPage;
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  components: {
    DataCard,
    Notice,
    RandomArticle,
    TagList,
    ArticleItem
  }
}
</script>

<style scoped>
.pagination {
  width: 100%;
  text-align: center;
}
.three.wide {
  padding: 0px !important;
}

.ten.wide {
  padding-top: 0px !important;
}
</style>
