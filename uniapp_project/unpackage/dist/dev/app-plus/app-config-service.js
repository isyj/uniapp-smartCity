
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/allServices/allServices","pages/subPages/search/search","pages/zhihuihuanbao/zhihuihuanbao","pages/shujvfenxi/shujvfenxi","pages/user/user","pages/subPages/search/newsDetails"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#7A7E83","selectedColor":"#FFC0CB","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tabBarImg/index.png","selectedIconPath":"static/tabBarImg/index2.png","text":"首页"},{"pagePath":"pages/allServices/allServices","iconPath":"static/tabBarImg/fenlei.png","selectedIconPath":"static/tabBarImg/fenlei2.png","text":"全部服务"},{"pagePath":"pages/zhihuihuanbao/zhihuihuanbao","iconPath":"static/tabBarImg/zhihuihuanbao.png","selectedIconPath":"static/tabBarImg/zhihuihuanbao2.png","text":"智慧环保"},{"pagePath":"pages/shujvfenxi/shujvfenxi","iconPath":"static/tabBarImg/shujvfenxi.png","selectedIconPath":"static/tabBarImg/shujvfenxi2.png","text":"数据分析"},{"pagePath":"pages/user/user","iconPath":"static/tabBarImg/user.png","selectedIconPath":"static/tabBarImg/user2.png","text":"个人"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"uniapp_project","compilerVersion":"3.94","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom"}},{"path":"/pages/allServices/allServices","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"全部服务","enablePullDownRefresh":false}},{"path":"/pages/subPages/search/search","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/zhihuihuanbao/zhihuihuanbao","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/shujvfenxi/shujvfenxi","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/subPages/search/newsDetails","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});