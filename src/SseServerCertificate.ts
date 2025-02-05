import {X509v3Certificate} from "./X509v3Certificate";
import {SseCaCertificate} from "./SseCaCertificate";
import {IExtension} from "./IExtension";

/**
 * Class representing an SSE Server Certificate.
 */
export class SseServerCertificate extends X509v3Certificate {
    /**
     * Creates an instance of SSE server certificate.
     * @param sseCaCertificate The CA certificate used to sign this server certificate.
     * @param subjectAltNames The subject alternative names for the server certificate.
     */
    public constructor(sseCaCertificate: SseCaCertificate, subjectAltNames: string[]) {
        super("sse_server", sseCaCertificate, subjectAltNames);
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
                serverAuth: true,
            },
            {
                name: "subjectAltName",
                altNames: this.subjectAltNames.map((name) => ({type: 2, value: name})),
            },
        ];
    }
}
