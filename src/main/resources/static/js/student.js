function addStudent() {
    var name = $('#addName').val();
    var addClass = $('#addClass').val();
    var sex = $('#addSex').val();
    var grade = $('#addGrade').val();
    var lesson = $('#addLesson').val();

    if(!name || !addClass || !sex || !grade || !lesson){
        alert("不能空着嗷~~")
        return
    }

    $.ajax({
        type: "POST",
        url: "/addStudent",
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "className":addClass,
            "sex":sex,
            "grade":grade,
            "lesson":lesson
        }),
        success: function (response) {
            if(response.code == 200){
                alert("添加成功")
            }
        },
        dataType: "json"
    });
}
function queryStudent() {
    var name = $('#addName').val();
    var addClass = $('#addClass').val();
    var sex = $('#addSex').val();
    var grade = $('#addGrade').val();
    var lesson = $('#addLesson').val();


    $.ajax({
        type: "POST",
        url: "/query",
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "className":addClass,
            "sex":sex,
            "grade":grade,
            "lesson":lesson
        }),
        success: function (response) {
            $('#showTable').remove()
            $('#content').append("<table class=\"table\" id=\"showTable\">\n" +
                "</table>")
            for(let i=0;i<response.length;i++){
                $('#showTable').append($("<tr/>", {
                    "id": 'item'+i
                }))
                $('#item'+i).append($("<td/>", {
                    "text": response[i].name,
                    "style":"width: 15%;padding: 8px;border-top: 1px solid #333;"
                })).append($("<td/>", {
                    "text": response[i].className,
                    "style":"width: 15%;padding: 8px;border-top: 1px solid #333;"
                })).append($("<td/>", {
                    "text": response[i].sex,
                    "style":"width: 15%;padding: 8px;border-top: 1px solid #333;"
                })).append($("<td/>", {
                    "text": response[i].grade,
                    "style":"width: 15%;padding: 8px;border-top: 1px solid #333;"
                })).append($("<td/>", {
                    "text": response[i].lesson,
                    "style":"width: 15%;padding: 8px;border-top: 1px solid #333;"
                })).append(" <td style=\"width: 25%;padding: 8px;border-top: 1px solid #333\">\n" +
                    "<a id="+response[i].id+" "+
                    "onclick=\"change(this)\">修改 </a>\n" +
                    "<a id="+response[i].id+" "+
                    "onclick=\"remove(this)\"> 删除</a>\n" +
                    "</td>")
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
            "id":id
        }),
        success: function (response) {
            name = response[0].name
            let tr = obj.parentElement.parentElement
            tr.innerHTML = "<div class=\"form-inline\" style='display: -webkit-inline-box'>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addName\">姓名</label>\n" +
                "                <input type=\"text\" id="+id+"addName\""+
                " placeholder=\"姓名\" value="+name+">\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addClass\">班级</label>\n" +
                "                <select id="+id+"addClass\""+
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
                "                <select id="+id+"addSex\""+
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"男\">男</option>\n" +
                "                    <option value=\"女\">女</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addGrade\">年级</label>\n" +
                "                <select id="+id+"addGrade\""+
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"2017\">2017</option>\n" +
                "                    <option value=\"2018\">2018</option>\n" +
                "                    <option value=\"2019\">2019</option>\n" +
                "                    <option value=\"2020\">2020</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "            <div style='margin-right: 10px'>\n" +
                "                <label for=\"addLesson\">课程</label>\n" +
                "                <select id="+id+"addLesson\""+
                ">\n" +
                "                    <option></option>\n" +
                "                    <option value=\"离散数学\">离散数学</option>\n" +
                "                    <option value=\"计算机网络\">计算机网络</option>\n" +
                "                    <option value=\"数据结构\">数据结构</option>\n" +
                "                    <option value=\"Java开发\">Java开发</option>\n" +
                "                </select>\n" +
                "            </div>\n" +
                "<button onclick='submitChange(this)' id="+id+">提交修改</button>"+
                "        </div>"
        },
        dataType: "json"
    });



}


function remove(obj) {
    let id = obj.getAttribute("id")
    obj.parentElement.parentElement.remove()
    $.ajax({
        type: "GET",
        url: "/deleteStudent",
        contentType: 'application/json',
        data: {
            "id":id
        },
        success: function (response) {
            if(response.code == 200){
                alert("删除成功")
            }
        },
        dataType: "json"
    });

}

function submitChange(obj) {
    let parent = obj.parentElement
    let id = obj.getAttribute("id")
    let name = parent.children[0].children[1].value
    let className = parent.children[1].children[1].value
    let sex = parent.children[2].children[1].value
    let grade = parent.children[3].children[1].value
    let lesson = parent.children[4].children[1].value
    $.ajax({
        type: "POST",
        url: "/updateStudent",
        contentType: 'application/json',
        data: JSON.stringify({
            "id":id,
            "name": name,
            "className":className,
            "sex":sex,
            "grade":grade,
            "lesson":lesson
        }),
        success: function (response) {
            if(response.code == 200){
                alert("更新成功")
                window.location.href = "/";
            }
        },
        dataType: "json"
    });
}