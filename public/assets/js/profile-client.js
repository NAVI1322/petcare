      
//==========================search button========================


$(document).ready(function () {
    
    $("#btnSearch").click(function () {
        var Email = $("#email").val();
        var obj = {
            type: "get",
            url: "/search-details",
            data: {
                email: Email
            }
        }
    
        $.ajax(obj).done(function (table) {
            $("#username").val(table[0].username);
            $("#mobile").val(table[0].mobile);
            $("#address").val(table[0].address); 
            $("#pincode").val(table[0].pincode);
            $("#state").val(table[0].state);
            $("#region").val(table[0].region);
            $("#petdetails").val(table[0].Pet);
            $("#pic").prop("src","upload_proof/"+table[0].proof);
            $("#hdn").val(table[0].proof);
    
        }).fail(function (Strresp) {
            $("#res").html(Strres);
        })
    });
    
    });
    
    //=========================================================
    
    
    
    
    
    