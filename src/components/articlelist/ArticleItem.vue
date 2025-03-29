<template>
  <div class="ui segment base_margin_b_large">
    <!-- 置顶标记 -->
    <div class="ui large red right corner label" v-if="article.isTop">
      <i class="arrow alternate circle up icon"></i>
    </div>
    <div class="ui grid base_margin_lr">
      <!--标题-->
      <div class="row">
        <h2 class="ui header base_center base_text_point base_title" @click="read(article.id)">{{ article.title }}</h2>
      </div>
      <!--文章简要信息-->
      <div class="row base_padding_tb_small">
        <div class="ui mini horizontal list base_center base_text_noselect">
          <div class="item" @click="categoryRoute(article.categoryId)" >
            <div class="ui label">
              <i class="small folder open icon"/>分类：{{ article.categoryName }}
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
        </div>
      </div>
      <!--文章分类-->

      <!--文章描述-->
      <div class="row">
        <div class="typo" v-html="article.description"></div>
      </div>
      <!--首图-->
      <div v-viewer v-if="article.thumbnail" class="row base_text_point">
        <img class="base_center" style="border-radius: 5px;" :src="article.thumbnail">
      </div>


<!--      			<div class="row">-->
<!--      				<div class="ui animated fade button base_center" @click="read(article.id)">-->
<!--      					<div class="visible content">阅读全文</div>-->
<!--      					<div class="hidden content"><i class="arrow right icon"></i></div>-->
<!--      				</div>-->
<!--      			</div>-->

      <!--分割线-->
      <div class="ui divider base_margin_lr_no"></div>
      <!--标签列表-->
      <div class="row base_padding_tb_no base_margin_b_mini">
        <div class="ui tag label base_margin_b base_margin_r" v-for="(tag , index) in article.tags" :key="index"
             :style="{'background-color': tag.color, 'color': 'white'}">{{ tag.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: Object
  },
  methods: {
    read(id) {
      this.$router.push(`/articles/read/${id}`);
    },
    categoryRoute(id) {
      this.$router.push(`/articles/category/${id}`)
    }
  },
}
</script>

<style scoped>
.base_title {
  letter-spacing: 1px;
  transition: .3s ease !important;
}

.base_title:hover {
  transform: scale(1.1) !important;
}
</style>
