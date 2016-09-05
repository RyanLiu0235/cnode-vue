import * as types from './mutations';
import Vue from 'vue';

/**
 * 获取首页列表数据
 */
export const fetchList = ({ dispatch }, tabType = 'all', page = 1) => {
  return Vue.http.get('https://cnodejs.org/api/v1/topics', { params: { tab: tabType, page: page } })
    .then(res => {
      dispatch(types.GET_LIST_SUCCESS, res.data.data);
      return Promise.resolve(res.data.data);
    }, res => {
      return Promise.reject(res);
    });
};


/**
 * 获取某个帖子数据
 */
export const fetchTopic = ({ dispatch }, tid) => {
  return Vue.http.get('https://cnodejs.org/api/v1/topic/' + tid)
    .then(res => {
      dispatch(types.GET_TOPIC_SUCCESS, res.data.data);
      return Promise.resolve(res.data.data);
    }, res => {
      return Promise.reject(res);
    });
};


/**
 * 获取某个用户数据
 */
export const fetchUser = ({ dispatch }, username) => {
  return Vue.http.get('https://cnodejs.org/api/v1/user/' + username)
    .then(res => {
      dispatch(types.GET_USER_SUCCESS, res.data.data);
      return Promise.resolve(res.data.data);
    }, res => {
      return Promise.reject(res);
    });
}

/**
 * 登录验证
 */
export const signin = ({ dispatch }, accesstoken) => {
  return Vue.http.post('https://cnodejs.org/api/v1/accesstoken', { accesstoken: accesstoken })
    .then(res => {
      // 登录成功，获取用户收藏的帖子
      Vue.http.get('https://cnodejs.org/api/v1/topic_collect/' + res.data.loginname)
        .then(res_c => {
          let cids = res_c.data.data.map(function(item, index) {
            return item.id;
          });
          dispatch(types.GET_USER_COLLECT, cids);
        });
      // 登录成功，获取用户未读消息数
      Vue.http.get('https://cnodejs.org/api/v1/message/count/?accesstoken=' + accesstoken)
        .then(res_m => {
          dispatch(types.GET_USER_NOTIFICATION_NUM, res_m.data.data);
        });
      // 登录成功，本地缓存用户名与accessToken，以及用户头像
      dispatch(types.SIGN_IN_SUCCESS, { loginname: res.data.loginname, accesstoken: accesstoken, avatar_url: res.data.avatar_url });
      return Promise.resolve(res.data.loginname);
    }, res => {
      return Promise.reject(res.data.error_msg);
    });
}

/**
 * 获取用户的消息详情
 */
export const fetchNotifications = ({ dispatch }, accesstoken) => {
  return Vue.http.get('https://cnodejs.org/api/v1/messages/?accesstoken=' + accesstoken)
    .then(res => {
      dispatch(types.GET_USER_NOTIFICATION, res.data.data);
      return Promise.resolve(res.data.data);
    }, res => {
      return Promise.reject(res);
    });
}

/**
 * 标记所有未读消息
 */
export const markAllNotifications = ({ dispatch }, accesstoken) => {
  return Vue.http.post('https://cnodejs.org/api/v1/message/mark_all', { accesstoken: accesstoken })
    .then(res => {
      dispatch(types.MARK_ALL_NOTIFICATION);
      // 重新获取用户的消息详情
      fetchNotifications({ dispatch }, accesstoken);
      return Promise.resolve();
    });
}

/**
 * 登出
 */
export const signout = ({ dispatch }) => {
  dispatch(types.SIGN_OUT);
  return Promise.resolve(true);
}

/**
 * 收藏帖子
 */
export const collectTopic = ({ dispatch }, accesstoken, topic_id) => {
  return Vue.http.post('https://cnodejs.org/api/v1/topic_collect/collect', { accesstoken: accesstoken, topic_id: topic_id })
    .then(res => {
      dispatch(types.COLLECT_TOPIC_SUCCESS, topic_id);
      return Promise.resolve(res.data.success);
    }, res => {
      return Promise.reject(res);
    });
}

/**
 * 取消收藏帖子
 */
export const deCollectTopic = ({ dispatch }, accesstoken, topic_id) => {
  return Vue.http.post('https://cnodejs.org/api/v1/topic_collect/de_collect', { accesstoken: accesstoken, topic_id: topic_id })
    .then(res => {
      dispatch(types.DECOLLECT_TOPIC_SUCCESS, topic_id);
      return Promise.resolve(res.data.success);
    }, res => {
      return Promise.reject(res);
    });
}
