function register() {
    var userName = $('#InputName').val();
    var ID = $('#InputId').val();
    var password = $('#InputPassword').val();
    var identity = $('#InputIdentity').val();

    if (!userName || !ID || !password || !identity) {
        alert("不能为空哦");
        return
    }
    $.ajax({
        type: "POST",
        url: "/register",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": ID,
            "userName": userName,
            "password": password,
            "identity": identity
        }),
        success: function (response) {
            if (response.code == 200) {
                window.location.href = "/";
            } else if (response.code == 2001) {
                alert(response.message);
                return
            }
        },
        dataType: "json"
    });
}

function login() {
    var ID = $('#InputId').val();
    var password = $('#InputPassword').val();

    if (!ID || !password) {
        alert("不能为空哦");
        return
    }

    $.ajax({
        type: "POST",
        url: "/login",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": ID,
            "password": password
        }),
        success: function (response) {
            if (response.code == 200) {
                window.location.href = "/";
            }else if(response.code == 2005){
                window.location.href = "/student/"+response.message;
            } else {
                alert(response.message);
            }
        },
        dataType: "json"
    });

}