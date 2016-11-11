$(document).ready(function() {

    const handleError = (message) => {
        $("#errorMessage").text(message);
        $("#domoMessage").animate({width:'toggle'},350);
    }

    const sendAjax = (action, data) => {
        $.ajax({
            cache: false,
            type: "POST",
            url: action,
            data: data,
            dataType: "json",
            success: (result, status, xhr) => {
                $("#domoMessage").animate({width:'hide'},350);

                window.location = result.redirect;
            },
            error: (xhr, status, error) => {
                //window.document = xhr.responseText;
                const messageObj = JSON.parse(xhr.responseText);
                console.log('error occured in parsing');
                handleError(messageObj.error);
            }
        });
    }

    $("#makeDomoSubmit").on("click", (e) => {
        e.preventDefault();

        $("#domoMessage").animate({width:'hide'},350);

        if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoDesc").val() == '') {
            return false;
        }

        sendAjax($("#domoForm").attr("action"), $("#domoForm").serialize());

        return false;
    });

    $("#deleteDomos").on("click", (e) => {
      e.preventDefault();
      console.log("trying to send delete request");

      $("#domoMessage").animate({width:'hide'},350);

      sendAjax($("#deleteForm").attr("action"), $("#deleteForm").serialize());
      console.log("request sent to delete");
      document.querySelector("#domos").remove();
      return false;
    });

});
