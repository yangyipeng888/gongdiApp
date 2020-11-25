<template>
  <div class="study_container">
    <div class="study_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'安全学习'"
      ></nav-bar>
      <div class="content">
        <video class="video" src="http://39.100.94.4:38080/Wanke/static/video/vr.mp4" controls="controls">
          your browser does not support the video tag
        </video>
        <van-tabs class="sel_tab" v-model="active" animated swipeable>
          <tab :title="'安全新闻'">
            <div class="news_item van-hairline--bottom" v-for="item in newsList">
              <div class="news_title">{{item.title}}</div>
              <div class="news_middle" v-show="item.show">
                {{item.content}}
              </div>
              <div class="news_bottom">
                <div class="news_time">{{item.time}}</div>
                <div @click="clickMore(item)" class="news_read">{{item.show?'关闭全文':'查看全文'}}</div>
              </div>
            </div>
          </tab>
          <tab :title="'安全小知识'">
            <div class="know_item">
              <h1 class="know_title">
                {{knowTitle}}
              </h1>
              <div class="know_content">
                {{knowContent}}
              </div>
            </div>

          </tab>


        </van-tabs>
      </div>

    </div>

  </div>
</template>

<script>

  import tab from '../components/tab'
  import navBar from '../components/navBar'

  export default {
    name: 'study',
    components: {
      navBar,
      tab

    },
    data() {
      return {
        active: 0,
        newsList: [
          {
            title: '警钟长鸣，筑牢安全“防火墙”',
            show: false,
            time: '2020-11-19',
            content: '为了使全校全体师生了解消防基础知识，提高安全防范意识，增强自我保护能力，掌握对突发火灾的应变、逃生技能，确保师生生命安全及财产安全，扶风小学多措并举，开展消防安全教育。\n' +
              '\n' +
              '升旗仪式，宣传到位\n' +
              '\n' +
              '11月9日早晨，扶风小学举行了“关注消防，生命至上”升旗仪式。教师陈会萍、学生3人进行了“消防安全 ”国旗下演讲，学校部署安排了消防安全主题教育活动。'
          },
          {
            title: '警惕“法不责众”的致命陋习：不戴头盔、不系安全带',
            show: false,
            time: '2020-11-19',
            content: '为了使全校全体师生了解消防基础知识，提高安全防范意识，增强自我保护能力，掌握对突发火灾的应变、逃生技能，确保师生生命安全及财产安全，扶风小学多措并举，开展消防安全教育。\n' +
              '\n' +
              '升旗仪式，宣传到位\n' +
              '\n' +
              '11月9日早晨，扶风小学举行了“关注消防，生命至上”升旗仪式。教师陈会萍、学生3人进行了“消防安全 ”国旗下演讲，学校部署安排了消防安全主题教育活动。'
          },
          {
            title: '上海市崇明区缪京区长带队开展安全生产和消防工作',
            show: false,
            time: '2020-11-19',
            content: '为了使全校全体师生了解消防基础知识，提高安全防范意识，增强自我保护能力，掌握对突发火灾的应变、逃生技能，确保师生生命安全及财产安全，扶风小学多措并举，开展消防安全教育。\n' +
              '\n' +
              '升旗仪式，宣传到位\n' +
              '\n' +
              '11月9日早晨，扶风小学举行了“关注消防，生命至上”升旗仪式。教师陈会萍、学生3人进行了“消防安全 ”国旗下演讲，学校部署安排了消防安全主题教育活动。'
          },
          {
            title: '中国化学品安全协会西南培训基地落户泸州',
            show: false,
            time: '2020-11-19',
            content: '为了使全校全体师生了解消防基础知识，提高安全防范意识，增强自我保护能力，掌握对突发火灾的应变、逃生技能，确保师生生命安全及财产安全，扶风小学多措并举，开展消防安全教育。\n' +
              '\n' +
              '升旗仪式，宣传到位\n' +
              '\n' +
              '11月9日早晨，扶风小学举行了“关注消防，生命至上”升旗仪式。教师陈会萍、学生3人进行了“消防安全 ”国旗下演讲，学校部署安排了消防安全主题教育活动。'
          },
          {
            title: '中国化学品安全协会西南培训基地落户泸州',
            show: false,
            time: '2020-11-19',
            content: '为了使全校全体师生了解消防基础知识，提高安全防范意识，增强自我保护能力，掌握对突发火灾的应变、逃生技能，确保师生生命安全及财产安全，扶风小学多措并举，开展消防安全教育。\n' +
              '\n' +
              '升旗仪式，宣传到位\n' +
              '\n' +
              '11月9日早晨，扶风小学举行了“关注消防，生命至上”升旗仪式。教师陈会萍、学生3人进行了“消防安全 ”国旗下演讲，学校部署安排了消防安全主题教育活动。'
          }

        ],
        knowTitle: '如何防范高空坠落',
        knowContent: '    高空作业的安全风险主要是高处坠落，可分为临边坠落、洞口坠落、脚手架坠落、悬空高处作业坠落、踩破轻型屋面坠落、拆除工作中坠落、登高过程中坠落等类型。' +
          '\n     临边坠落。主要风险如下：建筑作业面周边未安装防护栏或防护栏不合格；违章作业；临边防护栏损坏或被移走；作业人员防护措施落实不到位等。' +
          '\n     洞口坠落。主要风险如下：操作不慎，身体失稳；在洞口旁边嬉闹起哄打架；洞口没有安全防护设施；安全防护设施安装不牢、不合格或损坏等。' +
          '\n     悬空高处作业坠落。主要风险如下：立足面狭小，用力过猛，身体失稳，重心超出立足地；脚底打滑或不慎踩空；未系安全带或未正确使用；安全带挂钩不牢固；现场未设置安全绳；作业面未设置安全兜网等。'


      }
    },
    mounted() {

    },
    methods: {
      clickMore(item) {
        item.show = !item.show
      },
      onClickLeft() {
        this.$router.push({ path: '/' })
      },
      previewImg(url) {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }


    }
  }
</script>

<style lang="scss">
  .study_container {
    height: 100vh;
    width: 100%;
    position: relative;


    .study_main {
      height: 100%;
      display: flex;
      flex-direction: column;

      .nav {
        /*position: absolute;*/
        height: 46px;
      }

      .content {
        width: 100%;
        padding: 0;
        position: absolute;
        top: 46px;
        bottom: 0px;
        left: 0px;
        overflow: scroll;
        background-color: white;

        .video {
          width: 100%;
          height: 200px;
        }

        .news_item {
          padding: 8px;

          .news_title {
            font-size: 19px;
            font-weight: 600;
          }

          .news_bottom {
            margin-top: 7px;
            display: flex;
            justify-content: space-between;
            color: gray;

            .news_time {

            }

            .news_read {
              font-size: 13px;
            }
          }
        }

        .know_item {
          padding: 8px;

          .know_title {
            text-align: center;
            font-size: 20px;
          }

          .know_content {
            font-size: 17px;
            word-break: break-all;
            white-space: pre-wrap;
          }
        }


      }
    }


  }

</style>
