// 'use client';

// import { useTranslations } from 'next-intl';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { usePathname } from 'next/navigation';
// import { generateSchemaOrgMarkup } from '@/lib/seo/schemaMarkup';
// import Script from 'next/script';
// import {
//   FaCar,
//   FaUserGraduate,
//   FaChalkboardTeacher,
//   FaMedal,
// } from 'react-icons/fa';
// import {
//   HiOutlineAcademicCap,
//   HiOutlineClock,
//   HiOutlineUserGroup,
// } from 'react-icons/hi';

// export default function HomePage() {
//   const t = useTranslations('home');
//   const pathname = usePathname();
//   const locale = pathname.split('/')[1] || 'pl';
//   const url = `https://qursant.pl${pathname}`;

//   const schemaMarkup = generateSchemaOrgMarkup({
//     locale: locale as 'pl' | 'en' | 'uk',
//     url,
//   });

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
//         staggerChildren: 0.2,
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
//       <Script
//         id="schema-org"
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
//       />

//       {/* Hero section with parallax effect */}
//       <section className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-28 sm:py-36">
//         {/* Background animated elements */}
//         <div className="absolute inset-0 z-0">
//           <motion.div
//             className="absolute right-0 bottom-0 w-72 h-72 bg-white/5 rounded-full"
//             animate={{
//               x: [50, -10, 50],
//               y: [20, -30, 20],
//             }}
//             transition={{
//               duration: 15,
//               repeat: Infinity,
//               repeatType: 'reverse',
//             }}
//           />
//           <motion.div
//             className="absolute left-1/4 top-1/4 w-56 h-56 bg-blue-500/10 rounded-full"
//             animate={{
//               x: [-50, 20, -50],
//               y: [0, 50, 0],
//             }}
//             transition={{
//               duration: 18,
//               repeat: Infinity,
//               repeatType: 'reverse',
//             }}
//           />
//           <motion.div
//             className="absolute left-10 bottom-1/4 w-32 h-32 bg-indigo-400/10 rounded-full"
//             animate={{
//               x: [10, 40, 10],
//               y: [30, -20, 30],
//             }}
//             transition={{
//               duration: 12,
//               repeat: Infinity,
//               repeatType: 'reverse',
//             }}
//           />
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-3xl text-center"
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             transition={{ duration: 0.8 }}
//           >
//             <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
//               {t('title')}
//               <motion.span
//                 className="block text-yellow-300 mt-2"
//                 animate={pulseAnimation}
//               >
//                 Kieruj swoją przyszłością
//               </motion.span>
//             </h1>
//             <p className="mt-6 text-xl leading-8 text-blue-100">
//               {t('subtitle')}
//             </p>
//             <p className="mt-4 text-lg text-blue-200">{t('description')}</p>
//             <motion.div
//               className="mt-12 flex items-center justify-center gap-x-6"
//               whileHover={{ scale: 1.05 }}
//             >
//               <Link
//                 href={`/${locale}/booking`}
//                 className="group relative overflow-hidden rounded-full bg-yellow-500 px-8 py-4 text-lg font-semibold text-gray-900 shadow-lg hover:bg-yellow-400 transition-colors duration-300"
//               >
//                 <span className="relative z-10">{t('startLearning')}</span>
//                 <motion.span
//                   className="absolute inset-0 bg-yellow-400 z-0"
//                   initial={{ x: '-100%' }}
//                   whileHover={{ x: '0%' }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </Link>
//               <Link
//                 href={`/${locale}/courses`}
//                 className="text-lg font-semibold text-white hover:text-yellow-300 transition-colors duration-300 underline decoration-2 underline-offset-4 decoration-transparent hover:decoration-yellow-300"
//               >
//                 Zobacz kursy
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Floating car animation */}
//           <motion.div
//             className="hidden md:block absolute -right-20 top-1/2 transform -translate-y-1/2"
//             initial={{ x: 100, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ duration: 1, delay: 0.5 }}
//           >
//             <motion.div
//               animate={{
//                 y: [0, -15, 0],
//                 rotate: [0, 2, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 repeatType: 'reverse',
//               }}
//               className="relative"
//             >
//               <div className="absolute -bottom-5 w-40 h-3 bg-black/20 blur-lg rounded-full mx-auto"></div>
//               <div className="text-8xl text-yellow-400">
//                 <FaCar />
//               </div>
//             </motion.div>
//           </motion.div>

//           {/* Stats with counter animation */}
//           <motion.div
//             className="mx-auto mt-20 max-w-5xl lg:mt-24"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: '-100px' }}
//             variants={staggerContainer}
//           >
//             <dl className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 text-center">
//               {[
//                 {
//                   icon: <FaUserGraduate />,
//                   value: '1000+',
//                   label: t('stats.students'),
//                 },
//                 {
//                   icon: <HiOutlineClock />,
//                   value: '15+',
//                   label: t('stats.experience'),
//                 },
//                 {
//                   icon: <FaChalkboardTeacher />,
//                   value: '10+',
//                   label: t('stats.instructors'),
//                 },
//                 { icon: <FaMedal />, value: '95%', label: t('stats.passRate') },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   className="flex flex-col items-center p-4 rounded-xl bg-white/10 backdrop-blur-sm"
//                   variants={fadeInUp}
//                   whileHover={{
//                     scale: 1.05,
//                     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                   }}
//                 >
//                   <div className="text-3xl text-yellow-400 mb-3">
//                     {stat.icon}
//                   </div>
//                   <dt className="text-4xl font-bold text-white mb-1">
//                     {stat.value}
//                   </dt>
//                   <dd className="text-sm text-blue-100">{stat.label}</dd>
//                 </motion.div>
//               ))}
//             </dl>
//           </motion.div>
//         </div>
//       </section>

//       {/* Why Us section with interactive cards */}
//       <section className="bg-white dark:bg-gray-900 py-24 sm:py-32">
//         <div className="mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <span className="inline-block px-4 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-6 dark:bg-blue-900 dark:text-blue-300">
//               {t('whyUs.subtitle')}
//             </span>
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
//               {t('whyUs.title')}
//             </h2>
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
//                 color: 'bg-green-500',
//                 title: t('whyUs.reasons.1.title'),
//                 description: t('whyUs.reasons.1.description'),
//               },
//               {
//                 icon: <HiOutlineClock />,
//                 color: 'bg-purple-500',
//                 title: t('whyUs.reasons.2.title'),
//                 description: t('whyUs.reasons.2.description'),
//               },
//               {
//                 icon: <HiOutlineUserGroup />,
//                 color: 'bg-blue-500',
//                 title: t('whyUs.reasons.3.title'),
//                 description: t('whyUs.reasons.3.description'),
//               },
//             ].map((feature, index) => (
//               <motion.div
//                 key={index}
//                 className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 h-full"
//                 variants={fadeInUp}
//                 whileHover={{
//                   y: -10,
//                   boxShadow:
//                     '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
//                 }}
//               >
//                 <div
//                   className={`absolute -right-6 -top-6 w-20 h-20 rounded-full opacity-10 ${feature.color}`}
//                 ></div>
//                 <div
//                   className={`inline-flex items-center justify-center rounded-xl p-3 mb-5 ${feature.color} text-white`}
//                 >
//                   <div className="text-2xl">{feature.icon}</div>
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {feature.description}
//                 </p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
//         <div className="absolute inset-0 opacity-30">
//           <svg
//             className="absolute right-0 top-0 w-full h-full"
//             width="100%"
//             height="100%"
//             viewBox="0 0 800 800"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <defs>
//               <pattern
//                 id="grid"
//                 width="50"
//                 height="50"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <circle
//                   cx="1"
//                   cy="1"
//                   r="1"
//                   fill="currentColor"
//                   className="text-gray-400 dark:text-gray-500"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center mb-16"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
//               Co mówią nasi kursanci
//             </h2>
//             <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
//               Sprawdź opinie osób, które zdobyły prawo jazdy z naszą pomocą
//             </p>
//           </motion.div>

//           <motion.div
//             className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
//               },
//               {
//                 quote:
//                   'Świetna atmosfera, nowoczesne podejście do nauki. Polecam każdemu, kto chce szybko i bezstresowo zdobyć prawo jazdy.',
//                 author: 'Anna W.',
//                 position: 'Kursantka',
//               },
//               {
//                 quote:
//                   'Elastyczne terminy zajęć i profesjonalne podejście. Dzięki tej szkole jazdy czuję się pewnie za kierownicą.',
//                 author: 'Tomasz B.',
//                 position: 'Kursant',
//               },
//             ].map((testimonial, index) => (
//               <motion.div
//                 key={index}
//                 className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700"
//                 variants={fadeInUp}
//                 whileHover={{ scale: 1.03 }}
//               >
//                 <div className="text-blue-500 text-4xl opacity-20 mb-4">"</div>
//                 <p className="text-gray-700 dark:text-gray-300 mb-6">
//                   {testimonial.quote}
//                 </p>
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
//                     {testimonial.author.charAt(0)}
//                   </div>
//                   <div className="ml-4">
//                     <h4 className="font-semibold text-gray-900 dark:text-white">
//                       {testimonial.author}
//                     </h4>
//                     <p className="text-gray-500 dark:text-gray-400 text-sm">
//                       {testimonial.position}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="relative bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-16">
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div
//             className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-blue-500/20"
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.3, 0.2, 0.3],
//             }}
//             transition={{
//               duration: 8,
//               repeat: Infinity,
//               repeatType: 'reverse',
//             }}
//           />
//           <motion.div
//             className="absolute top-10 -left-10 w-32 h-32 rounded-full bg-indigo-500/20"
//             animate={{
//               scale: [1, 1.3, 1],
//               opacity: [0.2, 0.1, 0.2],
//             }}
//             transition={{
//               duration: 10,
//               repeat: Infinity,
//               repeatType: 'reverse',
//             }}
//           />
//         </div>
//         <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
//           <motion.div
//             className="mx-auto max-w-2xl text-center"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <h2 className="text-3xl font-bold sm:text-4xl mb-4">
//               Gotowy, by rozpocząć swoją przygodę z prawem jazdy?
//             </h2>
//             <p className="text-lg text-blue-200 mb-8">
//               Zarejestruj się już dziś i zacznij swoją drogę do niezależności!
//             </p>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Link
//                 href={`/${locale}/contact`}
//                 className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-900 bg-white rounded-full shadow-lg hover:bg-yellow-100 transition-colors duration-300"
//               >
//                 Skontaktuj się z nami
//               </Link>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// }
