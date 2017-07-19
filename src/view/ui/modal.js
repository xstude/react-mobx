import { Modal } from 'antd';


function success(title, content, fn) {
    const modal = Modal.success({
        title: title,
        content: content,
        okText: '确定',
        onOk: function () {
            modal.destroy();
            fn && fn();
        }
    });
}


export { success };
