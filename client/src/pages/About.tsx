import PageHeader from "../components/PageHeader";

const About = () => {
  document.title = "About Real Estate";
  
  return (
    <div>
      <PageHeader pageTitle="About" />
      <div className="bg-gray-100 text-xl">
      <div className="container mx-auto py-10 max-w-screen-lg">
        <h1 className="text-3xl mb-4 font-semibold">About Real Estate</h1>
        <p>
          Welcome to Real Estate! Whether you're searching for your dream home, a
          lucrative investment property, or are ready to sell your current place,
          we're here to guide you through every step of the process with expertise
          and dedication.
        </p>
        <br />

        <h2 className="text-2xl mb-4 font-semibold">Who We Are</h2>
        <p>
          [Your Name/Company Name] is a team of passionate real estate
          professionals with [Number] years of experience in the [Your Location]
          market. We're not just agents, we're your trusted advisors, committed to
          understanding your unique needs and exceeding your expectations. Our
          personalized approach and in-depth knowledge of the local market set us
          apart, ensuring a smooth and successful real estate journey.
        </p>
        <br />

        <h2 className="text-2xl mb-4 font-semibold">Our Values</h2>
        <ul>
          <li className="mb-4">
            <strong>Client-First:</strong> We prioritize your needs and goals
            above all else, fostering a collaborative and transparent relationship
            built on trust.
          </li>
          <li className="mb-4">
            <strong>Integrity:</strong> Honesty and ethical conduct are paramount
            in everything we do. We believe in open communication and providing
            you with all the information you need to make informed decisions.
          </li>
          <li className="mb-4">
            <strong>Expertise:</strong> We stay current on market trends, local
            regulations, and industry best practices, ensuring you benefit from
            our comprehensive knowledge.
          </li>
          <li className="mb-4">
            <strong>Dedication:</strong> We are dedicated to achieving the best
            possible outcome for you, exceeding your expectations and going the
            extra mile to make your real estate dream a reality.
          </li>
        </ul>

        <h2 className="text-2xl mb-4 font-semibold">What We Offer</h2>
        <h3>Rentals</h3>
        <p>
          Explore our extensive portfolio of rental properties, from cozy
          apartments and modern condos to spacious single-family homes, catering
          to a variety of needs and budgets.
        </p>

        <h3>Seamless Buying & Selling</h3>
        <p>
          We offer comprehensive support and expert guidance throughout the entire
          buying or selling process, ensuring a smooth and stress-free experience.
        </p>

        <h3>Market Expertise</h3>
        <p>
          Leverage our in-depth knowledge of the local market to make informed
          decisions. We provide thorough market analysis, property evaluations,
          and strategic negotiation strategies.
        </p>

        <h3>Effective Marketing (if applicable)</h3>
        <p>
          We utilize innovative marketing techniques and targeted advertising to
          showcase your property to a wider audience and attract qualified buyers.
        </p>
        <br />

        <h2 className="text-2xl mb-4 font-semibold">Join the Real Estate Family</h2>
        <p>
          We invite you to browse our available listings and contact us today.
          We're passionate about helping you achieve your real estate goals, and
          we're confident that together, we can find your perfect place.
        </p>
        <br />

        <h2 className="text-2xl mb-4 font-semibold">Let's Connect!</h2>
        <ul>
          <li className="mb-4">
            Phone: <a href="tel:[Your Phone Number]">[Your Phone Number]</a>
          </li>
          <li className="mb-4">
            Email: <a href="mailto:[Your Email Address]">[Your Email Address]</a>
          </li>
          <li className="mb-4">
            <a href="[Social Media Link 1]">[Social Media Link 1 Text]</a>
          </li>
          <li className="mb-4">
            <a href="[Social Media Link 2]">[Social Media Link 2 Text]</a>
          </li>
          <li>
            <a href="[Call to Action Button Link]" className="text-blue-500 hover:underline">
              Schedule a Consultation
            </a>
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
};

export default About;
