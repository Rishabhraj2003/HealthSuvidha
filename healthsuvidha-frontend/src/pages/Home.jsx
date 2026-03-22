// import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import Navbar from "../components/Navbar";
// import UserNavbar from "../components/UserNavbar";

const Home = () => {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      {/* <UserNavbar></UserNavbar> */}
      {/* <navbar-switcher></navbar-switcher> */}
      <Hero />
      <Services />
      <Footer />
      <Chatbot />
    </>
  );
};

export default Home;

