// inspire-backend/server.js
require('dotenv').config();
const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint para envio de formulário
app.post('/send-email', (req, res) => {
  const { nome, empresa, email, telefone, servicos, mensagem } = req.body;

  if (!Array.isArray(servicos) || servicos.length === 0) {
    return res.status(400).json({ message: 'Erro: nenhum serviço selecionado' }); 
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Novo Contato - ${nome}`,
    text: `
      Nome: ${nome}
      Empresa: ${empresa}
      Email: ${email}
      Telefone: ${telefone}
      Serviço(s) desejado(s): ${servicos.join(', ')}
      Mensagem: ${mensagem}
    `,
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o e-mail:', error);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail' }); 
    }
    console.log('E-mail enviado:', info.response);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' }); 
  });
});

// Endpoint para envio de formulário
app.post('/send-email-vagas', upload.single('curriculo'), (req, res) => {
  const { nome, email, telefone, vagas } = req.body;
  const curriculo = req.file;

  if (!Array.isArray(vagas) || vagas.length === 0) {
    return res.status(400).json({ message: 'Erro: nenhuma vaga selecionada' }); 
  }

  if (!curriculo) {
    return res.status(400).json({ message: 'Erro: nenhum currículo anexado' });
  }

   const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Novo Currículo - ${nome}`,
    text: `
      Nome: ${nome}
      Email: ${email}
      Telefone: ${telefone}
      Vaga(s) desejada(s): ${vagas.join(', ')}
    `,
    attachments: [
      {
        filename: curriculo.originalname,
        content: curriculo.buffer
      }
    ]
  };

  // Enviar e-mail
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar o e-mail:', error);
      return res.status(500).json({ message: 'Erro ao enviar o e-mail' }); 
    }
    console.log('E-mail enviado:', info.response);
    res.status(200).json({ message: 'E-mail enviado com sucesso!' }); 
  });
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
