<template>
  <div>
    <!--文章数量-->
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="base_text_500">文章归档</h2>
      <p>写了 {{ count }} 篇文章</p>
    </div>

    <!--归档-->
    <div class="ui attached segment">
      <div v-for="(value , key , index) in archives" :key="index">
        <div><h3 class="base_text_500"><span style="color: red">#</span> {{ key }}</h3></div>
        <div class="ui stackable three column grid base_margin_tb">
          <div class="ui card base_text_500 base_text_point base_margin_b base_margin_lr"
               @click="read(article.id)"
               v-for="(article , index) in value"
               :key="index">
            <div class="ui content">
              <div class="title base_margin_b">{{ article.title }}</div>
              <div class="meta">发布于：{{ article.createTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import {getArchives} from '@/request/api/Article'

export default {

  name: "Archives",
  data() {
    return {
      count: 0,
      archives: {},
    }
  },

  created() {
    getArchives().then((res) => {
      if (res.success) {
        this.archives = res.data.archives;
        this.count = res.data.count;
      } else {
        this.$message.error(res.msg);
      }
    })
  },

  methods: {
    read(id) {
      return router.push(`/articles/read/${id}`);
    }
  }

}
</script>

<style scoped>
.title {
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: no */
  -webkit-line-clamp: 1;
  word-break: break-word;
}

.ui.card:first-child {
  margin-top: unset !important;
}

.ui.card {
  width: 30%;
  /*border: 1px solid rgba(184, 197, 214, .2) !important;*/
  /*box-shadow: 0 1px 4px rgba(0, 0, 0, .04) !important;*/
  margin-top: unset !important;
  transition: .3s ease !important;
}

.ui.card:hover {
  transform: scale(1.05) !important;
}
</style>