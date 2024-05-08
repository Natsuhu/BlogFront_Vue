<template>
  <header ref="header">
    <div class="view">
      <!-- 先用img标签缓存图片 -->
      <img :src="headerImage" style="display: none">
      <div class="bg" :style="{'background-image': 'url(' + headerImage + ')'}">
        <div>
          <div class="base_header_title">{{ text }}<span class="base_blink">_</span></div>
        </div>
        <div class="wrapper">
          <i class="ali-iconfont icon-down" @click="scrollToMain"></i>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Header",
  props: {
    headerTitle: String,
    headerImage: String
  },
  data() {
    return {
      index: 0,
      text: ''
    }
  },
  computed: {
    ...mapState(['clientSize'])
  },

  watch: {
    'clientSize.clientHeight'() {
      this.setHeaderHeight()
    }
  },

  mounted() {
    //设置header高度
    this.setHeaderHeight()
    //打字动效
    let count = 0
    const interval =setInterval(() => {
      this.autoTyping()
      count++
      if (count > this.text.length) {
        clearInterval(interval)
      }
    }, 300)
  },

  methods: {
    //根据可视窗口高度，动态改变首图大小
    setHeaderHeight() {
      this.$refs.header.style.height = this.clientSize.clientHeight + 'px'
    },
    //平滑滚动至正文部分
    scrollToMain() {
      window.scrollTo({top: this.clientSize.clientHeight, behavior: 'smooth'})
    },
    //打字效果
    autoTyping() {
      this.index++
      this.text = this.headerTitle.slice(0, this.index)
    }
  }
}
</script>

<style scoped>

header {
  --percentage: 0.5;
  user-select: none;
}

.view {
  width: 100%;
  height: 100%;
}

.bg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  object-fit: cover;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
}

.base_header_title {
  color: white;
  font-size: 2.5rem;
  line-height: 1.5;
  font-weight: 300;

  position: relative;
  bottom: 2em;
}

.base_blink {
  animation: blink 1s infinite;
}

/* 闪烁效果 */
@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.wrapper {
  position: absolute;
  bottom: 150px;
  width: 100px;
  margin: auto;
  font-size: 26px;
  z-index: 10;
}

.wrapper i {
  color: white;
  font-size: 60px;
  /*opacity: 0.5;*/
  cursor: pointer;
  position: absolute;
  top: 55px;
  left: 20px;
  animation: opener .5s ease-in-out alternate infinite;
  transition: opacity .2s ease-in-out, transform .5s ease-in-out .2s;
}

@keyframes opener {
  100% {
    top: 65px
  }
}

/*.wrapper i:hover {*/
/*  opacity: 1;*/
/*}*/

</style>