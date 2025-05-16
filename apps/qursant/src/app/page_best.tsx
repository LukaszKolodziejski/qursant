// 'use client';

// import { useTranslations } from 'next-intl';
// import Link from 'next/link';
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import { generateSchemaOrgMarkup } from '@/lib/seo/schemaMarkup';
// import Script from 'next/script';
// import {
//   FaCar,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaMedal,
//   FaQuoteRight,
// } from 'react-icons/fa';
// import {
//   HiOutlineAcademicCap,
//   HiOutlineClock,
//   HiOutlineUserGroup,
//   HiLightningBolt,
// } from 'react-icons/hi';
// import { useRef, useEffect, useState } from 'react';

// // Uwaga: Do komponentów 3D będziesz potrzebował zainstalować:
// // npm install three @react-three/fiber @react-three/drei

// export default function HomePage() {
//   const t = useTranslations('home');
//   const pathname = usePathname();
//   const locale = pathname.split('/')[1] || 'pl';
//   const url = `https://qursant.pl${pathname}`;
//   const mainRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);

//   const { scrollYProgress } = useScroll({
//     target: mainRef,
//     offset: ['start start', 'end start'],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
//   const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.addEventListener('loadeddata', () => {
//         setIsVideoLoaded(true);
//       });
//     }
//   }, []);

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const pulseAnimation = {
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       repeatType: 'reverse',
//     },
//   };

//   return (
//     <>
//       <Script id="schema-org" type="application/ld+json" />

//       {/* Hero section with full screen video and parallax effect */}
//       <section
//         ref={mainRef}
//         className="relative w-full h-screen overflow-hidden"
//       >
//         {/* Full screen video background with overlay */}
//         <div className="absolute inset-0 w-full h-full z-0">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-purple-900/70 z-20"></div>
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(67,56,202,0.4),transparent_50%)] z-10"></div>
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.4),transparent_50%)] z-10"></div>

//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className={`object-cover w-full h-full ${
//               isVideoLoaded ? 'opacity-100' : 'opacity-0'
//             } transition-opacity duration-1000`}
//           >
//             <source src="/public/videos/main_video.mp4" type="video/mp4" />
//           </video>

//           {/* Fallback loading state */}
//           {!isVideoLoaded && (
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 flex items-center justify-center text-white">
//               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
//             </div>
//           )}
//         </div>

//         {/* Hero content */}
//         <motion.div
//           className="relative z-30 flex flex-col items-center justify-center h-full px-6 text-center text-white"
//           style={{ opacity, scale, y }}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1.2 }}
//               className="mb-6"
//             >
//               <motion.div
//                 className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-sm font-medium mb-6"
//                 animate={{
//                   backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
//                 }}
//                 transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
//               >
//                 Nowa era szkoleń kierowców
//               </motion.div>
//             </motion.div>

//             <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
//                 {t('title')}
//               </span>
//               <motion.span
//                 className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-4"
//                 animate={pulseAnimation}
//               >
//                 Kieruj swoją przyszłością
//               </motion.span>
//             </h1>

//             <p className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto">
//               {t('subtitle')}
//             </p>

//             <motion.div
//               className="mt-12 flex flex-wrap items-center justify-center gap-6"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 1, duration: 0.8 }}
//             >
//               <Link
//                 href={`/${locale}/booking`}
//                 className="group relative overflow-hidden rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <span className="relative z-10">{t('startLearning')}</span>
//                 <motion.span
//                   className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 z-0"
//                   initial={{ x: '-100%' }}
//                   whileHover={{ x: '0%' }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </Link>

//               <Link
//                 href={`/${locale}/courses`}
//                 className="group relative overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300"
//               >
//                 <span className="relative z-10">Zobacz kursy</span>
//                 <motion.span
//                   className="absolute inset-0 bg-white/20 z-0"
//                   initial={{ scale: 0, opacity: 0 }}
//                   whileHover={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Scroll down indicator */}
//           <motion.div
//             className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1, y: [0, 10, 0] }}
//             transition={{ delay: 1.5, duration: 1.5, repeat: Infinity }}
//           >
//             <div className="flex flex-col items-center">
//               <span className="text-sm text-white/80 mb-2">Przewiń w dół</span>
//               <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-1">
//                 <motion.div
//                   className="w-1 h-2 bg-white rounded-full"
//                   animate={{ y: [0, 12, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                 />
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Stats section with animated counters */}
//       <section className="relative bg-gradient-to-b from-indigo-900 to-blue-950 py-24 sm:py-32 overflow-hidden">
//         {/* Decorative elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent"></div>

//           {/* Mesh gradient effect */}
//           <div className="absolute inset-0">
//             <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 to-transparent blur-3xl"></div>
//             <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"></div>
//             <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
//           </div>

//           {/* Moving particles - SVG alternative to 3D particles */}
//           <svg
//             className="absolute inset-0 w-full h-full opacity-30"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="smallGrid"
//                 width="50"
//                 height="50"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <motion.circle
//                   cx="25"
//                   cy="25"
//                   r="1.5"
//                   fill="#fff"
//                   animate={{ opacity: [0.4, 1, 0.4] }}
//                   transition={{
//                     duration: 3,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                   }}
//                 />
//               </pattern>
//               <pattern
//                 id="grid"
//                 width="100"
//                 height="100"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <rect width="100" height="100" fill="url(#smallGrid)" />
//                 <motion.circle
//                   cx="50"
//                   cy="50"
//                   r="2"
//                   fill="#fff"
//                   animate={{ opacity: [0.2, 0.8, 0.2] }}
//                   transition={{
//                     duration: 5,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                   }}
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center mb-20"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
//                 Nasza szkoła w liczbach
//               </span>
//             </h2>
//             <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
//           </motion.div>

//           <motion.div
//             className="mx-auto max-w-7xl"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//             variants={staggerContainer}
//           >
//             <dl className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
//               {[
//                 {
//                   icon: <FaUserGraduate />,
//                   value: '1000+',
//                   label: t('stats.students'),
//                   color: 'from-blue-400 to-blue-600',
//                 },
//                 {
//                   icon: <HiOutlineClock />,
//                   value: '15+',
//                   label: t('stats.experience'),
//                   color: 'from-purple-400 to-purple-600',
//                 },
//                 {
//                   icon: <FaChalkboardTeacher />,
//                   value: '10+',
//                   label: t('stats.instructors'),
//                   color: 'from-pink-400 to-pink-600',
//                 },
//                 {
//                   icon: <FaMedal />,
//                   value: '95%',
//                   label: t('stats.passRate'),
//                   color: 'from-yellow-400 to-orange-500',
//                 },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   className="relative group flex flex-col items-center p-8 rounded-2xl backdrop-blur-sm"
//                   variants={fadeInUp}
//                   whileHover={{ scale: 1.05 }}
//                 >
//                   {/* Card gradient background */}
//                   <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300 backdrop-blur-sm"></div>

//                   {/* Glowing background effect */}
//                   <div
//                     className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
//                   ></div>

//                   <div className="relative z-10">
//                     <div
//                       className={`text-4xl bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white mb-5 shadow-lg`}
//                     >
//                       {stat.icon}
//                     </div>
//                     <motion.dt
//                       className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-2`}
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
//                     >
//                       {stat.value}
//                     </motion.dt>
//                     <dd className="text-base text-blue-100">{stat.label}</dd>
//                   </div>
//                 </motion.div>
//               ))}
//             </dl>
//           </motion.div>
//         </div>
//       </section>

//       {/* Why Us section with glassmorphism cards */}
//       <section className="relative bg-gradient-to-b from-blue-950 via-indigo-950 to-purple-950 py-24 sm:py-32 overflow-hidden">
//         {/* Decorative elements */}
//         <div className="absolute inset-0">
//           <div className="absolute left-1/2 top-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent_60%)]"></div>
//           <div className="absolute w-full h-full bg-[conic-gradient(from_270deg_at_40%_60%,rgba(56,189,248,0.1),rgba(232,121,249,0.1),rgba(56,189,248,0.1))]"></div>
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="inline-flex items-center rounded-full px-6 py-2 text-sm font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/20 text-purple-300 backdrop-blur-sm mb-6">
//               <span className="mr-2 text-purple-400">
//                 <HiLightningBolt />
//               </span>
//               {t('whyUs.subtitle')}
//             </span>
//             <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-8">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-blue-300">
//                 {t('whyUs.title')}
//               </span>
//             </h2>
//             <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-8"></div>
//           </motion.div>

//           <motion.div
//             className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none md:grid-cols-2 lg:grid-cols-3"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//             variants={staggerContainer}
//           >
//             {[
//               {
//                 icon: <HiOutlineAcademicCap />,
//                 color: 'from-cyan-500 to-blue-500',
//                 title: t('whyUs.reasons.1.title'),
//                 description: t('whyUs.reasons.1.description'),
//               },
//               {
//                 icon: <HiOutlineClock />,
//                 color: 'from-purple-500 to-pink-500',
//                 title: t('whyUs.reasons.2.title'),
//                 description: t('whyUs.reasons.2.description'),
//               },
//               {
//                 icon: <HiOutlineUserGroup />,
//                 color: 'from-blue-500 to-indigo-600',
//                 title: t('whyUs.reasons.3.title'),
//                 description: t('whyUs.reasons.3.description'),
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="relative group overflow-hidden rounded-2xl p-8 h-full"
//                 variants={fadeInUp}
//                 whileHover={{
//                   y: -10,
//                   transition: { type: 'spring', stiffness: 300 },
//                 }}
//                 transition={{ duration: 0.5 }}
//               >
//                 {/* Glass effect background */}
//                 <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 rounded-2xl transition-all duration-300"></div>

//                 {/* Gradient glow effect */}
//                 <div
//                   className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}
//                 ></div>

//                 {/* Content */}
//                 <div className="relative z-10">
//                   <div
//                     className={`inline-flex items-center justify-center rounded-2xl p-4 bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}
//                   >
//                     <div className="text-3xl">{feature.icon}</div>
//                   </div>

//                   <h3 className="text-xl font-bold text-white mb-4">
//                     {feature.title}
//                   </h3>

//                   <p className="text-gray-300">{feature.description}</p>
//                 </div>

//                 {/* Corner decoration */}
//                 <div
//                   className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300`}
//                 ></div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section with modern design */}
//       <section className="relative overflow-hidden bg-gradient-to-b from-purple-950 to-indigo-950 py-24 sm:py-32">
//         {/* Mesh gradient background */}
//         <div className="absolute inset-0">
//           <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_bottom_right,rgba(79,70,229,0.15),transparent_50%)]"></div>
//         </div>

//         {/* Quote marks background */}
//         <div className="absolute top-10 left-10 text-9xl text-white/5">
//           <FaQuoteRight />
//         </div>
//         <div className="absolute bottom-10 right-10 text-9xl text-white/5">
//           <FaQuoteRight />
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300">
//                 Co mówią nasi kursanci
//               </span>
//             </h2>
//             <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
//           </motion.div>

//           <motion.div
//             className="grid gap-8 md:grid-cols-3"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//             variants={staggerContainer}
//           >
//             {[
//               {
//                 quote:
//                   'Najlepsza szkoła jazdy w mieście! Instruktorzy są profesjonalni i cierpliwi. Zdałem za pierwszym razem!',
//                 author: 'Marek K.',
//                 position: 'Kursant',
//                 bg: 'from-blue-500/10 to-cyan-500/10',
//               },
//               {
//                 quote:
//                   'Świetna atmosfera, nowoczesne podejście do nauki. Polecam każdemu, kto chce szybko i bezstresowo zdobyć prawo jazdy.',
//                 author: 'Anna W.',
//                 position: 'Kursantka',
//                 bg: 'from-purple-500/10 to-pink-500/10',
//               },
//               {
//                 quote:
//                   'Elastyczne terminy zajęć i profesjonalne podejście. Dzięki tej szkole jazdy czuję się pewnie za kierownicą.',
//                 author: 'Tomasz B.',
//                 position: 'Kursant',
//                 bg: 'from-indigo-500/10 to-blue-500/10',
//               },
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="relative group"
//                 variants={fadeInUp}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 {/* Glass card */}
//                 <div
//                   className={`relative overflow-hidden rounded-2xl backdrop-blur-sm bg-gradient-to-br ${testimonial.bg} p-8 border border-white/10 group-hover:border-white/20 transition-all duration-300 h-full`}
//                 >
//                   {/* Quote icon */}
//                   <div className="text-white/10 text-6xl absolute right-4 bottom-4">
//                     <FaQuoteRight />
//                   </div>

//                   {/* Quote content */}
//                   <div className="relative">
//                     <p className="text-gray-200 mb-8">"{testimonial.quote}"</p>

//                     <div className="flex items-center">
//                       {/* Avatar with gradient */}
//                       <div className="relative">
//                         <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
//                           {testimonial.author.charAt(0)}
//                         </div>
//                         <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-sm opacity-70"></div>
//                       </div>

//                       <div className="ml-4">
//                         <h4 className="font-semibold text-white">
//                           {testimonial.author}
//                         </h4>
//                         <p className="text-indigo-200 text-sm">
//                           {testimonial.position}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section with advanced gradient */}
//       <section className="relative py-20 overflow-hidden">
//         {/* Background gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-blue-900 to-indigo-900"></div>

//         {/* Complex background elements */}
//         <div className="absolute inset-0">
//           <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.3),transparent_50%)]"></div>
//           <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-br from-purple-600/30 to-transparent blur-3xl"></div>
//           <div className="absolute bottom-0 left-0 h-64 w-64 bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"></div>
//         </div>

//         {/* Mesh grid */}
//         <div className="absolute inset-0 opacity-20">
//           <svg
//             className="absolute left-0 top-0 w-full h-full"
//             width="100%"
//             height="100%"
//             viewBox="0 0 800 800"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="ctaGrid"
//                 width="80"
//                 height="80"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 80 0 L 0 0 0 80"
//                   fill="none"
//                   stroke="rgba(255,255,255,0.2)"
//                   strokeWidth="1"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#ctaGrid)" />
//           </svg>
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-3xl text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-4xl font-bold sm:text-5xl mb-6 text-white">
//               Gotowy, by rozpocząć swoją
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 mx-2">
//                 przygodę
//               </span>
//               z prawem jazdy?
//             </h2>

//             <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
//               Zarejestruj się już dziś i zacznij swoją drogę do niezależności na
//               drodze!
//             </p>

//             <motion.div
//               className="flex flex-wrap justify-center gap-6"
//               whileInView={{ opacity: 1, y: 0 }}
//               initial={{ opacity: 0, y: 20 }}
//               transition={{ delay: 0.3, duration: 0.8 }}
//               viewport={{ once: true }}
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <Link
//                   href={`/${locale}/contact`}
//                   className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg"
//                 >
//                   {/* Multi-layer button styling */}

//                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500"></span>
//                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
//                   <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-orange-500"></span>
//                   <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></span>
//                   <span className="relative flex items-center">
//                     Skontaktuj się z nami
//                     <svg
//                       className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </span>
//                 </Link>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: 'spring', stiffness: 300 }}
//               >
//                 <Link
//                   href={`/${locale}/packages`}
//                   className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white rounded-full shadow-lg"
//                 >
//                   <span className="absolute inset-0 w-full h-full bg-white/10 backdrop-blur-sm border border-white/20 group-hover:border-white/40 transition-all duration-300"></span>
//                   <span className="relative flex items-center">
//                     Pakiety szkoleniowe
//                     <svg
//                       className="w-5 h-5 ml-2 -mr-1 transition-transform duration-300 group-hover:translate-x-1"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M14 5l7 7m0 0l-7 7m7-7H3"
//                       />
//                     </svg>
//                   </span>
//                 </Link>
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Floating badges */}
//           <motion.div
//             className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//           >
//             {[
//               'Doświadczeni instruktorzy',
//               'Nowoczesna flota',
//               'Elastyczne terminy',
//               'Przyjazna atmosfera',
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//                 variants={fadeInUp}
//                 whileHover={{
//                   scale: 1.03,
//                   backgroundColor: 'rgba(255,255,255,0.1)',
//                 }}
//               >
//                 <svg
//                   className="w-5 h-5 text-blue-300 mr-2"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M5 13l4 4L19 7"
//                   />
//                 </svg>
//                 <span className="text-sm text-blue-100">{feature}</span>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }
