<template>
  <div class="ui centered grid">
    <!--中间-->
    <div class="twelve wide column">
      <!-- 页面标题 -->
      <div class="ui top attached segment base_text_center">
        <h2 class="ui header">我的动态</h2>
      </div>
      <!--动态列表-->
      <div class="ui attached segment">
        <!-- 加载器 -->
        <div v-if="moments.length === 0" v-for="x in 12" :key="x" class="ui fluid placeholder">
          <div class="image header">
            <div class="line"/>
            <div class="line"/>
          </div>
        </div>
        <div class="ui feed" v-for="(moment , index) in moments" :key="index">
          <!-- 头像 -->
          <div class="event">
            <div class="label">
              <img :src="moment.avatar">
            </div>
            <div class="content">
              <!-- 作者名，发表时间 -->
              <div class="moment_author base_text_500">{{ moment.author }}</div>
              <div class="date"> {{ moment.createTime }}</div>
              <!-- 内容 -->
              <div class="ui segments base_margin_b">
                <div class="ui card">
                  <div class="content">
                    <div class="typo description" v-viewer v-html="moment.content"></div>
                  </div>
                  <div class="content">
                    <div>
                      <i class="like icon" :class="isLike(moment.id)?'base_like_color':'outline'"
                         @click="clickLikeMoment(moment.id)"/>
                      <span class="base_margin_r_large">{{ moment.likes }}</span>
                      <i v-if="moment.isCommentEnabled" class="comment outline icon base_margin_l base_text_point"
                         @click="openComment(moment.id)"/>
                      <span v-if="moment.isCommentEnabled">{{ moment.commentCount }}</span>
                    </div>
                  </div>
                </div>
                <Comment v-if="moment.isCommentEnabled && isOpenComment && openCommentMomentId === moment.id"
                         :count="moment.commentCount"
                         :comments="comments"/>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="base_text_center base_margin_b" v-show="totalPage > 1">
          <el-pagination background layout="prev, pager, next" :page-count="totalPage"
                         :current-page="baseQueryParams.pageNo"
                         @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from "@/components/comment/Comment"
import {Notification} from "element-ui"
import {getPublicMoments, likeMoment} from '@/request/api/Moment'
import {SET_COMMENT_QUERY_OBJECT_TYPE, SET_COMMENT_QUERY_OBJECT_ID, SET_COMMENT_QUERY_PAGE_NO} from "@/store/mutations-types"
import {mapState} from "vuex"

export default {
  name: 'Moment',
  data() {
    return {
      //用localStorage本地存储已点赞的动态id数组
      likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'),
      moments: [],
      totalPage: 0,
      total: 0,
      baseQueryParams: {
        pageNo: 1,
        pageSize: 5
      },
      openCommentMomentId: null,
      isOpenComment: false
    }
  },
  computed: {
    ...mapState(['count', 'comments']),
    isLike() {
      return function (id) {
        return this.likeMomentIds.indexOf(id) > -1
      }
    }
  },
  watch: {
    //将likeMomentIds最新值的json数据保存到localStorage
    likeMomentIds(newValue) {
      window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
    },
    //在当前页面，count发生变化则更新对应动态的评论数量
    count(newValue) {
      this.moments.forEach(item => {
        if (item.id === this.openCommentMomentId) {
          item.commentCount = newValue
        }
      })
    }
  },
  created() {
    this.getMoments();
  },
  methods: {
    getMoments() {
      getPublicMoments(this.baseQueryParams).then(res => {
        if (res.success) {
          this.moments = res.data
          this.totalPage = res.totalPage
          this.total = res.total
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    clickLikeMoment(id) {
      likeMoment(id).then(res => {
        if (res.success) {
          Notification({
            title: '谢谢你',
            type: 'success',
            duration: 1500
          })
          this.likeMomentIds.push(id)
          this.moments.forEach(item => {
            if (item.id === id) {
              return item.likes++
            }
          })
        } else {
          Notification({
            title: '请勿重复点赞哦',
            type: 'error',
            duration: 1500
          })
        }
      })
    },
    openComment(momentId) {
      //判断评论组件是否打开
      if (momentId !== this.openCommentMomentId) {
        this.isOpenComment = true;
        this.openCommentMomentId = momentId;
      } else {
        if (this.isOpenComment) {
          this.isOpenComment = false;
          this.openCommentMomentId = null;
        } else {
          this.isOpenComment = true;
          this.openCommentMomentId = momentId;
        }
      }
      //如果评论组件打开则获取评论数据
      if (this.isOpenComment) {
        this.$store.commit(SET_COMMENT_QUERY_PAGE_NO, 1)
        this.$store.commit(SET_COMMENT_QUERY_OBJECT_TYPE, 6)
        this.$store.commit(SET_COMMENT_QUERY_OBJECT_ID, momentId)
        this.$store.dispatch('getComments')
      }
    },
    handleCurrentChange(newPage) {
      window.scrollTo({top: 0, behavior: 'smooth'})
      this.baseQueryParams.pageNo = newPage
      getPublicMoments(this.baseQueryParams).then(res => {
        if (res.success) {
          this.moments = res.data;
          this.totalPage = res.totalPage;
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  components: {
    Comment
  }
}
</script>

<style scoped>
.ui.segments {
  width: 95.5% !important;
}

.ui.card {
  width: 100% !important;
  margin-bottom: 0px !important;
  background-color: rgba(255, 255, 255, 0);
  box-shadow: 0 2 5px rgba(0, 0, 0, .1);
}

.twelve.wide {
  padding: 0px !important;
}

.moment_author {
  position: relative;
  bottom: 10px;
}

.base_like_color {
  color: red;
}

.comment.icon:hover {
  transition: color .15s linear;
  color: #66ccff;
}
</style>
