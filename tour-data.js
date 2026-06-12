const tourData = [
  {
    city:"Goyang",
    venue:"Goyang Stadium",
    page:"seoul.html",
    lat:37.6584,
    lng:126.8320,
    dates:["April 9, 2026","April 11, 2026","April 12, 2026"]
  },
  {
    city:"Tokyo",
    venue:"Tokyo Dome",
    page:"tokyo.html",
    lat:35.6764,
    lng:139.6500,
    dates:["April 17, 2026","April 18, 2026"]
  },
  {
    city:"Tampa",
    venue:"Raymond James Stadium",
    page:"tampa.html",
    lat:27.9506,
    lng:-82.4572,
    dates:["April 25, 2026","April 26, 2026","April 28, 2026"]
  },
  {
    city:"El Paso",
    venue:"Sun Bowl Stadium",
    page:"elpaso.html",
    lat:31.7619,
    lng:-106.4850,
    dates:["May 2, 2026","May 3, 2026"]
  },
  {
    city:"Mexico City",
    venue:"Estadio GNP Seguros",
    page:"mexicocity.html",
    lat:19.4326,
    lng:-99.1332,
    dates:["May 7, 2026","May 9, 2026","May 10, 2026"]
  },
  {
    city:"Stanford",
    venue:"Stanford Stadium",
    page:"stanford.html",
    lat:37.4275,
    lng:-122.1697,
    dates:["May 16, 2026","May 17, 2026","May 19, 2026"]
  },
  {
    city:"Las Vegas",
    venue:"Allegiant Stadium",
    page:"lasvegas.html",
    lat:36.1716,
    lng:-115.1391,
    dates:["May 23, 2026","May 24, 2026","May 27, 2026","May 28, 2026"]
  },
  {
    city:"Busan",
    venue:"Busan Asiad Main Stadium",
    page:"busan.html",
    lat:35.1796,
    lng:129.0756,
    dates:["June 12, 2026","June 13, 2026"]
  },
  {
    city:"Madrid",
    venue:"Riyadh Air Metropolitano",
    page:"madrid.html",
    lat:40.4168,
    lng:-3.7038,
    dates:["June 26, 2026","June 27, 2026"]
  },
  {
    city:"Brussels",
    venue:"King Baudouin Stadium",
    page:"brussels.html",
    lat:50.8503,
    lng:4.3517,
    dates:["July 1, 2026","July 2, 2026"]
  },
  {
    city:"London",
    venue:"Tottenham Hotspur Stadium",
    page:"london.html",
    lat:51.5072,
    lng:-0.1276,
    dates:["July 6, 2026","July 7, 2026"]
  },
  {
    city:"Munich",
    venue:"Allianz Arena",
    page:"munich.html",
    lat:48.1351,
    lng:11.5820,
    dates:["July 11, 2026","July 12, 2026"]
  },
  {
    city:"Paris",
    venue:"Stade De France",
    page:"paris.html",
    lat:48.8566,
    lng:2.3522,
    dates:["July 17, 2026","July 18, 2026"]
  },
  {
    city:"East Rutherford",
    venue:"Metlife Stadium",
    page:"eastrutherford.html",
    lat:40.8339,
    lng:-74.0971,
    dates:["August 1, 2026","August 2, 2026"]
  },
  {
    city:"Foxborough",
    venue:"Gillette Stadium",
    page:"foxborough.html",
    lat:42.0654,
    lng:-71.2478,
    dates:["August 5, 2026","August 6, 2026"]
  },
  {
    city:"Baltimore",
    venue:"M&T Bank Stadium",
    page:"baltimore.html",
    lat:39.2904,
    lng:-76.6122,
    dates:["August 10, 2026","August 11, 2026"]
  },
  {
    city:"Arlington",
    venue:"AT&T Stadium",
    page:"arlington.html",
    lat:32.7357,
    lng:-97.1081,
    dates:["August 15, 2026","August 16, 2026"]
  },
  {
    city:"Toronto",
    venue:"Rogers Stadium",
    page:"toronto.html",
    lat:43.6532,
    lng:-79.3832,
    dates:["August 22, 2026","August 23, 2026"]
  },
  {
    city:"Chicago",
    venue:"Soldier Field",
    page:"chicago.html",
    lat:41.8781,
    lng:-87.6298,
    dates:["August 27, 2026","August 28, 2026"]
  },
  {
    city:"Los Angeles",
    venue:"SoFi Stadium",
    page:"losangeles.html",
    lat:34.0522,
    lng:-118.2437,
    dates:["September 1, 2026","September 2, 2026","September 5, 2026","September 6, 2026"]
  },
  {
    city:"Bogota",
    venue:"Estadio El Campín",
    page:"bogota.html",
    lat:4.7110,
    lng:-74.0721,
    dates:["October 2, 2026","October 3, 2026"]
  },
  {
    city:"Lima",
    venue:"Estadio San Marcos",
    page:"lima.html",
    lat:-12.0464,
    lng:-77.0428,
    dates:["October 7, 2026","October 9, 2026","October 10, 2026"]
  },
  {
    city:"Santiago",
    venue:"Estadio Nacional",
    page:"santiago.html",
    lat:-33.4489,
    lng:-70.6693,
    dates:["October 14, 2026","October 16, 2026","October 17, 2026"]
  },
  {
    city:"Buenos Aires",
    venue:"Estadio Único De La Plata",
    page:"buenosaires.html",
    lat:-34.6037,
    lng:-58.3816,
    dates:["October 21, 2026","October 23, 2026","October 24, 2026"]
  },
  {
    city:"São Paulo",
    venue:"Estádio Do Morumbis",
    page:"saopaulo.html",
    lat:-23.5505,
    lng:-46.6333,
    dates:["October 28, 2026","October 30, 2026","October 31, 2026"]
  },
  {
    city:"Kaohsiung",
    venue:"Kaohsiung National Stadium",
    page:"kaohsiung.html",
    lat:22.6273,
    lng:120.3014,
    dates:["November 19, 2026","November 21, 2026","November 22, 2026"]
  },
  {
    city:"Bangkok",
    venue:"Rajamangala National Stadium",
    page:"bangkok.html",
    lat:13.7563,
    lng:100.5018,
    dates:["December 3, 2026","December 5, 2026","December 6, 2026"]
  },
  {
    city:"Kuala Lumpur",
    venue:"TM Stadium Nasional",
    page:"kualalumpur.html",
    lat:3.1390,
    lng:101.6869,
    dates:["December 12, 2026","December 13, 2026"]
  },
  {
    city:"Singapore",
    venue:"National Stadium",
    page:"singapore.html",
    lat:1.3521,
    lng:103.8198,
    dates:["December 17, 2026","December 19, 2026","December 20, 2026","December 22, 2026"]
  },
  {
    city:"Jakarta",
    venue:"Gelora Bung Karno Main Stadium",
    page:"jakarta.html",
    lat:-6.2088,
    lng:106.8456,
    dates:["December 26, 2026","December 27, 2026"]
  },
  {
    city:"Melbourne",
    venue:"Marvel Stadium",
    page:"melbourne.html",
    lat:-37.8136,
    lng:144.9631,
    dates:["February 12, 2027","February 13, 2027"]
  },
  {
    city:"Sydney",
    venue:"Accor Stadium",
    page:"sydney.html",
    lat:-33.8688,
    lng:151.2093,
    dates:["February 20, 2027","February 21, 2027"]
  },
  {
    city:"Hong Kong",
    venue:"Kai Tak Stadium",
    page:"hongkong.html",
    lat:22.3193,
    lng:114.1694,
    dates:["March 4, 2027","March 6, 2027","March 7, 2027"]
  },
  {
    city:"Bulacan",
    venue:"Philippine Sports Stadium",
    page:"bulacan.html",
    lat:14.7942,
    lng:120.8799,
    dates:["March 13, 2027","March 14, 2027"]
  }
];