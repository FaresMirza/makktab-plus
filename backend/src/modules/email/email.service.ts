import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

export interface SendEmailParams {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

/**
 * Gmail SMTP wrapper using nodemailer.
 *
 * Requires the following env vars:
 *   - SMTP_USER     (Gmail address that sends the mail, e.g. notifier@gmail.com)
 *   - SMTP_PASSWORD (Gmail App Password — NOT the account login password.
 *                    Generate at https://myaccount.google.com/apppasswords
 *                    after enabling 2-Step Verification.)
 *   - SMTP_FROM     (optional friendly From header, defaults to SMTP_USER)
 *
 * If SMTP credentials are not configured the service falls back to logging
 * messages to the console so local dev still works without real credentials.
 */
@Injectable()
export class EmailService implements OnModuleInit {
    private readonly logger = new Logger(EmailService.name);
    private transporter: Transporter | null = null;
    private fromAddress: string | null = null;

    constructor(private readonly config: ConfigService) { }

    onModuleInit() {
        const user = this.config.get<string>('SMTP_USER');
        const pass = this.config.get<string>('SMTP_PASSWORD');

        if (!user || !pass) {
            this.logger.warn(
                'SMTP_USER / SMTP_PASSWORD not set — EmailService will log emails instead of sending them.',
            );
            return;
        }

        const host = this.config.get<string>('SMTP_HOST');
        const port = parseInt(this.config.get<string>('SMTP_PORT') ?? '587', 10);

        this.transporter = host
            ? nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } })
            : nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });

        this.fromAddress = this.config.get<string>('SMTP_FROM') || user;
        const label = host ? `${host}:${port}` : 'Gmail SMTP';
        this.logger.log(`EmailService ready (${label}, from=${this.fromAddress})`);
    }

    async send(params: SendEmailParams): Promise<void> {
        if (!this.transporter || !this.fromAddress) {
            this.logger.log(
                `[MOCK EMAIL] to=${params.to} subject="${params.subject}" body=${params.text ?? params.html ?? ''}`,
            );
            return;
        }

        try {
            const info = await this.transporter.sendMail({
                from: this.fromAddress,
                to: params.to,
                subject: params.subject,
                text: params.text,
                html: params.html,
            });
            this.logger.log(`Email sent to ${params.to} (messageId=${info.messageId})`);
        } catch (err) {
            this.logger.error(
                `Failed to send email to ${params.to}: ${(err as Error).message}`,
            );
            throw err;
        }
    }
}
