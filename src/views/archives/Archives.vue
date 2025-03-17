<template>
  <div class="ui centered grid">
    <!--中间-->
    <div class="twelve wide column">
      <div>
        <!--文章数量-->
        <div class="ui top attached segment" style="text-align: center">
          <h2 class="ui header">文章归档</h2>
        </div>
        <!--归档-->
        <div class="ui attached segment">
          <!-- 加载器 -->
          <div v-if="archives === null" v-for="x in 12" :key="x" class="ui fluid placeholder">
            <div class="image header">
              <div class="line"/>
              <div class="line"/>
            </div>
          </div>
          <div v-for="(value , key , index) in archives" :key="index">
            <div><h3 class="base_text_500"><span style="color: red">#</span> {{ key }}</h3></div>
            <div class="ui stackable three column grid base_margin_tb">
              <div class="ui card base_text_point base_margin_b base_margin_lr"
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
      archives: null,
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
.twelve.wide {
  padding: 0px !important;
}
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
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0 2 5px rgba(0, 0, 0, .1);
  /*border: 1px solid rgba(184, 197, 214, .2) !important;*/
  /*box-shadow: 0 1px 4px rgba(0, 0, 0, .04) !important;*/
  margin-top: unset !important;
  transition: .3s ease !important;
}
.ui.card:hover {
  transform: scale(1.05) !important;
}
</style>