<?php
// if (isset($_POST)) {
//     print '<pre>';
//     var_dump($_POST);
//     print '</pre>';
// }
//
// $string = 'string';
// echo $string;
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <div class="message">

    </div>
    <script src="createRequest.js"></script>
    <script type="text/javascript">
    // var xhr = new XMLHttpRequest();
    // var data = {
    //   name1:{
    //     name1sub1: 'value1sub1',
    //     name1sub2: 'value1sub2',
    //   },
    //   name2:{
    //     name2sub1: 'value2sub1',
    //     name2sub2: 'value2sub2',
    //   }
    // };
    // xhr.open('POST', 'index.php');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.send(JSON.stringify(data));

    // const messageDiv = document.querySelector('.message');
    // messageDiv.innerHTML = 'No messages!';
    // let xhr = new XMLHttpRequest();
    // let formData = new FormData();
    // formData.append('message', 'Vasya! Go to nahui!');
    // // console.log(formData.get('message'));
    // xhr.open('POST', 'file.php');
    // // // xhr.open('GET', 'usenorm.txt');
    // // xhr.responseType = 'json';
    // xhr.send(formData);
    // // xhr.send(JSON.stringify(formData));
    // xhr.onload = function() {
    //   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
    //     messageDiv.innerHTML = `Ошибка ${xhr.status}: ${xhr.statusText}`; // Например, 404: Not Found
    //     // alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
    //   } else { // если всё прошло гладко, выводим результат
    //     messageDiv.innerHTML = `${xhr.response}`; // response -- это ответ сервера
    //     // messageDiv.innerHTML = `Готово, получили ${xhr.response.length} байт`; // response -- это ответ сервера
    //     console.log(xhr.response);
    //     // alert(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
    //   }
    // };
    //
    //Тест функции createRequest
    const xhr = createRequest({
      url: 'file.php',
      // url: 'https://bhj-diploma.u-w.me/user/register',
      // headers: {
      //   'Content-type': 'application/json'
      // },
      method: 'POST',
      responseType: 'json',
      data: {
        name: 'testor',
        password: 'testortestor',
        email: 'testor@testor.ru'
      },
      callback: (error, response) => {
        if (error === null) {
          console.log(response);
          messageDiv.innerHTML = response.name;
          // return response.name;
        }
        else {
          console.log(error);
        }
      }
    });
    const messageDiv = document.querySelector('.message');
    messageDiv.innerHTML = 'No messages!';
    messageDiv.innerHTML = xhr; // response -- это ответ сервера

  </script>

  </body>
</html>
