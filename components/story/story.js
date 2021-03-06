const app = getApp();

Component({
  properties: {
    markerId: {
      type: Number,
      value: 0
    }
  },

  data: {
    title:  'hello 我是组件模版 ~ !!',
    isShow: false,
    story: {},
    poster: '//blog.sansiro.me/image/2019-last-time.jpg',
    isLoading: false
  },

  observers: {
    'markerId': function (newId) {
      console.log(newId);

      if(Number(newId) > 0) {
        console.log(this);
        console.log('markerid change');

        // this.setData({
        //   poster: '//blog.sansiro.me/image/2019-last-time.jpg'
        // })

        this.getInfoByMarkerId(newId);
      }
    }
  },

  created() {

  },

  /**
   * 组件生命周期函数-在组件实例进入页面节点树时执行)
   */
  attached() {

  },

  /**
   * 	组件生命周期函数-在组件布局完成后执行)
   */
  ready() {
    // console.log(this.data.isOwn)
  },

  /**
   * 组件生命周期函数-在组件实例被移动到节点树另一个位置时执行)
   */
  moved() {

  },

  /**
   * 组件生命周期函数-在组件实例被从页面节点树移除时执行)
   */
  detached() {

  },

  /**
   *  组件的方法，包括事件响应函数和任意的自定义方法，关于事件响应函数的使用
   */
  methods: {
    getInfoByMarkerId(pointId) {
      console.log('pointid', pointId);

      this.setData({
        isShow: true,
      })

      this.getStoryInfo(pointId);
    },
    hide() {
      this.setData({
        isShow: false,
      })
    },
    noHide() {
      return;
    },
    async getStoryInfo(pointId) {
      this.setData({
        isLoading: true
      });

      let res = await app.request('/api/map/MapPc/getStoryInfo', {
        data: {
          pointid: pointId
        }
      });

      this.setData({
        isLoading: false
      });

      if(res.code == 0) {
        console.log(res.data);

        this.setData({
          story: res.data
        })

        if(res.data.images && res.data.images.length > 0) {
          this.setData({
            poster: res.data.images[0]
          })
        }
      }
    },
    showAllScreen(e) {
      console.log(e);

      wx.previewImage({
        current: e.currentTarget.dataset.url, // 当前显示图片的http链接
        urls: this.data.story.images // 需要预览的图片http链接列表
      })
    },
    showAllInfo(e) {
      // console.log(e);
      const storyId = e.currentTarget.dataset.storyid;

      wx.navigateTo({
        url: '/pages/article/article?id=' + storyId,
      })
    }
  }
})
