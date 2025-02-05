/**
 * Interface representing a certificate extension with various properties.
 */
export interface IExtension {
    /**
     * The name of the extension.
     */
    name: string;
    /**
     * Indicates if the extension is a Certificate Authority.
     */
    cA?: boolean;
    /**
     * Indicates if the extension is critical.
     */
    critical?: boolean;
    /**
     * Indicates if the extension is used for key certificate signing.
     */
    keyCertSign?: boolean;
    /**
     * Indicates if the extension is used for digital signatures.
     */
    digitalSignature?: boolean;
    /**
     * Indicates if the extension is used for non-repudiation.
     */
    nonRepudiation?: boolean;
    /**
     * Indicates if the extension is used for key encipherment.
     */
    keyEncipherment?: boolean;
    /**
     * Indicates if the extension is used for data encipherment.
     */
    dataEncipherment?: boolean;
    /**
     * Indicates if the extension is used for server authentication.
     */
    serverAuth?: boolean;
    /**
     * Indicates if the extension is used for client authentication.
     */
    clientAuth?: boolean;
    /**
     * Indicates if the extension is used for code signing.
     */
    codeSigning?: boolean;
    /**
     * Indicates if the extension is used for email protection.
     */
    emailProtection?: boolean;
    /**
     * Indicates if the extension is used for timestamping.
     */
    timeStamping?: boolean;
    /**
     * Indicates if the extension is used for client purposes.
     */
    client?: boolean;
    /**
     * Indicates if the extension is used for server purposes.
     */
    server?: boolean;
    /**
     * Indicates if the extension is used for email purposes.
     */
    email?: boolean;
    /**
     * Indicates if the extension is used for object signing.
     */
    objsign?: boolean;
    /**
     * Indicates if the extension is a SSL Certificate Authority.
     */
    sslCA?: boolean;
    /**
     * Indicates if the extension is an email Certificate Authority.
     */
    emailCA?: boolean;
    /**
     * Indicates if the extension is an object Certificate Authority.
     */
    objCA?: boolean;
    /**
     * Alternative names associated with the extension.
     */
    altNames?: AltName[];
    /**
     * The value of the extension.
     */
    value?: string;
    /**
     * The key identifier of the extension.
     */
    keyIdentifier?: string;
}

/**
 * Interface representing an alternative name.
 */
interface AltName {
    /**
     * The type of the alternative name.
     */
    type: number;
    /**
     * The value of the alternative name.
     */
    value?: string;
    /**
     * The IP address of the alternative name.
     */
    ip?: string;
}
