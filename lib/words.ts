/**
 * Real names & words to type during the "Words" phase of each lesson and
 * to seed the Practice mode.
 *
 * We try to span a wide global geography: each lesson's pool intentionally
 * pulls from multiple regions where the lesson's characters live. So the
 * acute lesson sees Mexican, Argentinian, Filipino, Cape Verdean and
 * Quebecois names alongside the European ones. A support agent in a Clever
 * queue should recognize names from a global student population.
 */

export const WORDS_BY_LESSON: Record<string, string[]> = {
  // The acute lives in: Spanish (Latin America + Spain + Philippines),
  // Portuguese (Brazil + Portugal + Lusophone Africa), French (France +
  // Quebec + Francophone Africa), Italian, Czech, Hungarian, Irish.
  acute: [
    // Mexico
    "José Hernández", "María Fernández", "Andrés Manuel", "Lucía Méndez",
    "Frida Kahlo", "Verónica",
    // Argentina / Uruguay
    "Sofía Pérez", "Ramón Díaz", "Hernán", "Tomás Etcheverry",
    // Colombia / Venezuela
    "Andrés Escobar", "Catalina Sánchez", "Camilo Vélez",
    // Chile / Peru
    "Salomé", "Yolanda Vélez", "Vargas Llosa",
    // Cuba / Dominican Republic
    "Yuneisy", "Yarisbel", "Aramís",
    // Brazil (Portuguese)
    "Pelé", "Cristiano Ronaldo", "José Mourinho",
    // Cape Verde / Mozambique / Angola
    "José Eduardo", "María Mutola", "Cesária Évora",
    // Spain (Castilian, Galician)
    "Andrés Iniesta", "Verónica Forqué", "Jesús",
    // Philippines (Spanish heritage)
    "José Rizal", "Lucía Reyes", "Andrés Bonifacio", "Mía",
    // Quebec / France
    "Hélène Tremblay", "Renée Martel", "André Gagné",
    "Aimée", "René Lévesque",
    // Italian
    "Niccoló", "Mónica",
    // Irish (uses é)
    "Mícheál", "Séamus", "Sinéad",
    // Everyday words
    "café", "résumé", "naïveté", "fiancée",
  ],

  // ñ is Spanish-world. ã / õ are Portuguese-world (incl. Lusophone Africa,
  // Brazil, Macau). Galician, Basque, Filipino names use ñ heavily.
  tilde: [
    // Spanish-speaking world
    "Peña", "Núñez", "España", "niño", "mañana", "Begoña", "Doña Marina",
    "Iñaki Goyeneche", "Iñárritu", "señorita",
    "Sebastián Cabañas", "Antoñito", "Muñoz",
    // Galician & Basque (Spain)
    "A Coruña", "Iñigo", "Iruña",
    // Filipino (Spanish heritage)
    "Niño Aquino", "Doña Aurora", "Mañalac", "Cariño",
    // Brazilian Portuguese
    "João Silva", "São Paulo", "Conceição", "Adão",
    "irmã", "coração", "limão", "feijão",
    // Lusophone Africa (Cape Verde, Angola, Mozambique, São Tomé)
    "São Tomé", "Espírito Santo", "Ramonão",
    "João Lourenço", "Manuel João",
    // Portuguese vowels with tilde
    "estações", "limões", "põe",
  ],

  // Umlaut & diaeresis: German-speaking world, Scandinavia, Finland, Turkey,
  // Hungary, the Albanian ë, French tréma, Estonian, Dutch coördinatie.
  umlaut: [
    // Germany / Austria / Switzerland
    "Müller", "Schäfer", "Schöne", "Über",
    "Köhler", "Pötsch", "Schrödinger", "Brönnimann",
    // Sweden / Norway / Finland
    "Björn", "Björk", "Sjöström", "Forsén",
    "Pärt", "Räikkönen", "Häkkinen", "Mäki",
    // Turkey & Azerbaijan
    "Özden", "Üzeyir", "Mesut Özil", "Görçek", "Şükür",
    "Ümit", "Yağmur Özçelik",
    // Albania (ë is everywhere)
    "Skënderbeu", "Tërë", "Krenarë", "Përparim", "Shqipëria",
    // France / Belgium
    "Loïc", "Noël", "Anaïs", "Héloïse", "Chloë", "Zoë",
    "Joël", "Citroën",
    // Estonian / Dutch
    "coördinatie", "België", "Tallinn",
    // English-language usage
    "Brontë", "naïve",
  ],

  // Grave: French, Italian, Catalan, Vietnamese (we don't cover Viet tone
  // marks, but the grave shape is the same family).
  grave: [
    // French (incl. Quebec & Francophone Africa)
    "Geneviève", "Hélène", "Hervé Renard",
    "à la carte", "voilà", "Saint-Étienne",
    "Père Lachaise", "Eulalie",
    // Italian
    "Niccolò", "lunedì", "però", "Tobìas",
    "così", "giù", "più",
    // Catalan
    "Manèl", "Casaldàliga", "comprès",
    // French standalone words
    "où", "déjà",
  ],

  // Circumflex: French (France, Quebec, Francophone Africa, Caribbean),
  // Portuguese (Brazil, Portugal, Lusophone Africa), Romanian.
  circumflex: [
    // Quebec / French
    "Côté", "Bélanger", "Bénière", "fête", "hôtel", "rôle",
    "âge", "âme", "Châtelet", "Île-de-France",
    "pâtisserie", "naître", "sûr", "août",
    // Francophone Africa & Haitian
    "Bénoît", "Côté d'Ivoire",
    // Brazilian Portuguese
    "Antônio", "Verônica", "Câmara", "Stênio",
    "ônibus", "lâmpada", "vocês", "três", "você",
    // Mozambican / Angolan Portuguese
    "Mocímboa", "Lourenço",
    // Romanian (uses â and î)
    "Brâncuși", "România", "Râmnicu", "Pâine",
    // Welsh (circumflex on vowels)
    "Brontë", "ŵy",
  ],

  // ç, ß, ¿, ¡: catch-all for cedilla + eszett + Spanish bookend punctuation.
  special: [
    // French
    "François Mitterrand", "garçon", "Provençal", "leçon", "façade",
    "Curaçao", "Besançon",
    // Portuguese (incl. Lusophone Africa)
    "Gonçalves", "Conceição", "açúcar", "açaí",
    "Iguaçu", "Tomás Gonçalves",
    // Catalan
    "Barça", "Mercè", "Provença",
    // Turkish (uses ç too)
    "Çakır", "Çelik",
    // German-speaking
    "Straße", "Weiß", "Fußball", "Gießen",
    "Aßmus", "Schloß",
    // Spanish bookends
    "¿Cómo estás?", "¿Qué tal?", "¡Hola!", "¡Olé!",
    "¡Feliz cumpleaños!", "¡Vamos!",
  ],

  // Nordic: Denmark, Norway, Iceland, Sweden, Faroe Islands, Greenland.
  nordic: [
    // Denmark
    "Søren Kierkegaard", "Brønd", "Aage Bohr", "Kjærgaard",
    "Mårsk", "København",
    // Norway
    "Jørgen", "Håkon", "Åse", "Solbjørg",
    "Trondheim Sør", "Tromsø",
    // Sweden
    "Ångström", "Bååth", "Bråth", "Lärsson",
    // Iceland & Faroe Islands
    "Björk", "Sæmundur", "Æsa",
    "Tórshavn", "Føroyar",
    // English
    "encyclopædia",
  ],

  // Háček + Đ: Czech, Slovak, Croatian, Bosnian, Serbian, Slovenian,
  // Latvian, Lithuanian — plus Vietnamese names that use Đ.
  hacek: [
    // Czech
    "Dvořák", "Škoda", "Čapek", "Žižka", "Hašek",
    "Krátký", "Páníček", "Bedřich Smetana",
    // Slovak
    "Šťastný", "Hašková", "Žilina", "Štefan",
    "Sárközi",
    // Croatian & Bosnian
    "Đoković", "Đurić", "Šuker", "Mažuranić",
    "Bošković", "Mušić", "Ivanišević",
    // Serbian
    "Tešanović", "Stanković",
    // Slovenian
    "Žiga", "Špela", "Plečnik",
    // Latvian & Lithuanian (also use š ž č)
    "Mažeika", "Žukov",
    // Vietnamese (Đ specifically)
    "Đặng Lê", "Đoàn", "Trần Hưng Đạo", "Đinh",
  ],

  // Polish — all eight Polish-only diacritics, with names that show up in
  // diaspora communities in the US, UK, Germany, Canada.
  polish: [
    "Łukasz Kowalski", "Łódź", "Wałęsa", "Częstochowa",
    "Gdańsk", "Poznań", "Wrocław",
    "Wiśniewski", "Żaneta", "Małgorzata",
    "Stanisław", "Świętokrzyskie",
    "Lutosławski", "Sławomir",
    "Maćko", "Ćwikła", "Ziółkowski",
    "Krzyżanowski", "Żukowski", "Bożena",
    "Źródło", "Kuźma", "Łódź Górna",
    "Sąsiedzi", "Mądruszka",
    "Toruń", "Lęborg",
  ],

  // Hungarian — diaspora communities in the US, Romania (Transylvania),
  // Slovakia, Serbia (Vojvodina).
  hungarian: [
    "Erdős", "Petőfi", "Műszaki",
    "kötőjel", "fűzfa", "Tűzhely",
    "Kőszeg", "Hős",
    "Lőrinc", "Győr",
    "csütörtök", "köszönöm",
  ],

  // Turkish — Turkey, Northern Cyprus, plus large diaspora in Germany,
  // Netherlands, Belgium. Azerbaijani also uses ı, ş, ğ.
  turkish: [
    "İstanbul", "Erdoğan", "Şahin", "Ayşegül",
    "Kıbrıs", "Maraş", "İzmir", "Diyarbakır",
    "Şanlıurfa", "Çanakkale",
    "Yağmur", "Şeyma", "Çağlar", "Özgür",
    "İbrahim", "Necip Fazıl",
    "doğru", "yağmur",
    // Azerbaijani
    "Bakı", "Şəki",
  ],

  // Iceland (and Faroese ð), plus a few Old English / Middle English nods.
  iceland: [
    "Þór", "Þorvaldur", "Þingvellir",
    "Þórbergur", "Þórólfur",
    "Sigurður", "Guðrún", "Eyjafjallajökull",
    "Björk Guðmundsdóttir",
    "Vigdís Finnbogadóttir",
    "Halldór Laxness",
    "Auður", "Eiður Smári",
    // Faroese
    "Eiður Guðjohnsen", "Føroyar",
  ],
};

/** All real names — used by the Practice page as a name pool. */
export const ALL_NAMES = Object.values(WORDS_BY_LESSON).flat();
