<template>
  <div>
    <!-- 页面标题 -->
    <div class="ui top attached segment base_text_center">
      <h2 class="base_text_500">我的动态</h2>
      <p>发了 {{ total }} 次牢骚</p>
    </div>
    <!--动态列表-->
    <div class="ui attached segment">
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
            <div class="ui card moment_card">
              <div class="content">
                <div class="typo description" v-viewer v-html="moment.content"></div>
              </div>
              <div class="content">
                <div><i class="like icon" :class="isLike(moment.id)?'base_like_color':'outline'"
                        @click="clickLikeMoment(moment.id)"></i> {{ moment.likes }}
                </div>
              </div>
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
</template>

<script>
import {Notification} from "element-ui";
import {getPublicMoments, likeMoment} from '@/request/api/Moment'

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
      }
    }
  },
  computed: {
    isLike() {
      return function (id) {
        return this.likeMomentIds.indexOf(id) > -1
      }
    }
  },
  watch: {
    likeMomentIds(newValue) {
      //将likeMomentIds最新值的json数据保存到localStorage
      window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
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
}
</script>

<style>
.moment_card {
  width: 100% !important;
  margin-bottom: 30px !important;
}

.moment_author {
  position: relative;
  bottom: 10px;
}

.base_like_color {
  color: red;
}
</style>
