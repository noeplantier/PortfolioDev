import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Champs requis manquants' 
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [process.env.CONTACT_EMAIL],
            replyTo: email,
            subject: subject ? `${subject} - Portfolio Contact` : `Nouveau message de ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            line-height: 1.6; 
                            color: #333; 
                            margin: 0;
                            padding: 0;
                        }
                        .container { 
                            max-width: 600px; 
                            margin: 0 auto; 
                            background: #f9f9f9; 
                        }
                        .header { 
                            background: linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%);
                            color: white; 
                            padding: 30px 20px; 
                            text-align: center; 
                        }
                        .content { 
                            background: white; 
                            padding: 30px 20px; 
                        }
                        .field { 
                            margin-bottom: 20px; 
                            padding: 15px; 
                            background: #f5f5f5; 
                            border-radius: 8px; 
                            border-left: 4px solid #8b5cf6;
                        }
                        .label { 
                            font-weight: bold; 
                            color: #8b5cf6; 
                            display: block; 
                            margin-bottom: 8px; 
                            font-size: 14px;
                            text-transform: uppercase;
                        }
                        .value { 
                            color: #333; 
                            font-size: 15px;
                        }
                        .footer {
                            background: #f5f5f5;
                            padding: 20px;
                            text-align: center;
                            color: #666;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1 style="margin: 0; font-size: 28px;">💼 Nouveau message du Portfolio</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <span class="label">👤 Nom</span>
                                <span class="value">${name}</span>
                            </div>
                            <div class="field">
                                <span class="label">📧 Email</span>
                                <span class="value">
                                    <a href="mailto:${email}" style="color: #8b5cf6; text-decoration: none;">${email}</a>
                                </span>
                            </div>
                            ${subject ? `
                            <div class="field">
                                <span class="label">📝 Sujet</span>
                                <span class="value">${subject}</span>
                            </div>
                            ` : ''}
                            <div class="field">
                                <span class="label">💬 Message</span>
                                <div class="value" style="white-space: pre-wrap; margin-top: 10px;">${message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            <p style="margin: 0;">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
                            <p style="margin: 5px 0 0 0;">Message envoyé depuis votre portfolio</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('Erreur Resend:', error);
            return res.status(500).json({ 
                success: false, 
                message: 'Erreur lors de l\'envoi',
                error: error.message 
            });
        }

        console.log('✅ Email envoyé avec succès:', data);
        return res.status(200).json({ 
            success: true, 
            message: 'Email envoyé avec succès', 
            data 
        });
    } catch (error) {
        console.error('Erreur serveur:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Erreur serveur',
            error: error.message 
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`✅ Serveur backend Portfolio démarré sur http://localhost:${PORT}`);
});