import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const CertificatesGallery = () => {
  const certificates = [
    {
      src: "/certificates/iso-certificate-ru.jpg",
      alt: "ISO 9001:2015 сертификат соответствия",
      title: "СЕРТИФИКАТ СООТВЕТСТВИЯ",
      subtitle: "Nº ST.RU.0001.P44126"
    },
    {
      src: "/certificates/iso-certificate-en.jpg", 
      alt: "ISO 9001:2015 Certificate of Conformity",
      title: "CERTIFICATE OF CONFORMITY",
      subtitle: "Nº ST.RU.0001.P44126"
    },
    {
      src: "/certificates/lab-test-protocol.jpg",
      alt: "Протокол лабораторных испытаний",
      title: "Протокол испытаний", 
      subtitle: "Nº 869/EM-16"
    },
    {
      src: "/certificates/conformity-certificate.png",
      alt: "Сертификат соответствия водородных генераторов",
      title: "СЕРТИФИКАТ СООТВЕТСТВИЯ",
      subtitle: "Nº ССГ5 RU.C101.H00794"
    },
    {
      src: "/certificates/patent-238026.jpg",
      alt: "Патент на устройство водородной генерации",
      title: "ПАТЕНТ",
      subtitle: "Nº 238026"
    }
  ];

  // Для зацикленности дублируем массив
  const infiniteCertificates = [...certificates, ...certificates];

  const CertificateCard = ({ certificate, index }: { certificate: typeof certificates[0], index: number }) => (
    <Dialog key={`${certificate.src}-${index}`}>
      <DialogTrigger asChild>
        <div className="bg-background/50 rounded-lg p-2 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer hover-scale group flex-shrink-0 w-32 md:w-40">
          <img 
            src={certificate.src}
            alt={certificate.alt}
            className="w-full h-24 md:h-32 object-contain rounded-lg mb-2 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="text-center">
            <h4 className="text-[10px] md:text-xs font-bold text-foreground mb-1">{certificate.title}</h4>
            <p className="text-[9px] md:text-xs text-muted-foreground">{certificate.subtitle}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[98vw] max-h-[98vh] sm:max-w-[95vw] sm:max-h-[95vh] w-auto h-auto p-1 sm:p-2 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src={certificate.src}
            alt={certificate.alt}
            className="max-w-full max-h-[99vh] sm:max-h-[90vh] w-auto h-auto object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {/* Mobile Gallery - показывается только на мобильных */}
      <div className="block md:hidden">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" 
             style={{ scrollSnapType: 'x mandatory' }}>
          {infiniteCertificates.map((certificate, index) => (
            <div key={`mobile-${index}`} className="snap-center">
              <CertificateCard certificate={certificate} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Grid - показывается только на больших экранах */}
      <div className="hidden md:grid md:grid-cols-5 gap-4">
        {certificates.map((certificate, index) => (
          <CertificateCard key={`desktop-${index}`} certificate={certificate} index={index} />
        ))}
      </div>
    </>
  );
};

export default CertificatesGallery;