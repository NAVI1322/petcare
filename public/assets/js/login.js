
$(document).ready(function () {
    $("#btnlogin").click(function () {
        var Email = $("#lemail").val();
        var Password = $("#lpwd").val();

      
        var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var resp = reg.test(Email);
        if (resp == true)
            $("#res").html("");
        else {
            $("#res").html("*  syntax error");
            return;
        }


        var obj = {
            type: "get",
            url: "/login",
            data: {
                email: Email,
                password: Password,

            }
        };
        $.ajax(obj).done(function (service) {

            localStorage.setItem("activeUser", Email);
            if (service == "Caretaker") {
                location.href = "dash-caretaker.html";
            }
            else if (service == "client") {
                location.href = "dash-client.html";
            }
            else
             $("#vpwd").attr('placeholder','invalid password');


        }).fail(function (errmsg) {
             alert("SOMETHGING WENT WRONG TRY AGAIN");
        })

    })
});