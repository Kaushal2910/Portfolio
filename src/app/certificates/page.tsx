import { certificates } from "../../data/certificates";
import Certifications from "../../components/Certifications";

export default function CertificatesPage() {
  return <Certifications certificates={certificates} />;
}
