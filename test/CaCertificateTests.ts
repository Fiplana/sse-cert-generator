import {expect} from "chai";
import {SseCaCertificate} from "../src/SseCaCertificate";
import {SseServerCertificate} from "../src/SseServerCertificate";
import {SseClientCertificate} from "../src/SseClientCertificate";
import {pki} from "node-forge";

describe("SseCaCertificate", () => {
    it("should generate valid certificates for SSE", () => {
        const sseCaCertificate = new SseCaCertificate();
        const sseServerCertificate = new SseServerCertificate(sseCaCertificate, [
            "*.domain.local",
            "localhost",
            "127.0.0.1",
            "::1",
        ]);
        const sseClientCertificate = new SseClientCertificate(sseCaCertificate);
        const root_cert = sseCaCertificate.getCertificateAsPem();
        const sse_server_cert = sseServerCertificate.getCertificateAsPem();
        const sse_client_cert = sseClientCertificate.getCertificateAsPem();
        const serverCert = pki.certificateFromPem(sse_server_cert);
        const clientCert = pki.certificateFromPem(sse_client_cert);
        const caStore = pki.createCaStore([root_cert]);
        expect(pki.verifyCertificateChain(caStore, [serverCert])).to.be.true;
        expect(pki.verifyCertificateChain(caStore, [clientCert])).to.be.true;
        expect(sseCaCertificate.getPrivateKeyAsPem().startsWith("-----BEGIN PRIVATE KEY")).to.be.true;
        expect(sseServerCertificate.getPrivateKeyAsPem().startsWith("-----BEGIN PRIVATE KEY")).to.be.true;
        expect(sseClientCertificate.getPrivateKeyAsPem().startsWith("-----BEGIN PRIVATE KEY")).to.be.true;
    }).timeout(60000);
});
