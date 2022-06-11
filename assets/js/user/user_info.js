$(() => {
  const form = layui.form;
  // 自定义校验规则
  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '昵称长度必须在 1 ~ 6 个字符之间！';
    },
  });
  // 获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        form.val('formUserInfo', res.data);
      },
    });
  };
  initUserInfo();
  $('#btnReset').click((e) => {
    e.preventDefault();
    initUserInfo();
  });
  // 更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('更新用户信息成功！');
        window.parent.getUserInfo();
      },
    });
  });
});
