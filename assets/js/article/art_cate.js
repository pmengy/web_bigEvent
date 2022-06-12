$(() => {
  const form = layui.form;
  const initArtCateList = () => {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        // 调用 template
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };
  // 定义弹窗索引号
  let indexAdd = null;
  // 给添加按钮绑定点击事件
  $('#btnAddCate').click(() => {
    // 保存弹窗索引号
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html(),
    });
  });

  // 通过事件委托,添加文章分类
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        initArtCateList();
        layer.close(indexAdd);
      },
    });
  });
  let indexEdit = null;
  // 通过事件委托打开编辑框
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html(),
    });
    const Id = $(this).attr('data-id');
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + Id,
      success: (res) => {
        form.val('form-edit', res.data);
      },
    });
  });

  // 修改文章分类,通过事件委托
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        initArtCateList();
        layer.close(indexEdit);
      },
    });
  });

  // 删除文章分类
  $('tbody').on('click', '.btn-delete', function () {
    const Id = $(this).attr('data-id');
    layer.confirm('确定删除吗？', { icon: 3, title: '提示' }, (index) => {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + Id,
        success: (res) => {
          if (res.status !== 0) return layer.msg(res.message);
          layer.msg(res.message);
          // 关闭询问框
          layer.close(index);
          // 重新渲染文章列表分类
          initArtCateList();
        },
      });
    });
  });

  initArtCateList();
});
