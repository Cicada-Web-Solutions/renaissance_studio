<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Receiver email
    $to = "renaissance.vinod@gmail.com";

    // Get form values
    $name = htmlspecialchars(trim($_POST["name"] ?? ""));
    $phone = htmlspecialchars(trim($_POST["phone_number"] ?? ""));
    $project_type = htmlspecialchars(trim($_POST["project_type"] ?? ""));
    $project_details = htmlspecialchars(trim($_POST["project_details"] ?? ""));

    // Validate required fields
    if (empty($name) || empty($phone) || empty($project_type) || empty($project_details)) {
        echo "<script>
            alert('Please fill all required fields.');
            window.history.back();
        </script>";
        exit;
    }

    // Email subject
    $subject = "New Project Request from Renaissance Studio Website";

    // Email body
    $body = "
New project request received from the Renaissance Studio website.

----------------------------------------
CLIENT DETAILS
----------------------------------------

Full Name: $name
Phone Number: $phone

----------------------------------------
PROJECT DETAILS
----------------------------------------

Project Type:
$project_type

Project Details & Ambition:
$project_details

----------------------------------------
This enquiry was submitted through the Renaissance Studio website contact form.
";

    // Email headers
    $headers = "From: Renaissance Studio Website <noreply@renaissancestudio.in>\r\n";
    $headers .= "Reply-To: noreply@renaissancestudio.in\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>
            alert('Thank you for reaching out to Renaissance Studio. Our principal architect Ar. D Vinod Kumar will connect with you soon.');
            window.location.href = 'index.html';
        </script>";
        exit;
    } else {
        echo "<script>
            alert('Sorry, something went wrong. Please contact us directly by phone.');
            window.history.back();
        </script>";
        exit;
    }

} else {
    header("Location: index.html");
    exit;
}
?>