!function () {
    var APP_ID = 'ojWnt3R7kkd4okY4vPOwuiL6-gzGzoHsz';
    var APP_KEY = 'VEppRirJ4GCFoxNOzQPJrUcI';

    AV.init({
        appId: APP_ID,
        appKey: APP_KEY
    });

    var query = new AV.Query('Message');
    query.find().then(function (messages) {
        let array = messages.map((item) => { return item.attributes })
        array.forEach((item) => {
            let Li = document.createElement('li')
            Li.innerText = `${item.user}:${item.content}`
            messageList.appendChild(Li)
        })

    }, function (error) {
        // 异常处理
    }).then(
        () => { },
        (error) => {
            console.log(error)
        }
    );
    let myForm = document.querySelector('#postMessage')
    let messageList = document.querySelector('#messageList')
    myForm.addEventListener('submit', function (e) {
        e.preventDefault()//取消默認的會刷新頁面事件
        let user = myForm.querySelector('input[name=user]').value
        let content = myForm.querySelector('input[name=content]').value
        var Message = AV.Object.extend('Message');
        var messages = new Message();
        messages.save({
            user: user,
            content: content
        }).then(function (object) {
            let Li = document.createElement('li')
            Li.innerText = `${object.attributes.user}:${object.attributes.content}`
            messageList.appendChild(Li)
            myForm.querySelector('input[name=content]').value = ''
            myForm.querySelector('input[name=user]').value = ''
        })

    })
}.call()