import {X509v3Certificate} from "./X509v3Certificate";
import {IExtension} from "./IExtension";

/**
 * Class representing an SSE CA Certificate.
 */
export class SseCaCertificate extends X509v3Certificate {
    /**
     * Creates an instance of a SSE CA certificate.
     */
    public constructor() {
        super("sse_root");
    }

    protected getExtensions(): IExtension[] {
        return [
            {
                name: "basicConstraints",
                cA: true,
                critical: true,
            },
            {
                name: "subjectKeyIdentifier",
            },
            {
                name: "authorityKeyIdentifier",
                keyIdentifier: this.getSubjectKeyIdentifier(),
            },
        ];
    }
}
