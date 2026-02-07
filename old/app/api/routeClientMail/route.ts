import sendEmail from "@/lib/actions/send_email.";
export async function POST(request: Request) {
  console.log("Starting message routing");
  const message_body = await request.json();
  const body = message_body.control._formValues;
  const { name, email, subject, message } = body;
  const payload = {
    to: "hckerson@gmail.com",
    subject: subject,
    message: `Mail from ${name} <br/> ${message} <br/> Sent from ${email}`,
  };
  try {
    const result = await sendEmail(payload);
    if (result.success) {
      return new Response(JSON.stringify(result), { status: 200 });
    }else{
      return new Response(JSON.stringify(result), { status: 400 });
    }
  } catch (error) {
    console.error(`Error sending mail, ${error}`);
    return new Response("Message not sent", { status: 400 });
  }
}
