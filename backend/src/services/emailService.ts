import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email service configuration error:', error);
      } else {
        console.log('✅ Email service is ready to send messages');
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('📧 Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('❌ Email sending failed:', error);
      return false;
    }
  }

  // Send contact form notification to admin
  async sendContactNotification(contactData: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🚀 Nova Mensagem de Contato - ROI Labs</h1>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <h2 style="color: #333; margin-top: 0;">Detalhes do Contato</h2>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p><strong>Nome:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            ${contactData.company ? `<p><strong>Empresa:</strong> ${contactData.company}</p>` : ''}
            ${contactData.phone ? `<p><strong>Telefone:</strong> ${contactData.phone}</p>` : ''}
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <p><strong>Assunto:</strong> ${contactData.subject}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 5px;">
            <p><strong>Mensagem:</strong></p>
            <div style="background: #f5f5f5; padding: 10px; border-left: 4px solid #667eea; white-space: pre-wrap;">${contactData.message}</div>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${contactData.email}" style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Responder por Email</a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 15px; color: #666; font-size: 12px;">
          <p>Esta mensagem foi enviada através do formulário de contato do site roilabs.com.br</p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: process.env.EMAIL_USER!, // Admin email
      subject: `[ROI Labs] Nova mensagem de contato: ${contactData.subject}`,
      html
    });
  }

  // Send auto-reply to user
  async sendContactAutoReply(userEmail: string, userName: string): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">✅ Mensagem Recebida - ROI Labs</h1>
        </div>
        
        <div style="padding: 30px; background: #f9f9f9;">
          <h2 style="color: #333; margin-top: 0;">Olá ${userName}!</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">Recebemos sua mensagem e entraremos em contato em breve.</p>
          
          <div style="background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea;">
            <h3 style="color: #667eea; margin-top: 0;">🤖 Enquanto isso, que tal conhecer nosso SDR AI?</h3>
            <p>Nossa solução pode aumentar suas conversões em até 3x e reduzir custos de aquisição significativamente.</p>
            <div style="text-align: center; margin-top: 15px;">
              <a href="https://roilabs.com.br/calculator" style="background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Calcular Meu ROI</a>
            </div>
          </div>
          
          <p style="color: #666;">Nossa equipe responde todas as mensagens em até 24 horas úteis.</p>
          
          <div style="background: #e8f2ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; color: #0066cc; font-weight: bold;">📞 Precisa de uma resposta mais rápida?</p>
            <p style="margin: 5px 0 0 0; color: #0066cc;">Entre em contato pelo WhatsApp: (11) 99999-9999</p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 15px; color: #666; font-size: 12px; background: #f0f0f0;">
          <p style="margin: 0;">© 2025 ROI Labs - SDR AI para Pré-Vendas</p>
          <p style="margin: 5px 0 0 0;">
            <a href="https://roilabs.com.br" style="color: #667eea;">roilabs.com.br</a>
          </p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: userEmail,
      subject: 'Recebemos sua mensagem - ROI Labs',
      html
    });
  }

  // Send lead notification
  async sendLeadNotification(leadData: any): Promise<boolean> {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">🎯 Novo Lead Qualificado - ROI Labs</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">Score: ${leadData.score}/100</p>
        </div>
        
        <div style="padding: 20px; background: #f9f9f9;">
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="color: #333; margin-top: 0;">👤 Informações Pessoais</h3>
            <p><strong>Nome:</strong> ${leadData.fullName}</p>
            <p><strong>Email:</strong> <a href="mailto:${leadData.email}">${leadData.email}</a></p>
            <p><strong>Cargo:</strong> ${leadData.role}</p>
            <p><strong>Empresa:</strong> ${leadData.company}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="color: #333; margin-top: 0;">🏢 Contexto de Negócio</h3>
            <p><strong>Setor:</strong> ${leadData.companySector}</p>
            <p><strong>Tamanho da Equipe:</strong> ${leadData.teamSize}</p>
            <p><strong>Leads/Mês:</strong> ${leadData.monthlyLeads}</p>
            <p><strong>Orçamento:</strong> ${leadData.budget}</p>
            <p><strong>Timeline:</strong> ${leadData.timeline}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="color: #333; margin-top: 0;">💬 Desafios Atuais</h3>
            <div style="background: #f5f5f5; padding: 10px; border-left: 4px solid #10b981; white-space: pre-wrap;">${leadData.currentChallenges}</div>
          </div>
          
          <div style="background: ${leadData.score >= 80 ? '#dcfce7' : leadData.score >= 60 ? '#fef3c7' : '#fee2e2'}; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
            <h3 style="color: #333; margin-top: 0;">📊 Lead Score: ${leadData.score}/100</h3>
            <p style="margin: 0; font-weight: bold; color: ${leadData.score >= 80 ? '#059669' : leadData.score >= 60 ? '#d97706' : '#dc2626'};">
              ${leadData.score >= 80 ? '🔥 HIGH PRIORITY - Contatar imediatamente!' : 
                leadData.score >= 60 ? '⚡ MEDIUM PRIORITY - Contatar em 24h' : 
                '📋 LOW PRIORITY - Nutrir com conteúdo'}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${leadData.email}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-right: 10px;">✉️ Responder por Email</a>
          </div>
        </div>
        
        <div style="text-align: center; padding: 15px; color: #666; font-size: 12px;">
          <p>Lead capturado através do formulário qualificado do site roilabs.com.br</p>
        </div>
      </div>
    `;

    return await this.sendEmail({
      to: process.env.EMAIL_USER!,
      subject: `[ROI Labs] 🎯 Novo Lead Qualificado (Score: ${leadData.score}) - ${leadData.company}`,
      html
    });
  }
}

export const emailService = new EmailService();