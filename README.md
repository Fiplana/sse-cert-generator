How to use the package:

```typesript
import {SseCaCertificate, SseClientCertificate, SseServerCertificate} from "@write/sse-cert-generator/dist/src";

....

const sseCaCertificate = new SseCaCertificate();
const subjectAltNames = await this.getSubjectAltNames(); // your own implementation which returns a string array
const sseServerCertificate = new SseServerCertificate(sseCaCertificate, subjectAltNames);
const sseClientCertificate = new SseClientCertificate(sseCaCertificate);
...
const rootCert = {
    cert: sseCaCertificate.getCertificateAsPem(),
    private: sseCaCertificate.getPrivateKeyAsPem(),
};
const serverCert = {
    cert: sseServerCertificate.getCertificateAsPem(),
    private: sseServerCertificate.getPrivateKeyAsPem(),
};
const clientCert = {
    cert: sseClientCertificate.getCertificateAsPem(),
    private: sseClientCertificate.getPrivateKeyAsPem(),
};
...
```
Using the generated certificates  
Do the following:  
    Copy the client certificate with key and the root certificate to Qlik computer (the client). You must configure the SSE plugin in Qlik; make sure you refer to the file location where you copied the certificates in the Certificate file path field of the Analytic connections section in the QMC, or when editing the SSEPlugin setting in the settings.ini file.  
Note: The client file names must be exactly root_cert.pem, sse_client_cert.pem and sse_client_key.pem, otherwise the Qlik engine will not be able to find them.
