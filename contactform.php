<?php

// checks if the contact form was submitted
if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail_to = 'zulkifl.alidou@gmail.com';
    $headers = "From: ".$email;
    $txt = "You have received an email from ".$name.".\n\n".$message;

    # This function
    $mail_status = mail($mail_to, $subject, $txt, $headers);
    header("Location: index.php?mailsend"); # this function takes us back to the front page when this page has loaded and it's done


    if ($mail_status) { ?>
        <script language="javascript" type="text/javascript">
            // Print a message
            alert('Thank you for the message. We will contact you shortly.');
            // Redirect to some page of the site. You can also specify full URL, e.g. http://template-help.com
            window.location = 'index.html';
        </script>
    <?php
    }

    else { ?>
        <script language="javascript" type="text/javascript">
            // Print a message
            alert('Message failed. Please, send an email to gordon@template-help.com');
            // Redirect to some page of the site. You can also specify full URL, e.g. http://template-help.com
            window.location = 'contact_page.html';
        </script>
    <?php
    }?>
}

 ?>
