function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      renderAvatar(res.data);
    },
    // 不论成功还是失败，最终都会调用 complete 回调函数
    // complete: (res) => {
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     // 强制清空 token
    //     localStorage.removeItem('token');
    //     // 强制跳转到登录页面
    //     location.href = '/login.html';
    //   }
    // },
  });
}
getUserInfo();

// 渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  // 按需渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};

// 退出登录模块
$('#btnLogout').click(() => {
  layer.confirm('真的要退出吗?', { icon: 3, title: '提示' }, function (index) {
    // 清空本地存储里面的 token
    localStorage.removeItem('token');
    // 重新跳转到登录页面
    location.href = '/login.html';
  });
});

function change() {
  $('#change').addClass('layui-this').next().removeClass('layui-this');
}
