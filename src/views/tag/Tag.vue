<template>
  <div class="ui centered grid">
    <!--中间-->
    <div class="twelve wide column">
      <div class="ui top segment base_text_center">
        <h2 class="ui header">此标签下的文章</h2>
      </div>
      <ArticleItem v-for="(article , index) in articles" :key="index" :article="article"></ArticleItem>
      <div class="pagination base_margin_b" v-show="totalPage > 1">
        <el-pagination background layout="prev, pager, next" :page-count="totalPage"
                       :current-page="articleQueryParams.page"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleItem from "@/components/articlelist/ArticleItem"
import {getArticlesByTagId} from "@/request/api/Article"

export default {
  name: "Tag",

  data() {
    return {
      articles: [],
      totalPage: 0,
      articleQueryParams: {
        tagIds: 0,
        pageNo: 1,
        pageSize: 3
      }
    }
  },

  computed: {
    tagId() {
      return parseInt(this.$route.params.id)
    }
  },

  beforeRouteUpdate(to, from, next) {
    if (to.path !== from.path) {
      this.articleQueryParams.tagIds = to.params.id
      this.getArticlesByTagId(this.articleQueryParams)
      next()
    }
  },

  created() {
    this.articleQueryParams.tagIds = this.tagId
    this.getArticlesByTagId(this.articleQueryParams)
  },

  methods: {
    handleCurrentChange(newPage) {
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.articleQueryParams.page = newPage
      getArticleByTagId(this.articleQueryParams).then(res => {
        if (res.success) {
          this.articles = res.data;
          this.totalPage = res.totalPage;
        } else {
          this.$message.error(res.data.msg);
        }
      })
    },
    getArticlesByTagId(articleQueryParams) {
      getArticlesByTagId(articleQueryParams).then(res => {
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
    ArticleItem,
  }
}
</script>

<style scoped>
.twelve.wide {
  padding: 0px !important;
}

.pagination {
  width: 100%;
  text-align: center;
}
</style>
