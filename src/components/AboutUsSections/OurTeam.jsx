import React from "react";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import sampleImg from '../../assets/imgs/plumbing.webp'
import OptimizedImage from "../OptimizedImage";

const team = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    image: "/images/team/john.jpg", // Placeholder, we can replace later
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Jane Smith",
    role: "Chief Technology Officer",
    image: "/images/team/jane.jpg",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
  {
    name: "Mike Johnson",
    role: "Head of Operations",
    image: "/images/team/mike.jpg",
    linkedin: "#",
    twitter: "#",
    email: "#",
  },
];

const OurTeam = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="container mx-auto px-6 lg:px-20">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="header text-gradient">Meet the Team</h2>
          <p className="subheader text-gray-600 mt-4">
            The brilliant minds shaping ServiJoy into a world-class platform.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg transition hover:shadow-xl"
            >
              {/* Profile Image */}
              <OptimizedImage 
               src={sampleImg}
               alt={member.name}
               className="w-32 h-32 object-cover rounded-full border-4 border-green shadow-md"
               rounded={'rounded-full '}
              />

              {/* Name & Role */}
              <h3 className="text-xl max-sm:text-lg font-semibold mt-4">{member.name}</h3>
              <p className="text-gray-600 max-sm:text-sm">{member.role}</p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-3">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-600 text-2xl hover:text-blue-800 transition" />
                </a>
                <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 text-2xl hover:text-blue-600 transition" />
                </a>
                <a href={`mailto:${member.email}`} target="_blank" rel="noopener noreferrer">
                  <FaEnvelope className="text-green text-2xl hover:text-green-700 transition" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
