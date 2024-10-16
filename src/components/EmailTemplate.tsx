interface EmailTemplateProps {
  code: string;
}
const EmailTemplate = ({ code }: EmailTemplateProps) => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div className='lime-gradient' style={{ padding: '20px', borderRadius: '5px' }}>
        <h1>AMUNA</h1>
        <p>
          이메일 인증번호 : <strong>{code}</strong>
        </p>
        <p>감사합니다.</p>
      </div>
    </div>
  );
};

export default EmailTemplate;
