// 'use client';

// import { useTranslations } from 'next-intl';
// import Link from 'next/link';
// import {
//   motion,
//   useScroll,
//   useTransform,
//   AnimatePresence,
// } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import { generateSchemaOrgMarkup } from '@/lib/seo/schemaMarkup';
// import Script from 'next/script';
// import {
//   FaCar,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaMedal,
//   FaQuoteRight,
//   FaRoad,
//   FaShieldAlt,
//   FaRegLightbulb,
//   FaRegClock,
// } from 'react-icons/fa';
// import {
//   HiOutlineAcademicCap,
//   HiOutlineClock,
//   HiOutlineUserGroup,
//   HiLightningBolt,
//   HiOutlineCheckCircle,
//   HiOutlineTrendingUp,
//   HiOutlineKey,
//   HiOutlineSparkles,
// } from 'react-icons/hi';
// import { useRef, useEffect, useState } from 'react';
// import Image from 'next/image';

// export default function HomePage() {
//   const t = useTranslations('home');
//   const pathname = usePathname();
//   const locale = pathname.split('/')[1] || 'pl';
//   const url = `https://qursant.pl${pathname}`;
//   const mainRef = useRef(null);
//   const videoRef = useRef(null);
//   const [isVideoLoaded, setIsVideoLoaded] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const galleryImages = [
//     '/images/gallery/3s.jpg',
//     '/images/gallery/4s.jpg',
//     '/images/gallery/6s.jpg',
//     '/images/gallery/7s.jpg',
//     '/images/gallery/8s.jpg',
//   ];

//   const { scrollYProgress } = useScroll({
//     target: mainRef,
//     offset: ['start start', 'end start'],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
//   const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
//   const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

//   useEffect(() => {
//     if (videoRef.current) {
//       const handleVideoLoaded = () => {
//         setIsVideoLoaded(true);
//       };

//       videoRef.current.addEventListener('loadeddata', handleVideoLoaded);

//       // Fallback if video is taking too long to load
//       const timer = setTimeout(() => {
//         if (!isVideoLoaded) setIsVideoLoaded(true);
//       }, 3000);

//       return () => {
//         if (videoRef.current) {
//           videoRef.current.removeEventListener('loadeddata', handleVideoLoaded);
//         }
//         clearTimeout(timer);
//       };
//     }
//   }, []);

//   // Gallery auto-rotation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) =>
//         prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
//       );
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const schemaMarkup = generateSchemaOrgMarkup({
//     locale: locale as 'pl' | 'en' | 'uk',
//     url,
//   });

//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0 },
//   };

//   const fadeInLeft = {
//     hidden: { opacity: 0, x: -60 },
//     visible: { opacity: 1, x: 0 },
//   };

//   const fadeInRight = {
//     hidden: { opacity: 0, x: 60 },
//     visible: { opacity: 1, x: 0 },
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

//   const slideInFromBottom = {
//     hidden: { y: 100, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         bounce: 0.4,
//         duration: 0.8,
//       },
//     },
//   };

//   return (
//     <>
//       <Script
//         id="schema-org"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
//       />

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

//           {/* Animated gradient lines */}
//           <motion.div
//             className="absolute inset-0 opacity-20 z-5"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.2 }}
//             transition={{ duration: 2 }}
//           >
//             <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
//             <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent"></div>
//             <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>

//             <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
//             <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
//             <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
//           </motion.div>

//           {/* Video with proper path */}
//           <video
//             ref={videoRef}
//             autoPlay
//             muted
//             loop
//             playsInline
//             className={`object-cover w-full h-full transform translate-y-20 ${
//               isVideoLoaded ? 'opacity-100' : 'opacity-0'
//             } transition-opacity duration-1000`}
//           >
//             <source src="/videos/main_video.mp4" type="video/mp4" />
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
//               <motion.span
//                 className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//               >
//                 {t('title')}
//               </motion.span>
//               <motion.span
//                 className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mt-4"
//                 animate={pulseAnimation}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.5 }}
//               >
//                 Kieruj swoją przyszłością
//               </motion.span>
//             </h1>

//             <motion.p
//               className="mt-6 text-xl leading-8 text-blue-100 max-w-2xl mx-auto"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.7 }}
//             >
//               {t('subtitle')}
//             </motion.p>

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

//       {/* Features Section (Replacing 3D Car Section) */}
//       <section className="relative bg-gradient-to-b from-indigo-900 to-blue-950 py-24">
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.2),transparent_60%)]"></div>

//           {/* Floating particles */}
//           <div className="absolute inset-0 overflow-hidden">
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute rounded-full bg-white/20"
//                 style={{
//                   width: Math.random() * 6 + 2,
//                   height: Math.random() * 6 + 2,
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   y: [0, -(Math.random() * 150 + 50)],
//                   opacity: [0, 0.8, 0],
//                 }}
//                 transition={{
//                   duration: Math.random() * 10 + 15,
//                   repeat: Infinity,
//                   delay: Math.random() * 5,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//         <div className="container mx-auto px-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-12"
//           >
//             <h2 className="text-4xl font-bold text-white mb-4">
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-indigo-100">
//                 Nowoczesna flota
//               </span>
//             </h2>
//             <p className="text-blue-200 max-w-2xl mx-auto">
//               Ucz się prowadzić na najnowszych modelach pojazdów wyposażonych w
//               zaawansowane systemy bezpieczeństwa
//             </p>

//             {/* Decorative underline */}
//             <div className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
//           </motion.div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             {/* Image gallery carousel */}
//             <motion.div
//               className="relative h-[400px] rounded-2xl overflow-hidden"
//               initial={{ opacity: 0, x: -50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-2xl overflow-hidden backdrop-blur-sm border border-indigo-500/30">
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={currentImageIndex}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.7 }}
//                     className="absolute inset-0"
//                   >
//                     <Image
//                       src={galleryImages[currentImageIndex]}
//                       alt={`Car image ${currentImageIndex + 1}`}
//                       fill
//                       className="object-cover"
//                     />
//                   </motion.div>
//                 </AnimatePresence>

//                 {/* Image navigation dots */}
//                 <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                   {galleryImages.map((_, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentImageIndex(index)}
//                       className={`w-3 h-3 rounded-full ${
//                         currentImageIndex === index
//                           ? 'bg-white'
//                           : 'bg-white/40 hover:bg-white/60'
//                       } transition-all duration-300`}
//                       aria-label={`Show image ${index + 1}`}
//                     />
//                   ))}
//                 </div>

//                 {/* Gradient overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/70 via-transparent to-transparent"></div>
//               </div>
//             </motion.div>

//             {/* Car Features */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="space-y-6">
//                 {[
//                   {
//                     title: 'Bezpieczna nauka',
//                     description:
//                       'Wszystkie nasze pojazdy są wyposażone w systemy wspomagające naukę jazdy',
//                     icon: <FaShieldAlt className="text-blue-400" />,
//                     color: 'from-blue-400 to-cyan-400',
//                   },
//                   {
//                     title: 'Komfortowe wnętrze',
//                     description:
//                       'Klimatyzowane pojazdy zapewniające komfort podczas każdej lekcji',
//                     icon: <FaCar className="text-purple-400" />,
//                     color: 'from-purple-400 to-indigo-400',
//                   },
//                   {
//                     title: 'Podwójne sterowanie',
//                     description:
//                       'Instruktor zawsze może przejąć kontrolę w sytuacji zagrożenia',
//                     icon: <FaRoad className="text-pink-400" />,
//                     color: 'from-pink-400 to-rose-400',
//                   },
//                 ].map((feature, index) => (
//                   <motion.div
//                     key={index}
//                     className="flex p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     whileHover={{
//                       scale: 1.02,
//                       backgroundColor: 'rgba(255,255,255,0.1)',
//                     }}
//                   >
//                     <div className="flex-shrink-0 mr-4">
//                       <div
//                         className={`w-12 h-12 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
//                       >
//                         <div className="text-2xl text-white">
//                           {feature.icon}
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-white mb-1">
//                         {feature.title}
//                       </h3>
//                       <p className="text-blue-200">{feature.description}</p>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Stats section with animated counters */}
//       <section className="relative bg-gradient-to-b from-blue-950 to-indigo-950 py-24 sm:py-32 overflow-hidden">
//         {/* Decorative elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/20 to-transparent"></div>

//           {/* Mesh gradient effect */}
//           <div className="absolute inset-0">
//             <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-600/30 to-transparent blur-3xl"></div>
//             <div className="absolute top-40 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl"></div>
//             <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-transparent blur-3xl"></div>
//           </div>

//           {/* Moving dots grid */}
//           <div className="absolute inset-0">
//             {[...Array(100)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute rounded-full bg-white/30"
//                 style={{
//                   width: Math.random() * 3 + 1,
//                   height: Math.random() * 3 + 1,
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                 }}
//                 animate={{
//                   opacity: [0.2, 0.8, 0.2],
//                 }}
//                 transition={{
//                   duration: Math.random() * 3 + 2,
//                   repeat: Infinity,
//                   repeatType: 'reverse',
//                   delay: Math.random() * 2,
//                 }}
//               />
//             ))}
//           </div>
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
//     </>
//   );
// }
