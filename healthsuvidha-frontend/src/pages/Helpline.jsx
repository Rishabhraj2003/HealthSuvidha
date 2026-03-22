

import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Helpline.css";

function Helpline() {
  const [search, setSearch] = useState("");

  const helplines = [
    {
      icon: "🚓",
      title: "Police",
      desc: "Law & safety emergencies",
      number: "112",
      bg: "police",
    },
    {
      icon: "🚑",
      title: "Ambulance",
      desc: "Medical emergency & accident support",
      number: "108",
      bg: "ambulance",
    },
    {
      icon: "👨‍⚕️",
      title: "Doctor Helpline",
      desc: "Talk to a certified doctor",
      number: "1800123456",
      bg: "doctor",
    },
    {
      icon: "👩‍🦰",
      title: "Women Safety",
      desc: "24×7 women emergency support",
      number: "181",
      bg: "women",
    },
    {
      icon: "🔥",
      title: "Fire Brigade",
      desc: "Fire emergency support",
      number: "101",
      bg: "fire",
    },
    {
      icon: "👴",
      title: "Senior Citizens",
      desc: "Elderly assistance",
      number: "14567",
      bg: "senior",
    },
    {
      icon: "🧠",
      title: "Mental Health",
      desc: "Counseling support",
      number: "1800-599-0019",
      bg: "mental",
    },
    {
      icon: "🚨",
      title: "Disaster Management",
      desc: "Natural disaster emergency",
      number: "108",
      bg: "disaster",
    },
    {
      icon: "🧒",
      title: "Child Helpline",
      desc: "Support for children",
      number: "1098",
      bg: "child",
    },
    {
      icon: "🚗",
      title: "Road Accident",
      desc: "Road accident emergency",
      number: "1073",
      bg: "road",
    },
    {
      icon: "☠️",
      title: "Poison Helpline",
      desc: "Poisoning or toxic exposure",
      number: "1066",
      bg: "poison",
    },
    {
      icon: "🦠",
      title: "Covid Helpline",
      desc: "Covid-19 assistance",
      number: "1075",
      bg: "covid",
    },
    {
      icon: "🩸",
      title: "Blood Bank",
      desc: "Blood donation & request",
      number: "104",
      bg: "blood",
    },
  ];

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    alert(`Copied ${num} to clipboard ✅`);
  };

  const filtered = helplines.filter(
    (line) =>
      line.title.toLowerCase().includes(search.toLowerCase()) ||
      line.desc.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="helpline-hero">
        <h2>
          Emergency <span className="highlight">Helpline</span>
        </h2>
        <p>
          Immediate help saves lives. Tap a service below to connect instantly.
        </p>
        <input
          type="text"
          placeholder="Search helpline..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="helpline-search"
        />
      </section>

      {/* Helpline Grid */}
      <section className="helpline-grid">
        {filtered.map((line, idx) => (
          <div className={`helpline-card ${line.bg}`} key={idx}>
            <div className="icon">{line.icon}</div>
            <h3>{line.title}</h3>
            <p>{line.desc}</p>
            <div className="card-actions">
              <a href={`tel:${line.number}`} className="call-btn">
                Call {line.number}
              </a>
              <button
                className="copy-btn"
                onClick={() => handleCopy(line.number)}
              >
                📋
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Footer Note */}
      <section className="helpline-note">
        <p>
          ⚠️ If the situation is life-threatening, call emergency services
          immediately. You can also use our Healthसुविधा Bot 💬 for guidance.
        </p>
      </section>
    </>
  );
}

export default Helpline;
