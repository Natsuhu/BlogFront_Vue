<template>
  <footer class="ui inverted vertical segment base_padding_tb_large base_margin_t_large base_opacity">
    <div class="ui center aligned container">
      <!-- 版权和备案号 -->
      <p class="m-text-thin base_text_spaced base_opacity_tiny">
        <span class="base_margin_r_small"> {{ copyright.title }} </span>
        <router-link to="/" class="base_margin_r" style="color:#ffe500">{{ copyright.author }}</router-link>
        <span class="base_margin_r">|</span>
        <a rel="external nofollow noopener" href="https://beian.miit.gov.cn/" target="_blank" style="color:#ffe500">{{ icpInfo }}</a>
      </p>
      <!-- 徽标 -->
      <div class="github-badge" v-for="(badge, index) in badgeList" :key="index">
        <a rel="external nofollow noopener" :href="badge.url" target="_blank" :title="badge.title">
          <span class="badge-subject">{{ badge.subject }}</span>
          <span class="badge-value" :class="`bg-${badge.color}`">{{ badge.value }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    copyright: Object,
    icpInfo: String,
    badgeList: Array
  }
}
</script>

<style>
@import "../../assets/css/badge.css";

.github-badge a {
  color: #fff;
}
</style>
