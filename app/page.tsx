"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";   // 👈 ADD THIS HERE

export default function Home() {

  const [showModal, setShowModal] = useState(false);
  const [activeImage, setActiveImage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_nv761bh",      // replace
      "template_j9xiip8",     // replace
      e.currentTarget,
      "lvAaBx6IYgIatDDTa"      // replace
    ).then(
      () => {
        alert("Message sent successfully!");
      },
      (error) => {
        alert("Failed to send message.");
        console.log(error);
      }
    );
    e.currentTarget.reset();
  };
  /* ================= MOUSE GLOW ================= */
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* ================= PARTICLES ================= */
  type Particle = {
    left: string;
    top: string;

    duration: string;
    delay: string;
  };

  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generatedParticles: Particle[] = Array.from({ length: 60 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: `${5 + Math.random() * 10}s`,
      delay: `${Math.random() * 5}s`,
    }));

    setParticles(generatedParticles);
  }, []);

  /* ================= NAME TYPING ================= */
  const fullName = "Monika M";
  const [typedName, setTypedName] = useState("");
  const [isDeletingName, setIsDeletingName] = useState(false);

  useEffect(() => {
    const index = isDeletingName
      ? typedName.length - 1
      : typedName.length + 1;

    const timeout = setTimeout(() => {
      setTypedName(fullName.slice(0, index));

      if (!isDeletingName && index === fullName.length) {
        setTimeout(() => setIsDeletingName(true), 1000);
      }

      if (isDeletingName && index === 0) {
        setIsDeletingName(false);
      }
    }, isDeletingName ? 80 : 150);

    return () => clearTimeout(timeout);
  }, [typedName, isDeletingName]);

  /* ================= ROLE TYPING ================= */
  const roles = ["Full-Stack Developer", "Data Analyst"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;


    if (!isDeletingRole) {
      timeout = setTimeout(() => {
        setTypedRole(currentRole.slice(0, typedRole.length + 1));

        if (typedRole.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeletingRole(true), 1000);
        }
      }, 120);
    } else {
      timeout = setTimeout(() => {
        setTypedRole(currentRole.slice(0, typedRole.length - 1));

        if (typedRole.length === 1) {
          setIsDeletingRole(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [typedRole, isDeletingRole, roleIndex]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-sans z-10" style={{ backgroundColor: "#001b2e" }}>


      {/* PARTICLES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((particle, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              animationDuration: particle.duration,
              animationDelay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* MOUSE GLOW */}
      <div
        className="pointer-events-none fixed w-26 h-26 rounded-full blur-3xl opacity-170 bg-sky-500 -z-60 transition-transform duration-100"
        style={{
          left: mousePosition.x - 100,
          top: mousePosition.y - 100,
        }}
      />

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-sky-500 to-[#0b1d2d]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex justify-between items-center">
          <h1 className="text-white text-lg md:text-xl font-bold">
            Monika
          </h1>

          <ul className="hidden md:flex gap-6 text-white text-sm font-medium">
            <li><a href="#home" className="hover:text-sky-300">Home</a></li>
            <li><a href="#about" className="hover:text-sky-300">About Me</a></li>
            <li><a href="#education" className="hover:text-sky-300">Education</a></li>
            <li><a href="#internship" className="hover:text-sky-300">Internship</a></li>
            <li><a href="#projects" className="hover:text-sky-300">Projects</a></li>
            <li><a href="#certification" className="hover:text-sky-300">Certification</a></li>
            <li><a href="#contact" className="hover:text-sky-300">Contact Me</a></li>
          </ul>
        </div>
      </nav>


      {/* HERO */}
      <main
  id="home"
  className="
    min-h-screen
    flex
    items-center
    justify-center
    pt-28 sm:pt-32
    px-4 sm:px-8 md:px-12 lg:px-20
    text-center
  "
>

  <div className="w-full flex items-center justify-center">
    {/* CONTENT */}
    <div className="w-full max-w-3xl flex flex-col gap-5 sm:gap-6 items-center">

      {/* NAME */}
      <h1
        className="
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-6xl
          font-bold
          text-white
        "
      >
        Hi, I’m {typedName}
        <span className="ml-1 animate-pulse">|</span>
      </h1>

      {/* ROLE */}
      <h2
        className="
          text-lg
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          font-medium
          text-sky-300
        "
      >
        {typedRole}
        <span className="ml-1 animate-pulse">|</span>
      </h2>

      {/* DESCRIPTION */}
      <p
        className="
          max-w-2xl
          text-sm
          sm:text-base
          md:text-lg
          text-sky-100
          leading-7
        "
      >
        This is a real-time personal website project built using Next.js,
        designed and developed to showcase my skills, projects, and
        technical expertise. I have hands-on experience with Python, SQL,
        Power BI, HTML, CSS, JavaScript, and Next.js.
      </p>

      {/* BUTTONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-sky-700 px-8 py-3 text-white hover:bg-sky-800 transition">
          View Projects
        </a>

        <a
          href="#contact"
          className="rounded-lg border border-sky-300 px-8 py-3 text-white hover:bg-sky-400 hover:text-white transition">
          Get In Touch
        </a>
      </div>

    </div>
  </div>
</main>


      {/* SECTIONS */}
      <section
  id="about"
  className="
    px-4
    sm:px-8
    md:px-12
    lg:px-20
    py-12
    sm:py-14
    md:py-16
    text-white
    flex
    justify-center
  "
>
  <div className="w-full max-w-3xl text-center">

    <h2
      className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        font-bold
        text-sky-300
        mb-4
        sm:mb-6
      "
    >
      About Me
    </h2>

    <p
      className="
        text-sm
        sm:text-base
        md:text-lg
        leading-7
        md:leading-8
        text-sky-100
      "
    >
      I am a passionate Full-Stack Developer and Data Analyst with a strong
      interest in building real-world, scalable web applications and
      data-driven solutions. I enjoy working across both frontend and backend,
      turning ideas into functional, user-friendly products.
      <br /><br />
      I have hands-on experience with Python, SQL, Power BI, HTML, CSS,
      JavaScript, and Next.js, and I am continuously learning new technologies
      to improve my development and analytical skills.
    </p>

  </div>
</section>


      <section
  id="education"
  className="
    px-4
    sm:px-8
    md:px-12
    lg:px-20
    py-12
    sm:py-14
    md:py-16
    text-white
    flex
    justify-center
  "
>
  <div className="w-full max-w-3xl">

    <h2
      className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        font-bold
        text-sky-300
        mb-8
        text-center
      "
    >
      Education
    </h2>

    <div className="space-y-6">

      {/* College */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Arunai Engineering College
        </h3>
        <p className="text-sky-200">
          Tiruvannamalai, Tamil Nadu
        </p>
        <p className="mt-2">
          <span className="font-medium">
            B.E – Computer Science & Engineering
          </span>
        </p>
        <p className="text-sky-200">
          CGPA: <span className="font-semibold">8.4</span>
        </p>
      </div>

      {/* 12th */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Sri Ramajayam Matric Higher Secondary School
        </h3>
        <p className="text-sky-200">
          Polur, Tiruvannamalai, Tamil Nadu
        </p>
        <p className="mt-2">
          <span className="font-medium">
            Higher Secondary (12th)
          </span>{" "}
          – Bio Maths
        </p>
        <p className="text-sky-200">
          Percentage: <span className="font-semibold">77%</span>
        </p>
      </div>

      {/* 10th */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Sri Ramajayam Matric Higher Secondary School
        </h3>
        <p className="text-sky-200">
          Polur, Tiruvannamalai, Tamil Nadu
        </p>
        <p className="mt-2">
          <span className="font-medium">
            Secondary School (10th)
          </span>
        </p>
        <p className="text-sky-200">
          Percentage: <span className="font-semibold">66%</span>
        </p>
      </div>

    </div>
  </div>
</section>


      <section
  id="internship"
  className="
    px-4
    sm:px-8
    md:px-12
    lg:px-20
    py-12
    sm:py-14
    md:py-16
    text-white
    flex
    justify-center
  "
>
  <div className="w-full max-w-3xl">

    <h2
      className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        font-bold
        text-sky-300
        mb-8
        text-center
      "
    >
      Internship
    </h2>

    <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">

      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
        Shiash Info Solutions
      </h3>

      <p className="text-sky-200 mt-1">
        July 2024 – August 2024
      </p>

      <p className="mt-3 text-base sm:text-lg text-sky-100">
        <span className="font-medium">Role:</span> Python Developer
      </p>

      <ul className="mt-4 list-disc list-inside text-sky-50 space-y-2 text-sm sm:text-base">
        <li>
          Developed the frontend of a healthcare website using HTML and CSS.
        </li>
        <li>
          Developed 10+ responsive front-end components for a Healthcare Management System.
        </li>
        <li>
          Gained hands-on experience in real-time project development.
        </li>
      </ul>

    </div>
  </div>
</section>


      <section
  id="projects"
  className="
    px-4
    sm:px-8
    md:px-12
    lg:px-20
    py-12
    sm:py-14
    md:py-16
    text-white
    flex
    justify-center
  "
>
  <div className="w-full max-w-4xl">

    <h2
      className="
        text-2xl
        sm:text-3xl
        md:text-4xl
        font-bold
        text-sky-300
        mb-8
        text-center
      "
    >
      Projects
    </h2>

    <div className="space-y-8">

      {/* Project 1 */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Full Stack Portfolio Website
        </h3>
        <p className="text-sky-200">
          Next.js, React, Tailwind CSS
        </p>
        <ul className="mt-3 list-disc list-inside text-sky-100 space-y-2 text-sm sm:text-base">
          <li>
            Built a full stack personal portfolio website using Next.js with modern UI and smooth navigation.
          </li>
          <li>
            Implemented animated typing effects, section-based navigation, and responsive design.
          </li>
          <li>
            Designed the website to showcase projects, skills, education, and contact information.
          </li>
        </ul>
      </div>

      {/* Project 2 */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          AI-Based Emergency Vehicle Priority System
        </h3>
        <p className="text-sky-200">
          Python, YOLO
        </p>
        <ul className="mt-3 list-disc list-inside text-sky-100 space-y-2 text-sm sm:text-base">
          <li>
            Built a responsive front-end dashboard to visualize emergency vehicle detection and traffic priority status.
          </li>
          <li>
            Displayed real-time alerts, improving monitoring clarity by 40%.
          </li>
        </ul>
      </div>

      {/* Project 3 */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Bus Reservation System
        </h3>
        <p className="text-sky-200">
          Django, Python, SQL
        </p>
        <ul className="mt-3 list-disc list-inside text-sky-100 space-y-2 text-sm sm:text-base">
          <li>
            Developed user-facing pages for booking and managing bus reservations.
          </li>
          <li>
            Implemented workflows supporting multiple user roles.
          </li>
        </ul>
      </div>

      {/* Project 4 */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Healthcare Management Website (MediWeb)
        </h3>
        <p className="text-sky-200">
          HTML, CSS · Deployed on Vercel
        </p>
        <ul className="mt-3 list-disc list-inside text-sky-100 space-y-2 text-sm sm:text-base">
          <li>
            Designed responsive UI layouts using mobile-first principles.
          </li>
          <li>
            Improved navigation across 5+ web pages for better usability.
          </li>
        </ul>
      </div>

      {/* Project 5 */}
      <div className="border-l-4 border-sky-400 pl-5 sm:pl-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
          Portfolio Website
        </h3>
        <p className="text-sky-200">
          HTML, CSS
        </p>
        <ul className="mt-3 list-disc list-inside text-sky-100 space-y-2 text-sm sm:text-base">
          <li>
            Designed and developed a personal portfolio showcasing 5+ projects.
          </li>
          <li>
            Focused on clean UI design and responsive layout.
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>



      <section
  id="certification"
  className="px-4 sm:px-8 md:px-12 lg:px-20 py-16 sm:py-20 text-white"
>
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-300 mb-10 text-center">
    Certifications
  </h2>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

    {/* Certificate 1 */}
    <div className="group bg-white/10 backdrop-blur rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src="/certificates/angular.jpg"
        alt="AngularJS Certificate"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">AngularJS</h3>
        <p className="text-sky-200 text-sm">IBM</p>
        <p className="mt-3 text-sky-100 text-sm">
          Learned component-based architecture, data binding, and frontend application development.
        </p>

        <button
          onClick={() => {
            setActiveImage("/certificates/angular.jpg");
            setShowModal(true);
          }}
          className="mt-4 w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          View Certificate
        </button>
      </div>
    </div>

    {/* Certificate 2 */}
    <div className="group bg-white/10 backdrop-blur rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src="/certificates/django.jpg"
        alt="Full Stack Django Certificate"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">Full Stack Django</h3>
        <p className="text-sky-200 text-sm">TNSDC & Naan Mudhalvan</p>
        <p className="mt-3 text-sky-100 text-sm">
          Backend development, authentication, database integration, and full-stack workflows.
        </p>

        <button
          onClick={() => {
            setActiveImage("/certificates/django.jpg");
            setShowModal(true);
          }}
          className="mt-4 w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          View Certificate
        </button>
      </div>
    </div>

    {/* Certificate 3 */}
    <div className="group bg-white/10 backdrop-blur rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src="/certificates/data-analytics.jpg"
        alt="Data Analytics Certificate"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">Data Analytics</h3>
        <p className="text-sky-200 text-sm">Infosys</p>
        <p className="mt-3 text-sky-100 text-sm">
          Data analysis, visualization, and insight generation using analytical tools.
        </p>

        <button
          onClick={() => {
            setActiveImage("/certificates/data-analytics.jpg");
            setShowModal(true);
          }}
          className="mt-4 w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          View Certificate
        </button>
      </div>
    </div>

    {/* Certificate 4 */}
    <div className="group bg-white/10 backdrop-blur rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src="/certificates/Monika-Python.jpg"
        alt="Python Full Stack Certificate"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">Python Full Stack</h3>
        <p className="text-sky-200 text-sm">Shiash Info Solutions</p>
        <p className="mt-3 text-sky-100 text-sm">
          Full stack development using Python, frontend technologies, and databases.
        </p>

        <button
          onClick={() => {
            setActiveImage("/certificates/Monika-Python.jpg");
            setShowModal(true);
          }}
          className="mt-4 w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          View Certificate
        </button>
      </div>
    </div>

    {/* Certificate 5 */}
    <div className="group bg-white/10 backdrop-blur rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-xl">
      <img
        src="/certificates/sql.jpg"
        alt="SQL Certificate"
        className="h-40 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-lg font-semibold">SQL Basics</h3>
        <p className="text-sky-200 text-sm">HackerRank</p>
        <p className="mt-3 text-sky-100 text-sm">
          Proficiency in SQL queries, joins, subqueries, and aggregate functions.
        </p>

        <button
          onClick={() => {
            setActiveImage("/certificates/sql.jpg");
            setShowModal(true);
          }}
          className="mt-4 w-full rounded-md bg-sky-600 py-2 text-sm font-medium text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition"
        >
          View Certificate
        </button>
      </div>
    </div>

  </div>

  {/* MODAL */}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative max-w-3xl w-full mx-4">
        <button
          onClick={() => setShowModal(false)}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-sky-300"
        >
          ×
        </button>
        <img
          src={activeImage}
          alt="Certificate"
          className="w-full rounded-lg shadow-2xl"
        />
      </div>
    </div>
  )}
</section>



      <section
  id="contact"
  className="px-4 sm:px-8 md:px-12 lg:px-20 py-20 text-white"
>
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-sky-300 mb-12 text-center">
      Contact Me
    </h2>

    {/* 2 Column Layout */}
    <div className="grid md:grid-cols-2 gap-12 items-start">

      {/* ================= LEFT SIDE - DETAILS ================= */}
      <div className="space-y-6">

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/15 transition">
          <p className="text-lg">
            📞 <span className="font-semibold">Mobile</span>
          </p>
          <a
            href="tel:8667560058"
            className="text-sky-300 hover:underline"
          >
            +91 8667560058
          </a>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/15 transition">
          <p className="text-lg">
            📧 <span className="font-semibold">Email</span>
          </p>
          <a
            href="mailto:mmonikam2004@gmail.com"
            className="text-sky-300 hover:underline break-all"
          >
            mmonikam2004@gmail.com
          </a>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/15 transition">
          <p className="text-lg">
            💻 <span className="font-semibold">GitHub</span>
          </p>
          <a
            href="https://github.com/Monika-M-24/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:underline break-all"
          >
            github.com/Monika-M-24
          </a>
        </div>

        <div className="bg-white/10 p-6 rounded-xl backdrop-blur hover:bg-white/15 transition">
          <p className="text-lg">
            🔗 <span className="font-semibold">LinkedIn</span>
          </p>
          <a
            href="https://www.linkedin.com/in/monika-m-ba9a67249/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:underline break-all"
          >
            linkedin.com/in/monika-m-ba9a67249
          </a>
        </div>

      </div>

      {/* ================= RIGHT SIDE - FORM ================= */}
      <div className="bg-white/10 p-8 rounded-xl backdrop-blur">

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <div>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 py-3 rounded-lg hover:bg-sky-700 transition font-semibold"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  </div>
</section>



    </div>
  );
}
