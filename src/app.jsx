import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Wallet, Phone, Info, Clock, Train, Navigation2, Building2 } from 'lucide-react';

const Accordion = ({ children, title, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 rounded-lg"
      >
        <div className="flex items-center gap-2 text-xl font-semibold">
          {icon}
          {title}
        </div>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
};

const Tab = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    }`}
  >
    {children}
  </button>
);

const Card = ({ title, icon, children }) => (
  <div className="border rounded-lg p-4 mb-4">
    {title && (
      <div className="flex items-center gap-2 text-lg font-semibold mb-4">
        {icon}
        {title}
      </div>
    )}
    {children}
  </div>
);

const ItineraryDay = ({ day, content }) => (
  <Card title={`Jour ${day}`}>
    {Object.entries(content).map(([time, activities], idx) => (
      <div key={idx} className="mb-4">
        <div className="font-medium text-blue-600">{time}</div>
        <ul className="list-disc ml-6">
          {Array.isArray(activities) ? (
            activities.map((activity, i) => (
              <li key={i} className="text-gray-700">{activity}</li>
            ))
          ) : (
            <li className="text-gray-700">{activities}</li>
          )}
        </ul>
      </div>
    ))}
  </Card>
);

const JapanItinerary = () => {
  const [activeTab, setActiveTab] = useState('preparation');

  const preTrip = {
    documents: [
      "Passeport valide 6 mois après retour",
      "Japan Rail Pass à commander avant départ",
      "Réservations musée Ghibli / Katsura Villa imprimées",
      "Copies numériques de tous les documents"
    ],
    apps: [
      "Google Maps (+ télécharger cartes hors-ligne)",
      "Hyperdia (horaires trains)",
      "Japan Official Travel App",
      "Google Translate (+ télécharger pack japonais)",
      "Application météo fiable"
    ]
  };
  
const TransportInfo = ({ transport }) => {
  if (!transport) return null;
  
  if (typeof transport === 'string') {
    return (
      <div className="ml-4 flex items-start gap-2 text-gray-600">
        <Train className="h-4 w-4 mt-1 flex-shrink-0" />
        <span>{transport}</span>
      </div>
    );
  }

  return (
    <div className="ml-4 flex items-start gap-2">
      <Train className="h-4 w-4 mt-1 flex-shrink-0 text-gray-600" />
      <div>
        {transport.Options && (
          <div>
            <span className="font-medium">Options:</span>
            <ul className="list-disc ml-5 space-y-1">
              {transport.Options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
        {transport.Notes && (
          <div className="mt-1 text-gray-600">
            <span className="italic">{transport.Notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const LocationInfo = ({ quartier, stations }) => {
  if (!quartier && !stations) return null;

  return (
    <div className="mt-4 space-y-2 border-t pt-3 text-gray-600">
      {quartier && (
        <div className="flex items-start gap-2">
          <Building2 className="h-4 w-4 mt-1 flex-shrink-0" />
          <span>
            <span className="font-medium">Quartier: </span>
            {quartier}
          </span>
        </div>
      )}
      {stations && (
        <div className="flex items-start gap-2">
          <Train className="h-4 w-4 mt-1 flex-shrink-0" />
          <div>
            <span className="font-medium">Stations: </span>
            <ul className="list-disc ml-5 space-y-1">
              {stations.map((station, index) => (
                <li key={index}>{station}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const renderSubActivity = (content) => {
  // Si c'est une simple chaîne de caractères
  if (typeof content === 'string') {
    return <span>{content}</span>;
  }
  
  // Si c'est un tableau
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc ml-5 space-y-1">
        {content.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  // Si c'est un objet avec des sous-propriétés
  return (
    <div className="space-y-2">
      {Object.entries(content).map(([key, value]) => (
        <div key={key}>
          <span className="font-medium">{key}:</span>
          {Array.isArray(value) ? (
            <ul className="list-disc ml-5 space-y-1">
              {value.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <span className="ml-2">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
};

const TimeSlot = ({ time, activities }) => {
  if (time === "Transport") {
    return <TransportInfo transport={activities} />;
  }

  if (typeof activities === 'string') {
    return (
      <div className="ml-4 flex items-start gap-2">
        <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
        <div>
          <span className="font-medium">{time}: </span>
          <span>{activities}</span>
        </div>
      </div>
    );
  }

  if (Array.isArray(activities)) {
    return (
      <div className="ml-4">
        <div className="flex items-start gap-2">
          <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
          <div>
            <span className="font-medium">{time}:</span>
            <ul className="list-disc ml-5 space-y-1">
              {activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Handle nested activities
  return (
    <div className="ml-4">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
        <div className="w-full">
          <span className="font-medium">{time}:</span>
          <div className="ml-4 mt-2 space-y-2">
            {Object.entries(activities).map(([subTime, subActivity]) => (
              <div key={subTime} className="flex items-start gap-2">
                {subTime !== "Suggestions" && subTime !== "Notes" && subTime !== "Spécialités" ? (
                  <>
                    <span className="font-medium text-sm text-gray-600 min-w-[80px]">{subTime}:</span>
                    <div className="flex-1">
                      {renderSubActivity(subActivity)}
                    </div>
                  </>
                ) : (
                  <div className="w-full space-y-1">
                    <span className="font-medium text-sm text-gray-600 block">{subTime}:</span>
                    <div className="ml-4">
                      {renderSubActivity(subActivity)}
                    </div>
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

const ItineraryDay = ({ day, content }) => {
  // Handle special case for rest/free days
  if (content.Repos || content.Journée === "Journée libre pour explorer plus tranquillement") {
    return (
      <div className="p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-5 w-5 text-gray-600" />
          <h3 className="font-medium">Jour {day}</h3>
        </div>
        <div className="ml-7 text-gray-600">
          {content.Repos || content.Journée}
          {(content.Suggestions || content["Suggestions de quartiers"]) && (
            <div className="mt-2">
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc ml-5">
                {(content.Suggestions || content["Suggestions de quartiers"]).map((suggestion, index) => (
                  <li key={index}>{suggestion}<br/></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-gray-600" />
        <h3 className="font-medium">Jour {day}</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(content)
          .filter(([key]) => !['Options', 'Suggestions', 'Quartier', 'Stations'].includes(key))
          .map(([time, activities]) => (
            <TimeSlot key={time} time={time} activities={activities} />
          ))}
        {(content.Quartier || content.Stations) && (
          <LocationInfo quartier={content.Quartier} stations={content.Stations} />
        )}
        {content.Options && (
          <div className="ml-4 mt-4">
            <p className="font-medium">Options:</p>
            <ul className="list-disc ml-5">
              {content.Options.map((option, index) => (
                <li key={index}>{option}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ItineraryView = ({ cityData }) => {
  return (
    <div className="space-y-4">
      {Object.entries(cityData).map(([key, city]) => (
        <Accordion 
          key={key} 
          title={city.title}
          icon={<Navigation2 className="h-5 w-5" />}
        >
          <div className="space-y-4">
            {Object.entries(city.days).map(([day, content]) => (
              <ItineraryDay key={day} day={day} content={content} />
            ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
};


const cityData = {
tokyo1: {
    title: "Tokyo Première Partie",
    days: {
        1: {
            "Matin (7h-12h)": "Arrivée Narita/Haneda",
            "Transport (12h-14h)": {
                "Options": [
                    "Narita Express (1h30, JR Pass) - De Narita Terminal 1 à Shinjuku Station",
                    "Limousine Bus (2h, plus reposant) - De Narita/Haneda directement à votre hôtel"
                ],
                "Notes": "Selon votre hôtel, choisir la station la plus proche (Shinjuku/Shibuya recommandées)"
            },
            "Après-midi (14h-17h)": "Check-in hôtel et repos",
            "Soir (17h-20h)": ["Balade tranquille dans le quartier", "Conbini pour essentiels", "Dîner léger et adaptation au décalage horaire"],
            "Quartier": "Shinjuku/Shibuya (selon hôtel)",
        },
        2: {
            "Transport": "Base: Shinjuku Station",
            "Matin (9h-12h)": {
                "9h-10h30": "Tokyo Metropolitan Building (5 min à pied de Shinjuku Station West Exit)",
                "10h30-12h": "Shinjuku Gyoen (10 min à pied de Shinjuku Station South Exit)"
            },
            "Déjeuner (12h-13h30)": "Restaurant dans Shinjuku",
            "Après-midi (13h30-17h)": ["Exploration tranquille de Shinjuku", "Don Quijote (shopping, 7 min de Shinjuku Station East Exit)"],
            "Soir (18h-21h)": "Memory Lane (Omoide Yokocho, adjacent à Shinjuku Station West Exit)",
            "Quartier": "Shinjuku (新宿)",
            "Stations": ["Shinjuku Station (JR, Metro, plusieurs lignes)"]
        },
        3: {
            "Transport": "Départ: Shinjuku → Asakusa (直通線/Direct Line, 30min)",
            "Matin (8h-12h)": {
                "8h-10h": "Sanctuaire Sensoji (10 min à pied de Asakusa Station)",
                "10h-12h": "Nakamise Shopping Street (sur le chemin du temple)"
            },
            "Déjeuner (12h-13h30)": "Restaurant local Asakusa",
            "Après-midi (13h30-17h)": ["Asahi Building (15 min à pied)", "Promenade Sumida Park (au bord de la rivière)"],
            "Soir (17h-21h)": ["Skytree (10 min à pied ou 1 station depuis Asakusa)", "Dîner Solamachi mall"],
            "Quartier": "Asakusa (浅草) → Oshiage (押上)",
            "Stations": [
                "Asakusa Station (Metro Ginza Line, Asakusa Line)",
                "Tokyo Skytree Station (Tobu Skytree Line)"
            ]
        },
        4: {
            "Transport": "Départ: Asakusa → Shibuya (Metro Ginza Line, 40min)",
            "Matin (9h-12h)": ["Shibuya Sky (connecté à Shibuya Station)", "Nintendo Shop (Parco, 5 min à pied)"],
            "Déjeuner (12h-13h30)": "Restaurant dans Shibuya",
            "Après-midi (13h30-17h)": {
                "Transport": "Shibuya → Harajuku (JR Yamanote Line, 2min)",
                "Activités": ["Harajuku exploration (Takeshita Street)", "Marion Crêpes", "Taiyaki Hiiragi"]
            },
            "Soir (18h-21h)": "Shibuya Yokocho pour le dîner (5 min de Shibuya Station)",
            "Quartier": "Shibuya (渋谷) → Harajuku (原宿)",
            "Stations": [
                "Shibuya Station (JR, Metro, plusieurs lignes)",
                "Harajuku Station (JR Yamanote Line)"
            ]
        },
        5: {
            "Transport": "Départ: Shibuya → Mitaka (JR Chuo Line, 30min)",
            "Matin (10h-13h)": ["Musée Ghibli (navette gratuite depuis Mitaka Station)", "Parc Inokashira (5 min à pied)"],
            "Déjeuner (13h-14h30)": "Restaurant près du parc",
            "Après-midi (14h30-18h)": {
                "Transport": "Mitaka → Ikebukuro (JR Chuo → Yamanote, 25min)",
                "Activités": ["Ikebukuro exploration", "Pokemon Center (Sunshine City)", "Furifu"]
            },
            "Soir (18h-21h)": {
                "Transport": "Ikebukuro → Ebisu (JR Yamanote Line, 15min)",
                "Activités": "Ebisu Yokocho"
            },
            "Quartier": "Mitaka (三鷹) → Ikebukuro (池袋) → Ebisu (恵比寿)",
            "Stations": [
                "Mitaka Station (JR Chuo Line)",
                "Ikebukuro Station (JR, Metro, plusieurs lignes)",
                "Ebisu Station (JR Yamanote Line)"
            ]
        },
        6: {
            "Repos": "Journée libre pour se reposer ou rattraper des activités manquées",
            "Suggestions de quartiers": ["Shimokitazawa (下北沢) - quartier hippie", "Daikanyama (代官山) - quartier chic", "Nakameguro (中目黒) - quartier trendy"]
        },
        7: {
            "Transport": "Départ: Hotel → Ueno (selon localisation)",
            "Matin (9h30-12h)": ["Ueno Park", "Musée National de Tokyo (dans le parc)"],
            "Déjeuner (12h-13h30)": "Restaurant dans Ueno",
            "Après-midi (13h30-17h)": {
                "Transport": "Ueno → Kiyosumi-Shirakawa (Metro Hibiya → Hanzomon Line, 20min)",
                "Activités": ["Kiyosumi Teien", "Marché Tsukiji (15min en métro depuis Kiyosumi)"]
            },
            "Soir (17h-21h)": {
                "Transport": "Tsukiji → Ginza (Metro Hibiya Line, 5min)",
                "Activités": ["Ginza exploration", "Uniqlo", "Starbucks Reserve Roastery"]
            },
            "Quartier": "Ueno (上野) → Kiyosumi (清澄) → Ginza (銀座)",
            "Stations": [
                "Ueno Station (JR, Metro)",
                "Kiyosumi-Shirakawa Station (Metro)",
                "Ginza Station (Metro, plusieurs lignes)"
            ]
        },
        8: {
            "Transport": "Départ: Ginza → Akihabara (Metro Hibiya Line, 15min)",
            "Matin (10h-12h)": "Akihabara Electric Town (sortie Electric Town d'Akihabara Station)",
            "Déjeuner (12h-13h30)": "Restaurant thématique",
            "Après-midi (13h30-17h)": ["Mandarake Complex (5 min à pied)", "@Home cafe ou Cat cafe Nyankoto (dans le quartier)"],
            "Soir (17h-21h)": "Shopping geek Akihabara",
            "Quartier": "Akihabara (秋葉原)",
            "Stations": ["Akihabara Station (JR, Metro Hibiya Line)"]
        }
    }
},
fuji: {
    title: "Mont Fuji & Kawaguchiko",
    days: {
        9: {
            "Transport": {
                "Options": [
                    "Train: Shinjuku → Otsuki → Kawaguchiko (2h, 4000¥ avec Highway Bus, non couvert par JR Pass)",
                    "Direct Highway Bus: Shinjuku → Kawaguchiko (2h, 2000¥, plus économique)"
                ],
                "Notes": "Départ depuis Shinjuku Station (新宿駅) - Bus terminal au 4ème étage du Shinjuku Expressway Bus Terminal"
            },
            "Matin (8h-11h)": {
                "8h00": "Départ de Shinjuku",
                "10h00": "Arrivée à Kawaguchiko Station",
                "10h30": "Dépôt des bagages au ryokan si check-in impossible"
            },
            "Déjeuner (11h-12h30)": "Restaurant local près de la station",
            "Après-midi (13h-16h)": {
                "Transport": "Bus local depuis Kawaguchiko Station (10min, 150¥)",
                "Activités": [
                    "Chureito Pagoda (prévoir 1h de visite)",
                    "Retour à Kawaguchiko",
                    "Installation ryokan"
                ]
            },
            "Soir (16h-21h)": ["Onsen avec vue Fuji", "Dîner kaiseki au ryokan"],
            "Quartier": "Kawaguchiko (河口湖)",
            "Stations": ["Kawaguchiko Station (富士急行線)"]
        },
        10: {
            "Transport": "Bus local Red/Green Line disponible (1300¥ pour pass journée)",
            "Matin (9h-12h)": {
                "Transport": "Bus depuis le ryokan vers Kachi Kachi Ropeway (15min)",
                "Activités": [
                    "Tour du lac en bus (Red Line, arrêts multiples pour photos)",
                    "Télécabine Mont Kachi Kachi (1000¥ aller-retour)"
                ]
            },
            "Déjeuner (12h-13h30)": "Restaurant avec vue sur le Fuji près du téléphérique",
            "Après-midi (13h30-17h)": {
                "Transport": "Green Line Bus Circuit",
                "Activités": [
                    "Point de vue Nagasaki Park",
                    "Point de vue Kawaguchiko Music Forest",
                    "Point de vue Nord du lac"
                ]
            },
            "Soir (17h-20h)": "Deuxième nuit au ryokan",
            "Quartier": "Kawaguchiko (河口湖)",
            "Stations": ["Utilisation des bus locaux - Pass journée recommandé"]
        },
        11: {
            "Journée": "Journée libre pour activités optionnelles",
            "Options": [
                "Randonnée au Mont Tenjo (téléphérique + 1h de marche)",
                "Visite du Kubota Itchiku Art Museum (2000¥)",
                "Circuit des 5 lacs en bus (3500¥ pour pass 2 jours)",
                "Onsen Benifuji no Yu (1300¥)"
            ],
            "Transport": {
                "Notes": "Bus Red/Green Line toujours utilisable si pass 2 jours acheté la veille",
                "Options": ["Location de vélo possible (1500¥/jour) à la station"]
            },
            "Quartier": "Kawaguchiko (河口湖)",
            "Stations": [
                "Base: Kawaguchiko Station",
                "Bus locaux desservant tous les points d'intérêt"
            ]
        }
    }
},
kyoto: {
    title: "Kyoto",
    days: {
        12: {
            "Transport": {
                "Options": [
                    "Shinkansen: Tokyo → Kyoto (2h15, JR Pass valide)",
                    "Bus de nuit (option économique si pas de JR Pass, 8000¥)"
                ],
                "Notes": "Réservation de siège recommandée pour le Shinkansen (gratuit avec JR Pass)"
            },
            "Matin (8h-11h)": {
                "8h00": "Départ de Tokyo Station",
                "10h15": "Arrivée à Kyoto Station",
                "10h30": "Dépôt des bagages à l'hôtel ou consigne"
            },
            "Déjeuner (11h-12h30)": "Restaurant près de la gare (niveau 10 de Kyoto Station - vue sur la ville)",
            "Après-midi (13h-17h)": {
                "Transport": "Bus 101 depuis Kyoto Station vers Nijojo-mae (220¥ ou pass bus journée 600¥)",
                "Activités": [
                    "Nijo-jo (entrée 1000¥)",
                    "Marché Nishiki (15 min à pied depuis Nijo-jo)"
                ]
            },
            "Soir (17h-21h)": "Pontocho (accès depuis station Sanjo ou Gion-Shijo)",
            "Quartier": "Centre de Kyoto (京都市内)",
            "Stations": [
                "Kyoto Station (JR, métro)",
                "Nijojo-mae Station (métro Tozai Line)",
                "Sanjo Station (Keihan Line) pour Pontocho"
            ]
        },
        13: {
            "Transport": {
                "Matin": "Bus 205 depuis Kyoto Station vers Kinkakuji-michi (230¥)",
                "Notes": "Pass bus journée recommandé (600¥) pour les multiples trajets"
            },
            "Matin (9h-12h)": {
                "9h00-10h30": "Kinkaku-ji (Temple d'Or - entrée 400¥)",
                "Transport": "Bus 59 vers Ryoanji (15min)",
                "10h45-12h00": "Temple Ryoan-ji (entrée 500¥)"
            },
            "Déjeuner (12h-13h30)": "Restaurant local près de Ryoan-ji",
            "Après-midi (13h30-17h)": {
                "Transport": "Bus 59 puis JR vers Arashiyama (40min total)",
                "Activités": [
                    "Arashiyama exploration",
                    "Forêt de bambous (gratuit)",
                    "Option: Temple Tenryu-ji (500¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "JR vers Kyoto puis métro vers Gion-Shijo",
                "Activités": "Gion exploration"
            },
            "Quartier": "Nord-Ouest → Arashiyama → Gion",
            "Stations": [
                "Saga-Arashiyama Station (JR)",
                "Gion-Shijo Station (Keihan Line)"
            ]
        },
        14: {
            "Transport": {
                "Options": [
                    "JR Nara Line jusqu'à Inari Station (5min, gratuit avec JR Pass)",
                    "Keihan Line jusqu'à Fushimi Inari (10min, 150¥)"
                ]
            },
            "Matin (7h-11h)": {
                "7h00": "Départ vers Fushimi Inari",
                "7h15-11h00": "Fushimi Inari-taisha (gratuit, 2-3h pour montée partielle)"
            },
            "Déjeuner (11h-12h30)": "Restaurant près du temple (spécialités Inari Sushi)",
            "Après-midi (13h-17h)": {
                "Transport": "Keihan Line vers Kiyomizu-Gojo (20min)",
                "Activités": [
                    "Ghibli shop (Kiyomizu-Gojo)",
                    "Marche vers Kiyomizu-dera (15min en montée)",
                    "Kiyomizu-dera (entrée 400¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "15 min à pied",
                "Activités": "Yasaka Shrine (gratuit) et rues traditionnelles"
            },
            "Quartier": "Fushimi → Higashiyama",
            "Stations": [
                "Inari Station (JR)",
                "Kiyomizu-Gojo Station (Keihan Line)"
            ]
        },
        15: {
            "Journée": "Journée libre pour explorer plus tranquillement",
            "Suggestions": [
                "Shopping à Kawaramachi (地下鉄烏丸線)",
                "Cafés traditionnels dans Gion",
                "Nishiki Market en détail",
                "Musée International du Manga (1000¥)"
            ],
            "Transport": {
                "Options": [
                    "Pass bus journée (600¥)",
                    "Pass métro journée (800¥)",
                    "Vélo en location (1000¥/jour)"
                ]
            },
            "Quartier": "Au choix",
            "Stations": ["Selon activités choisies"]
        },
        16: {
            "Transport": {
                "Options": [
                    "Bus 33 vers Katsura Rikyu-mae (230¥)",
                    "Taxi recommandé car accès complexe (environ 2000¥)"
                ],
                "Notes": "Réservation Katsura Villa obligatoire via l'Imperial Household Agency (gratuit)"
            },
            "Matin (9h-12h)": {
                "9h00": "Katsura Imperial Villa (visite guidée 1h30)",
                "Transport": "Bus vers Ginkakuji-michi"
            },
            "Déjeuner (12h-13h30)": "Restaurant traditionnel secteur Ginkakuji",
            "Après-midi (13h30-17h)": {
                "Transport": "À pied le long du Philosopher's Path",
                "Activités": [
                    "Philosopher's Path (gratuit, 2km)",
                    "Nanzen-ji (entrée temple 500¥, jardins 300¥)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "Bus 100 vers Gion",
                "Activités": "Dîner et exploration finale de Gion"
            },
            "Quartier": "Ouest → Higashiyama Nord → Gion",
            "Stations": [
                "Katsura Station (Hankyu Line)",
                "Bus Ginkakuji-michi",
                "Keihan Sanjo Station pour Gion"
            ]
        }
    }
},
    osaka: {
    title: "Osaka",
    days: {
        17: {
            "Transport": {
                "Options": [
                    "JR Special Rapid Service: Kyoto → Osaka (30min, gratuit avec JR Pass)",
                    "Keihan Line: Kyoto → Yodoyabashi (45min, 410¥)"
                ],
                "Notes": "Destination finale selon votre hôtel: Osaka Station (JR) ou Umeda (Métro)"
            },
            "Matin (9h-11h)": {
                "9h00": "Départ de Kyoto",
                "9h30-10h00": "Arrivée à Osaka/Umeda",
                "10h00-11h00": "Installation hôtel ou dépôt bagages"
            },
            "Déjeuner (11h-12h30)": {
                "Transport": "Métro Midosuji Line vers Dotonbori (180¥)",
                "Activités": "Street food à Dotonbori (budget ~1000-1500¥)",
                "Spécialités": ["Takoyaki (600¥)", "Kushikatsu (1000¥)"]
            },
            "Après-midi (13h-17h)": {
                "Transport": "Métro vers Tanimachi 4-chome (180¥)",
                "Activités": [
                    "Château d'Osaka (entrée 600¥)",
                    "Parc du château (gratuit)",
                    "Option: Musée du château (200¥ supplémentaires)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "Métro vers Dobutsuen-mae (180¥)",
                "Activités": "Shinsekai exploration et dîner",
                "Suggestions": [
                    "Tour Tsutenkaku (700¥)",
                    "Kushikatsu Daruma (restaurant original)"
                ]
            },
            "Quartier": "Umeda (梅田) → Osaka-jo (大阪城) → Shinsekai (新世界)",
            "Stations": [
                "Osaka/Umeda Station (JR, Métro)",
                "Tanimachi 4-chome (Métro, Château)",
                "Dobutsuen-mae (Métro, Shinsekai)"
            ]
        },
        18: {
            "Transport": {
                "Options": [
                    "Métro + Chuo Line vers Osakako (320¥)",
                    "Pass journée métro recommandé (800¥)"
                ]
            },
            "Matin (10h-13h)": {
                "Transport": "Métro vers Osakako Station",
                "Activités": [
                    "Aquarium Kaiyukan (2300¥) (Réservation en ligne possible pour éviter la file)"
                ],
            },
            "Déjeuner (13h-14h30)": {
                "Suggestions": [
                    "Restaurant Tempozan Marketplace",
                    "Restaurants avec vue sur la baie (2000-3000¥)"
                ]
            },
            "Après-midi (14h30-17h)": {
                "Transport": "Métro vers Nipponbashi (180¥)",
                "Activités": [
                    "Baie d'Osaka (Option: Santa Maria Cruise 1600¥)",
                    "Kuromon Market (Marché couvert)"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "10 min à pied vers Dotonbori",
                "Activités": [
                    "Dotonbori illuminations",
                    "Pokemon Café (réservation obligatoire)",
                    "Shopping Shinsaibashi"
                ]
            },
            "Quartier": "Osaka Bay (大阪湾) → Minami (南)",
            "Stations": [
                "Osakako Station (Métro, Aquarium)",
                "Nipponbashi Station (Métro, Marché)",
                "Namba Station (Métro, Dotonbori)"
            ]
        },
        19: {
            "Transport": {
                "Options": [
                    "Hankyu Line: Umeda → Minoh (30min, 280¥)",
                    "Express recommandé pour gain de temps"
                ]
            },
            "Matin (9h-12h)": {
                "9h00": "Départ de Umeda vers Minoh",
                "Activités": [
                    "Minoh Park (gratuit)",
                    "Cascade de Minoo (30min de marche)",
                    "Spécialité: Momiji tempura (feuilles d'érable frites)"
                ]
            },
            "Déjeuner (12h-13h30)": {
                "Suggestions": [
                    "Restaurant local près de la cascade",
                    "Spécialités Momiji (1000-2000¥)"
                ]
            },
            "Après-midi (13h30-17h)": {
                "Transport": "Retour vers Umeda",
                "Activités": [
                    "Shopping Umeda",
                    "Grand Front Osaka",
                    "Umeda Sky Building (1500¥)",
                    "Hankyu/Daimaru Department Stores"
                ]
            },
            "Soir (17h-21h)": {
                "Transport": "Métro vers Namba (180¥)",
                "Activités": "Dotonbori et dîner",
                "Suggestions": [
                    "Crabe chez Kani Doraku",
                    "Gyoza à Chibo",
                    "Okonomiyaki chez Mizuno"
                ]
            },
            "Quartier": "Minoh (箕面) → Umeda (梅田) → Dotonbori (道頓堀)",
            "Stations": [
                "Minoh Station (Hankyu Line)",
                "Umeda Station (Hub principal)",
                "Namba Station (Dotonbori)"
            ]
        },
        20: {
            "Journée": "Journée libre à Osaka",
            "Suggestions": [
                "Universal Studios Japan (7800¥, accès via Universal City Station)",
                "Shopping aux Outlets Rinku Premium (accès via Nankai Line)",
                "Musée Cup Noodles à Ikeda (500¥)",
                "Musée des Sciences d'Osaka (600¥)",
                "Den Den Town (quartier électronique)"
            ],
            "Transport": {
                "Options": [
                    "Pass journée métro (800¥)",
                    "Pass Osaka Amazing Pass (2800¥) inclut entrées de nombreux sites",
                    "Pass ICOCA rechargeable recommandé"
                ]
            },
            "Quartier": "Selon activités choisies",
            "Stations": [
                "Universal City (USJ)",
                "Rinku Town (Outlets)",
                "Ikeda (Cup Noodles)",
                "Namba/Den Den Town"
            ]
        }
    }
},
himeji: {
    title: "Himeji",
    days: {
        21: {
            "Transport": {
                "Options": [
                    "Shinkansen depuis Osaka (JR Pass valide):",
                    "- Hikari: 30min (meilleure option)",
                    "- Kodama: 40min (plus d'arrêts)",
                    "Bus express: 1h15 (1000¥, économique sans JR Pass)"
                ],
                "Notes": "Départ depuis Shin-Osaka Station, arrivée à Himeji Station (gare JR)"
            },
            "Matin (8h-12h)": {
                "8h00": "Départ de Shin-Osaka",
                "8h30-9h00": "Arrivée et marche vers le château (15min, suivre la grande avenue)",
                "9h00-12h00": {
                    "Activités": "Château Himeji (arrivée tôt recommandée)",
                    "Notes": [
                        "Entrée château: 1000¥",
                        "Audio-guide disponible (500¥)",
                        "Casiers disponibles pour bagages (300¥)"
                    ]
                }
            },
            "Déjeuner (12h-13h30)": {
                "Suggestions": [
                    "Restaurants dans la rue commerçante Miyuki-dori",
                    "Spécialités: Himeji Oden, Aliments séchés (15-20min à pied)"
                ]
            },
            "Après-midi (13h30-16h)": {
                "Transport": "5 min à pied depuis le château",
                "Activités": [
                    "Jardins Koko-en (entrée 300¥)",
                    "Option: Billet combiné château + jardins (1040¥)",
                    "9 jardins différents de style japonais"
                ]
            },
            "Soir (16h-21h)": {
                "Transport": {
                    "16h00": "Retour à la gare de Himeji",
                    "16h30": "Shinkansen vers Shin-Osaka",
                    "17h00": "Arrivée à Osaka"
                },
                "Activités": "Dîner à Osaka (suggestions: quartier de la gare ou Umeda)"
            },
            "Quartier": "Himeji Centre-ville (姫路市)",
            "Stations": [
                "Himeji Station (JR, Sanyo Line)",
                "15 min à pied jusqu'au château"
            ]
        }
    }
},
nara: {
    title: "Nara",
    days: {
        22: {
            "Transport": {
                "Options": [
                    "JR: Osaka → Nara (45min, gratuit avec JR Pass)",
                    "Kintetsu Line: Osaka-Namba → Kintetsu-Nara (35min, plus proche du parc, 560¥)"
                ],
                "Notes": "Kintetsu-Nara recommandée car plus proche des sites"
            },
            "Matin (9h-12h)": {
                "Transport": "5-10 min à pied de Kintetsu-Nara Station",
                "Activités": [
                    "Parc aux daims (gratuit, sachets de crackers 200¥)",
                    "Todai-ji (entrée 600¥)",
                    "Notes: Le Todai-ji abrite le plus grand Buddha en bronze du Japon"
                ]
            },
            "Déjeuner (12h-13h30)": {
                "Suggestions": [
                    "Restaurant traditionnel près du parc",
                    "Spécialités: Kakinoha-zushi (sushi emballé dans des feuilles de kaki)",
                    "Budget: 1500-2500¥"
                ]
            },
            "Après-midi (13h30-17h)": {
                "Transport": "15 min à pied à travers le parc",
                "Activités": {
                    "Kasuga Taisha": [
                        "Entrée sanctuaire: 500¥",
                        "Jardin botanique en option: 500¥",
                        "Allée des lanternes: gratuit"
                    ]
                }
            },
            "Soir (17h-21h)": {
                "Transport": "20 min à pied ou bus local (220¥)",
                "Activités": [
                    "Quartier Naramachi (ancien quartier marchand)",
                    "Boutiques traditionnelles",
                    "Maisons de saké",
                    "Dîner dans une ancienne machiya"
                ]
            },
            "Transport retour": {
                "Options": [
                    "JR Nara → Osaka (45min)",
                    "Kintetsu Nara → Osaka-Namba (35min)"
                ],
                "Notes": "Dernier train vers 23h00, vérifier les horaires"
            },
            "Quartier": "Nara Centre historique (奈良市)",
            "Stations": [
                "Kintetsu-Nara Station (Kintetsu Line, recommandée)",
                "JR Nara Station (JR Line, plus éloignée)"
            ]
        }
    }
},
tokyo2: {
    title: "Tokyo Retour",
    days: {
        23: {
            "Transport": {
                "Options": [
                    "Shinkansen depuis Osaka (JR Pass valide):",
                    "- Nozomi: 2h15 (non couvert par JR Pass, 14,450¥)",
                    "- Hikari: 2h45 (couvert par JR Pass)",
                    "- Kodama: 3h15 (couvert par JR Pass, plus d'arrêts)"
                ],
                "Notes": "Départ depuis Shin-Osaka Station, arrivée Tokyo Station ou Shinagawa Station"
            },
            "Matin (9h-12h)": {
                "9h00": "Départ de Shin-Osaka",
                "11h45": "Arrivée à Tokyo Station",
                "Notes": "Réservation de siège recommandée la veille"
            },
            "Déjeuner (12h-13h30)": {
                "Suggestions": [
                    "Tokyo Station Ramen Street (sous-sol)",
                    "Kitchen Street (étage -1)",
                    "GRANSTA (zone commerciale de la gare)",
                    "Budget: 1000-2000¥"
                ]
            },
            "Après-midi (13h30-18h)": {
                "Transport": {
                    "Options": [
                        "JR Yamanote Line pour accès zones shopping",
                        "Metro Tokyo pour zones spécifiques",
                        "Pass métro 24h disponible (800¥)"
                    ]
                },
                "Suggestions Shopping": {
                    "Électronique": [
                        "Akihabara - Yodobashi Camera, Bic Camera",
                        "Stations: Akihabara (JR/Metro)"
                    ],
                    "Mode": [
                        "Shibuya - Shibuya 109, PARCO",
                        "Shinjuku - Isetan, Lumine",
                        "Stations: Shibuya ou Shinjuku (JR/Metro)"
                    ],
                    "Souvenirs": [
                        "Tokyo Station - Character Street",
                        "Asakusa - Nakamise Shopping Street",
                        "Stations: Tokyo ou Asakusa (Metro)"
                    ],
                    "Tax-Free": [
                        "Don Quijote (nombreuses locations)",
                        "Bic Camera (électronique)",
                        "Uniqlo (vêtements)"
                    ]
                }
            },
            "Soir (18h-21h)": {
                "Activités": [
                    "Préparation bagages",
                    "Vérification documents de vol",
                    "Planification trajet aéroport"
                ],
                "Notes": "Préparer les achats tax-free pour le contrôle à l'aéroport"
            },
            "Quartier": "Selon choix shopping",
            "Stations": [
                "Tokyo Station (point central)",
                "Autres stations selon zones shopping choisies"
            ]
        },
        24: {
            "Transport": {
                "Options vers Narita": [
                    "Narita Express (environ 1h, 3000¥ ou JR Pass)",
                    "Limousine Bus (1h30, 3100¥)",
                    "Skyliner (41min, 2570¥ depuis Ueno)"
                ],
                "Options vers Haneda": [
                    "Tokyo Monorail (15min depuis Hamamatsucho, 500¥)",
                    "Keikyu Line (20min depuis Shinagawa, 300¥)"
                ],
                "Notes": "Prévoir 3h avant le vol international"
            },
            "Matin (9h-11h)": {
                "Suggestions Shopping": {
                    "Zones proches des lignes aéroport": [
                        "Tokyo Station - Character Street et GRANSTA",
                        "Ueno - Ameyoko Market (si vol depuis Narita)",
                        "Shinagawa - Wing Shopping (si vol depuis Haneda)"
                    ],
                    "Notes": [
                        "Vérifier limites bagages",
                        "Garder reçus tax-free accessibles"
                    ]
                }
            },
            "Midi (11h-12h)": {
                "11h00": "Départ vers aéroport selon option choisie",
                "Suggestions": [
                    "Bento à emporter pour le voyage (1000-1500¥)",
                    "Derniers achats aux boutiques d'aéroport"
                ]
            },
            "Quartier": "Selon aéroport de départ",
            "Stations": [
                "Pour Narita: Tokyo, Ueno, ou Nippori",
                "Pour Haneda: Hamamatsucho ou Shinagawa"
            ]
        }
    }
  }
};

  const practicalInfo = {
    budget: {
      title: "Budget & Paiement",
      items: [
        "Retrait 7-Eleven ou Post Office",
        "Garder du cash (pays très cash)",
        "IC Card pour transports",
        "Budget quotidien conseillé :",
        "- Repas : 3000-5000¥",
        "- Transport local : 1000¥",
        "- Activités : 2000-4000¥"
      ]
    },
    accommodation: {
      title: "Hébergements recommandés",
      items: {
        "Tokyo": ["Près Yamanote Line :", "- Shinjuku", "- Shibuya", "- Ueno", "- Tokyo Station"],
        "Kyoto": ["Près stations principales :", "- Kyoto Station", "- Downtown (Karasuma)", "- Southern Higashiyama"],
        "Osaka": ["Zones recommandées :", "- Namba", "- Umeda", "- Shin-Osaka"]
      }
    },
    tips: {
      title: "Conseils pratiques",
      items: [
        "Wi-Fi pocket indispensable",
        "Adaptateur électrique",
        "Parapluie portable",
        "Chaussures confortables",
        "Convenience stores pour repas rapides",
        "Codes culturels :",
        "- Pas de pourboire",
        "- Silence transports",
        "- Retirer chaussures",
        "- Files d'attente ordonnées"
      ]
    },
    emergency: {
      title: "Urgences & Santé",
      items: [
        "Numéro urgence : 119",
        "Cliniques anglophones principales",
        "Pharmacies : Matsumoto Kiyoshi",
        "Assurance voyage vérifiée"
      ]
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Itinéraire Japon 21 jours</h1>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Tab
          isActive={activeTab === 'preparation'}
          onClick={() => setActiveTab('preparation')}
        >
          Préparation
        </Tab>
        <Tab
          isActive={activeTab === 'itinerary'}
          onClick={() => setActiveTab('itinerary')}
        >
          Itinéraire
        </Tab>
        <Tab
          isActive={activeTab === 'practical'}
          onClick={() => setActiveTab('practical')}
        >
          Infos Pratiques
        </Tab>
      </div>

      {activeTab === 'preparation' && (
        <div className="space-y-4">
          <Card title="Documents Essentiels">
            <ul className="list-disc ml-6">
              {preTrip.documents.map((doc, idx) => (
                <li key={idx} className="text-gray-700">{doc}</li>
              ))}
            </ul>
          </Card>

          <Card title="Applications à installer">
            <ul className="list-disc ml-6">
              {preTrip.apps.map((app, idx) => (
                <li key={idx} className="text-gray-700">{app}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}

      {activeTab === 'itinerary' && <ItineraryView cityData={cityData} />}

      {activeTab === 'practical' && (
        <div className="space-y-4">
          {Object.entries(practicalInfo).map(([key, section]) => (
            <Card 
              key={key}
              title={section.title}
              icon={
                key === 'budget' ? <Wallet className="h-5 w-5" /> :
                key === 'accommodation' ? <MapPin className="h-5 w-5" /> :
                key === 'tips' ? <Info className="h-5 w-5" /> :
                <Phone className="h-5 w-5" />
              }
            >
              {Array.isArray(section.items) ? (
                <ul className="list-disc ml-6">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="text-gray-700">{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-4">
                  {Object.entries(section.items).map(([city, items], idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold mb-2">{city}</h4>
                      <ul className="list-disc ml-6">
                        {items.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default JapanItinerary;