$(() => {
  const form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验新密码是否和原密码一致
    samePwd: (val) => {
      if (val === $('[name=oldPwd]').val()) return '新旧密码不能相同！';
    },
    // 校验新密码是否和确认密码一致
    rePwd: (val) => {
      if (val !== $('[name=newPwd]').val()) return '两次密码不一致！';
    },
  });
  $('.layui-form').submit((e) => {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $('.layui-form').serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        // 强制清空token
        localStorage.removeItem('token');
        // 强制跳转到登录页面
        window.parent.location.href = '/login.html';
      },
    });
  });
});
