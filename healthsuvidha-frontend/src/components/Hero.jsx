import "../styles/home.css";

const Hero = () => {
  return (
    <section className="hero">
      <h2>
        Welcome to <span className="highlight">Healthसुविधा</span>
      </h2>

      <p>
        Your <strong>trusted healthcare companion</strong>. We help you connect
        with the best doctors, medicines, insurance options, and support
        services — all from one platform.
      </p>

      <blockquote>
        “Good health is not just about treatment, it’s about care, trust, and
        timely support.”
      </blockquote>

      <p>
        Many patients in rural areas face difficulties in finding the right
        doctors, hospitals, or treatment plans.{" "}
        <strong>Healthसुविधा</strong> bridges this gap by making quality
        healthcare accessible, reliable, and affordable.
      </p>
    </section>
    
  );
};

export default Hero;
