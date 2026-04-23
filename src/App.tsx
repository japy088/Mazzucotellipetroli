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

type LegalDoc = 'privacy' | 'terms';

type Lang = 'it' | 'en' | 'fr' | 'de' | 'es';

const LANG_LABEL: Record<Lang, string> = {
  it: 'IT',
  en: 'EN',
  fr: 'FR',
  de: 'DE',
  es: 'ES',
};

const COPY: Record<Lang, Record<string, string>> = {
  it: {
    nav_services: 'Servizi',
    nav_about: 'Chi Siamo',
    nav_fleet: 'Mezzi',
    nav_contact: 'Contatti',
    nav_quote: 'Preventivo Gratuito',
    hero_badge: 'Trasporti sicuri in tutta Europa',
    hero_bg_alt: 'Camion cisterna Mazzucotelli Petroli',
    hero_subtitle: 'Trasporto combustibili e merci pericolose in tutta Europa',
    hero_description:
      'Sicurezza, puntualità e 60 anni di esperienza nel settore. Operiamo con mezzi certificati e personale qualificato per garantire trasporti affidabili e conformi alle normative ADR.',
    hero_cta_quote: 'Richiedi Preventivo Gratuito',
    hero_cta_callnow: 'Chiama Ora',
    hero_stat_adr: 'Certificati ADR',
    hero_stat_years: '60 Anni',
    hero_stat_area: 'Tutta Italia',
    hero_stat_clients: 'Clienti Soddisfatti',
    services_badge: 'I Nostri Servizi',
    services_title: 'Soluzioni Complete per Ogni Esigenza',
    services_subtitle:
      'Offriamo servizi specializzati per il trasporto di combustibili e merci pericolose',
    service1_title: 'Trasporto Combustibili (ADR)',
    service1_image_alt: 'Trasporto combustibili',
    service1_desc: 'Effettuiamo trasporti di carburanti e merci pericolose in totale sicurezza.',
    service1_more_body: `Un altro settore in cui eccelle la Mazzuccotelli Trasporti è senza dubbio il trasporto di merci pericolose in ADR, uno specifico regime di sicurezza standardizzato a livello italiano ed europeo, pensato per garantire la sicurezza durante tutta la fase logistica. A questo scopo, la ditta dispone di mezzi specifici per il trasporti in ADR, come ad esempio:

• 2 camion con autocisterna in ADR, rispettivamente con una capienza di 3000 litri e dotato di trazione 4x4 per sentieri di montagna e strade strette , e con una capienza superiore che varia tra i 7500 e i 9000 litri;
• 2 bilici dotati di cisterna da 42000 litri;
• Veicoli per il trasporto di cherosene in fustini da 20 litri dotati di apposito cassone e pianale di carico

Qualunque sia la tipologia di combustibile che voi vogliate farci trasportare, noi lo faremo garantendovi il massimo della sicurezza, garantendo che tale materiale infiammabile giunga a destinazione integro e intatto.`,
    service1_btn: 'Scopri di Più',
    service2_title: 'Trasporto Imbarcazioni',
    service2_image_alt: 'Trasporto imbarcazioni',
    service2_desc: 'Servizio professionale per il trasporto di barche e imbarcazioni.',
    service2_btn: 'Scopri di Più',
    service2_more_title: 'Trasporto imbarcazioni',
    service2_more_body:
      'Grazie alla nostra esperienza di oltre quarant’anni, siamo in grado di operare nel mercato dei servizi logistici, prendendoci cura del controllo delle merci in arrivo o in partenza, controllando il carico e lo scarico dei colli e adempiendo a tutte quelle operazioni di movimentazione logistica che richiedono personale qualificato e attrezzature professionali. In particolar modo, la nostra ditta è specializzata nel trasporto di imbarcazioni di qualunque tipo, grazie all’impiego di carrelli e mezzi che ne garantiranno la massima integrità durante il viaggio.',
    service3_title: 'Vendita Combustibili',
    service3_desc: 'Presso il nostro punto vendita puoi trovare pellet e carburanti.',
    service3_more_body: `Per quanto riguarda invece il settore della vendita al dettaglio, la Mazzucotelli Petroli è in grado di garantire consegne a domicilio di carburante, gas e pellet nel raggio d’azione di 20 minuti: basterà infatti telefonare ai nostri numeri indicati e i nostri incaricati in tempi brevi vi raggiungeranno con tali prodotti, in maniera sicura e professionale.

Gas in bombole

Il settore della vendita al dettaglio non riguarda tuttavia la sola vendita di pellet e cherosene: infatti ci occupiamo ogni giorno di vendere pallet per la stiva delle merci di varie dimensioni, adatti perciò sia a Tir di dimensioni standard, sia per bilici o furgoni con pianali di carico differenti, in modo tale da ottimizzare la superficie di carico e mantenere intatta e sicura la merce stivata al loro interno.

Vendita pellet

Il nostro servizio di trasporto in zona riguarda sia la disponibilità di pellet per stufe, sia il cherosene per impianti di riscaldamento ad uso abitativo o industriale. Per quanto riguarda il minimo di ordinazioni, esso è di 10 fustini per quanto riguarda il cherosene, e 10 sacchetti per ciò che concerne la richiesta di pellet. Grazie ai nostri mezzi e al nostro personale tempestivo e professionale, potrete così ricevere direttamente a casa vostra il pellet o il cherosene per riscaldare nella stagione invernale i vostri ambienti.

Cisterne per gasolio in plastica e ferro

Infine presso quest’azienda sono disponibili bombole di gas per l’utilizzo domestico e per la cucina, nonché cisterne in plastica e ferro adatte a contenere gasolio, con una capienza specifica che parte da 1500 litri, pensate per l’utilizzo agricolo, o per la trazione di veicoli commerciali e industriali.`,
    service3_btn: 'Scopri di Più',
    service4_title: 'Bonifica e Revisioni',
    service4_desc: 'Servizi certificati di manutenzione e pulizia cisterne periodica.',
    service4_btn: 'Richiedi Info',
    about_badge: 'Perché Sceglierci',
    about_title: 'La Nostra Eccellenza',
    about_subtitle: 'Esperienza, professionalità e sicurezza al servizio dei nostri clienti',
    about_feature1_title: '60 Anni di Esperienza',
    about_feature1_desc: 'Un percorso decennale nel settore dei trasporti',
    about_feature2_title: 'Specializzati ADR',
    about_feature2_desc: 'Certificazioni per merci pericolose',
    about_feature3_title: 'Mezzi Moderni',
    about_feature3_desc: 'Flotta certificata e controllata',
    about_feature4_title: 'Servizio Rapido',
    about_feature4_desc: 'Puntualità e tempestività garantite',
    about_feature5_title: 'Assistenza Diretta',
    about_feature5_desc: 'Supporto professionale dedicato',
    about_feature6_title: 'Sicurezza Totale',
    about_feature6_desc: 'Conformità alle normative vigenti',
    numbers_badge: 'I Nostri Numeri',
    numbers_title: 'Risultati che Parlano',
    stats_years_activity: 'Anni di Attività',
    stats_special_vehicles: 'Mezzi Specializzati',
    stats_eu_coverage: 'Copertura Europea',
    transparency_badge:
      'Aiuti e contributi pubblici ricevuti nell’esercizio dell’attività d’impresa',
    year_modal_title: 'Nel corso dell’anno {year}',
    year_modal_law: '(L.124/2017 COMMI DA 125 A 129)',
    modal_zoom_out: 'Zoom indietro',
    modal_zoom_in: 'Zoom avanti',
    modal_close: 'Chiudi',
    modal_image_alt: 'Immagine {year}',
    fleet_badge: 'I Nostri Mezzi',
    fleet_title: 'Parco mezzi dedicato e certificato',
    fleet_subtitle:
      'Disponiamo di autocisterne e veicoli con diverse capacità per ogni esigenza, tutti regolarmente controllati e certificati ADR per il trasporto sicuro.',
    fleet_feature_security_title: 'Sicurezza',
    fleet_feature_security_desc: 'Sistemi di controllo avanzati',
    fleet_feature_quality_title: 'Qualità',
    fleet_feature_quality_desc: 'Manutenzione programmata',
    fleet_image_alt: 'Il nostro parco mezzi',
    fleet_operational_vehicles: 'Mezzi Operativi',
    fleet_capacity_unit: 'litri',
    fleet_capacity_desc_3000: 'Ideale per piccole consegne e aree urbane',
    fleet_capacity_desc_9000: 'Perfetta per medie distanze e carichi standard',
    fleet_capacity_desc_42000: 'Massima capacità per trasporti a lungo raggio',
    fleet_flexible: 'Soluzioni flessibili per ogni tipo di trasporto',
    process_badge: 'Come Lavoriamo',
    process_title: 'Il Nostro Processo',
    process_subtitle: 'Un approccio strutturato per garantire trasporti sicuri e puntuali',
    process_step1_title: 'Analisi',
    process_step1_desc: 'Analizziamo la tua richiesta e le tue esigenze',
    process_step2_title: 'Pianificazione',
    process_step2_desc: 'Pianifichiamo il trasporto in sicurezza',
    process_step3_title: 'Consegna',
    process_step3_desc: 'Effettuiamo la consegna puntuale',
    process_step4_title: 'Assistenza',
    process_step4_desc: 'Garantiamo assistenza post-consegna',
    cta_title: 'Hai Bisogno di un Trasporto?',
    cta_subtitle: 'Affidati a professionisti del settore con 60 anni di esperienza',
    cta_btn_quote: 'Richiedi Preventivo Gratuito',
    cta_btn_call: 'Chiama per Consulenza',
    contact_badge: 'Contatti',
    contact_title: 'Contattaci Subito',
    contact_subtitle: 'Siamo a tua disposizione per informazioni o preventivi gratuiti',
    contact_address_label: 'Sede Operativa',
    contact_phone_label: 'Telefono',
    contact_email_label: 'Email',
    contact_instagram_label: 'Instagram',
    service_hours_title: 'Orari di Servizio',
    weekday_mon_fri: 'Lunedì - Venerdì',
    weekday_sat: 'Sabato',
    weekday_sun: 'Domenica',
    closed: 'Chiuso',
    emergency_label: 'Emergenze 24/7:',
    emergency_text: 'Disponibili per interventi urgenti',
    form_title: 'Richiedi Preventivo',
    form_name: 'Nome',
    form_surname: 'Cognome',
    form_email: 'Email',
    form_phone: 'Telefono',
    form_service: 'Tipo di Servizio',
    service_option_adr: 'Trasporto Combustibili (ADR)',
    service_option_boat: 'Trasporto Imbarcazioni',
    service_option_sales: 'Vendita Combustibili',
    service_option_cleaning: 'Bonifica e Revisioni',
    service_option_other: 'Altro',
    placeholder_name: 'Il tuo nome',
    placeholder_surname: 'Il tuo cognome',
    placeholder_email: 'La tua email',
    placeholder_phone: 'Il tuo numero di telefono',
    sales_products_label: 'Seleziona Prodotti (Scelta Multipla)',
    product_pellet: 'Pellet',
    product_gas_cylinders: 'Gas in bombole',
    cylinders_weight_label: 'Peso Bombola (Scelta Multipla)',
    qty_details_label: 'Quantità Totale / Dettagli',
    qty_details_placeholder: 'Es: 50 sacchi, 2 bombole da 15kg...',
    delivery_place_label: 'Luogo di Consegna',
    delivery_place_placeholder: 'Indirizzo completo per la consegna',
    preferred_date_label: 'Data Preferita',
    time_slot_label: 'Fascia Oraria',
    message_label: 'Messaggio',
    message_placeholder: 'Descrivi la tua richiesta...',
    privacy_accept_prefix: 'Ho letto e accetto l’',
    privacy_accept_link: 'Informativa Privacy',
    privacy_accept_suffix: '.',
    privacy_error: 'Devi accettare l’Informativa Privacy per inviare la richiesta.',
    send_request: 'Invia Richiesta',
    reply_time: 'Risponderemo entro 24 ore lavorative',
    map_title: 'Posizione Mazzucotelli Petroli',
    footer_tagline: 'Trasporti sicuri dal 1966',
    footer_rights: 'Tutti i diritti riservati.',
    footer_privacy: 'Privacy',
    footer_terms: 'Termini',
    legal_title_privacy: 'Informativa Privacy',
    legal_title_terms: 'Termini e Condizioni',
    legal_h_controller: 'Titolare del trattamento',
    legal_controller_body:
      'Mazzucotelli Petroli – via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010 – email: info@mazzucotelli.it – tel: 0344 32669.',
    legal_h_data: 'Dati trattati',
    legal_data_body:
      'Dati di contatto (nome, cognome, email, telefono), contenuto del messaggio e informazioni necessarie per gestire richieste di preventivo o assistenza.',
    legal_h_purpose: 'Finalità e base giuridica',
    legal_purpose_1: 'Gestione richieste e contatti: esecuzione di misure precontrattuali/contrattuali.',
    legal_purpose_2: 'Adempimenti legali e fiscali: obbligo di legge.',
    legal_purpose_3: 'Sicurezza del sito e prevenzione abusi: legittimo interesse.',
    legal_h_retention: 'Conservazione',
    legal_retention_body:
      'I dati sono conservati per il tempo necessario a gestire la richiesta e, se applicabile, per gli obblighi di legge.',
    legal_h_recipients: 'Destinatari',
    legal_recipients_body:
      'Fornitori tecnici (hosting, manutenzione) e, se necessario, soggetti obbligati per legge. I dati non vengono diffusi.',
    legal_h_rights: 'Diritti dell’interessato',
    legal_rights_body:
      'Puoi richiedere accesso, rettifica, cancellazione, limitazione, opposizione e portabilità, nei limiti previsti dal GDPR, scrivendo a info@mazzucotelli.it.',
    terms_h_subject: 'Oggetto',
    terms_subject_body: 'I presenti termini regolano l’uso del sito e dei contenuti pubblicati.',
    terms_h_content: 'Contenuti',
    terms_content_body:
      'Le informazioni hanno finalità informativa e possono essere aggiornate senza preavviso. Per preventivi e condizioni commerciali fa fede la comunicazione diretta.',
    terms_h_liability: 'Responsabilità',
    terms_liability_body:
      'Il titolare si impegna a mantenere le informazioni accurate, ma non garantisce l’assenza di errori o interruzioni del servizio.',
    terms_h_contacts: 'Contatti',
    terms_contacts_body: 'Per richieste e segnalazioni: info@mazzucotelli.it.',
    lang_label: 'Lingua',
  },
  en: {
    nav_services: 'Services',
    nav_about: 'About Us',
    nav_fleet: 'Fleet',
    nav_contact: 'Contacts',
    nav_quote: 'Free Quote',
    hero_badge: 'Safe transport across Europe',
    hero_bg_alt: 'Mazzucotelli Petroli tanker truck',
    hero_subtitle: 'Fuel and hazardous goods transport across Europe',
    hero_description:
      'Safety, punctuality and 60 years of experience. We operate with certified vehicles and qualified staff to ensure reliable transport compliant with ADR regulations.',
    hero_cta_quote: 'Request a Free Quote',
    hero_cta_callnow: 'Call Now',
    hero_stat_adr: 'ADR Certified',
    hero_stat_years: '60 Years',
    hero_stat_area: 'All Italy',
    hero_stat_clients: 'Satisfied Clients',
    services_badge: 'Our Services',
    services_title: 'Complete Solutions for Every Need',
    services_subtitle: 'Specialized services for the transport of fuels and hazardous goods',
    service1_title: 'Fuel Transport (ADR)',
    service1_image_alt: 'Fuel transport',
    service1_desc: 'We transport fuels and hazardous goods with maximum safety.',
    service1_btn: 'Learn More',
    service2_title: 'Boat Transport',
    service2_image_alt: 'Boat transport',
    service2_desc: 'Professional service for transporting boats and vessels.',
    service2_btn: 'Learn More',
    service2_more_title: 'Boat transport',
    service2_more_body:
      'With over forty years of experience, we operate in the logistics services market, taking care of inbound and outbound checks, supervising loading and unloading, and performing all logistics handling operations that require qualified staff and professional equipment. In particular, our company specializes in transporting boats of any kind, using trailers and vehicles that ensure maximum integrity during the journey.',
    service3_title: 'Fuel Sales',
    service3_desc: 'At our store you can find pellets and fuels.',
    service3_btn: 'Learn More',
    service4_title: 'Cleaning & Inspections',
    service4_desc: 'Certified services for periodic tank maintenance and cleaning.',
    service4_btn: 'Request Info',
    about_badge: 'Why Choose Us',
    about_title: 'Our Excellence',
    about_subtitle: 'Experience, professionalism and safety at your service',
    about_feature1_title: '60 Years of Experience',
    about_feature1_desc: 'Decades of know-how in the transport industry',
    about_feature2_title: 'ADR Specialists',
    about_feature2_desc: 'Certifications for hazardous goods',
    about_feature3_title: 'Modern Vehicles',
    about_feature3_desc: 'Certified and regularly inspected fleet',
    about_feature4_title: 'Fast Service',
    about_feature4_desc: 'Punctuality and responsiveness guaranteed',
    about_feature5_title: 'Direct Support',
    about_feature5_desc: 'Dedicated professional assistance',
    about_feature6_title: 'Total Safety',
    about_feature6_desc: 'Compliance with current regulations',
    numbers_badge: 'Our Numbers',
    numbers_title: 'Results That Speak',
    stats_years_activity: 'Years in Business',
    stats_special_vehicles: 'Specialized Vehicles',
    stats_eu_coverage: 'European Coverage',
    transparency_badge: 'Public aid and contributions received during the business year',
    year_modal_title: 'During the year {year}',
    year_modal_law: '(Law 124/2017, paragraphs 125 to 129)',
    modal_zoom_out: 'Zoom out',
    modal_zoom_in: 'Zoom in',
    modal_close: 'Close',
    modal_image_alt: 'Image {year}',
    fleet_badge: 'Our Fleet',
    fleet_title: 'Dedicated and certified fleet',
    fleet_subtitle:
      'We operate tank trucks and vehicles with different capacities for every need, regularly inspected and ADR-certified for safe transport.',
    fleet_feature_security_title: 'Safety',
    fleet_feature_security_desc: 'Advanced control systems',
    fleet_feature_quality_title: 'Quality',
    fleet_feature_quality_desc: 'Scheduled maintenance',
    fleet_image_alt: 'Our fleet',
    fleet_operational_vehicles: 'Vehicles in service',
    fleet_capacity_unit: 'liters',
    fleet_capacity_desc_3000: 'Ideal for small deliveries and urban areas',
    fleet_capacity_desc_9000: 'Perfect for medium distances and standard loads',
    fleet_capacity_desc_42000: 'Maximum capacity for long-distance transport',
    fleet_flexible: 'Flexible solutions for every type of transport',
    process_badge: 'How We Work',
    process_title: 'Our Process',
    process_subtitle: 'A structured approach to ensure safe and on-time transport',
    process_step1_title: 'Analysis',
    process_step1_desc: 'We analyze your request and needs',
    process_step2_title: 'Planning',
    process_step2_desc: 'We plan the transport safely',
    process_step3_title: 'Delivery',
    process_step3_desc: 'We deliver on time',
    process_step4_title: 'Support',
    process_step4_desc: 'We provide post-delivery support',
    cta_title: 'Need a Transport?',
    cta_subtitle: 'Rely on industry professionals with 60 years of experience',
    cta_btn_quote: 'Request a Free Quote',
    cta_btn_call: 'Call for Advice',
    contact_badge: 'Contacts',
    contact_title: 'Contact Us Now',
    contact_subtitle: 'We are available for information or free quotes',
    contact_address_label: 'Operational Office',
    contact_phone_label: 'Phone',
    contact_email_label: 'Email',
    contact_instagram_label: 'Instagram',
    service_hours_title: 'Service Hours',
    weekday_mon_fri: 'Monday - Friday',
    weekday_sat: 'Saturday',
    weekday_sun: 'Sunday',
    closed: 'Closed',
    emergency_label: 'Emergencies 24/7:',
    emergency_text: 'Available for urgent interventions',
    form_title: 'Request a Quote',
    form_name: 'First name',
    form_surname: 'Last name',
    form_email: 'Email',
    form_phone: 'Phone',
    form_service: 'Service Type',
    service_option_adr: 'Fuel Transport (ADR)',
    service_option_boat: 'Boat Transport',
    service_option_sales: 'Fuel Sales',
    service_option_cleaning: 'Cleaning & Inspections',
    service_option_other: 'Other',
    placeholder_name: 'Your first name',
    placeholder_surname: 'Your last name',
    placeholder_email: 'Your email',
    placeholder_phone: 'Your phone number',
    sales_products_label: 'Select Products (Multiple Choice)',
    product_pellet: 'Pellets',
    product_gas_cylinders: 'Gas cylinders',
    cylinders_weight_label: 'Cylinder Weight (Multiple Choice)',
    qty_details_label: 'Total Quantity / Details',
    qty_details_placeholder: 'E.g.: 50 bags, 2 cylinders of 15kg...',
    delivery_place_label: 'Delivery Location',
    delivery_place_placeholder: 'Full delivery address',
    preferred_date_label: 'Preferred Date',
    time_slot_label: 'Time Slot',
    message_label: 'Message',
    message_placeholder: 'Describe your request...',
    privacy_accept_prefix: 'I have read and accept the ',
    privacy_accept_link: 'Privacy Notice',
    privacy_accept_suffix: '.',
    privacy_error: 'You must accept the Privacy Notice to send the request.',
    send_request: 'Send Request',
    reply_time: 'We will reply within 24 business hours',
    map_title: 'Mazzucotelli Petroli location',
    footer_tagline: 'Safe transport since 1966',
    footer_rights: 'All rights reserved.',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
    legal_title_privacy: 'Privacy Notice',
    legal_title_terms: 'Terms & Conditions',
    legal_h_controller: 'Data controller',
    legal_controller_body:
      'Mazzucotelli Petroli – via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010 – email: info@mazzucotelli.it – tel: 0344 32669.',
    legal_h_data: 'Data processed',
    legal_data_body:
      'Contact data (first name, last name, email, phone), message content and information needed to handle quote requests or support.',
    legal_h_purpose: 'Purposes and legal basis',
    legal_purpose_1: 'Managing requests and contacts: pre-contractual/contractual measures.',
    legal_purpose_2: 'Legal and tax obligations: legal obligation.',
    legal_purpose_3: 'Website security and abuse prevention: legitimate interest.',
    legal_h_retention: 'Retention',
    legal_retention_body: 'Data are stored for the time needed to handle the request and, where applicable, for legal obligations.',
    legal_h_recipients: 'Recipients',
    legal_recipients_body:
      'Technical providers (hosting, maintenance) and, if necessary, parties required by law. Data are not disclosed.',
    legal_h_rights: 'Your rights',
    legal_rights_body:
      'You may request access, rectification, erasure, restriction, objection and portability within the limits of GDPR by writing to info@mazzucotelli.it.',
    terms_h_subject: 'Subject',
    terms_subject_body: 'These terms govern the use of the website and the published content.',
    terms_h_content: 'Content',
    terms_content_body:
      'Information is for informational purposes and may be updated without notice. Quotes and commercial terms are confirmed through direct communication.',
    terms_h_liability: 'Liability',
    terms_liability_body:
      'The owner strives to keep information accurate, but does not guarantee the absence of errors or service interruptions.',
    terms_h_contacts: 'Contacts',
    terms_contacts_body: 'For requests and reports: info@mazzucotelli.it.',
    lang_label: 'Language',
  },
  fr: {
    nav_services: 'Services',
    nav_about: 'À propos',
    nav_fleet: 'Flotte',
    nav_contact: 'Contacts',
    nav_quote: 'Devis gratuit',
    hero_badge: 'Transports sécurisés dans toute l’Europe',
    hero_bg_alt: 'Camion-citerne Mazzucotelli Petroli',
    hero_subtitle: 'Transport de carburants et de marchandises dangereuses dans toute l’Europe',
    hero_description:
      'Sécurité, ponctualité et 60 ans d’expérience. Nous opérons avec des véhicules certifiés et du personnel qualifié pour garantir des transports fiables conformes à la réglementation ADR.',
    hero_cta_quote: 'Demander un devis gratuit',
    hero_cta_callnow: 'Appeler maintenant',
    hero_stat_adr: 'Certifiés ADR',
    hero_stat_years: '60 ans',
    hero_stat_area: 'Toute l’Italie',
    hero_stat_clients: 'Clients satisfaits',
    services_badge: 'Nos services',
    services_title: 'Des solutions complètes pour chaque besoin',
    services_subtitle: 'Services spécialisés pour le transport de carburants et de marchandises dangereuses',
    service1_title: 'Transport de carburants (ADR)',
    service1_image_alt: 'Transport de carburants',
    service1_desc: 'Nous transportons des carburants et des marchandises dangereuses en toute sécurité.',
    service1_btn: 'En savoir plus',
    service2_title: 'Transport de bateaux',
    service2_image_alt: 'Transport de bateaux',
    service2_desc: 'Service professionnel pour le transport de bateaux et d’embarcations.',
    service2_btn: 'En savoir plus',
    service2_more_title: 'Transport de bateaux',
    service2_more_body:
      'Grâce à plus de quarante ans d’expérience, nous opérons sur le marché des services logistiques, en prenant en charge les contrôles des marchandises à l’arrivée ou au départ, en supervisant le chargement et le déchargement des colis et en réalisant toutes les opérations de manutention logistique nécessitant du personnel qualifié et des équipements professionnels. Notre entreprise est notamment spécialisée dans le transport de bateaux de tout type, grâce à l’utilisation de remorques et de véhicules garantissant une intégrité maximale pendant le trajet.',
    service3_title: 'Vente de carburants',
    service3_desc: 'Dans notre point de vente, vous trouverez des pellets et des carburants.',
    service3_btn: 'En savoir plus',
    service4_title: 'Nettoyage & contrôles',
    service4_desc: 'Services certifiés d’entretien et de nettoyage périodique des citernes.',
    service4_btn: 'Demander info',
    about_badge: 'Pourquoi nous choisir',
    about_title: 'Notre excellence',
    about_subtitle: 'Expérience, professionnalisme et sécurité au service de nos clients',
    about_feature1_title: '60 ans d’expérience',
    about_feature1_desc: 'Un savoir-faire de longue date dans le transport',
    about_feature2_title: 'Spécialistes ADR',
    about_feature2_desc: 'Certifications pour marchandises dangereuses',
    about_feature3_title: 'Véhicules modernes',
    about_feature3_desc: 'Flotte certifiée et contrôlée',
    about_feature4_title: 'Service rapide',
    about_feature4_desc: 'Ponctualité et réactivité garanties',
    about_feature5_title: 'Assistance directe',
    about_feature5_desc: 'Support professionnel dédié',
    about_feature6_title: 'Sécurité totale',
    about_feature6_desc: 'Conformité aux normes en vigueur',
    numbers_badge: 'Nos chiffres',
    numbers_title: 'Des résultats qui parlent',
    stats_years_activity: 'Années d’activité',
    stats_special_vehicles: 'Véhicules spécialisés',
    stats_eu_coverage: 'Couverture européenne',
    transparency_badge: 'Aides et contributions publiques reçues au cours de l’activité',
    year_modal_title: 'Au cours de l’année {year}',
    year_modal_law: '(Loi 124/2017, alinéas 125 à 129)',
    modal_zoom_out: 'Dézoomer',
    modal_zoom_in: 'Zoomer',
    modal_close: 'Fermer',
    modal_image_alt: 'Image {year}',
    fleet_badge: 'Notre flotte',
    fleet_title: 'Flotte dédiée et certifiée',
    fleet_subtitle:
      'Nous disposons de citernes et de véhicules de différentes capacités, régulièrement contrôlés et certifiés ADR pour un transport sûr.',
    fleet_feature_security_title: 'Sécurité',
    fleet_feature_security_desc: 'Systèmes de contrôle avancés',
    fleet_feature_quality_title: 'Qualité',
    fleet_feature_quality_desc: 'Maintenance programmée',
    fleet_image_alt: 'Notre flotte',
    fleet_operational_vehicles: 'Véhicules opérationnels',
    fleet_capacity_unit: 'litres',
    fleet_capacity_desc_3000: 'Idéal pour les petites livraisons et les zones urbaines',
    fleet_capacity_desc_9000: 'Parfait pour les distances moyennes et les charges standard',
    fleet_capacity_desc_42000: 'Capacité maximale pour les transports longue distance',
    fleet_flexible: 'Solutions flexibles pour chaque type de transport',
    process_badge: 'Notre méthode',
    process_title: 'Notre processus',
    process_subtitle: 'Une approche structurée pour garantir des transports sûrs et ponctuels',
    process_step1_title: 'Analyse',
    process_step1_desc: 'Nous analysons votre demande et vos besoins',
    process_step2_title: 'Planification',
    process_step2_desc: 'Nous planifions le transport en toute sécurité',
    process_step3_title: 'Livraison',
    process_step3_desc: 'Nous livrons dans les délais',
    process_step4_title: 'Assistance',
    process_step4_desc: 'Nous assurons un support après livraison',
    cta_title: 'Besoin d’un transport ?',
    cta_subtitle: 'Faites confiance à des professionnels avec 60 ans d’expérience',
    cta_btn_quote: 'Demander un devis gratuit',
    cta_btn_call: 'Appeler pour un conseil',
    contact_badge: 'Contacts',
    contact_title: 'Contactez-nous',
    contact_subtitle: 'Nous sommes à votre disposition pour des informations ou des devis',
    contact_address_label: 'Siège opérationnel',
    contact_phone_label: 'Téléphone',
    contact_email_label: 'Email',
    contact_instagram_label: 'Instagram',
    service_hours_title: 'Horaires de service',
    weekday_mon_fri: 'Lundi - Vendredi',
    weekday_sat: 'Samedi',
    weekday_sun: 'Dimanche',
    closed: 'Fermé',
    emergency_label: 'Urgences 24/7 :',
    emergency_text: 'Disponibles pour les interventions urgentes',
    form_title: 'Demander un devis',
    form_name: 'Prénom',
    form_surname: 'Nom',
    form_email: 'Email',
    form_phone: 'Téléphone',
    form_service: 'Type de service',
    service_option_adr: 'Transport de carburants (ADR)',
    service_option_boat: 'Transport de bateaux',
    service_option_sales: 'Vente de carburants',
    service_option_cleaning: 'Nettoyage & contrôles',
    service_option_other: 'Autre',
    placeholder_name: 'Votre prénom',
    placeholder_surname: 'Votre nom',
    placeholder_email: 'Votre email',
    placeholder_phone: 'Votre numéro de téléphone',
    sales_products_label: 'Sélectionnez des produits (choix multiple)',
    product_pellet: 'Pellets',
    product_gas_cylinders: 'Gaz en bouteilles',
    cylinders_weight_label: 'Poids de la bouteille (choix multiple)',
    qty_details_label: 'Quantité totale / détails',
    qty_details_placeholder: 'Ex : 50 sacs, 2 bouteilles de 15 kg...',
    delivery_place_label: 'Lieu de livraison',
    delivery_place_placeholder: 'Adresse complète de livraison',
    preferred_date_label: 'Date souhaitée',
    time_slot_label: 'Créneau horaire',
    message_label: 'Message',
    message_placeholder: 'Décrivez votre demande...',
    privacy_accept_prefix: "J'ai lu et j'accepte la ",
    privacy_accept_link: 'Notice de confidentialité',
    privacy_accept_suffix: '.',
    privacy_error: 'Vous devez accepter la notice de confidentialité pour envoyer la demande.',
    send_request: 'Envoyer la demande',
    reply_time: 'Nous répondrons sous 24 heures ouvrées',
    map_title: 'Localisation Mazzucotelli Petroli',
    footer_tagline: 'Transports sécurisés depuis 1966',
    footer_rights: 'Tous droits réservés.',
    footer_privacy: 'Confidentialité',
    footer_terms: 'Conditions',
    legal_title_privacy: 'Notice de confidentialité',
    legal_title_terms: 'Conditions générales',
    legal_h_controller: 'Responsable du traitement',
    legal_controller_body:
      'Mazzucotelli Petroli – via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010 – email: info@mazzucotelli.it – tel: 0344 32669.',
    legal_h_data: 'Données traitées',
    legal_data_body:
      'Données de contact (prénom, nom, email, téléphone), contenu du message et informations nécessaires pour traiter les demandes de devis ou d’assistance.',
    legal_h_purpose: 'Finalités et base juridique',
    legal_purpose_1: 'Gestion des demandes et contacts : mesures précontractuelles/contractuelles.',
    legal_purpose_2: 'Obligations légales et fiscales : obligation légale.',
    legal_purpose_3: 'Sécurité du site et prévention des abus : intérêt légitime.',
    legal_h_retention: 'Conservation',
    legal_retention_body:
      'Les données sont conservées le temps nécessaire au traitement de la demande et, le cas échéant, pour les obligations légales.',
    legal_h_recipients: 'Destinataires',
    legal_recipients_body:
      'Fournisseurs techniques (hébergement, maintenance) et, si nécessaire, personnes tenues par la loi. Les données ne sont pas divulguées.',
    legal_h_rights: 'Droits',
    legal_rights_body:
      'Vous pouvez demander l’accès, la rectification, l’effacement, la limitation, l’opposition et la portabilité dans les limites du RGPD en écrivant à info@mazzucotelli.it.',
    terms_h_subject: 'Objet',
    terms_subject_body: 'Les présentes conditions régissent l’utilisation du site et des contenus publiés.',
    terms_h_content: 'Contenus',
    terms_content_body:
      'Les informations sont à titre indicatif et peuvent être mises à jour sans préavis. Les devis et conditions commerciales sont confirmés par communication directe.',
    terms_h_liability: 'Responsabilité',
    terms_liability_body:
      'Le titulaire s’efforce de maintenir des informations exactes, sans garantir l’absence d’erreurs ou d’interruptions.',
    terms_h_contacts: 'Contacts',
    terms_contacts_body: 'Pour demandes et signalements : info@mazzucotelli.it.',
    lang_label: 'Langue',
  },
  de: {
    nav_services: 'Leistungen',
    nav_about: 'Über uns',
    nav_fleet: 'Fuhrpark',
    nav_contact: 'Kontakt',
    nav_quote: 'Kostenloses Angebot',
    hero_badge: 'Sichere Transporte in ganz Europa',
    hero_bg_alt: 'Tankwagen Mazzucotelli Petroli',
    hero_subtitle: 'Transport von Kraftstoffen und Gefahrgut in ganz Europa',
    hero_description:
      'Sicherheit, Pünktlichkeit und 60 Jahre Erfahrung. Wir arbeiten mit zertifizierten Fahrzeugen und qualifiziertem Personal, um zuverlässige Transporte gemäß ADR-Vorschriften zu gewährleisten.',
    hero_cta_quote: 'Kostenloses Angebot anfordern',
    hero_cta_callnow: 'Jetzt anrufen',
    hero_stat_adr: 'ADR-zertifiziert',
    hero_stat_years: '60 Jahre',
    hero_stat_area: 'Ganz Italien',
    hero_stat_clients: 'Zufriedene Kunden',
    services_badge: 'Unsere Leistungen',
    services_title: 'Komplette Lösungen für jeden Bedarf',
    services_subtitle: 'Spezialisierte Dienstleistungen für den Transport von Kraftstoffen und Gefahrgut',
    service1_title: 'Kraftstofftransport (ADR)',
    service1_image_alt: 'Kraftstofftransport',
    service1_desc: 'Wir transportieren Kraftstoffe und Gefahrgut mit höchster Sicherheit.',
    service1_btn: 'Mehr erfahren',
    service2_title: 'Bootstransport',
    service2_image_alt: 'Bootstransport',
    service2_desc: 'Professioneller Transport von Booten und Wasserfahrzeugen.',
    service2_btn: 'Mehr erfahren',
    service2_more_title: 'Bootstransport',
    service2_more_body:
      'Dank unserer Erfahrung von über vierzig Jahren können wir im Markt der Logistikdienstleistungen tätig sein: Wir übernehmen die Kontrolle eingehender und ausgehender Waren, überwachen Be- und Entladung und führen alle logistischen Handhabungsprozesse aus, die qualifiziertes Personal und professionelle Ausrüstung erfordern. Insbesondere ist unser Unternehmen auf den Transport von Booten jeder Art spezialisiert – mit Anhängern und Fahrzeugen, die maximale Unversehrtheit während der Fahrt gewährleisten.',
    service3_title: 'Kraftstoffverkauf',
    service3_desc: 'In unserem Verkaufspunkt finden Sie Pellets und Kraftstoffe.',
    service3_btn: 'Mehr erfahren',
    service4_title: 'Reinigung & Prüfungen',
    service4_desc: 'Zertifizierte Wartung und regelmäßige Reinigung von Tanks.',
    service4_btn: 'Info anfragen',
    about_badge: 'Warum wir',
    about_title: 'Unsere Exzellenz',
    about_subtitle: 'Erfahrung, Professionalität und Sicherheit für unsere Kunden',
    about_feature1_title: '60 Jahre Erfahrung',
    about_feature1_desc: 'Jahrzehntelange Erfahrung im Transportwesen',
    about_feature2_title: 'ADR-Spezialisten',
    about_feature2_desc: 'Zertifizierungen für Gefahrgut',
    about_feature3_title: 'Moderne Fahrzeuge',
    about_feature3_desc: 'Zertifizierter und geprüfter Fuhrpark',
    about_feature4_title: 'Schneller Service',
    about_feature4_desc: 'Pünktlichkeit und schnelle Reaktion garantiert',
    about_feature5_title: 'Direkter Support',
    about_feature5_desc: 'Dedizierte professionelle Unterstützung',
    about_feature6_title: 'Maximale Sicherheit',
    about_feature6_desc: 'Einhaltung der geltenden Vorschriften',
    numbers_badge: 'Unsere Zahlen',
    numbers_title: 'Ergebnisse, die überzeugen',
    stats_years_activity: 'Jahre am Markt',
    stats_special_vehicles: 'Spezialfahrzeuge',
    stats_eu_coverage: 'Europaweite Abdeckung',
    transparency_badge: 'Öffentliche Beihilfen und Beiträge im Geschäftsjahr',
    year_modal_title: 'Im Jahr {year}',
    year_modal_law: '(Gesetz 124/2017, Absätze 125 bis 129)',
    modal_zoom_out: 'Verkleinern',
    modal_zoom_in: 'Vergrößern',
    modal_close: 'Schließen',
    modal_image_alt: 'Bild {year}',
    fleet_badge: 'Unser Fuhrpark',
    fleet_title: 'Dedizierter und zertifizierter Fuhrpark',
    fleet_subtitle:
      'Wir verfügen über Tankfahrzeuge und Fahrzeuge mit verschiedenen Kapazitäten, regelmäßig geprüft und ADR-zertifiziert für sicheren Transport.',
    fleet_feature_security_title: 'Sicherheit',
    fleet_feature_security_desc: 'Moderne Kontrollsysteme',
    fleet_feature_quality_title: 'Qualität',
    fleet_feature_quality_desc: 'Geplante Wartung',
    fleet_image_alt: 'Unser Fuhrpark',
    fleet_operational_vehicles: 'Einsatzfahrzeuge',
    fleet_capacity_unit: 'Liter',
    fleet_capacity_desc_3000: 'Ideal für kleine Lieferungen und Stadtgebiete',
    fleet_capacity_desc_9000: 'Perfekt für mittlere Strecken und Standardladungen',
    fleet_capacity_desc_42000: 'Maximale Kapazität für Langstreckentransporte',
    fleet_flexible: 'Flexible Lösungen für jede Art von Transport',
    process_badge: 'So arbeiten wir',
    process_title: 'Unser Prozess',
    process_subtitle: 'Ein strukturierter Ansatz für sichere und pünktliche Transporte',
    process_step1_title: 'Analyse',
    process_step1_desc: 'Wir analysieren Ihre Anfrage und Anforderungen',
    process_step2_title: 'Planung',
    process_step2_desc: 'Wir planen den Transport sicher',
    process_step3_title: 'Lieferung',
    process_step3_desc: 'Wir liefern pünktlich',
    process_step4_title: 'Support',
    process_step4_desc: 'Wir bieten Unterstützung nach der Lieferung',
    cta_title: 'Transport benötigt?',
    cta_subtitle: 'Vertrauen Sie auf Profis mit 60 Jahren Erfahrung',
    cta_btn_quote: 'Kostenloses Angebot anfordern',
    cta_btn_call: 'Für Beratung anrufen',
    contact_badge: 'Kontakt',
    contact_title: 'Kontaktieren Sie uns',
    contact_subtitle: 'Wir sind für Informationen oder kostenlose Angebote verfügbar',
    contact_address_label: 'Betriebsstätte',
    contact_phone_label: 'Telefon',
    contact_email_label: 'Email',
    contact_instagram_label: 'Instagram',
    service_hours_title: 'Servicezeiten',
    weekday_mon_fri: 'Montag - Freitag',
    weekday_sat: 'Samstag',
    weekday_sun: 'Sonntag',
    closed: 'Geschlossen',
    emergency_label: 'Notfälle 24/7:',
    emergency_text: 'Für dringende Einsätze verfügbar',
    form_title: 'Angebot anfordern',
    form_name: 'Vorname',
    form_surname: 'Nachname',
    form_email: 'Email',
    form_phone: 'Telefon',
    form_service: 'Leistungsart',
    service_option_adr: 'Kraftstofftransport (ADR)',
    service_option_boat: 'Bootstransport',
    service_option_sales: 'Kraftstoffverkauf',
    service_option_cleaning: 'Reinigung & Prüfungen',
    service_option_other: 'Sonstiges',
    placeholder_name: 'Ihr Vorname',
    placeholder_surname: 'Ihr Nachname',
    placeholder_email: 'Ihre Email',
    placeholder_phone: 'Ihre Telefonnummer',
    sales_products_label: 'Produkte auswählen (Mehrfachauswahl)',
    product_pellet: 'Pellets',
    product_gas_cylinders: 'Gasflaschen',
    cylinders_weight_label: 'Flaschengewicht (Mehrfachauswahl)',
    qty_details_label: 'Gesamtmenge / Details',
    qty_details_placeholder: 'Z. B.: 50 Säcke, 2 Flaschen à 15 kg...',
    delivery_place_label: 'Lieferort',
    delivery_place_placeholder: 'Vollständige Lieferadresse',
    preferred_date_label: 'Wunschtermin',
    time_slot_label: 'Zeitfenster',
    message_label: 'Nachricht',
    message_placeholder: 'Beschreiben Sie Ihre Anfrage...',
    privacy_accept_prefix: 'Ich habe die ',
    privacy_accept_link: 'Datenschutzhinweise',
    privacy_accept_suffix: ' gelesen und akzeptiere sie.',
    privacy_error: 'Sie müssen die Datenschutzhinweise akzeptieren, um die Anfrage zu senden.',
    send_request: 'Anfrage senden',
    reply_time: 'Wir antworten innerhalb von 24 Werktagsstunden',
    map_title: 'Standort Mazzucotelli Petroli',
    footer_tagline: 'Sichere Transporte seit 1966',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_privacy: 'Datenschutz',
    footer_terms: 'Bedingungen',
    legal_title_privacy: 'Datenschutzhinweise',
    legal_title_terms: 'Allgemeine Bedingungen',
    legal_h_controller: 'Verantwortlicher',
    legal_controller_body:
      'Mazzucotelli Petroli – via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010 – email: info@mazzucotelli.it – tel: 0344 32669.',
    legal_h_data: 'Verarbeitete Daten',
    legal_data_body:
      'Kontaktdaten (Vorname, Nachname, Email, Telefon), Nachrichteninhalt und Informationen zur Bearbeitung von Angeboten oder Support.',
    legal_h_purpose: 'Zwecke und Rechtsgrundlage',
    legal_purpose_1: 'Anfragen und Kontakte: vorvertragliche/vertragliche Maßnahmen.',
    legal_purpose_2: 'Rechtliche und steuerliche Pflichten: gesetzliche Verpflichtung.',
    legal_purpose_3: 'Website-Sicherheit und Missbrauchsprävention: berechtigtes Interesse.',
    legal_h_retention: 'Speicherdauer',
    legal_retention_body:
      'Die Daten werden so lange gespeichert, wie es zur Bearbeitung erforderlich ist, und ggf. gemäß gesetzlichen Pflichten.',
    legal_h_recipients: 'Empfänger',
    legal_recipients_body:
      'Technische Dienstleister (Hosting, Wartung) und ggf. gesetzlich verpflichtete Stellen. Keine Weitergabe an Dritte.',
    legal_h_rights: 'Rechte',
    legal_rights_body:
      'Sie können Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit im Rahmen der DSGVO verlangen (info@mazzucotelli.it).',
    terms_h_subject: 'Gegenstand',
    terms_subject_body: 'Diese Bedingungen regeln die Nutzung der Website und der veröffentlichten Inhalte.',
    terms_h_content: 'Inhalte',
    terms_content_body:
      'Informationen dienen nur der Orientierung und können ohne Vorankündigung geändert werden. Angebote und kommerzielle Bedingungen werden direkt bestätigt.',
    terms_h_liability: 'Haftung',
    terms_liability_body:
      'Der Betreiber bemüht sich um korrekte Informationen, übernimmt jedoch keine Garantie für Fehlerfreiheit oder ununterbrochenen Betrieb.',
    terms_h_contacts: 'Kontakt',
    terms_contacts_body: 'Für Anfragen und Meldungen: info@mazzucotelli.it.',
    lang_label: 'Sprache',
  },
  es: {
    nav_services: 'Servicios',
    nav_about: 'Quiénes somos',
    nav_fleet: 'Flota',
    nav_contact: 'Contacto',
    nav_quote: 'Presupuesto gratis',
    hero_badge: 'Transportes seguros en toda Europa',
    hero_bg_alt: 'Camión cisterna Mazzucotelli Petroli',
    hero_subtitle: 'Transporte de combustibles y mercancías peligrosas en toda Europa',
    hero_description:
      'Seguridad, puntualidad y 60 años de experiencia. Operamos con vehículos certificados y personal cualificado para garantizar transportes fiables conformes a la normativa ADR.',
    hero_cta_quote: 'Solicita un presupuesto gratis',
    hero_cta_callnow: 'Llama ahora',
    hero_stat_adr: 'Certificados ADR',
    hero_stat_years: '60 años',
    hero_stat_area: 'Toda Italia',
    hero_stat_clients: 'Clientes satisfechos',
    services_badge: 'Nuestros servicios',
    services_title: 'Soluciones completas para cada necesidad',
    services_subtitle: 'Servicios especializados para el transporte de combustibles y mercancías peligrosas',
    service1_title: 'Transporte de combustibles (ADR)',
    service1_image_alt: 'Transporte de combustibles',
    service1_desc: 'Transportamos combustibles y mercancías peligrosas con total seguridad.',
    service1_btn: 'Descubre más',
    service2_title: 'Transporte de embarcaciones',
    service2_image_alt: 'Transporte de embarcaciones',
    service2_desc: 'Servicio profesional para el transporte de barcos y embarcaciones.',
    service2_btn: 'Descubre más',
    service2_more_title: 'Transporte de embarcaciones',
    service2_more_body:
      'Gracias a nuestra experiencia de más de cuarenta años, operamos en el mercado de servicios logísticos, ocupándonos del control de mercancías entrantes o salientes, supervisando la carga y descarga de los bultos y realizando todas las operaciones de manipulación logística que requieren personal cualificado y equipos profesionales. En particular, nuestra empresa está especializada en el transporte de embarcaciones de cualquier tipo, gracias al uso de remolques y vehículos que garantizan la máxima integridad durante el viaje.',
    service3_title: 'Venta de combustibles',
    service3_desc: 'En nuestro punto de venta puedes encontrar pellets y combustibles.',
    service3_btn: 'Descubre más',
    service4_title: 'Limpieza y revisiones',
    service4_desc: 'Servicios certificados de mantenimiento y limpieza periódica de cisternas.',
    service4_btn: 'Solicitar info',
    about_badge: 'Por qué elegirnos',
    about_title: 'Nuestra excelencia',
    about_subtitle: 'Experiencia, profesionalidad y seguridad al servicio de nuestros clientes',
    about_feature1_title: '60 años de experiencia',
    about_feature1_desc: 'Décadas en el sector del transporte',
    about_feature2_title: 'Especialistas ADR',
    about_feature2_desc: 'Certificaciones para mercancías peligrosas',
    about_feature3_title: 'Vehículos modernos',
    about_feature3_desc: 'Flota certificada y controlada',
    about_feature4_title: 'Servicio rápido',
    about_feature4_desc: 'Puntualidad y rapidez garantizadas',
    about_feature5_title: 'Asistencia directa',
    about_feature5_desc: 'Soporte profesional dedicado',
    about_feature6_title: 'Seguridad total',
    about_feature6_desc: 'Cumplimiento de la normativa vigente',
    numbers_badge: 'Nuestras cifras',
    numbers_title: 'Resultados que hablan',
    stats_years_activity: 'Años de actividad',
    stats_special_vehicles: 'Vehículos especializados',
    stats_eu_coverage: 'Cobertura europea',
    transparency_badge: 'Ayudas y aportaciones públicas recibidas durante la actividad',
    year_modal_title: 'Durante el año {year}',
    year_modal_law: '(Ley 124/2017, apartados 125 a 129)',
    modal_zoom_out: 'Alejar',
    modal_zoom_in: 'Acercar',
    modal_close: 'Cerrar',
    modal_image_alt: 'Imagen {year}',
    fleet_badge: 'Nuestra flota',
    fleet_title: 'Flota dedicada y certificada',
    fleet_subtitle:
      'Disponemos de cisternas y vehículos con distintas capacidades, revisados y certificados ADR para un transporte seguro.',
    fleet_feature_security_title: 'Seguridad',
    fleet_feature_security_desc: 'Sistemas de control avanzados',
    fleet_feature_quality_title: 'Calidad',
    fleet_feature_quality_desc: 'Mantenimiento programado',
    fleet_image_alt: 'Nuestra flota',
    fleet_operational_vehicles: 'Vehículos operativos',
    fleet_capacity_unit: 'litros',
    fleet_capacity_desc_3000: 'Ideal para pequeñas entregas y zonas urbanas',
    fleet_capacity_desc_9000: 'Perfecta para distancias medias y cargas estándar',
    fleet_capacity_desc_42000: 'Máxima capacidad para transportes de larga distancia',
    fleet_flexible: 'Soluciones flexibles para cada tipo de transporte',
    process_badge: 'Cómo trabajamos',
    process_title: 'Nuestro proceso',
    process_subtitle: 'Un enfoque estructurado para garantizar transportes seguros y puntuales',
    process_step1_title: 'Análisis',
    process_step1_desc: 'Analizamos tu solicitud y tus necesidades',
    process_step2_title: 'Planificación',
    process_step2_desc: 'Planificamos el transporte con seguridad',
    process_step3_title: 'Entrega',
    process_step3_desc: 'Realizamos la entrega puntual',
    process_step4_title: 'Asistencia',
    process_step4_desc: 'Garantizamos asistencia posterior',
    cta_title: '¿Necesitas un transporte?',
    cta_subtitle: 'Confía en profesionales con 60 años de experiencia',
    cta_btn_quote: 'Solicita un presupuesto gratis',
    cta_btn_call: 'Llama para asesorarte',
    contact_badge: 'Contacto',
    contact_title: 'Contáctanos ahora',
    contact_subtitle: 'Estamos disponibles para información o presupuestos',
    contact_address_label: 'Sede operativa',
    contact_phone_label: 'Teléfono',
    contact_email_label: 'Email',
    contact_instagram_label: 'Instagram',
    service_hours_title: 'Horario de servicio',
    weekday_mon_fri: 'Lunes - Viernes',
    weekday_sat: 'Sábado',
    weekday_sun: 'Domingo',
    closed: 'Cerrado',
    emergency_label: 'Emergencias 24/7:',
    emergency_text: 'Disponibles para intervenciones urgentes',
    form_title: 'Solicitar presupuesto',
    form_name: 'Nombre',
    form_surname: 'Apellido',
    form_email: 'Email',
    form_phone: 'Teléfono',
    form_service: 'Tipo de servicio',
    service_option_adr: 'Transporte de combustibles (ADR)',
    service_option_boat: 'Transporte de embarcaciones',
    service_option_sales: 'Venta de combustibles',
    service_option_cleaning: 'Limpieza y revisiones',
    service_option_other: 'Otro',
    placeholder_name: 'Tu nombre',
    placeholder_surname: 'Tu apellido',
    placeholder_email: 'Tu email',
    placeholder_phone: 'Tu número de teléfono',
    sales_products_label: 'Selecciona productos (elección múltiple)',
    product_pellet: 'Pellets',
    product_gas_cylinders: 'Gas en bombonas',
    cylinders_weight_label: 'Peso de la bombona (elección múltiple)',
    qty_details_label: 'Cantidad total / detalles',
    qty_details_placeholder: 'Ej.: 50 sacos, 2 bombonas de 15 kg...',
    delivery_place_label: 'Lugar de entrega',
    delivery_place_placeholder: 'Dirección completa de entrega',
    preferred_date_label: 'Fecha preferida',
    time_slot_label: 'Franja horaria',
    message_label: 'Mensaje',
    message_placeholder: 'Describe tu solicitud...',
    privacy_accept_prefix: 'He leído y acepto la ',
    privacy_accept_link: 'informativa de privacidad',
    privacy_accept_suffix: '.',
    privacy_error: 'Debes aceptar la informativa de privacidad para enviar la solicitud.',
    send_request: 'Enviar solicitud',
    reply_time: 'Responderemos en 24 horas laborables',
    map_title: 'Ubicación Mazzucotelli Petroli',
    footer_tagline: 'Transportes seguros desde 1966',
    footer_rights: 'Todos los derechos reservados.',
    footer_privacy: 'Privacidad',
    footer_terms: 'Términos',
    legal_title_privacy: 'Informativa de privacidad',
    legal_title_terms: 'Términos y condiciones',
    legal_h_controller: 'Responsable del tratamiento',
    legal_controller_body:
      'Mazzucotelli Petroli – via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010 – email: info@mazzucotelli.it – tel: 0344 32669.',
    legal_h_data: 'Datos tratados',
    legal_data_body:
      'Datos de contacto (nombre, apellido, email, teléfono), contenido del mensaje e información necesaria para gestionar presupuestos o asistencia.',
    legal_h_purpose: 'Finalidades y base jurídica',
    legal_purpose_1: 'Gestión de solicitudes y contactos: medidas precontractuales/contractuales.',
    legal_purpose_2: 'Obligaciones legales y fiscales: obligación legal.',
    legal_purpose_3: 'Seguridad del sitio y prevención de abusos: interés legítimo.',
    legal_h_retention: 'Conservación',
    legal_retention_body:
      'Los datos se conservan el tiempo necesario para gestionar la solicitud y, si procede, por obligaciones legales.',
    legal_h_recipients: 'Destinatarios',
    legal_recipients_body:
      'Proveedores técnicos (hosting, mantenimiento) y, si es necesario, sujetos obligados por ley. Los datos no se difunden.',
    legal_h_rights: 'Derechos',
    legal_rights_body:
      'Puedes solicitar acceso, rectificación, supresión, limitación, oposición y portabilidad dentro del RGPD escribiendo a info@mazzucotelli.it.',
    terms_h_subject: 'Objeto',
    terms_subject_body: 'Estos términos regulan el uso del sitio y de los contenidos publicados.',
    terms_h_content: 'Contenidos',
    terms_content_body:
      'La información es informativa y puede actualizarse sin aviso. Los presupuestos y condiciones comerciales se confirman por comunicación directa.',
    terms_h_liability: 'Responsabilidad',
    terms_liability_body:
      'El titular procura mantener la información exacta, pero no garantiza ausencia de errores o interrupciones del servicio.',
    terms_h_contacts: 'Contactos',
    terms_contacts_body: 'Para solicitudes y avisos: info@mazzucotelli.it.',
    lang_label: 'Idioma',
  },
};

const LISTS: Record<Lang, Record<string, string[]>> = {
  it: {
    service1_bullets: [
      'Gasolio da riscaldamento per abitazioni',
      'Gasolio agricolo',
      'Gasolio per l’autotrazione',
      'Cherosene',
    ],
    service2_bullets: ['Trasporto sicuro', 'Mezzi dedicati', 'Esperienza'],
    service3_bullets: ['Gas in bombole', 'Pellet', 'Gasolio', 'Cisterne per gasolio in plastica e ferro'],
    service4_bullets: ['Bonifica interna', 'Revisioni periodiche', 'Certificazioni'],
  },
  en: {
    service1_bullets: ['Heating diesel', 'Agricultural diesel', 'Diesel for vehicles', 'Kerosene'],
    service2_bullets: ['Safe transport', 'Dedicated vehicles', 'Experience'],
    service3_bullets: ['Pellets', 'Gas cylinders', 'Diesel'],
    service4_bullets: ['Internal cleaning', 'Periodic inspections', 'Certifications'],
  },
  fr: {
    service1_bullets: ['Gazole de chauffage', 'Gazole agricole', 'Gazole pour l’autotraction', 'Kérosène'],
    service2_bullets: ['Transport sécurisé', 'Véhicules dédiés', 'Expérience'],
    service3_bullets: ['Pellets', 'Gaz en bouteilles', 'Gazole'],
    service4_bullets: ['Nettoyage interne', 'Contrôles périodiques', 'Certifications'],
  },
  de: {
    service1_bullets: ['Heizöl', 'Agrardiesel', 'Diesel für Fahrzeuge', 'Kerosin'],
    service2_bullets: ['Sicherer Transport', 'Dedizierte Fahrzeuge', 'Erfahrung'],
    service3_bullets: ['Pellets', 'Gasflaschen', 'Diesel'],
    service4_bullets: ['Innenreinigung', 'Regelmäßige Prüfungen', 'Zertifizierungen'],
  },
  es: {
    service1_bullets: ['Gasóleo de calefacción', 'Gasóleo agrícola', 'Gasóleo para automoción', 'Queroseno'],
    service2_bullets: ['Transporte seguro', 'Vehículos dedicados', 'Experiencia'],
    service3_bullets: ['Pellets', 'Gas en bombonas', 'Diésel'],
    service4_bullets: ['Limpieza interna', 'Revisiones periódicas', 'Certificaciones'],
  },
};

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
  type ServiceDetailsModal = 'fuel' | 'boat' | 'sales';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('it');
  const [serviceDetailsModal, setServiceDetailsModal] = useState<ServiceDetailsModal | null>(null);
  const serviceDetailsScrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedService, setSelectedService] = useState('Trasporto Combustibili (ADR)');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<2019 | 2020 | 2021 | 2022 | null>(null);
  const [imageZoom, setImageZoom] = useState(1);
  const pinchRef = useRef<{ distance: number; zoom: number } | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [privacyConsentTouched, setPrivacyConsentTouched] = useState(false);

  const todayMinDate = (() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();

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

  const t = (key: string) => COPY[lang][key] ?? COPY.it[key] ?? key;
  const list = (key: string) => LISTS[lang][key] ?? LISTS.it[key] ?? [];

  useEffect(() => {
    try {
      const stored = localStorage.getItem('lang');
      if (stored === 'it' || stored === 'en' || stored === 'fr' || stored === 'de' || stored === 'es') {
        setLang(stored);
      }
    } catch {
      void 0;
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      void 0;
    }
  }, [lang]);

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

  useEffect(() => {
    setImageZoom(1);
  }, [selectedYear]);

  useEffect(() => {
    if (serviceDetailsModal === null) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setServiceDetailsModal(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [serviceDetailsModal]);

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
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-black overflow-hidden flex items-center justify-center shadow-lg flex-shrink-0">
                <img src="/logo.png" alt="Mazzucotelli Petroli Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1 sm:gap-2 leading-none min-w-0">
                <div className="h-7 sm:h-10 md:h-12 lg:h-[4rem] max-w-[120px] sm:max-w-[200px] shrink min-w-0">
                  <img
                    src="/font-preview.png"
                    alt="Mazzucotelli"
                    className="h-full w-auto object-contain"
                    style={{
                      filter:
                        'drop-shadow(1px 0 0 rgba(255,255,255,0.4)) drop-shadow(-1px 0 0 rgba(255,255,255,0.4)) drop-shadow(0 1px 0 rgba(255,255,255,0.4)) drop-shadow(0 -1px 0 rgba(255,255,255,0.4))',
                    }}
                  />
                </div>
                <span
                  className="inline-flex items-end h-7 sm:h-10 md:h-12 lg:h-[4rem] text-[1.18rem] sm:text-[1.6rem] md:text-[1.75rem] lg:text-[2.05rem] text-black font-extrabold italic leading-none -translate-y-[2px] sm:translate-y-[2px] shrink-0 whitespace-nowrap"
                  style={{
                    fontFamily: '"Torcao Condensed", system-ui, sans-serif',
                    filter:
                      'drop-shadow(1px 0 0 rgba(255,255,255,0.38)) drop-shadow(-1px 0 0 rgba(255,255,255,0.38)) drop-shadow(0 1px 0 rgba(255,255,255,0.38)) drop-shadow(0 -1px 0 rgba(255,255,255,0.38))',
                  }}
                >
                  Petroli
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {(
                [
                  { id: 'servizi', label: t('nav_services') },
                  { id: 'chi-siamo', label: t('nav_about') },
                  { id: 'mezzi', label: t('nav_fleet') },
                  { id: 'contatti', label: t('nav_contact') },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors hover:text-blue-400 ${
                    isScrolled ? 'text-gray-300' : 'text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Lang)}
                className={`px-3 py-2 rounded-full border text-sm font-semibold bg-transparent transition-colors ${
                  isScrolled
                    ? 'border-white/15 text-gray-200 hover:border-white/25'
                    : 'border-white/20 text-gray-100 hover:border-white/30'
                }`}
                aria-label={t('lang_label')}
              >
                {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
                  <option key={l} value={l} className="text-gray-900">
                    {LANG_LABEL[l]}
                  </option>
                ))}
              </select>
              <button
                onClick={() => scrollToSection('contatti')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                {t('nav_quote')}
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
              {(
                [
                  { id: 'servizi', label: t('nav_services') },
                  { id: 'chi-siamo', label: t('nav_about') },
                  { id: 'mezzi', label: t('nav_fleet') },
                  { id: 'contatti', label: t('nav_contact') },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-gray-200 font-medium py-2 hover:text-blue-400"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-400">{t('lang_label')}</span>
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Lang)}
                  className="flex-1 px-4 py-3 rounded-full border border-white/15 bg-white/5 text-white font-semibold"
                  aria-label={t('lang_label')}
                >
                  {(Object.keys(LANG_LABEL) as Lang[]).map((l) => (
                    <option key={l} value={l} className="text-gray-900">
                      {LANG_LABEL[l]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => scrollToSection('contatti')}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold"
              >
                {t('nav_quote')}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20 sm:pt-0 pb-10 sm:pb-0">
        <div className="absolute inset-0">
          <img
            src="/camionbotte.png"
            alt={t('hero_bg_alt')}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />
        </div>

        <div className="hidden sm:block absolute top-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-20 left-10 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal delayMs={0} className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-6 sm:mb-8">
            <Truck className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium text-sm sm:text-base">{t('hero_badge')}</span>
          </Reveal>

          <Reveal delayMs={80}>
            <h1 className="mb-6 font-bold text-white flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-2 sm:gap-x-4 leading-none">
              <span className="inline-flex items-end justify-center shrink-0 h-8 sm:h-10 md:h-12 lg:h-[4rem]">
                <img
                  src="/font-preview.png"
                  alt="Mazzucotelli"
                  className="h-full w-auto max-w-[85vw] object-contain"
                  style={{
                    filter:
                      'drop-shadow(2px 0 0 rgba(255,255,255,0.4)) drop-shadow(-2px 0 0 rgba(255,255,255,0.4)) drop-shadow(0 2px 0 rgba(255,255,255,0.4)) drop-shadow(0 -2px 0 rgba(255,255,255,0.4))',
                  }}
                />
              </span>
              <span
                className="inline-flex items-end h-8 sm:h-10 md:h-12 lg:h-[4rem] text-[1.85rem] sm:text-[3.05rem] md:text-[3.6rem] lg:text-[4.8rem] text-black font-extrabold italic leading-none translate-y-[4px] sm:translate-y-[7px]"
                style={{
                  fontFamily: '"Torcao Condensed", system-ui, sans-serif',
                  filter:
                    'drop-shadow(2px 0 0 rgba(255,255,255,0.4)) drop-shadow(-2px 0 0 rgba(255,255,255,0.4)) drop-shadow(0 2px 0 rgba(255,255,255,0.4)) drop-shadow(0 -2px 0 rgba(255,255,255,0.4))',
                }}
              >
                Petroli
              </span>
            </h1>
          </Reveal>

          <Reveal delayMs={140}>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium mb-4 max-w-3xl mx-auto">
              {t('hero_subtitle')}
            </p>
          </Reveal>

          <Reveal delayMs={200}>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
              {t('hero_description')}
            </p>
          </Reveal>

          <Reveal delayMs={260} className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contatti')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:shadow-2xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              {t('hero_cta_quote')}
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+39034432669"
              className="group bg-white/10 backdrop-blur border border-white/20 text-white px-7 py-3.5 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t('hero_cta_callnow')}
            </a>
          </Reveal>

          <Reveal delayMs={320} className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: t('hero_stat_adr') },
              { icon: Clock, label: t('hero_stat_years') },
              { icon: MapPin, label: t('hero_stat_area') },
              { icon: Users, label: t('hero_stat_clients') },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="bg-blue-900/50 p-2.5 sm:p-3 rounded-xl border border-blue-700/30">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                </div>
                <span className="text-gray-400 font-medium text-sm sm:text-base text-center leading-tight">{label}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="hidden sm:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-700/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-blue-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servizi" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Flame className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">{t('services_badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('services_title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('services_subtitle')}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Service 1 */}
            <Reveal delayMs={0} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                <img
                  src="/bonetti.png"
                  alt={t('service1_image_alt')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-blue-600 p-2 rounded-lg shadow-lg">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('service1_title')}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {t('service1_desc')}
                </p>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="inline-block">
                    {list('service1_bullets').map((item) => (
                      <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-controls="service-details-dialog"
                  onClick={() => setServiceDetailsModal('fuel')}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  {t('service1_btn')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Service 2 */}
            <Reveal delayMs={100} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                <img
                  src="/barca.png"
                  alt={t('service2_image_alt')}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="bg-blue-500 p-2 rounded-lg shadow-lg">
                    <Anchor className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {t('service2_title')}
                </h3>
                <p className="text-gray-600 mb-6 text-sm">
                  {t('service2_desc')}
                </p>
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="inline-block">
                    {list('service2_bullets').map((item) => (
                      <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                        <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-controls="service-details-dialog"
                  onClick={() => setServiceDetailsModal('boat')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  {t('service2_btn')}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>

            {/* Service 3 */}
            <Reveal delayMs={200} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-700 to-blue-900 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Flame className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('service3_title')}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {t('service3_desc')}
              </p>
              <div className="space-y-3 mb-6 flex-grow flex flex-col items-center">
                <div className="inline-block text-left">
                  {list('service3_bullets').map((item) => (
                    <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-1.5 h-1.5 bg-blue-700 rounded-full shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-controls="service-details-dialog"
                onClick={() => setServiceDetailsModal('sales')}
                className="w-full bg-gradient-to-r from-blue-700 to-blue-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-auto"
              >
                {t('service3_btn')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </Reveal>

            {/* Service 4 - New */}
            <Reveal delayMs={300} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Wrench className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('service4_title')}
              </h3>
              <p className="text-gray-600 mb-6 text-sm">
                {t('service4_desc')}
              </p>
              <div className="space-y-3 mb-6 flex-grow flex flex-col items-center">
                <div className="inline-block text-left">
                  {list('service4_bullets').map((item) => (
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
                {t('service4_btn')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {serviceDetailsModal !== null && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setServiceDetailsModal(null)}
        >
          <div
            id="service-details-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={
              serviceDetailsModal === 'boat'
                ? t('service2_more_title')
                : serviceDetailsModal === 'sales'
                  ? t('service3_title')
                  : t('service1_title')
            }
            className="w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-blue-600/30 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative flex items-center justify-center px-5 py-4 sm:px-6 sm:py-5 border-b border-blue-600/20 bg-white"
              onWheel={(e) => {
                if (serviceDetailsScrollRef.current) {
                  serviceDetailsScrollRef.current.scrollTop += e.deltaY;
                }
              }}
            >
              <div className="font-bold text-gray-900 text-center px-12 text-lg sm:text-xl">
                {serviceDetailsModal === 'boat'
                  ? t('service2_more_title')
                  : serviceDetailsModal === 'sales'
                    ? t('service3_title')
                    : t('service1_title')}
              </div>
              <button
                type="button"
                onClick={() => setServiceDetailsModal(null)}
                className="absolute right-4 p-2 rounded-xl hover:bg-blue-50 transition-colors"
                aria-label={t('modal_close')}
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>
            </div>
            <div
              ref={serviceDetailsScrollRef}
              className="p-6 sm:p-8 overflow-y-auto flex-1 min-h-0"
            >
              {serviceDetailsModal === 'boat' ? (
                <div className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8 whitespace-pre-line">
                  {t('service2_more_body')}
                </div>
              ) : serviceDetailsModal === 'sales' ? (
                lang === 'it' ? (
                  <div className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8 whitespace-pre-line">
                    {t('service3_more_body')}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
                      {t('service3_desc')}
                    </div>
                    <div className="inline-block">
                      {list('service3_bullets').map((item) => (
                        <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                          <div className="w-1.5 h-1.5 bg-blue-700 rounded-full shrink-0" />
                          <span className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : serviceDetailsModal === 'fuel' ? (
                lang === 'it' ? (
                  <div className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8 whitespace-pre-line">
                    {t('service1_more_body')}
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-base sm:text-lg text-gray-700 leading-7 sm:leading-8">
                      {t('service1_desc')}
                    </div>
                    <div className="inline-block">
                      {list('service1_bullets').map((item) => (
                        <div key={item} className="flex items-center gap-3 mb-3 last:mb-0">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                          <span className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <section id="chi-siamo" className="py-16 sm:py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-4">
              <Award className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-semibold">{t('about_badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('about_title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('about_subtitle')}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Clock, title: t('about_feature1_title'), desc: t('about_feature1_desc') },
              { icon: Shield, title: t('about_feature2_title'), desc: t('about_feature2_desc') },
              { icon: Truck, title: t('about_feature3_title'), desc: t('about_feature3_desc') },
              { icon: Zap, title: t('about_feature4_title'), desc: t('about_feature4_desc') },
              { icon: Users, title: t('about_feature5_title'), desc: t('about_feature5_desc') },
              { icon: Target, title: t('about_feature6_title'), desc: t('about_feature6_desc') },
            ].map(({ icon: Icon, title, desc }, idx) => (
              <Reveal key={`${idx}-${title}`} delayMs={idx * 80} className="bg-white/5 backdrop-blur border-2 border-blue-500/40 rounded-2xl p-6 hover:bg-white/10 transition-all group shadow-lg">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 sm:mt-24 pt-16 sm:pt-24 border-t border-white/10">
            <Reveal className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-semibold">{t('numbers_badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('numbers_title')}
              </h2>
            </Reveal>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { value: '60', label: t('stats_years_activity'), suffix: '' },
                { value: '10+', label: t('stats_special_vehicles'), suffix: '' },
                { value: '100%', label: t('stats_eu_coverage'), suffix: '' },
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

            <Reveal delayMs={240} className="mt-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 rounded-full px-4 py-2 mb-11">
                <CheckCircle className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300 font-semibold text-xs sm:text-sm text-center leading-tight">
                  {t('transparency_badge')}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[2019, 2020, 2021, 2022].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setSelectedYear(year as 2019 | 2020 | 2021 | 2022)}
                    className="px-8 py-4 text-lg sm:px-10 sm:text-xl rounded-full border border-blue-700/50 bg-blue-900/30 hover:bg-blue-900/45 text-white font-bold tracking-wide transition-all shadow-lg shadow-black/20"
                  >
                    {year}
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {selectedYear !== null && (
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setSelectedYear(null)}
        >
          <div
            className="w-full max-w-5xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-200">
              <div className="absolute left-4 flex items-center gap-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => setImageZoom(z => Math.max(1, Math.round((z - 0.25) * 100) / 100))}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
                  aria-label={t('modal_zoom_out')}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => setImageZoom(1)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
                >
                  100%
                </button>
                <button
                  type="button"
                  onClick={() => setImageZoom(z => Math.min(4, Math.round((z + 0.25) * 100) / 100))}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700"
                  aria-label={t('modal_zoom_in')}
                >
                  +
                </button>
              </div>

              <div className="font-bold text-gray-900 text-center px-12 sm:px-24 text-base sm:text-lg">
                <div className="leading-tight">
                  <div>{t('year_modal_title').replace('{year}', String(selectedYear))}</div>
                  <div className="text-sm font-semibold text-gray-700">
                    {t('year_modal_law')}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedYear(null)}
                className="absolute right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={t('modal_close')}
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <div className="p-4 bg-gray-50">
              <div
                className="max-h-[78vh] overflow-auto rounded-xl bg-white shadow touch-pan-x touch-pan-y"
                onTouchStart={(e) => {
                  if (e.touches.length === 2) {
                    const [t1, t2] = [e.touches[0], e.touches[1]];
                    if (!t1 || !t2) return;
                    const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
                    pinchRef.current = { distance, zoom: imageZoom };
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches.length !== 2) return;
                  const state = pinchRef.current;
                  if (!state) return;

                  const [t1, t2] = [e.touches[0], e.touches[1]];
                  if (!t1 || !t2) return;

                  e.preventDefault();
                  const distance = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
                  const ratio = distance / state.distance;
                  const next = Math.round((state.zoom * ratio) * 100) / 100;
                  setImageZoom(Math.min(4, Math.max(1, next)));
                }}
                onTouchEnd={(e) => {
                  if (e.touches.length < 2) pinchRef.current = null;
                }}
              >
                <img
                  src={`/${selectedYear}.png`}
                  alt={t('modal_image_alt').replace('{year}', String(selectedYear))}
                  className="block w-full h-auto"
                  style={{ transform: `scale(${imageZoom})`, transformOrigin: 'top left' }}
                  onError={(e) => {
                    e.currentTarget.src = '/Screenshot%202026-04-22%20163058.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Section */}
      <section id="mezzi" className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 mb-12 sm:mb-16">
            <Reveal className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <Truck className="w-5 h-5 text-blue-600" />
                <span className="text-blue-700 font-semibold">{t('fleet_badge')}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('fleet_title')}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t('fleet_subtitle')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-blue-600/30">
                  <Shield className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900">{t('fleet_feature_security_title')}</h4>
                  <p className="text-sm text-gray-600">{t('fleet_feature_security_desc')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border-2 border-blue-600/30">
                  <Award className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-bold text-gray-900">{t('fleet_feature_quality_title')}</h4>
                  <p className="text-sm text-gray-600">{t('fleet_feature_quality_desc')}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delayMs={100} className="lg:w-1/2 relative">
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 ring-1 ring-black/5">
                <img
                  src="/3camioinbotte.png"
                  alt={t('fleet_image_alt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm font-medium">{t('fleet_operational_vehicles')}</div>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { capacity: '3.000', descKey: 'fleet_capacity_desc_3000', color: 'from-blue-500 to-blue-600', img: '/scaricogasolio2.png' },
              { capacity: '9.000', descKey: 'fleet_capacity_desc_9000', color: 'from-blue-600 to-blue-700', img: '/scaricogasolio.png' },
              { capacity: '42.000', descKey: 'fleet_capacity_desc_42000', color: 'from-blue-700 to-blue-800', img: '/matte.png' },
            ].map(({ capacity, descKey, color, img }) => (
              <Reveal key={capacity} delayMs={Number(capacity.replace('.', '')) ? (capacity === '3.000' ? 0 : capacity === '9.000' ? 100 : 200) : 0} className="group bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden border-2 border-blue-600/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden border-b-2 border-blue-600/50">
                  <img
                    src={img}
                    alt={`${capacity} ${t('fleet_capacity_unit')}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 shadow-inner"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <div className={`bg-gradient-to-br ${color} p-2 rounded-lg shadow-lg`}>
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {capacity} <span className="text-2xl text-gray-500">{t('fleet_capacity_unit')}</span>
                  </div>
                  <p className="text-gray-600">{t(descKey)}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={150} className="mt-12 text-center">
            <p className="text-lg text-gray-600 bg-gray-100 rounded-2xl p-6 inline-block">
              <CheckCircle className="w-5 h-5 text-blue-600 inline mr-2" />
              {t('fleet_flexible')}
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
              <span className="text-blue-700 font-semibold">{t('process_badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {t('process_title')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('process_subtitle')}
            </p>
          </Reveal>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { step: '01', title: t('process_step1_title'), desc: t('process_step1_desc'), icon: Target },
              { step: '02', title: t('process_step2_title'), desc: t('process_step2_desc'), icon: MapPin },
              { step: '03', title: t('process_step3_title'), desc: t('process_step3_desc'), icon: Truck },
              { step: '04', title: t('process_step4_title'), desc: t('process_step4_desc'), icon: Users },
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
      <section className="py-16 sm:py-24 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl" />

        <Reveal className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Truck className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-8">
            {t('cta_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contatti')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              {t('cta_btn_quote')}
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+390000000000"
              className="group bg-white/10 backdrop-blur border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {t('cta_btn_call')}
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-semibold">{t('contact_badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('contact_title')}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              {t('contact_subtitle')}
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <Reveal className="space-y-8">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-blue-600/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Mazzucotelli Petroli</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{t('contact_address_label')}</h4>
                      <p className="text-gray-600">via cascine 6, Grandola ed Uniti, Lombardia, Italy 22010</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{t('contact_phone_label')}</h4>
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
                      <h4 className="font-semibold text-gray-900 mb-1">{t('contact_email_label')}</h4>
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
                      <h4 className="font-semibold text-gray-900 mb-1">{t('contact_instagram_label')}</h4>
                      <a href="https://instagram.com/mazzucotellipetroli" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
                        @mazzucotellipetroli
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 sm:p-8 text-white border border-blue-400/30 shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">{t('service_hours_title')}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('weekday_mon_fri')}</span>
                    <span className="font-semibold text-right leading-tight">
                      <span className="block">08:00 - 12:00</span>
                      <span className="block">13:00 - 18:00</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('weekday_sat')}</span>
                    <span className="font-semibold">08:00 - 12:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('weekday_sun')}</span>
                    <span className="font-semibold">{t('closed')}</span>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-blue-500">
                  <p className="text-blue-100">
                    <strong>{t('emergency_label')}</strong> {t('emergency_text')}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Contact Form */}
            <Reveal delayMs={100} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-blue-600/30 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">{t('form_title')}</h3>
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  if (!privacyConsent) {
                    e.preventDefault();
                    setPrivacyConsentTouched(true);
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_name')} *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                      placeholder={t('placeholder_name')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_surname')} *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                      placeholder={t('placeholder_surname')}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_email')} *</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                    placeholder={t('placeholder_email')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_phone')} *</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                    placeholder={t('placeholder_phone')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form_service')}</label>
                  <select 
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all bg-white"
                  >
                    <option value="Trasporto Combustibili (ADR)">{t('service_option_adr')}</option>
                    <option value="Trasporto Imbarcazioni">{t('service_option_boat')}</option>
                    <option value="Vendita Combustibili">{t('service_option_sales')}</option>
                    <option value="Bonifica e Revisioni">{t('service_option_cleaning')}</option>
                    <option value="Altro">{t('service_option_other')}</option>
                  </select>
                </div>

                {selectedService === 'Vendita Combustibili' && (
                  <div className="space-y-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-600/30 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-3">{t('sales_products_label')}</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {['Pellet', 'Gas in bombole'].map((product) => (
                          <label key={product} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:border-blue-600 transition-all group">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product)}
                              onChange={() => toggleProduct(product)}
                              className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                            />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                              {product === 'Pellet' ? t('product_pellet') : t('product_gas_cylinders')}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {selectedProducts.includes('Gas in bombole') && (
                      <div className="p-4 bg-white rounded-lg border border-blue-200">
                        <label className="block text-sm font-bold text-gray-900 mb-3">{t('cylinders_weight_label')}</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('qty_details_label')}</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                          placeholder={t('qty_details_placeholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('delivery_place_label')}</label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                          placeholder={t('delivery_place_placeholder')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('preferred_date_label')}</label>
                        <input
                          type="date"
                          min={todayMinDate}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t('time_slot_label')}</label>
                        <input
                          type="time"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 outline-none bg-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('message_label')}</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all resize-none bg-white"
                    placeholder={t('message_placeholder')}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="privacy-consent"
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => {
                      setPrivacyConsent(e.target.checked);
                      if (e.target.checked) setPrivacyConsentTouched(false);
                    }}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <div className="text-sm text-gray-600 leading-snug">
                    {t('privacy_accept_prefix')}{' '}
                    <button
                      type="button"
                      onClick={() => setLegalDoc('privacy')}
                      className="text-blue-700 font-semibold hover:underline"
                    >
                      {t('privacy_accept_link')}
                    </button>
                    {t('privacy_accept_suffix')}
                  </div>
                </div>
                {privacyConsentTouched && !privacyConsent && (
                  <div className="text-sm text-red-600 font-semibold">
                    {t('privacy_error')}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!privacyConsent}
                  className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    privacyConsent ? 'hover:shadow-lg' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  {t('send_request')}
                  <Send className="w-5 h-5" />
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {t('reply_time')}
                </p>
              </form>
            </Reveal>
          </div>

          {/* Interactive Map */}
          <Reveal delayMs={150} className="mt-16 bg-white rounded-3xl overflow-hidden shadow-xl border border-blue-600/30">
            <div className="h-[350px] w-full">
              <iframe
                title={t('map_title')}
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
                <p className="text-xs text-gray-400">{t('footer_tagline')}</p>
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
              © 2024 Mazzucotelli Petroli. {t('footer_rights')}
            </p>
          </Reveal>

          <Reveal delayMs={80} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => setLegalDoc('privacy')}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              {t('footer_privacy')}
            </button>
            <button
              type="button"
              onClick={() => setLegalDoc('terms')}
              className="text-gray-400 hover:text-blue-400 transition-colors"
            >
              {t('footer_terms')}
            </button>
          </Reveal>
        </div>
      </footer>

      {legalDoc !== null && (
        <div
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalDoc(null)}
        >
          <div
            className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-200">
              <div className="font-bold text-gray-900 text-center">
                {legalDoc === 'privacy' ? t('legal_title_privacy') : t('legal_title_terms')}
              </div>
              <button
                type="button"
                onClick={() => setLegalDoc(null)}
                className="absolute right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label={t('modal_close')}
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            <div className="p-6 bg-gray-50 max-h-[75vh] overflow-auto">
              {legalDoc === 'privacy' && (
                <div className="space-y-5 text-sm text-gray-700">
                  <div className="font-semibold text-gray-900">{t('legal_h_controller')}</div>
                  <div>{t('legal_controller_body')}</div>

                  <div className="font-semibold text-gray-900">{t('legal_h_data')}</div>
                  <div>{t('legal_data_body')}</div>

                  <div className="font-semibold text-gray-900">{t('legal_h_purpose')}</div>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>{t('legal_purpose_1')}</li>
                    <li>{t('legal_purpose_2')}</li>
                    <li>{t('legal_purpose_3')}</li>
                  </ul>

                  <div className="font-semibold text-gray-900">{t('legal_h_retention')}</div>
                  <div>{t('legal_retention_body')}</div>

                  <div className="font-semibold text-gray-900">{t('legal_h_recipients')}</div>
                  <div>{t('legal_recipients_body')}</div>

                  <div className="font-semibold text-gray-900">{t('legal_h_rights')}</div>
                  <div>{t('legal_rights_body')}</div>
                </div>
              )}

              {legalDoc === 'terms' && (
                <div className="space-y-5 text-sm text-gray-700">
                  <div className="font-semibold text-gray-900">{t('terms_h_subject')}</div>
                  <div>{t('terms_subject_body')}</div>

                  <div className="font-semibold text-gray-900">{t('terms_h_content')}</div>
                  <div>{t('terms_content_body')}</div>

                  <div className="font-semibold text-gray-900">{t('terms_h_liability')}</div>
                  <div>{t('terms_liability_body')}</div>

                  <div className="font-semibold text-gray-900">{t('terms_h_contacts')}</div>
                  <div>{t('terms_contacts_body')}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
