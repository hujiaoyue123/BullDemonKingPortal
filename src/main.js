import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../src/assets/iconfont/iconfont.css';    // 阿里巴巴图标
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts;

Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    // el: '#app',
    router,
    render: h => h(App),
      //$mount与el绑定没有区别  vue绑定的另外一种形式
}).$mount('#app');


