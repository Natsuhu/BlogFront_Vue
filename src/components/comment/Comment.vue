<template>
  <div class="ui blue segment">
    <CommentForm v-if="parentCommentId===-1"/>
    <!--评论区-->
    <div class="ui comments">
      <h3 class="ui header" v-if="count>0">Comments | 共{{ count }}条评论</h3>
      <h3 class="ui header" v-else>快来抢沙发！</h3>
      <!--root评论-->
      <div class="comment base_margin_b_large" v-for="(rootComment , index) in comments" :key="index">
        <a class="ui circular image avatar">
          <img :src="rootComment.content.avatar">
        </a>
        <div class="content base_margin_b">
          <span class="author">{{ rootComment.content.nickname }}</span>
          <div class="metadata">
            <span class="date">{{ rootComment.content.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</span>
            <span class="base_replay base_text_point"
                  @click="setReply(rootComment.id , rootComment.content.nickname , rootComment.content.originId)">回复
            </span>
          </div>
          <div class="text">
            <p style="white-space: pre-wrap;">{{ rootComment.content.content }}</p>
          </div>
        </div>
        <CommentForm v-if="parentCommentId===rootComment.id"/>
        <!--children评论-->
        <div class="comments base_children_comments" v-for="(childrenComment , index) in rootComment.children"
             :key="index">
          <div class="comment">
            <a class="ui circular image avatar">
              <img :src="childrenComment.content.avatar">
            </a>
            <div class="content">
              <span class="author">{{ childrenComment.content.nickname }}</span>
              <div class="metadata">
                <span class="date">{{ childrenComment.content.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</span>
                <span class="base_replay base_text_point"
                      @click="setReply(childrenComment.id , childrenComment.content.nickname , childrenComment.content.originId)">
                  回复
                </span>
              </div>
              <div class="text">
                <span><strong>@{{ childrenComment.content.replyNickname }}：</strong></span>
                <span style="white-space: pre-wrap;">{{ childrenComment.content.content }}</span>
              </div>
            </div>
            <CommentForm v-if="parentCommentId===childrenComment.id"/>
          </div>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="base_text_center base_margin_b" v-show="totalPage > 1">
      <el-pagination background layout="prev, pager, next" :page-count="totalPage"
                     :current-page="commentQueryParams.pageNo"
                     @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SET_PARENT_COMMENT_ID, SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
import CommentForm from "@/components/comment/CommentForm"

export default {
  name: 'Comment',
  props: {
    count: 0,
    comments: Array
  },
  computed: {
    ...mapState(['parentCommentId', 'totalPage', 'commentQueryParams'])
  },
  methods: {
    setReply(id) {
      this.$store.commit(SET_PARENT_COMMENT_ID, id)
    },
    handleCurrentChange(newPage) {
      this.$store.commit(SET_COMMENT_QUERY_PAGE_NO, newPage)
      this.$store.dispatch('getComments')
    }
  },
  components: {
    CommentForm
  }
}
</script>

<style scoped>
.ui.header {
  padding-bottom: 3px;
  border-bottom: 1px solid rgba(34, 36, 38, .15);
}

.ui.comments {
  width: 100% !important;
  max-width: unset !important;
}

.base_children_comments {
  margin-left: 3.5rem !important;
  padding-right: 1em !important;
  width: 90% !important;
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}

.base_replay {
  transition: color .15s linear;
}

.base_replay:hover {
  color: #66ccff;
}
</style>
