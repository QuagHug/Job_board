import sendGrid from "@sendgrid/mail"

sendGrid.setApiKey(process.env.SENDGRID_SECRET);

export default sendGrid;

