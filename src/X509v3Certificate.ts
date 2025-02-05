import {md, pki, random, sha256, sha512, util} from "node-forge";
import {IExtension} from "./IExtension";

/**
 * Abstract class representing an X.509 v3 Certificate.
 */
export abstract class X509v3Certificate {
    protected keySize: number;
    protected subject: string;
    protected validityDays: number;
    protected serialNumber: string;
    protected subjectAltNames?: string[];
    protected caCertificate?: X509v3Certificate;
    protected algorithm: md.sha256.Algorithm | md.sha512.Algorithm;
    protected keyPair: pki.rsa.KeyPair;
    protected certificate: pki.Certificate;

    /**
     * Creates a new certificate.
     * @param caCertificate Optional the CA certificate using to sign this certificate.
     * @param subjectAltNames The subject alternative names of the certificate.
     * @param algorithm The algorithm to use for the message digest.
     * @param keySize The size of the key.
     * @param subject The subject of the certificate.
     * @param validityDays The number of days the certificate is valid.
     */
    protected constructor(
        subject: string,
        caCertificate?: X509v3Certificate,
        subjectAltNames?: string[],
        validityDays: number = 365,
        algorithm: md.sha256.Algorithm | md.sha512.Algorithm = "sha256",
        keySize: number = 4096,
    ) {
        this.subject = subject;
        this.algorithm = algorithm;
        this.keySize = keySize;
        this.validityDays = validityDays;
        this.subjectAltNames = subjectAltNames;
        this.caCertificate = caCertificate;
        this.serialNumber = this.generateSerialNumber();
        this.keyPair = pki.rsa.generateKeyPair({bits: this.keySize, e: 0x10001});
        this.setupCertificate();
    }

    /**
     * Returns the certificate as a PEM encoded string.
     */
    public getCertificateAsPem(): string {
        return pki.certificateToPem(this.certificate);
    }

    /**
     * Returns the subject key identifier of the certificate.
     */
    public getSubjectKeyIdentifier(): string {
        return this.certificate.generateSubjectKeyIdentifier().getBytes();
    }

    /**
     * Returns the certificate as a PEM encoded string (PKCS#8 formatted).
     */
    public getPrivateKeyAsPem(): string {
        const rsaPrivateKey = pki.privateKeyToAsn1(this.keyPair.privateKey);
        const privateKeyInfo = pki.wrapRsaPrivateKey(rsaPrivateKey);
        return pki.privateKeyInfoToPem(privateKeyInfo);
    }

    protected setupCertificate(): void {
        this.certificate = pki.createCertificate();
        this.certificate.serialNumber = this.serialNumber;
        this.certificate.publicKey = this.keyPair.publicKey;
        this.certificate.privateKey = this.keyPair.privateKey;
        const subjectCertificateField = this.getSubjectCertificateField();
        const issuerCertificateField = this.getIssuerCertificateField();
        this.certificate.setSubject(subjectCertificateField);
        this.certificate.setIssuer(issuerCertificateField);
        this.certificate.validity.notBefore = new Date();
        const notAfter = new Date();
        notAfter.setDate(notAfter.getDate() + this.validityDays);
        this.certificate.validity.notAfter = notAfter;
        this.certificate.setExtensions(this.getExtensions());
        this.signCertificate();
    }

    protected signCertificate(): void {
        let messageDigest: md.MessageDigest;
        switch (this.algorithm) {
            case "sha256":
                messageDigest = sha256.create();
                break;
            case "sha512":
                messageDigest = sha512.create();
                break;
            default:
                throw new Error("Unsupported algorithm");
        }
        if (this.caCertificate != null) {
            this.certificate.sign(this.caCertificate.certificate.privateKey, messageDigest);
        } else {
            this.certificate.sign(this.keyPair.privateKey, messageDigest);
        }
    }

    protected toPositiveHex(hexString: string): string {
        let mostSignificantHexAsInt = parseInt(hexString[0], 16);
        if (mostSignificantHexAsInt < 8) {
            return hexString;
        } else {
            mostSignificantHexAsInt -= 8;
            return mostSignificantHexAsInt.toString() + hexString.substring(1);
        }
    }

    protected generateSerialNumber(): string {
        const randomBytes = random.getBytesSync(20);
        const hexString = util.bytesToHex(randomBytes);
        return this.toPositiveHex(hexString);
    }

    protected getSubjectCertificateField(): pki.CertificateField[] {
        return [
            {
                name: "commonName",
                value: this.subject,
            },
        ];
    }

    protected getIssuerCertificateField(): pki.CertificateField[] {
        if (this.caCertificate != null) {
            const value = this.caCertificate.subject;
            return [
                {
                    name: "commonName",
                    value,
                },
            ];
        } else {
            return this.getSubjectCertificateField();
        }
    }

    protected abstract getExtensions(): IExtension[];
}
