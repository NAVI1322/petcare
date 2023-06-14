$(document).ready(function () {

   


    //=====================================================

    window.onmousedown = function (e) {
        var el = e.target;
        if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
            e.preventDefault();
    
            // toggle selection
            if (el.hasAttribute('selected')) el.removeAttribute('selected');
            else el.setAttribute('selected', '');
    
            // hack to correct buggy behavior
            var select = el.parentNode.cloneNode(true);
            el.parentNode.parentNode.replaceChild(select, el.parentNode);
        }
    }
    
    
    
    
    //====================================================
    
    
    $("#care-save").click(function () {
        var Email = $("#care-email").val();
        var user = $("#care-user").val();
        var contact = $("#care-contact").val();
        var address = $("#care-address").val();
        var state = $("#care-state").val();
        var city = $("#care-city").val();
        var pet = $("#care-pet").val();
        var comment = $("#care-comment").val();
        var firm = $("#care-firm").val();
    
        var obj = {
            type: "get",
            url: "/save-caretaker-details",
            data: {
                email: Email,
                User: user,
                Contact: contact,
                Address: address,
                State: state,
                City: city,
                Pet: pet,
                Comment: comment,
                Firm: firm,
            }
    
        }
        $.ajax(obj).done(function (resp) {
            alert("saved successfully");
            location.href = 'dash-caretaker.html';
            
        }).fail(function (Strresp) {
            $("#res").html(Strresp);
        })
    
    });
    
    //======================================================
    
    $("#care-edit").click(function () 
    {
        var Email = $("#care-email").val();
        var user = $("#care-user").val();
        var contact = $("#care-contact").val();
        var address = $("#care-address").val();
        var state = $("#care-state").val();
        var city = $("#care-city").val();
        var pet = $("#care-pet").val();
        var comment = $("#care-comment").val();
        var firm = $("#care-firm").val();
    
        var obj = {
            type: "get",
            url: "/edit-caretaker-details",
            data: {
                email: Email,
                User: user,
                Contact: contact,
                Address: address,
                State: state,
                City: city,
                Pet: pet,
                Comment: comment,
                Firm: firm
            }
        }
    
        $.ajax(obj).done(function (resp) {
            $("#res").html(resp);
        }).fail(function (Strresp) {
            $("#res").html(Strresp);
        })
    
    });
    //=========================================

    

        $("#care-btnSearch").click(function () {
            // alert();

            var Email = $("#care-email").val();
            var obj = {
                type: "get",
                url: "/search-caretaker-details",
                data: {
                    email: Email
                }
            }
            // alert(Email);

            $.ajax(obj).done(function (table) {


                var splits = table[0].pet.split(',');
                $("#care-user").val(table[0].username);
                $("#care-contact").val(table[0].contact);
                $("#care-address").val(table[0].address);
                $("#care-state").val(table[0].state);
                $("#care-city").val(table[0].city);
                $("#care-comment").val(table[0].comment);
                $("#care-firm").val(table[0].firm);
                var petsRef = document.querySelector("#care-pet");

                for (var j = 0; j < splits.length; j++) {


                    for (var i = 0; i < petsRef.length; i++) {
                        if (splits[j] == petsRef[i].value) {
                            petsRef[i].selected = true;

                        }

                    }

                }

            }).fail(function (Strresp) {
                $("#res").html(Strresp);
            })

        });

    });
    
    
