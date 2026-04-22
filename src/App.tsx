import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  Truck,
  Anchor,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Shield,
  Clock,
  Wrench,
  Users,
  Award,
  ChevronRight,
  Flame,
  Droplets,
  Zap,
  BarChart3,
  Target,
  Send,
  Instagram,
  Menu,
  X,
} from 'lucide-react';

function useInViewOnce<T extends Element>() {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isInView]);

  return { ref, isInView };
}

function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out will-change-transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      } ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Trasporto Combustibili (ADR)');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => 
      prev.includes(product) ? prev.filter(p => p !== product) : [...prev, product]
    );
  };

  const toggleWeight = (weight: string) => {
    setSelectedWeights(prev => 
      prev.includes(weight) ? prev.filter(w => w !== weight) : [...prev, weight]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (selectedProducts.includes('Gasolio')) {
      setSelectedProducts(prev => prev.filter(p => p !== 'Gasolio'));
    }
  }, [selectedProducts]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center shadow-lg">
                <img src="/logo.png" alt="Mazzucotelli Petroli Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-white'}`}>
                  MAZZUCOTELLI
                </h1>
                <p className={`text-xs font-medium tracking-wider ${isScrolled ? 'text-blue-400' : 'text-blue-300'}`}>
                  PETROLI
                </p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {['Servizi', 'Chi Siamo', 'Mezzi', 'Contatti'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`font-medium transition-colors hover:text-blue-400 ${
                    isScrolled ? 'text-gray-300' : 'text-gray-200'
                  }`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contatti')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Preventivo Gratuito
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {['Servizi', 'Chi Siamo', 'Mezzi', 'Contatti'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left text-gray-200 font-medium py-2 hover:text-blue-400"
                >
                  {item}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contatti')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold"
              >
                Preventivo Gratuito
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/camionbotte.png"
            alt="Mazzucotelli Petroli Camion Botte"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal delayMs={0} className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-8">
            <Truck className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">Trasporti sicuri in tutta Europa</span>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              MAZZUCOTELLI{' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                PETROLI
              </span>
            </h1>
          </Reveal>

          <Reveal delayMs={140}>
            <p className="text-xl md:text-2xl text-gray-200 font-medium mb-4 max-w-3xl mx-auto">
              Trasporto combustibili e merci pericolose in tutta Europa
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Sicurezza, puntualità e 60 anni di esperienza nel settore.
              Operiamo con mezzi certificati e personale qualificato per garantire
              trasporti affidabili e conformi alle normative ADR.
            </p>
          </Reveal>

          <Reveal delayMs={260} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contatti')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              Richiedi Preventivo Gratuito
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+39034432669"
              className="group bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Chiama Ora
            </a>
          </Reveal>

          <Reveal delayMs={320} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: 'Certificati ADR' },
              { icon: Clock, label: '40+ Anni' },
              { icon: MapPin, label: 'Tutta Italia' },
              { icon: Users, label: 'Clienti Affidabili' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="bg-blue-900/50 p-3 rounded-xl border border-blue-700/30">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-gray-400 font-medium">{label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-700/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Flame className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">I Nostri Servizi</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Soluzioni Complete per Ogni Esigenza
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Offriamo servizi specializzati per il trasporto di combustibili e merci pericolose
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <Reveal delayMs={0} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                <img
                  src="/bonetti.png"
                  alt="Trasporto Combustibili"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trasporto Combustibili (ADR)
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Effettuiamo trasporti di carburanti e merci pericolose in totale sicurezza.
                </p>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="inline-block">
                    {['Gasolio', 'GPL', 'Cherosene'].map((item) => (
                      <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('contatti')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  Preventivo
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Service 2 */}
            <Reveal delayMs={100} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                <img
                  src="/barca.png"
                  alt="Trasporto Imbarcazioni"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-blue-500 p-2 rounded-lg shadow-lg">
                    <Anchor className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Trasporto Imbarcazioni
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Servizio professionale per il trasporto di barche e imbarcazioni.
                </p>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="inline-block">
                    {['Trasporto sicuro', 'Mezzi dedicati', 'Esperienza'].map((item) => (
                      <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => scrollToSection('contatti')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  Contattaci
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Service 3 */}
            <Reveal delayMs={200} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Vendita Combustibili
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Presso il nostro punto vendita puoi trovare pellet e carburanti.
              </p>
              <div className="space-y-3 mb-6 flex-grow flex flex-col items-center">
                <div className="inline-block text-left">
                  {['Pellet', 'Gas in bombole', 'Gasolio'].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => scrollToSection('contatti')}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
              >
                Scopri di Più
                <ChevronRight className="w-4 h-4" />
              </button>
            </Reveal>

            {/* Service 4 - New */}
            <Reveal delayMs={300} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Bonifica e Revisioni
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                Servizi certificati di manutenzione e pulizia cisterne periodica.
              </p>
              <div className="space-y-3 mb-6 flex-grow flex flex-col items-center">
                <div className="inline-block text-left">
                  {['Bonifica interna', 'Revisioni periodiche', 'Certificazioni'].map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => scrollToSection('contatti')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
              >
                Richiedi Info
                <ChevronRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="chi-siamo" className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-4">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">Perché Sceglierci</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              La Nostra Eccellenza
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Esperienza, professionalità e sicurezza al servizio dei nostri clienti
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: '60 Anni di Esperienza', desc: 'Un percorso decennale nel settore dei trasporti' },
              { icon: Shield, title: 'Specializzati ADR', desc: 'Certificazioni per merci pericolose' },
              { icon: Truck, title: 'Mezzi Moderni', desc: 'Flotta certificata e controllata' },
              { icon: Zap, title: 'Servizio Rapido', desc: 'Puntualità e tempestività garantite' },
              { icon: Users, title: 'Assistenza Diretta', desc: 'Supporto professionale dedicato' },
              { icon: Target, title: 'Sicurezza Totale', desc: 'Conformità alle normative vigenti' },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <Reveal key={title} delayMs={idx * 80} className="bg-white/5 backdrop-blur border-2 border-blue-500/40 rounded-2xl p-6 hover:bg-white/10 transition-all group shadow-lg">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 pt-24 border-t border-white/10">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">I Nostri Numeri</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Risultati che Parlano
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '60', label: 'Anni di Attività', suffix: '' },
                { value: '24/7', label: 'Assistenza H24', suffix: '' },
                { value: '10+', label: 'Mezzi Specializzati', suffix: '' },
                { value: '100%', label: 'Copertura Europea', suffix: '' },
              ].map(({ value, label, suffix }, idx) => (
                <Reveal key={label} delayMs={idx * 80} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {value}
                    <span className="text-3xl">{suffix}</span>
                  </div>
                  <p className="text-gray-400 font-medium">{label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="mezzi" className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <Reveal className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-semibold">I Nostri Mezzi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Parco mezzi dedicato e certificato
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Disponiamo di autocisterne e veicoli con diverse capacità per ogni esigenza, 
                tutti regolarmente controllati e certificati ADR per il trasporto sicuro.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-blue-600/30">
                  <Shield className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900">Sicurezza</h4>
                  <p className="text-sm text-gray-600">Sistemi di controllo avanzati</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-blue-600/30">
                  <Award className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900">Qualità</h4>
                  <p className="text-sm text-gray-600">Manutenzione programmata</p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={100} className="lg:w-1/2 relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 ring-1 ring-black/5">
                <img
                  src="/3camioinbotte.png"
                  alt="Il nostro parco mezzi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm font-medium">Mezzi Operativi</div>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { capacity: '3.000', desc: 'Ideale per piccole consegne e aree urbane', color: 'from-blue-500 to-blue-600', img: '/scaricogasolio2.png' },
              { capacity: '9.000', desc: 'Perfetta per medie distanze e carichi standard', color: 'from-blue-600 to-blue-700', img: '/scaricogasolio.png' },
              { capacity: '42.000', desc: 'Massima capacità per trasporti a lungo raggio', color: 'from-blue-700 to-blue-800', img: '/matte.png' },
            ].map(({ capacity, desc, color, img }) => (
              <Reveal key={capacity} delayMs={Number(capacity.replace('.', '')) ? (capacity === '3.000' ? 0 : capacity === '9.000' ? 100 : 200) : 0} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                  <img
                    src={img}
                    alt={`${capacity} litri`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 shadow-inner"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className={`bg-gradient-to-br ${color} p-2 rounded-lg shadow-lg`}>
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {capacity} <span className="text-2xl text-gray-500">litri</span>
                  </div>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={150} className="mt-12 text-center">
            <p className="text-lg text-gray-600 bg-gray-100 rounded-2xl p-6 inline-block">
              <CheckCircle className="w-5 h-5 text-blue-600 inline mr-2" />
              Soluzioni flessibili per ogni tipo di trasporto
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Come Lavoriamo</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Il Nostro Processo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un approccio strutturato per garantire trasporti sicuri e puntuali
            </p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Analisi', desc: 'Analizziamo la tua richiesta e le tue esigenze', icon: Target },
              { step: '02', title: 'Pianificazione', desc: 'Pianifichiamo il trasporto in sicurezza', icon: MapPin },
              { step: '03', title: 'Consegna', desc: 'Effettuiamo la consegna puntuale', icon: Truck },
              { step: '04', title: 'Assistenza', desc: 'Garantiamo assistenza post-consegna', icon: Users },
            ].map(({ step, title, desc, icon: Icon }) => (
              <Reveal key={step} delayMs={Number(step) * 80} className="relative">
                <div className="bg-white rounded-2xl p-5 border border-blue-600/20 shadow-md hover:shadow-lg transition-all h-full">
                  <div className="text-4xl font-bold text-blue-100 mb-2">{step}</div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
                {step !== '04' && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ChevronRight className="w-4 h-4 text-blue-300" />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />

        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Truck className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hai Bisogno di un Trasporto?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Affidati a professionisti del settore con 60 anni di esperienza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contatti')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              Richiedi Preventivo Gratuito
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+390000000000"
              className="group bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Chiama per Consulenza
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">Contatti</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contattaci Subito
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Siamo a tua disposizione per informazioni o preventivi gratuiti
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <Reveal className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-blue-600/30 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Mazzucotelli Petroli</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Sede Operativa</h4>
                      <p className="text-gray-600">via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Telefono</h4>
                      <a href="tel:+39034432669" className="text-blue-600 hover:text-blue-700 font-medium">
                        0344 32669
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                      <a href="mailto:info@mazzucotelli.it" className="text-blue-600 hover:text-blue-700 font-medium">
                        info@mazzucotelli.it
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Instagram className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instagram</h4>
                      <a href="https://instagram.com/mazzucotellipetroli" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                        @mazzucotellipetroli
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white border border-blue-400/30 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Orari di Servizio</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lunedi - Venerdi</span>
                    <span className="font-semibold text-right leading-tight">
                      <span className="block">08:00 - 12:00</span>
                      <span className="block">13:00 - 18:00</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sabato</span>
                    <span className="font-semibold">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domenica</span>
                    <span className="font-semibold">Chiuso</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-500">
                  <p className="text-blue-100">
                    <strong>Emergenze 24/7:</strong> Disponibili per interventi urgenti
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delayMs={100} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-blue-600/30 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Richiedi Preventivo</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cognome *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                      placeholder="Il tuo cognome"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                    placeholder="La tua email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                    placeholder="Il tuo numero di telefono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tipo di Servizio</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                  >
                    <option>Trasporto Combustibili (ADR)</option>
                    <option>Trasporto Imbarcazioni</option>
                    <option>Vendita Combustibili</option>
                    <option>Bonifica e Revisioni</option>
                    <option>Altro</option>
                  </select>
                </div>

                {selectedService === 'Vendita Combustibili' && (
                  <div className="space-y-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-600/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">Seleziona Prodotti (Scelta Multipla)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Pellet', 'Gas in bombole'].map((product) => (
                          <label key={product} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-blue-600 transition-all group">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product)}
                              onChange={() => toggleProduct(product)}
                              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">{product}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {selectedProducts.includes('Gas in bombole') && (
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <label className="block text-sm font-bold text-gray-900 mb-3">Peso Bombola (Scelta Multipla)</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {['10 kg', '15 kg', '20 kg', '25 kg'].map((weight) => (
                            <label key={weight} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-blue-600 transition-all">
                              <input
                                type="checkbox"
                                checked={selectedWeights.includes(weight)}
                                onChange={() => toggleWeight(weight)}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                              />
                              <span className="text-xs font-medium text-gray-700">{weight}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantità Totale / Dettagli</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                          placeholder="Es: 50 sacchi, 2 bombole da 15kg..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Luogo di Consegna</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                          placeholder="Indirizzo completo per la consegna"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data Preferita</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Fascia Oraria</label>
                        <input
                          type="time"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Messaggio</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none bg-white"
                    placeholder="Descrivi la tua richiesta..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Invia Richiesta
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Risponderemo entro 24 ore lavorative
                </p>
              </form>
            </Reveal>
          </div>

          {/* Interactive Map */}
          <Reveal delayMs={150} className="mt-16 bg-white rounded-3xl overflow-hidden shadow-xl border border-blue-600/30">
            <div className="h-[350px] w-full">
              <iframe
                title="Posizione Mazzucotelli Petroli"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2777.6!2d9.213!3d46.011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47843949f6f6f6f7%3A0x8f8f8f8f8f8f8f8f!2svia%20cascine%2C%206%2C%2022010%20Grandola%20Ed%20Uniti%20CO!5e0!3m2!1sit!2sit!4v1713800000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Mazzucotelli Petroli Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">MAZZUCOTELLI PETROLI</h3>
                <p className="text-xs text-gray-400">Trasporti sicuri dal 1966</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="tel:+39034432669" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Phone className="w-5 h-5" />
              </a>
              <a href="mailto:info@mazzucotelli.it" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              © 2024 Mazzucotelli Petroli. Tutti i diritti riservati.
            </p>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}

export default App;
