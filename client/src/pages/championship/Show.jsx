import MatchRow from "@/components/MatchRow";
import React from "react";
import { useParams } from "react-router-dom";

const Show = () => {
  const { championshipName } = useParams();

  // Championship images
  const championshipData = {
    "premier-league": {
      name: "Premier League",
      displayName: "Premier League",
      country: "England",
      image:
        "https://images.unsplash.com/photo-1695713503375-e8458c3e1d5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaWVyJTIwbGVhZ3VlJTIwZmFuc3xlbnwxfHx8fDE3Njg3MDI3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    "la-liga": {
      name: "la-liga",
      displayName: "La Liga",
      country: "Spain",
      image:
        "https://images.unsplash.com/photo-1624880357913-a8539238245b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzcGFuaXNoJTIwZm9vdGJhbGx8ZW58MXx8fHwxNzY4NzAyNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    "serie-a": {
      name: "serie-a",
      displayName: "Serie A",
      country: "Italy",
      image:
        "https://images.unsplash.com/photo-1594992956782-2ce0e85d9e99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwZm9vdGJhbGx8ZW58MXx8fHwxNzY4NzAyNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    "ligue-1": {
      name: "ligue-1",
      displayName: "Ligue 1",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmb290YmFsbHxlbnwxfHx8fDE3Njg3MDI3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    bundesliga: {
      name: "bundesliga",
      displayName: "Bundesliga",
      country: "Germany",
      image:
        "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnZXJtYW4lMjBmb290YmFsbHxlbnwxfHx8fDE3Njg3MDI3ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    "champions-league": {
      name: "champions-league",
      displayName: "Champions League",
      country: "Europe",
      image:
        "https://images.unsplash.com/photo-1522778526097-83639e3e3f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFtcGlvbnMlMjBsZWFndWV8ZW58MXx8fHwxNzY4NzAyNzgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  };

  const currentChampionship =
    championshipData[championshipName] || championshipData["premier-league"];

  // All matches organized by championship
  const allMatches = {
    "la-liga": [
      {
        id: "la-liga-1",
        day: "20",
        month: "MAR",
        time: "20:00",
        teamHome: "Real Madrid",
        teamAway: "Barcelona",
        competition: "La Liga",
        venue: "Santiago Bernabéu",
        location: "Madrid, Spain",
        price: "€145",
      },
      {
        id: "la-liga-2",
        day: "15",
        month: "MAR",
        time: "18:30",
        teamHome: "Atletico Madrid",
        teamAway: "Sevilla",
        competition: "La Liga",
        venue: "Wanda Metropolitano",
        location: "Madrid, Spain",
        price: "€75",
      },
      {
        id: "la-liga-3",
        day: "22",
        month: "MAR",
        time: "21:00",
        teamHome: "Barcelona",
        teamAway: "Valencia",
        competition: "La Liga",
        venue: "Camp Nou",
        location: "Barcelona, Spain",
        price: "€95",
      },
      {
        id: "la-liga-4",
        day: "28",
        month: "MAR",
        time: "16:00",
        teamHome: "Real Betis",
        teamAway: "Real Sociedad",
        competition: "La Liga",
        venue: "Benito Villamarín",
        location: "Seville, Spain",
        price: "€55",
      },
    ],
    "serie-a": [
      {
        id: "serie-a-1",
        day: "18",
        month: "MAR",
        time: "20:45",
        teamHome: "Inter Milan",
        teamAway: "AC Milan",
        competition: "Serie A",
        venue: "San Siro",
        location: "Milan, Italy",
        price: "€125",
      },
      {
        id: "serie-a-2",
        day: "25",
        month: "MAR",
        time: "19:00",
        teamHome: "Juventus",
        teamAway: "Roma",
        competition: "Serie A",
        venue: "Allianz Stadium",
        location: "Turin, Italy",
        price: "€85",
      },
      {
        id: "serie-a-3",
        day: "30",
        month: "MAR",
        time: "18:00",
        teamHome: "Napoli",
        teamAway: "Lazio",
        competition: "Serie A",
        venue: "Stadio Diego Armando Maradona",
        location: "Naples, Italy",
        price: "€75",
      },
      {
        id: "serie-a-4",
        day: "05",
        month: "APR",
        time: "20:00",
        teamHome: "AC Milan",
        teamAway: "Juventus",
        competition: "Serie A",
        venue: "San Siro",
        location: "Milan, Italy",
        price: "€95",
      },
    ],
    "ligue-1": [
      {
        id: "ligue-1-1",
        day: "03",
        month: "MAY",
        time: "21:00",
        teamHome: "PSG",
        teamAway: "Marseille",
        competition: "Ligue 1",
        venue: "Parc des Princes",
        location: "Paris, France",
        price: "€95",
      },
      {
        id: "ligue-1-2",
        day: "10",
        month: "MAY",
        time: "20:00",
        teamHome: "Lyon",
        teamAway: "Monaco",
        competition: "Ligue 1",
        venue: "Groupama Stadium",
        location: "Lyon, France",
        price: "€65",
      },
      {
        id: "ligue-1-3",
        day: "15",
        month: "MAY",
        time: "17:00",
        teamHome: "Marseille",
        teamAway: "Lille",
        competition: "Ligue 1",
        venue: "Orange Vélodrome",
        location: "Marseille, France",
        price: "€55",
      },
      {
        id: "ligue-1-4",
        day: "22",
        month: "MAY",
        time: "21:00",
        teamHome: "PSG",
        teamAway: "Lyon",
        competition: "Ligue 1",
        venue: "Parc des Princes",
        location: "Paris, France",
        price: "€85",
      },
    ],
    "premier-league": [
      {
        id: "premier-league-1",
        day: "15",
        month: "FEB",
        time: "15:00",
        teamHome: "Man United",
        teamAway: "Liverpool",
        competition: "Premier League",
        venue: "Old Trafford",
        location: "Manchester, England",
        price: "£89",
      },
      {
        id: "premier-league-2",
        day: "22",
        month: "FEB",
        time: "17:30",
        teamHome: "Arsenal",
        teamAway: "Chelsea",
        competition: "Premier League",
        venue: "Emirates Stadium",
        location: "London, England",
        price: "£95",
      },
      {
        id: "premier-league-3",
        day: "28",
        month: "FEB",
        time: "12:30",
        teamHome: "Manchester City",
        teamAway: "Tottenham",
        competition: "Premier League",
        venue: "Etihad Stadium",
        location: "Manchester, England",
        price: "£105",
      },
      {
        id: "premier-league-4",
        day: "08",
        month: "MAR",
        time: "16:30",
        teamHome: "Liverpool",
        teamAway: "Manchester City",
        competition: "Premier League",
        venue: "Anfield",
        location: "Liverpool, England",
        price: "£125",
      },
    ],
    bundesliga: [
      {
        id: "bundesliga-1",
        day: "19",
        month: "APR",
        time: "18:30",
        teamHome: "Bayern Munich",
        teamAway: "Borussia Dortmund",
        competition: "Bundesliga",
        venue: "Allianz Arena",
        location: "Munich, Germany",
        price: "€88",
      },
      {
        id: "bundesliga-2",
        day: "25",
        month: "APR",
        time: "15:30",
        teamHome: "RB Leipzig",
        teamAway: "Bayer Leverkusen",
        competition: "Bundesliga",
        venue: "Red Bull Arena",
        location: "Leipzig, Germany",
        price: "€65",
      },
      {
        id: "bundesliga-3",
        day: "02",
        month: "MAY",
        time: "18:30",
        teamHome: "Borussia Dortmund",
        teamAway: "Bayern Munich",
        competition: "Bundesliga",
        venue: "Signal Iduna Park",
        location: "Dortmund, Germany",
        price: "€92",
      },
      {
        id: "bundesliga-4",
        day: "10",
        month: "MAY",
        time: "20:30",
        teamHome: "Eintracht Frankfurt",
        teamAway: "RB Leipzig",
        competition: "Bundesliga",
        venue: "Deutsche Bank Park",
        location: "Frankfurt, Germany",
        price: "€55",
      },
    ],
    "champions-league": [
      {
        id: "champions-league-1",
        day: "20",
        month: "JAN",
        time: "20:45",
        teamHome: "Tottenham Hotspur",
        teamAway: "Borussia Dortmund",
        competition: "UEFA Champions League",
        venue: "Tottenham Hotspur Stadium",
        location: "London, England",
        price: "£85",
      },
      {
        id: "champions-league-2",
        day: "21",
        month: "JAN",
        time: "21:00",
        teamHome: "Chelsea",
        teamAway: "Milan",
        competition: "UEFA Champions League",
        venue: "Stamford Bridge",
        location: "London, England",
        price: "£95",
      },
      {
        id: "champions-league-3",
        day: "21",
        month: "JAN",
        time: "20:00",
        teamHome: "Newcastle United",
        teamAway: "PSV",
        competition: "UEFA Champions League",
        venue: "St. James' Park",
        location: "Newcastle, England",
        price: "£68",
      },
      {
        id: "champions-league-4",
        day: "28",
        month: "JAN",
        time: "21:00",
        teamHome: "Real Madrid",
        teamAway: "Bayern Munich",
        competition: "UEFA Champions League",
        venue: "Santiago Bernabéu",
        location: "Madrid, Spain",
        price: "€135",
      },
    ],
  };

  const championshipMatches =
    allMatches[championshipName] || allMatches["premier-league"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Championship Header */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentChampionship.image}
            alt={currentChampionship.displayName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 via-green-900/85 to-emerald-900/90" />
        </div>

        <div className="relative max-w-[1024px] mx-auto px-4 h-full flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold text-center mb-4">
            {currentChampionship.displayName}
          </h1>
          <p className="text-xl text-emerald-100">
            {currentChampionship.country}
          </p>
          <div className="mt-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <span className="text-white font-semibold">
              {championshipMatches.length} Matches Available
            </span>
          </div>
        </div>
      </section>

      {/* Matches Section */}
      <section className="py-12">
        <div className="max-w-[1024px] mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Upcoming Matches
          </h2>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {championshipMatches.map((match, index) => (
              <MatchRow
                key={match.id}
                id={match.id}
                day={match.day}
                month={match.month}
                time={match.time}
                teamHome={match.teamHome}
                teamAway={match.teamAway}
                competition={match.competition}
                venue={match.venue}
                location={match.location}
                price={match.price}
                isLast={index === championshipMatches.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Show;



