$(() => {
  // 点击切换 登录和注册
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 自定义校验规则
  layui.form.verify({
    // 数组方式
    password: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 函数方式
    repwd: (value) => {
      const pwd = $('.reg-box [name="password"]').val();
      if (pwd !== value) return '两次密码不一致';
    },
  });
  $('#form_reg').submit((e) => {
    e.preventDefault();
    // 发起注册请求
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name="username"]').val().trim(),
        password: $('#form_reg [name="password"]').val(),
      },
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        $('#link_login').click();
      },
    });
  });

  $('#form_login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      },
    });
  });
});
