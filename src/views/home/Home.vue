<template>
  <div>
    <ArticleItem v-for="(article , index) in articles" :key="index" :article="article"></ArticleItem>
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
import ArticleItem from "@/components/articlelist/ArticleItem"
import {getHomeArticles} from "@/request/api/Article"

export default {
  name: "Home",
  data() {
    return {
      articles: [],
      totalPage: 0,
      baseQueryParams: {
        pageNo: 1,
        pageSize: 3
      }
    }
  },
  computed: {
    ...mapState(['clientSize'])
  },
  created() {
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
    ArticleItem,
  }
}
</script>

<style>
.pagination {
  width: 100%;
  text-align: center;
}
</style>
