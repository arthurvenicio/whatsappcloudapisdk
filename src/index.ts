import axios, { AxiosInstance } from 'axios';

interface IWhatsAppCloudApi {
    sendTextMessage: (to: string, text: string) => void;
    sendImageMessage: () => void;
    sendTemplateMessage: (
        to: string,
        language: string,
        templateName: string,
        parameters?: string[],
    ) => Promise<any>;
}

class WhatsAppCloudApi implements IWhatsAppCloudApi {
    private _API_BASE_URL: string;
    private _API_VERSION: string;
    private _API_TOKEN: string;
    private _WHATSAPP_NUMBER: string;
    private _WHATSAPP_WABA: string;
    private _API: AxiosInstance;
    private _API_PATH_MESSAGES: string = '/messages';
    private _API_HEADER_OPTIONS;

    /**
     *
     */
    constructor(
        apiVersion: string = '15',
        whatsAppToken: string,
        whatsAppNumber: string,
        whatsAppWaba: string,
    ) {
        this._API_VERSION = apiVersion;
        this._API_TOKEN = whatsAppToken;
        this._WHATSAPP_NUMBER = whatsAppNumber;
        this._WHATSAPP_WABA = whatsAppWaba;
        this._API_BASE_URL = `https://graph.facebook.com/v${this._API_VERSION}/${this._WHATSAPP_NUMBER}`;
        this._API = axios.create({
            baseURL: this._API_BASE_URL,
        });
        this._API_HEADER_OPTIONS = {
            headers: {
                Authorization: `Bearer ${this._API_TOKEN}`,
            },
        };
    }

    async sendImageMessage() {
        return 'test';
    }
    async sendTemplateMessage(
        to: string,
        language: string,
        templateName: string,
    ) {
        return (
            await this._API.post(
                this._API_PATH_MESSAGES,
                {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to,
                    type: 'template',
                    template: {
                        name: templateName,
                        language: {
                            code: language,
                        },
                        components: [],
                    },
                },
                this._API_HEADER_OPTIONS,
            )
        ).data;
    }

    async sendTextMessage(to: string, text: string) {
        return (
            await this._API.post(
                this._API_PATH_MESSAGES,
                {
                    messaging_product: 'whatsapp',
                    recipient_type: 'individual',
                    to,
                    type: 'text',
                    text: {
                        preview_url: false,
                        body: text,
                    },
                },
                this._API_HEADER_OPTIONS,
            )
        ).data;
    }
}

export default WhatsAppCloudApi;
