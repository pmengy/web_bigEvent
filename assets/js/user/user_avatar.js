// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image');
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview',
};

// 1.3 创建裁剪区域
$image.cropper(options);

// 模拟点击文件上传
$('#btnChooseImage').click(() => {
  $('#file').click();
});
// 给文件上传绑定change事件
$('#file').change((e) => {
  const fileList = e.target.files.length;
  if (fileList === 0) return layer.msg('请选择文件！');
  // 1. 拿到用户选择的文件
  const file = e.target.files[0];
  // 2. 将文件转化为路径
  const imgUrl = URL.createObjectURL(file);
  // 3. 重新初始化裁剪区域
  $image.cropper('destroy').prop('src', imgUrl).cropper(options);
});

$('#btnUpload').click(() => {
  // 1、拿到用户裁切之后的头像
  // 直接复制代码即可
  const dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100,
    })
    .toDataURL('image/png');
  $.ajax({
    method: 'POST',
    url: '/my/update/avatar',
    data: {
      avatar: dataURL,
    },
    success: (res) => {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg(res.message);
      window.parent.getUserInfo();
    },
  });
});
