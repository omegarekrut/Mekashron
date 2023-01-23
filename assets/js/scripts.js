// function soap() {
//   var username = document.getElementById("username-input").value;
//   var password = document.getElementById("password-input").value;
//   var xmlhttp = new XMLHttpRequest();
//   xmlhttp.open(
//     "POST",
//     "http://isapi.mekashron.com/soapclient/soapclient.php?URL=http://isapi.icu-tech.com/icutech-test.dll%2Fwsdl%2FIICUTech",
//     true
//   );

//   // build SOAP request
  
//   var request =
//     '<?xml version="1.0" encoding="UTF-8"?>' + 
//     '<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope"' + 
//     '    xmlns:ns1="urn:ICUTech.Intf-IICUTech" xmlns:xsd="http://www.w3.org/2001/XMLSchema"' + 
//     '    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"' + 
//     '    xmlns:enc="http://www.w3.org/2003/05/soap-encoding">' + 
//     '    <env:Body>' + 
//     '        <ns1:Login env:encodingStyle="http://www.w3.org/2003/05/soap-encoding">' + 
//     '            <UserName xsi:type="xsd:string">' + username + "</UserName>" + 
//     '            <Password xsi:type="xsd:string">' + password + '</Password>' + 
//     '            <IPs xsi:type="xsd:string"></IPs>' + 
//     '        </ns1:Login>' + 
//     '    </env:Body>' + 
//     '</env:Envelope>';

//   xmlhttp.onreadystatechange = function () {
//     if (xmlhttp.readyState == 4) {
//       if (xmlhttp.status == 200) {
        
//       }
//     }
//   };

//   xmlhttp.setRequestHeader("Content-Type", "text/xml");
//   xmlhttp.send(request);

// }

function soap() {
  let username = $("#username-input").val();
  let password = $("#password-input").val();
  if (username.indexOf("@") != -1) {
    username = encodeURIComponent(username);
  }
  username
  $.ajax({
    url: "http://isapi.mekashron.com/soapclient/soapclient.php?URL=http://isapi.icu-tech.com/icutech-test.dll%2Fwsdl%2FIICUTech",
    method: "POST",
    data: {
      func: "Login",
      params: "UserName=" + username + "&Password=" + password + "&IPs=",
    },

    success: function (data) {
      data = $.parseJSON(data);
      data = $.parseJSON(data["ret"]);
      console.log(data);
      if (data["ResultCode"] == -1) {
        $("#error-subtext").html(data["ResultMessage"]).removeClass("d-none");
      } else {
        $("#error-subtext").addClass("d-none");
        $("#success-subtext")
          .html("Success login. ID:" + data["EntityId"])
          .removeClass("d-none");
      }
    },
    error: function (data) {
      // show error
    },
  });
}



// login: test_for_me@gmail.com
// password: test_for_me


