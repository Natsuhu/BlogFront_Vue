<template>
  <div class="form">
    <span class="base_not_replay base_text_500 base_text_point" @click="setReply()"
          v-show="parentCommentId!==-1">取消回复</span>
    <el-form :inline="true" :model="commentForm" :rules="formRules" ref="formRef" size="small">
      <el-input :class="'textarea'" type="textarea" :rows="3" v-model="commentForm.content" placeholder="评论千万条，等你发一条!"
                maxlength="250" show-word-limit :validate-event="false"></el-input>
      <el-form-item prop="qq">
        <el-popover ref="qqPopover" placement="bottom" trigger="focus" content="输入QQ自动拉取昵称和头像"></el-popover>
        <el-input v-model="commentForm.qq" placeholder="昵称（必填）" :validate-event="false" v-popover:qqPopover>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-popover ref="emailPopover" placement="bottom" trigger="focus" content="回复提醒功能还在开发中~"></el-popover>
        <el-input v-model="commentForm.email" placeholder="邮箱（可选）" :validate-event="false" v-popover:emailPopover>
          <i slot="prefix" class="el-input__icon el-icon-message"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="website">
        <el-popover ref="websitePopover" placement="bottom" trigger="focus" content="可以让我参观一下吗？🍔"></el-popover>
        <el-input v-model="commentForm.website" placeholder="https://（可选）" :validate-event="false"
                  v-popover:websitePopover>
          <i slot="prefix" class="el-input__icon el-icon-map-location"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" v-throttle="[postForm,`click`,3000]">发表评论</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {SET_PARENT_COMMENT_ID} from "@/store/mutations-types"

export default {
  name: "CommentForm",

  computed: {
    ...mapState(['commentForm', 'parentCommentId'])
  },

  data() {
    return {
      SET_PARENT_COMMENT_ID,
      formRules: {
        qq: [
          {required: true, message: '昵称必填'}
        ]
      }
    }
  },

  methods: {
    postForm() {
      this.$refs.formRef.validate(async valid => {
        if (!valid || this.commentForm.content === '' || this.commentForm.content.length > 250) {
          this.$notify({
            title: '评论失败',
            type: 'warning'
          })
        } else {
          //成功时，自动取消回复，并清空文本框内容，失败则相反。
          const isSuccess = await this.$store.dispatch('submitCommentForm');
          if (isSuccess) {
            this.commentForm.content = null;
          }
        }
      })
    },
    setReply() {
      this.$store.commit(SET_PARENT_COMMENT_ID, -1)
    }
  }

}
</script>

<style>
.form {
  background-color: rgba(255, 255, 255, 0);
  position: relative;
}

.form h3 {
  margin: 5px;
  font-weight: 500 !important;
}

.form .m-small {
  margin-left: 5px;
  padding: 4px 5px;
}

.el-form .textarea {
  margin-top: 5px;
  margin-bottom: 15px;
}

.el-form textarea {
  padding: 6px 8px;
}

.el-form textarea, .el-form input {
  border: 1px solid rgba(34, 36, 38, .15);
  background-color: rgba(255, 255, 255, 0);
  font-family: "LXGWWenKai", sans-serif !important;
  color: black;
}
.el-textarea .el-input__count {
  background-color: unset;
}
.el-form .el-form-item__label {
  padding-right: 3px;
}

.mask {
  pointer-events: auto;
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.base_not_replay {
  display: inline-block;
  margin-left: 0.5em;
  color: rgba(0, 0, 0, 0.4);
  font-size: 0.875em;
  transition: color .15s linear;
}

.base_not_replay:hover {
  color: #66ccff;
}
</style>
