<?php
use PHPMailer\PHPMailer\PHPMailer;
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';
require '../PHPMailer/src/Exception.php'; 
// Создаем письмо
$json = file_get_contents('php://input');
$data = json_decode($json,true);
$obj = [
  "success" => "",
  "empty_email" => "",
  "empty_phone" => "",
  "error_email" => ""
];
if (isset($data['legend'])&& !empty($data['legend'])&& isset($data['email'])&& !empty($data['email'])&& isset($data['phone'])&& !empty($data['phone'])){
  $mail = new PHPMailer(); 
  $mail->CharSet = "UTF-8";                                          
  $mail->isSMTP(); 
  $mail->Host       = 'mail.hosting.reg.ru';
  $mail->SMTPAuth   = true;
  $mail->Username   = 'имя используемое почты от какой будем отправлять';
  $mail->Password   = 'ее пароль';
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;
  $mail->setFrom('наша почта отправки',"call");
  $mail->addReplyTo('наша почта отправки',"call");
  //$mail->addAddress('nektomor@yandex.ru'); 
  $mail->addAddress('на какой адрес отправляем'); 
  $mail->addAddress('на какой адрес отправляем'); 
  $mail->addBCC('наша почта отправки',"call");
  $mail->addCC('наша почта отправки',"call");
  $mail->isHTML(true);
  $mail->Subject = addslashes($data['legend']);
  $mail->Body    = "<html>
                    <body>
                    <p>Email: ".addslashes($data['email'])."</p>
                    <p>Телефон: ".addslashes($data['phone'])."</p>
                    </body>
                    </html>";
  if ($mail->send()) {
    $obj["success"] = "ok";
  } else {
    $obj["error_email"] = $mail->ErrorInfo;
  }   
}else{
  if (empty($data['email'])){
    $obj["empty_email"] = "ok";
  }
  if (empty($data['phone'])){
    $obj["empty_phone"] = "ok";
  }
  
}
echo json_encode($obj);
?>