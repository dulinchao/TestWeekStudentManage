function registerEmail() {
    var userName = $('#InputName').val();
    var email = $('#InputEmail').val();
    var password = $('#InputPassword').val();
    var identity = $('#InputIdentity').val();

    if(!userName || !email || !password || !identity){
        alert("不能为空哦");
        return
    }
    var emailflag = regBox.regEmail.test(email);
    if(emailflag){
        $.ajax({
            type: "POST",
            url: "/register",
            contentType: 'application/json',
            data: JSON.stringify({
                "userName": userName,
                "email": email,
                "password":password,
                "identity":identity
            }),
            success: function (response) {
                if(response.code == 200){
                    window.location.href = "/";
                }else if(response.code == 2001){
                    alert(response.message);
                    return
                }
            },
            dataType: "json"
        });
    }else {
        alert("输入的邮箱格式不符合要求")
    }
}
var regBox = {
    regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,   //....邮箱
    regName : /^[a-z0-9_-]{3,16}$/,                       //....用户名
    regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,                 //....手机
    regTel : /^0[\d]{2,3}-[\d]{7,8}$/                     //....电话
};

function loginEmail() {
    var email = $('#InputEmail').val();
    var password = $('#InputPassword').val();

    if(!email || !password){
        alert("不能为空哦");
        return
    }
    var emailflag = regBox.regEmail.test(email);

    if(emailflag){
        $.ajax({
            type: "POST",
            url: "/login",
            contentType: 'application/json',
            data: JSON.stringify({
                "email": email,
                "password":password
            }),
            success: function (response) {
                if(response.code == 200){
                    window.location.href = "/";
                }else {
                    alert(response.message);
                }
            },
            dataType: "json"
        });
    }else {
        alert("输入的邮箱格式不符合要求")
    }

}