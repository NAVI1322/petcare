
$(document).ready(function () {


    $("#Semail").keyup(function () {

        var emailid = $("#Semail").val();


        var obj = {
            type: "get",
            url: "/chkEmail",
            data: {
                email: emailid,
            }
        }
        //AJAX CAll
        $.ajax(obj).done(function (strMsg) {
            $("#res").html(strMsg);
        }).fail(function (Strres) {

            $("#res").html(Strres);
        });
    });







    //=================================================

    $("#btnSignup").click(function () {
        var Email = $("#Semail").val();
        var Password = $("#Spwd").val();

        var Service = "";
        if ($("#caretaker").prop("checked") == true) {
            Service = "Caretaker";
        }
        else if ($("#client").prop("checked") == true) {
            Service = "client";
        }
      
        var reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        var resp = reg.test(Email);
        if (resp == true)
            $("#res").html("");
        else {
            $("#res").html("*  syntax error");
            return;
        }

        if($("#Spwd").val().length>=6)
          $("#vpwd").html("");

        else 
       {
        $("#vpwd").html("*   password too short");
        return;
       }

       if ($("#caretaker").prop("checked") == false && $("#client").prop("checked") == false)
       {
        $("#vuser").html("*  select user");
        return;
       }
        var obj = {
            type: "get",
            url: "/signup",
            data: {
                email: Email,
                password: Password,
                service: Service,
            }
        }
        $.ajax(obj).done(function (msg) {
            alert("signup successfully");
                location.href = 'index.html';
            })
        }).fail(function (errmsg) {
            alert("Fill correct details")
        })
    })
