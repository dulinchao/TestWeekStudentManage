function addStudent() {
    var ID = $('#addId').val();
    var name = $('#addName').val();
    var addClass = $('#addClass').val();
    var sex = $('#addSex').val();
    var grade = $('#addGrade').val();

    if (!name || !ID || !addClass || !sex || !grade) {
        alert("不能空着嗷~~")
        return
    }

    $.ajax({
        type: "POST",
        url: "/addStudent",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": ID,
            "name": name,
            "className": addClass,
            "sex": sex,
            "grade": grade,
        }),
        success: function (response) {
            if (response.code == 200) {
                alert("添加成功")
                window.location.href = "/";
            }else {
                alert(response.message)
            }
        },
        dataType: "json"
    });
}


function change(obj) {
    let id = obj.getAttribute("id")
    let name

    $.ajax({
        type: "POST",
        url: "/query",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id
        }),
        success: function (response) {
            name = response[0].name
            let tr = obj.parentElement.parentElement
            tr.innerHTML = "<div class=\"form-inline\" style='display: -webkit-inline-box'>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addId\">学号</label>\n" +
                "                <input type=\"text\" id=" + id + "addId\"" +
                " placeholder=\"学号\" disabled value=" + id + ">\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addName\">姓名</label>\n" +
                "                <input type=\"text\" id=" + id + "addName\"" +
                " placeholder=\"姓名\" value=" + name + ">\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addClass\">班级</label>\n" +
                "                <select id=" + id + "addClass\"" +
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"一班\">一班</option>\n" +
                "                    <option value=\"二班\">二班</option>\n" +
                "                    <option value=\"三班\">三班</option>\n" +
                "                    <option value=\"四班\">四班</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addSex\">性别</label>\n" +
                "                <select id=" + id + "addSex\"" +
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"男\">男</option>\n" +
                "                    <option value=\"女\">女</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addGrade\">年级</label>\n" +
                "                <select id=" + id + "addGrade\"" +
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"2017\">2017</option>\n" +
                "                    <option value=\"2018\">2018</option>\n" +
                "                    <option value=\"2019\">2019</option>\n" +
                "                    <option value=\"2020\">2020</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "<button onclick='submitChange(this)' id=" + id + ">提交修改</button>" +
                "        </div>"
        },
        dataType: "json"
    });


}


function remove(obj) {  //将学生id传给后台
    let id = obj.getAttribute("id")
    obj.parentElement.parentElement.remove()
    $.ajax({
        type: "GET",
        url: "/deleteStudent",
        contentType: 'application/json',
        data: {
            "id": id
        },
        success: function (response) {
            if (response.code == 200) {
                alert("删除成功")
            }
        },
        dataType: "json"
    });

}

function submitChange(obj) {
    let parent = obj.parentElement
    let id = obj.getAttribute("id")
    let name = parent.children[1].children[1].value
    let className = parent.children[2].children[1].value
    let sex = parent.children[3].children[1].value
    let grade = parent.children[4].children[1].value

    $.ajax({
        type: "POST",
        url: "/updateStudent",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id,
            "name": name,
            "className": className,
            "sex": sex,
            "grade": grade,
        }),
        success: function (response) {
            if (response.code == 200) {
                alert("更新成功")
                window.location.href = "/";
            }
        },
        dataType: "json"
    });
}

function submitLesson(obj) {
    let id = obj.id
    let modal = obj.parentElement.parentElement
    let divs = modal.children[1].children;
    let values = []
    for (let i = 0; i < divs.length; i++) {
        values.push(divs[i].children[0].value)
    }
    $.ajax({
        type: "POST",
        url: "/updateLesson",
        contentType: 'application/json',
        data: JSON.stringify({
            "id": id,
            "lessons": values
        }),
        success: function (response) {
            if (response.code == 200) {
            }
        },
        dataType: "json"
    });
}

function deleteLesson(obj) {
    let div = obj.parentElement
    div.remove()
}


function addLesson(obj) {
    let div = obj.parentElement.parentElement.children[1]
    let add = document.createElement('span')
    add.innerHTML = "<input type=\"text\">\n" +
        "<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\" onclick=\"deleteLesson(this)\"></span>"
    div.appendChild(add)
}