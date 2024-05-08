<template>
  <div class="ui segment base_margin_b_large">
    <!-- 置顶标记 -->
    <div class="ui large red right corner label" v-if="article.isTop">
      <i class="arrow alternate circle up icon"></i>
    </div>
    <div class="ui grid base_margin_lr">
      <!--标题-->
      <div class="row">
        <h3 class="ui header base_center base_text_point base_title" @click="read(article.id)">{{ article.title }}</h3>
      </div>
      <!--文章简要信息-->
      <div class="row base_padding_tb_small">
        <div class="ui horizontal list base_center base_text_noselect">
          <div class="item base_datetime_color">
            <i class="small calendar icon"></i><span>{{ article.createTime | dateFormat('YYYY-MM-DD') }}</span>
          </div>
          <div class="item base_views_color">
            <i class="small eye icon"></i><span>{{ article.views }}</span>
          </div>
          <div class="item base_common_black">
            <i class="small pencil icon"></i><span>字数≈{{ article.words }}字</span>
          </div>
          <div class="item base_common_black">
            <i class="small clock icon"></i><span>阅读时长≈{{ article.readTime }}分</span>
          </div>
        </div>
      </div>
      <!--文章分类-->
      <div @click="categoryRoute(article.categoryId)" class="ui large label base_text_point base_category">
        <i class="small folder open icon"></i><span class="base_text_500">{{ article.categoryName }}</span>
      </div>
      <!--文章描述-->
      <div class="row">
        <div class="typo" v-html="article.description"></div>
      </div>
      <!--首图-->
      <div class="row base_text_point" @click="read(article.id)">
        <img class="base_center" style="border-radius: 5px;" :src="article.thumbnail">
      </div>

      <!--按钮-->
      <!--			<div class="row">-->
      <!--				<div class="ui animated fade button base_center" @click="read(article.id)">-->
      <!--					<div class="visible content">阅读全文</div>-->
      <!--					<div class="hidden content"><i class="arrow right icon"></i></div>-->
      <!--				</div>-->
      <!--			</div>-->

      <!--分割线-->
      <div class="ui divider base_margin_lr_no"></div>
      <!--标签列表-->
      <div class="row base_padding_tb_no base_margin_b_mini">
        <div class="ui label base_margin_b base_margin_r" v-for="(tag , index) in article.tags" :key="index"
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
.base_category {
  position: relative;
  right: 2.2em;
  color: white;
  background-color: #409EFF;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.base_title {
  letter-spacing: 1px;
  transition: .3s ease !important;
}

.base_title:hover {
  transform: scale(1.1) !important;
}
</style>
