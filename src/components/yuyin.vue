


<template>
  <div id="yuyin">
    <!-- 语音转文字 -->
    <div class="Btn_Box">
      <h3>-- 语音转文字 --</h3>
      <div>
        <em class="ict_btn" @click="startRecord()">开始录音</em>
        <em class="ict_btn" @click="endRecord">暂停录音</em>
      </div>
    </div>
    <!-- 文字转语音 -->
    <div class="Btn_Box">
      <h3>-- 文字转语音 --</h3>
      <div>
        <em class="ict_btn" @click="playVoice">播放语音</em>
        <em class="ict_btn" @click="handlepause">暂停语音</em>
        <em class="ict_btn" @click="handleresume">继续播放</em>
        <em class="ict_btn" @click="handleStop">停止播放</em>
      </div>
    </div>
    <!-- 测试 -->
    <div class="Btn_Box">
      <h3>-- 测试 --</h3>
      <em class="ict_btn" @click="read(voiceContent)">测试</em>
    </div>
    <div class="testdata">
      <textarea v-model="voiceContent"></textarea>
    </div>
  </div>
</template>
<script>
const synth = window.speechSynthesis;
const msg = new SpeechSynthesisUtterance();

export default {
  data() {
    return {
      speechContent: "",
      voiceContent: "",
      recognition: "",
      resContent: "",
      resContent1: "",
      allContent: "",
    };
  },
  methods: {
    playVoice() {
      this.handleSpeak(this.voiceContent); // 传入需要播放的文字
    },
    // 语音播报的函数
    handleSpeak(text) {
      msg.text = text; // 文字内容: 小朋友，你是否有很多问号
      msg.lang = "zh-CN"; // 获取并设置话语的语言使用的语言:中文
      // msg.voice = 1; //获取并设置说话的声音
      msg.volume = 1; // 声音音量：1
      msg.rate = 0.5; // 语速：1 获取并设置说话的速度(值越大语速越快,越小语速越慢)
      msg.pitch = 0.1; // 音高：1 获取并设置话语的音调(值越大越尖锐,越低越低沉)
      synth.speak(msg); // 播放
    },
    // 语音停止
    handleStop(e) {
      msg.text = e;
      msg.lang = "zh-CN";
      synth.cancel(msg);
    },
    // 暂停语音
    handlepause() {
      synth.pause(msg);
    },
    //  恢复暂停的语音
    handleresume() {
      synth.resume(msg);
    },

    startRecord(aa) {
      this.recognition.start();
      console.log(aa);
      //打印说话的内容
      console.log(this.voiceContent);
    },
    endRecord() {
      this.recognition.stop();
    },

    read(word) {
      const synth = window.speechSynthesis;
      const msg = new SpeechSynthesisUtterance();
      msg.text = word;
      msg.lang = "zh-CN";
      function handleSpeak(e) {
        synth.speak(msg);
      }
      function throttle(fn, delay) {
        let last = 0;
        return function () {
          const now = new Date();
          if (now - last > delay) {
            fn.apply(this, arguments);
            last = now;
          }
        };
      }
      console.log(msg);

      throttle(handleSpeak(), 1000);
    },
  },

  created() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "cmn-Hans-CN"; //普通话 (中国大陆)

    this.recognition.onresult = (event) => {
      let current = event.resultIndex;

      // 获取此前所说话的记录
      this.voiceContent = event.results[current][0].transcript;
      console.log(this.voiceContent);
    };
  },
};
</script>

<style lang="less" scoped>
#yuyin {
  .Btn_Box {
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 0.1rem 0;
    > div {
      display: flex;
    }
    .ict_btn {
      margin: 0.1rem 0.2rem;
      height: 0.4rem;
    }
  }
  .testdata {
    margin: 0 20%;
    height: 2rem;
    textarea {
      border: 0.01rem solid #ccc;
    }
  }
}
</style>