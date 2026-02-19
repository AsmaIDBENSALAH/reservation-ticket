import React from "react";
import MatchRow from "../MatchRow";

const MostPopularMatchesSection = () => {
  const popularMatches = [
    {
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
      day: "24",
      month: "JAN",
      time: "19:45",
      teamHome: "Manchester City",
      teamAway: "Wolverhampton Wanderers",
      competition: "Premier League",
      venue: "Etihad Stadium",
      location: "Manchester, England",
      price: "£92",
    },
    {
      day: "25",
      month: "JAN",
      time: "15:00",
      teamHome: "Newcastle United",
      teamAway: "Aston Villa",
      competition: "Premier League",
      venue: "St. James' Park",
      location: "Newcastle, England",
      price: "£58",
    },
    {
      day: "25",
      month: "JAN",
      time: "17:30",
      teamHome: "Arsenal",
      teamAway: "Manchester United",
      competition: "Premier League",
      venue: "Emirates Stadium",
      location: "London, England",
      price: "£105",
    },
    {
      day: "26",
      month: "JAN",
      time: "20:15",
      teamHome: "Manchester City",
      teamAway: "Colchester",
      competition: "FA Cup",
      venue: "Etihad Stadium",
      location: "Manchester, England",
      price: "£45",
    },
    {
      day: "28",
      month: "JAN",
      time: "20:00",
      teamHome: "Liverpool",
      teamAway: "Qarabag FK",
      competition: "UEFA Europa League",
      venue: "Anfield",
      location: "Liverpool, England",
      price: "£72",
    },
    {
      day: "31",
      month: "JAN",
      time: "20:00",
      teamHome: "Chelsea",
      teamAway: "West Ham United",
      competition: "Premier League",
      venue: "Stamford Bridge",
      location: "London, England",
      price: "£88",
    },
    {
      day: "31",
      month: "JAN",
      time: "14:00",
      teamHome: "Liverpool",
      teamAway: "Newcastle United",
      competition: "Premier League",
      venue: "Anfield",
      location: "Liverpool, England",
      price: "£95",
    },
    {
      day: "01",
      month: "FEB",
      time: "16:30",
      teamHome: "Manchester United",
      teamAway: "Fulham",
      competition: "Premier League",
      venue: "Old Trafford",
      location: "Manchester, England",
      price: "£82",
    },
    {
      day: "01",
      month: "FEB",
      time: "12:30",
      teamHome: "Tottenham Hotspur",
      teamAway: "Manchester City",
      competition: "Premier League",
      venue: "Tottenham Hotspur Stadium",
      location: "London, England",
      price: "£115",
    },
    {
      day: "07",
      month: "FEB",
      time: "20:00",
      teamHome: "Manchester United",
      teamAway: "Tottenham Hotspur",
      competition: "Premier League",
      venue: "Old Trafford",
      location: "Manchester, England",
      price: "£98",
    },
    {
      day: "07",
      month: "FEB",
      time: "19:45",
      teamHome: "Arsenal",
      teamAway: "Southampton",
      competition: "Premier League",
      venue: "Emirates Stadium",
      location: "London, England",
      price: "£65",
    },
    {
      day: "08",
      month: "FEB",
      time: "16:30",
      teamHome: "Liverpool",
      teamAway: "Manchester City",
      competition: "Premier League",
      venue: "Anfield",
      location: "Liverpool, England",
      price: "£125",
    },
  ];
  return (
    <section className="py-5">
      <div className="max-w-[1024px] mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Most popular Football tickets
        </h2>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          {popularMatches.map((m, index) => (
            <MatchRow
              key={`${m.teamHome}-${m.teamAway}-${m.day}-${m.month}-${m.time}`}
              day={m.day}
              month={m.month}
              time={m.time}
              teamHome={m.teamHome}
              teamAway={m.teamAway}
              competition={m.competition}
              venue={m.venue}
              location={m.location}
              price={m.price}
              isLast={index === popularMatches.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostPopularMatchesSection;
