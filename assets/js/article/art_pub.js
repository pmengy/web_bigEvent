$(() => {
  const form = layui.form;
  // 初始化富文本编辑器
  initEditor();
  // 定义文章的发布状态
  let art_state = '已发布';
  $('#btnSave2').on('click', function () {
    art_state = '草稿';
  });

  // 获取文章分类
  const initCate = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        let htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        // 重新渲染下拉框
        form.render('select');
      },
    });
  };
  // 1. 初始化图片裁剪器
  const $image = $('#image');

  // 2. 裁剪选项
  const options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview',
    movable: false,
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);

  // 为选择封面的按钮，绑定点击事件处理函数
  $('#btnChooseImage').on('click', function () {
    $('#coverFile').click();
  });

  // 监听 coverFile 的 change 事件，获取用户选择的文件列表
  $('#coverFile').on('change', (e) => {
    // 获取到文件的列表数组
    const file = e.target.files;
    // 判断用户是否选择了文件
    if (file.length === 0) return layer.msg('请上传图片');
    // 根据文件，创建对应的 URL 地址
    const newImgURL = URL.createObjectURL(file[0]);
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 为表单绑定 submit 提交事件
  $('#form-pub').on('submit', function (e) {
    e.preventDefault();
    const fd = new FormData($(this)[0]);
    fd.append('state', art_state);
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        //  将文件对象，存储到 fd 中
        fd.append('cover_img', blob);
        // 发起 ajax 数据请求
        publishArticle(fd);
      });
  });

  const publishArticle = (fd) => {
    $.ajax({
      url: '/my/article/add',
      method: 'POST',
      data: fd,
      contentType: false,
      processData: false,
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        // 跳转到文章列表页面
        location.href = '/article/art_list.html';
        window.parent.change();
      },
    });
  };
  initCate();
});
