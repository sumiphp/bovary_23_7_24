<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);
try {
//$mail->SMTPDebug = 2;                   // Enable verbose debug output
$mail->isSMTP();                        // Set mailer to use SMTP
//$mail->Host       = 'smtp.gfg.com;'; 
$mail->Host='smtp.gmail.com';
// Specify main SMTP server
$mail->SMTPAuth   = true;               // Enable SMTP authentication
$mail->Username   = 'sumilaifix@gmail.com';     // SMTP username
$mail->Password   = 'jcqa cvfq iwrc plsu';         // SMTP password

//'smtp_user' => 'sumilaifix@gmail.com',
	   //'smtp_user' => 'crayoprojects2022@gmail.com',
	   //'smtp_pass' => 'wosmqbffmatsefdz',
	   //'smtp_pass'=>'jcqa cvfq iwrc plsu',
$mail->SMTPSecure = 'tls';              // Enable TLS encryption, 'ssl' also accepted
$mail->Port       = 587;                // TCP port to connect to
$name=$_POST['name'];
$full_name='Admin';
$text_message=$_POST['message'];
$name=$name;
$subject=$_POST['subject'];
//$phonenumber=$_POST['phone1'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$qty=$_POST['Qty'];
$color=$_POST['Color'];
$brand=$_POST['Brand'];
$mail->setFrom($email,$name);           // Set sender of the mail
$mail->addAddress('sumilaifix@gmail.com');           // Add a recipient
$mail->addAddress('abumathew@pocketfriendlyweb.com','Admin');
$mail->addAddress('info@bovory.com','Admin');  
$mail->isHTML(true);                                  
$mail->Subject = 'New Enquiry';





$message  = "<html><body>";
   
$message .= "<table width='100%' bgcolor='#e0e0e0' cellpadding='0' cellspacing='0' border='0'>";
   
$message .= "<tr><td>";
   
$message .= "<table align='center' width='100%' border='0' cellpadding='0' cellspacing='0' style='max-width:650px; background-color:#fff; font-family:Verdana, Geneva, sans-serif;'>";
    
$message .= "<thead>
  <tr height='80'>
  <th colspan='4' style='background-color:#f5f5f5; border-bottom:solid 1px #bdbdbd; font-family:Verdana, Geneva, sans-serif; color:#333; font-size:34px;' >Bovory</th>
  </tr>
             </thead>";
    
$message .= "<tbody>
            
      
       <tr>
       <td colspan='4' style='padding:15px;'>
       <p style='font-size:20px;'>Hi  ".$full_name.",</p>
       <hr />
       <p style='font-size:25px;'>New Enquiry ,Below are the details</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Name : ".$name.".</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Subject : ".$subject.".</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Email : ".$email.".</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Phone : ".$phone.".</p>

       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Brand : ".$brand.".</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Color : ".$color.".</p>
       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Quantity : ".$qty.".</p>



       <p style='font-size:15px; font-family:Verdana, Geneva, sans-serif;'> Message : ".$text_message.".</p>
       </td>
       </tr>
      
       
      
              </tbody>";
    
$message .= "</table>";
   
$message .= "</td></tr>";
$message .= "</table>";
   
$message .= "</body></html>";


$mail->Body    = $message;
//$mail->AltBody = 'Body in plain text for non-HTML mail clients'; 
$mail->send(); // Name is optional
echo "Mail has been sent successfully!";

} catch (Exception $e) {
    //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>