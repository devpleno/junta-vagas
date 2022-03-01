const { v4: uuidv4, validate } = require("uuid");

const { isValidEmail } = require("../utils/validation");

const { insertOne, findOne, updateOne } = require("../services/db");
const { sendEmail } = require("../services/email");

async function register(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400).send({ message: "Send a email address" });
    return;
  }

  if (!isValidEmail(email)) {
    res.status(400).send({ message: "Send a valid email address" });
    return;
  }

  const existsEmail = await findOne("newsletters", { email });

  if (existsEmail) {
    res.status(400).send({
      message: "Send another email address, this email address already exists",
    });
    return;
  }

  try {
    const newSub = { email, status: false, confirmationToken: uuidv4() };

    await insertOne("newsletters", newSub);

    let message = {
      from: "newsletter@juntavagas.com.br",
      to: email,
      subject: "Confirme seu e-mail",
      html: `<h1>Confirme seu e-mail</h1>
      <p>Por favor, ative seu e-mail no link abaixo para receber nosso conteúdo.</p>
      <a href="${process.env.URL_NEWSLETTER}/emailConfirmation/${newSub.confirmationToken}" target="_blank">Confirme seu e-mail</a>`,
    };

    await sendEmail(message);

    res.status(201).send({ message: "Email registered successfully!" });
  } catch (err) {
    res.status(500).send({
      message: "Error sending email",
    });
  }
}

async function emailConfirmation(req, res) {
  const { token } = req.params;
  const collectionName = "newsletters";

  if (!token) {
    res.status(400).send({ message: "Token required for email confirmation" });
    return;
  }

  if (!validate(token)) {
    res.status(400).send({ message: "Invalid token" });
    return;
  }

  const searchFor = { confirmationToken: token };

  let tokenExists = await findOne(collectionName, searchFor);

  const updateTo = { status: true };

  if (tokenExists) {
    try {
      await updateOne(collectionName, searchFor, updateTo);

      res.status(201).send({ message: "Email activated successfully!" });
      return;
    } catch (err) {
      res.status(409).send({ message: "Email activation error." });
      return;
    }
  }

  res.status(404).send({ message: "Activation email not found." });
}

module.exports = { register, emailConfirmation };
