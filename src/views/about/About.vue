<template>
  <div class="ui centered grid">
    <!--中间-->
    <div class="twelve wide column">
      <div class="ui segments">
        <!--标题-->
        <div class="ui top segment base_text_center">
          <div v-if="title === ''" class="ui fluid placeholder">
            <div class="line"/>
          </div>
          <h2 v-else class="ui header">{{ title }}</h2>
        </div>
        <!-- 播放器和文字内容 -->
        <div class="ui segment">
          <!-- 加载器 -->
          <div v-if="content === ''" class="ui fluid placeholder">
            <div class="image header">
              <div class="line"/>
              <div class="line"/>
            </div>
            <div v-for="x in 10" :key="x" class="paragraph">
              <div class="line"/>
              <div class="line"/>
              <div class="line"/>
            </div>
          </div>
          <!-- 播放器和正文 -->
          <meting-js :server="musicServer" type="song" :id="musicId" theme="#25CCF7"  list-folded="true"
                     v-if="musicServer !== 'local' && musicId !== '' && content !== ''" />
          <meting-js :server="musicServer" :api="musicApi" type="song" :id="musicId" theme="#25CCF7" v-if="musicServer === 'local' && musicId !== '' && content !== ''" />
          <div v-if="content !== ''" class="typo content base_margin_tb_large" v-html="content"></div>
        </div>
        <!--评论区-->
        <div class="ui segment teal" v-if="isComment">
          <h3 class="ui header">评论区已关闭</h3>
        </div>
        <Comment v-else :count="count" :comments="comments"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment"
import {getAboutPageSetting} from "@/request/api/About"
import {SET_COMMENT_QUERY_OBJECT_TYPE, SET_COMMENT_QUERY_OBJECT_ID, SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
import {mapState} from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapState(['count', 'comments'])
  },
  data() {
    return {
      isComment: true,
      title: '',
      content: '',
      musicId: '',
      musicServer: '',
      musicApi: window.env.API_BASE_URL + '/music/api?id=:id&type=:type',
      objectType: 3,
      objectId: null
    }
  },
  created() {
    this.init();
    this.getSetting();
  },
  methods: {
    getSetting() {
      getAboutPageSetting().then(res => {
        if (res.success) {
          this.title = res.data.aboutTitle;
          this.content = res.data.aboutContent;
          this.musicId = res.data.aboutMusicId;
          this.musicServer = res.data.aboutMusicServer;
          //允许评论才获取评论数据
          if (res.data.aboutIsComment === "true") {
            this.isComment = !this.isComment;
            this.$store.dispatch('getComments')
          }
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    init() {
      this.$store.commit(SET_COMMENT_QUERY_PAGE_NO, 1)
      this.$store.commit(SET_COMMENT_QUERY_OBJECT_TYPE, this.objectType)
      this.$store.commit(SET_COMMENT_QUERY_OBJECT_ID, this.objectId)
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
.twelve.wide {
  padding: 0 !important;
}
</style>
