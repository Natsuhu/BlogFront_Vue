<template>
	<div id="aplayer"></div>
</template>

<script>
	import APlayer from 'aplayer'
	import 'aplayer/dist/APlayer.min.css'
	export default {
		name: "MyAPlayer",
		data() {
		  return {
		    // 音频列表
		    audio: [
		      {
		        name: "测试",   // 音频名称
		        artist: "NatsuKaze", // 音频艺术家
		        url: "http://127.0.0.1:8090/data/1.flac",    // 音频链接
		        cover: "",  // 音频封面
		        lrc: "",    // 歌词
		        theme: "#66ccff",  // 播放这首歌曲时的主题色
		      },
		    ],
		    info: {
		      fixed: false, // 不开启吸底模式
		      listFolded: false, // 折叠歌曲列表
		      autoplay: false, // 是否自动播放
		      preload: "auto", // 自动预加载歌曲
		      loop: "all", // 播放循环模式，all全部循环 one单曲循环 none只播放一次
		      order: "list", //  播放模式，list列表播放, random随机播放
		      volume: 0.7, //默认音量，请注意播放器会记忆用户设置，用户手动设置音量后默认音量即失效
		      mutex: true, //互斥，阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
		    },
		  };
		},
		mounted(){
		    // 初始化播放器
		  this.initAPlayer();
		},
		methods: {
		    initAPlayer() {
		    // 创建一个音乐播放器实例，并挂载到DOM上，同时进行相关配置
		    const ap = new APlayer({
		      container: document.getElementById("aplayer"),
		      // 音乐信息
		      audio: this.audio, 
		      // 其他配置信息
		      ...this.info, 
		    });
		  },
		},

	}
</script>

<style scoped>

</style>