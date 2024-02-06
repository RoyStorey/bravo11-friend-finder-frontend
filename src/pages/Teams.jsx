import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import TeamsTable from "../components/teamsTable.jsx";
import "../styles/home.css";

const data = [
  {
    teamName: "Team Alpha",
    useCase: "Data Analytics for Financial Services",
    members: ["User1", "User2", "User3"],
    captainDiscordName: "CaptainAlpha",
    captainCodeOTP: "123456",
    gitRepoUrl: "https://github.com/teamalpha",
    location: "Remote",
    preferredTimeToWork: "9:00 AM - 5:00 PM",
    classificationLevel: "Confidential",
    preferredSkillsets: ["Data Analyst", "Web Developer"],
  },
  {
    teamName: "Team Bravo",
    useCase: "AI-driven Customer Support",
    members: ["User4", "User5", "User6"],
    captainDiscordName: "CaptainBravo",
    captainCodeOTP: "789012",
    gitRepoUrl: "https://github.com/teambravo",
    location: "Office",
    preferredTimeToWork: "10:00 AM - 6:00 PM",
    classificationLevel: "Secret",
    preferredSkillsets: ["AI Engineer", "Customer Support Specialist"],
  },
];

export default function Teams() {
  return (
    <div className="home">
      <Header />
      <div className="body">
        <TeamsTable data={data} />
      </div>
      <Footer />
    </div>
  );
}
