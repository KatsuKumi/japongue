import React, { useState } from 'react';
import { ChevronDown, MapPin, Calendar, Wallet, Phone, Info, Clock  } from 'lucide-react';

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
  
  
const TimeSlot = ({ time, activities }) => {
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

  // Handle nested time slots (sub-schedules)
  return (
    <div className="ml-4">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 mt-1 text-gray-500 flex-shrink-0" />
        <div>
          <span className="font-medium">{time}:</span>
          <div className="ml-4 space-y-2 mt-2">
            {Object.entries(activities).map(([subTime, subActivity]) => (
              <div key={subTime} className="flex items-start gap-2">
                <span className="font-medium text-sm text-gray-600">{subTime}:</span>
                <span>{subActivity}</span>
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
          {content.Suggestions && (
            <div className="mt-2">
              <p className="font-medium">Suggestions:</p>
              <ul className="list-disc ml-5">
                {content.Suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
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
          .filter(([key]) => key !== 'Options' && key !== 'Suggestions')
          .map(([time, activities]) => (
            <TimeSlot key={time} time={time} activities={activities} />
          ))}
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
          icon={<MapPin className="h-5 w-5" />}
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
                "Matin (8h-11h)": "Départ Tokyo et trajet",
                "Déjeuner (11h-12h30)": "Restaurant local",
                "Après-midi (13h-16h)": ["Chureito Pagoda", "Installation ryokan"],
                "Soir (16h-21h)": ["Onsen avec vue Fuji", "Dîner kaiseki au ryokan"]
            },
            10: {
                "Matin (9h-12h)": ["Tour du lac", "Télécabine Mont Kachi Kachi"],
                "Déjeuner (12h-13h30)": "Restaurant avec vue sur le Fuji",
                "Après-midi (13h30-17h)": "Points de vue Mont Fuji",
                "Soir (17h-20h)": "Deuxième nuit au ryokan"
            },
            11: {
                "Journée": "Journée libre pour activités optionnelles",
                "Options": ["Randonnée (si saison)", "Guides disponibles", "Musées locaux", "Onsen"]
            }
        }
    },
    kyoto: {
        title: "Kyoto",
        days: {
            12: {
                "Matin (8h-11h)": "Transit vers Kyoto",
                "Déjeuner (11h-12h30)": "Restaurant près de la gare",
                "Après-midi (13h-17h)": ["Nijo-jo", "Marché Nishiki"],
                "Soir (17h-21h)": "Pontocho"
            },
            13: {
                "Matin (9h-12h)": ["Kinkaku-ji", "Temple Ryoan-ji"],
                "Déjeuner (12h-13h30)": "Restaurant local",
                "Après-midi (13h30-17h)": ["Arashiyama", "Forêt de bambous"],
                "Soir (17h-21h)": "Gion exploration"
            },
            14: {
                "Matin (7h-11h)": "Fushimi Inari-taisha (tôt pour éviter la foule)",
                "Déjeuner (11h-12h30)": "Restaurant près du temple",
                "Après-midi (13h-17h)": ["Ghibli shop", "Kiyomizu-dera"],
                "Soir (17h-21h)": "Yasaka Shrine"
            },
            15: {
                "Journée": "Journée libre pour explorer plus tranquillement",
                "Suggestions": ["Retour aux endroits préférés", "Shopping", "Cafés traditionnels"]
            },
            16: {
                "Matin (9h-12h)": "Katsura Imperial Villa (réservation nécessaire)",
                "Déjeuner (12h-13h30)": "Restaurant traditionnel",
                "Après-midi (13h30-17h)": ["Philosopher's Path", "Nanzen-ji"],
                "Soir (17h-21h)": "Gion"
            }
        }
    },
    osaka: {
        title: "Osaka",
        days: {
            17: {
                "Matin (9h-11h)": "Transit et installation",
                "Déjeuner (11h-12h30)": "Premier essai de street food d'Osaka",
                "Après-midi (13h-17h)": ["Château d'Osaka", "Parc du château"],
                "Soir (17h-21h)": "Shinsekai"
            },
            18: {
                "Matin (10h-13h)": "Aquarium Kaiyukan",
                "Déjeuner (13h-14h30)": "Restaurant avec vue sur la baie",
                "Après-midi (14h30-17h)": ["Baie d'Osaka", "Kuromon Market"],
                "Soir (17h-21h)": ["Dotonbori", "Pokemon Café"]
            },
            19: {
                "Matin (9h-12h)": ["Minoh Park", "Cascade de Minoo"],
                "Déjeuner (12h-13h30)": "Restaurant local Minoh",
                "Après-midi (13h30-17h)": "Shopping Umeda",
                "Soir (17h-21h)": "Dotonbori"
            },
            20: {
                "Journée": "Journée libre à Osaka",
                "Suggestions": ["Shopping supplémentaire", "Parcs d'attractions", "Musées"]
            }
        }
    },
    himeji: {
        title: "Himeji",
        days: {
            21: {
                "Matin (8h-12h)": "Château Himeji (arrivée tôt recommandée)",
                "Déjeuner (12h-13h30)": "Restaurant local",
                "Après-midi (13h30-16h)": "Jardins Koko-en",
                "Soir (16h-21h)": "Retour Osaka et dîner"
            }
        }
    },
    nara: {
        title: "Nara",
        days: {
            22: {
                "Matin (9h-12h)": ["Parc aux daims", "Todai-ji"],
                "Déjeuner (12h-13h30)": "Restaurant traditionnel",
                "Après-midi (13h30-17h)": "Kasuga Taisha",
                "Soir (17h-21h)": "Quartier Naramachi et dîner"
            }
        }
    },
    tokyo2: {
        title: "Tokyo Retour",
        days: {
            23: {
                "Matin (9h-12h)": "Shinkansen vers Tokyo",
                "Déjeuner (12h-13h30)": "Restaurant à la gare",
                "Après-midi (13h30-18h)": "Shopping libre et derniers achats",
                "Soir (18h-21h)": "Préparation bagages"
            },
            24: {
                "Matin (9h-11h)": "Shopping dernière minute",
                "Midi (11h-12h)": "Départ vers aéroport"
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