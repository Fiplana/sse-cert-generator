import {X509v3Certificate} from "./X509v3Certificate";
import {IExtension} from "./IExtension";
import {SseCaCertificate} from "./SseCaCertificate";

/**
 * Class representing an SSE Client Certificate.
 */
export class SseClientCertificate extends X509v3Certificate {
    /**
     * Creates an instance of a SSE client certificate.
     * @param sseCaCertificate The CA certificate used to sign this client certificate.
     */
    public constructor(sseCaCertificate: SseCaCertificate) {
        super("sse_client", sseCaCertificate);
    }

    protected getExtensions(): IExtension[] {
        return [
            {
                name: "basicConstraints",
                cA: false,
            },
            {
                name: "subjectKeyIdentifier",
            },
            {
                name: "authorityKeyIdentifier",
                keyIdentifier: this.caCertificate.getSubjectKeyIdentifier(),
            },
            {
                name: "keyUsage",
                digitalSignature: true,
                keyEncipherment: true,
            },
            {
                name: "extKeyUsage",
                clientAuth: true,
            },
        ];
    }
}
