import nodemailer from 'nodemailer';
import ReactDOMServer from 'react-dom/server';
import EmailTemplate from '@/components/EmailTemplate';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_KEY,
  },
});

export const sendEmail = async (formData: FormData) => {
  try {
    const { email, code } = Object.fromEntries(formData);

    // HTML 문자열 생성
    const htmlContent = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <div class="lime-gradient" style="padding: 20px; border-radius: 5px;">
          <h1>AMUNA</h1>
          <p>
            이메일 인증번호 : <strong>${code}</strong>
          </p>
          <p>감사합니다.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: `${email}`,
      subject: `[Amuna] 이메일 인증번호 입니다`,
      html: htmlContent,
    });

    console.log('이메일 전송 성공');
    return { message: '이메일 전송 성공' };
  } catch (error) {
    console.error(error);
  }
};
