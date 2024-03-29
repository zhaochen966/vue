/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
    el: "#player",
    data: {
        //歌曲名称
        searchKey: "",
        //歌曲列表
        musicList: [],
        //歌曲地址
        musicUrl: "",
        //歌曲封面
        musicCover: "",
        //热门评论
        hotCommentList: [],
        //歌曲MV
        mvUrl: "",
        //封面状态
        isPlaying: false,
        // 遮罩层状态
        isShow: false
    },
    methods: {
        //搜索歌曲
        searchMusic: function () {
            if(this.searchKey != null && this.searchKey.trim() != ''){
                var that = this;
                axios.get("https://autumnfish.cn/search?keywords=" + this.searchKey)
                    .then(
                        function (response) {
                            //console.log(response.data.result.songs);
                            that.musicList = response.data.result.songs;
                        },
                        function (err) { }
                    );
            }
        },
        //播放歌曲
        playMusic: function (musicId) {
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.data[0].url;
                }, function (err) { })
            //歌曲封面
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function (response) {
                    //console.log(response.data.songs[0].al.picUrl)
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function (err) { })
            //热门评论
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function (response) {
                    //console.log(response.data.hotComments)
                    that.hotCommentList = response.data.hotComments;
                }, function (err) { })
        },
        // 歌曲播放
        play: function () {
            // console.log("play");
            this.isPlaying = true;
        },
        // 歌曲暂停
        pause: function () {
            // console.log("pause");
            this.isPlaying = false;
        },
        // 播放mv
        getMV: function (mvid) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                function (response) {
                    //console.log(response.data.data.url);
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                },
                function (err) { }
            );
        },
        hide: function () {
            this.isShow = false;
            // 设置mv关闭，将mv的url清空即可
            this.mvUrl = '';
        }
    }
})