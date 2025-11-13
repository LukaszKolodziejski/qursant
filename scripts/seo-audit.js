#!/usr/bin/env node

/**
 * 🔍 SEO AUDIT TOOL - Qursant
 *
 * Kompleksowa analiza SEO dla Next.js App Router
 *
 * Użycie:
 *   npm run seo              - Pełny audit
 *   npm run seo -- --url     - Audit live URL
 *   npm run seo -- --files   - Audit lokalnych plików
 */

const fs = require('fs');
const path = require('path');

// ===================================================================
// KONFIGURACJA
// ===================================================================

const CONFIG = {
  baseUrl: 'https://www.qursant.com.pl',
  appDir: path.join(process.cwd(), 'apps', 'qursant', 'src', 'app'),
  publicDir: path.join(process.cwd(), 'apps', 'qursant', 'public'),
  dataDir: path.join(process.cwd(), 'apps', 'qursant', 'data'),
};

// ===================================================================
// WYNIKI AUDYTU
// ===================================================================

const results = {
  score: 0,
  maxScore: 0,
  checks: [],
  warnings: [],
  errors: [],
  suggestions: [],
};

// ===================================================================
// HELPER FUNCTIONS
// ===================================================================

function addCheck(category, name, passed, points, message, suggestion = null) {
  results.maxScore += points;
  if (passed) {
    results.score += points;
  }

  results.checks.push({
    category,
    name,
    passed,
    points,
    message,
    suggestion: passed ? null : suggestion,
  });

  if (!passed && suggestion) {
    results.suggestions.push(`${category} - ${name}: ${suggestion}`);
  }
}

function addWarning(message) {
  results.warnings.push(message);
}

function addError(message) {
  results.errors.push(message);
}

function findFiles(dir, pattern, results = []) {
  if (!fs.existsSync(dir)) return results;

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      findFiles(fullPath, pattern, results);
    } else if (pattern.test(file.name)) {
      results.push(fullPath);
    }
  }

  return results;
}

// ===================================================================
// AUDYT 1: STRUKTURA PLIKÓW
// ===================================================================

function auditFileStructure() {
  console.log('\n🔍 Audyt 1/10: Struktura plików...');

  // Sprawdź czy istnieją kluczowe pliki
  const criticalFiles = [
    {
      path: 'apps/qursant/src/app/layout.tsx',
      points: 10,
      name: 'Root Layout',
    },
    { path: 'apps/qursant/src/app/page.tsx', points: 10, name: 'Homepage' },
    { path: 'apps/qursant/public/robots.txt', points: 5, name: 'robots.txt' },
    { path: 'apps/qursant/src/app/sitemap.ts', points: 10, name: 'Sitemap' },
    {
      path: 'apps/qursant/public/manifest.json',
      points: 3,
      name: 'PWA Manifest',
    },
  ];

  criticalFiles.forEach(({ path: filePath, points, name }) => {
    const fullPath = path.join(process.cwd(), filePath);
    const exists = fs.existsSync(fullPath);

    addCheck(
      'Struktura',
      name,
      exists,
      points,
      exists ? `✅ ${name} istnieje` : `❌ Brak ${name}`,
      exists ? null : `Utwórz plik ${filePath}`
    );
  });
}

// ===================================================================
// AUDYT 2: METADATA
// ===================================================================

function auditMetadata() {
  console.log('🔍 Audyt 2/10: Metadata...');

  const pages = findFiles(CONFIG.appDir, /page\.tsx?$/);

  let pagesWithMetadata = 0;
  let totalPages = pages.length;

  pages.forEach((pagePath) => {
    const pageContent = fs.readFileSync(pagePath, 'utf-8');

    // Sprawdź czy page.tsx ma metadata
    let hasMetadata =
      /export\s+(const\s+)?metadata/.test(pageContent) ||
      /generateMetadata/.test(pageContent);

    // Jeśli nie ma w page.tsx, sprawdź layout.tsx w tym samym folderze
    if (!hasMetadata) {
      const layoutPath = pagePath.replace(/page\.tsx?$/, 'layout.tsx');
      if (fs.existsSync(layoutPath)) {
        const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
        hasMetadata =
          /export\s+(const\s+)?metadata/.test(layoutContent) ||
          /generateMetadata/.test(layoutContent);
      }
    }

    if (hasMetadata) pagesWithMetadata++;
  });

  const percentage = (pagesWithMetadata / totalPages) * 100;

  addCheck(
    'Metadata',
    'Pages with Metadata',
    percentage >= 80,
    15,
    `${pagesWithMetadata}/${totalPages} stron ma metadata (${percentage.toFixed(
      0
    )}%)`,
    percentage < 80
      ? `Dodaj metadata do pozostałych ${totalPages - pagesWithMetadata} stron`
      : null
  );
}

// ===================================================================
// AUDYT 3: SCHEMA.ORG (JSON-LD)
// ===================================================================

function auditSchemaOrg() {
  console.log('🔍 Audyt 3/10: Schema.org (JSON-LD)...');

  const pages = findFiles(CONFIG.appDir, /page\.tsx?$|layout\.tsx?$/);

  const schemaTypes = new Set();
  let filesWithSchema = 0;

  pages.forEach((pagePath) => {
    const content = fs.readFileSync(pagePath, 'utf-8');

    // Szukaj JSON-LD
    if (/@type['"]?\s*:\s*['"](\w+)/.test(content)) {
      filesWithSchema++;

      const matches = content.matchAll(/@type['"]?\s*:\s*['"]([\w]+)['"]/g);
      for (const match of matches) {
        schemaTypes.add(match[1]);
      }
    }
  });

  const commonSchemas = [
    'Organization',
    'LocalBusiness',
    'BlogPosting',
    'FAQPage',
    'BreadcrumbList',
  ];
  const hasCommonSchemas = commonSchemas.filter((type) =>
    schemaTypes.has(type)
  );

  addCheck(
    'Schema.org',
    'JSON-LD Implementation',
    filesWithSchema > 0,
    15,
    `${filesWithSchema} plików ze Schema.org (${
      schemaTypes.size
    } typów: ${Array.from(schemaTypes).join(', ')})`,
    filesWithSchema === 0
      ? 'Dodaj Schema.org JSON-LD do kluczowych stron'
      : null
  );

  addCheck(
    'Schema.org',
    'Common Schema Types',
    hasCommonSchemas.length >= 3,
    10,
    `${hasCommonSchemas.length}/5 podstawowych typów: ${hasCommonSchemas.join(
      ', '
    )}`,
    hasCommonSchemas.length < 3
      ? `Dodaj: ${commonSchemas.filter((t) => !schemaTypes.has(t)).join(', ')}`
      : null
  );
}

// ===================================================================
// AUDYT 4: OBRAZY
// ===================================================================

function auditImages() {
  console.log('🔍 Audyt 4/10: Optymalizacja obrazów...');

  const imageFiles = findFiles(
    CONFIG.publicDir,
    /\.(jpg|jpeg|png|gif|webp|avif)$/i
  );

  const stats = {
    total: imageFiles.length,
    webp: 0,
    avif: 0,
    jpg: 0,
    png: 0,
    totalSize: 0,
  };

  imageFiles.forEach((imgPath) => {
    const ext = path.extname(imgPath).toLowerCase();
    const size = fs.statSync(imgPath).size;

    stats.totalSize += size;

    if (ext === '.webp') stats.webp++;
    else if (ext === '.avif') stats.avif++;
    else if (['.jpg', '.jpeg'].includes(ext)) stats.jpg++;
    else if (ext === '.png') stats.png++;
  });

  const modernFormats = stats.webp + stats.avif;
  const modernPercentage = (modernFormats / stats.total) * 100;

  addCheck(
    'Obrazy',
    'Modern Formats (WebP/AVIF)',
    modernPercentage >= 80,
    10,
    `${modernFormats}/${
      stats.total
    } obrazów w nowoczesnych formatach (${modernPercentage.toFixed(0)}%)`,
    modernPercentage < 80
      ? `Konwertuj ${stats.jpg + stats.png} obrazów JPG/PNG na WebP`
      : null
  );

  const avgSize = stats.totalSize / stats.total / 1024;

  addCheck(
    'Obrazy',
    'Average Image Size',
    avgSize < 200,
    5,
    `Średni rozmiar: ${avgSize.toFixed(0)} KB`,
    avgSize >= 200 ? 'Optymalizuj duże obrazy (kompresja, resize)' : null
  );
}

// ===================================================================
// AUDYT 5: SITEMAP & ROBOTS
// ===================================================================

function auditSitemapRobots() {
  console.log('🔍 Audyt 5/10: Sitemap & Robots.txt...');

  // Sprawdź sitemap
  const sitemapPath = path.join(CONFIG.appDir, 'sitemap.ts');
  const hasSitemap = fs.existsSync(sitemapPath);

  if (hasSitemap) {
    const content = fs.readFileSync(sitemapPath, 'utf-8');
    const isDynamic = /force-dynamic|revalidate.*0/.test(content);

    addCheck(
      'Sitemap',
      'Dynamic Sitemap',
      isDynamic,
      10,
      isDynamic
        ? '✅ Sitemap dynamiczny (auto-update)'
        : '⚠️ Sitemap statyczny',
      !isDynamic ? "Dodaj export const dynamic = 'force-dynamic'" : null
    );
  }

  // Sprawdź robots.txt
  const robotsPath = path.join(CONFIG.publicDir, 'robots.txt');
  const hasRobots = fs.existsSync(robotsPath);

  if (hasRobots) {
    const content = fs.readFileSync(robotsPath, 'utf-8');
    const hasSitemapRef = content.includes('Sitemap:');

    addCheck(
      'Robots',
      'Sitemap Reference',
      hasSitemapRef,
      5,
      hasSitemapRef
        ? '✅ robots.txt zawiera link do sitemap'
        : '⚠️ Brak linku do sitemap',
      !hasSitemapRef
        ? 'Dodaj linię: Sitemap: https://www.qursant.com.pl/sitemap.xml'
        : null
    );
  }
}

// ===================================================================
// AUDYT 6: BLOG & CONTENT
// ===================================================================

function auditContent() {
  console.log('🔍 Audyt 6/10: Treść i blog...');

  // Sprawdź blog
  const blogWeeks = findFiles(CONFIG.dataDir, /week-\d+\.json$/);

  addCheck(
    'Content',
    'Blog Posts',
    blogWeeks.length > 0,
    5,
    `${blogWeeks.length} tygodni blogów (~${blogWeeks.length * 7} postów)`,
    blogWeeks.length === 0 ? 'Utwórz content blogowy (npm run blog 1)' : null
  );

  // Sprawdź czy blog ma meta
  const blogPagePath = path.join(CONFIG.appDir, 'blog', 'page.tsx');
  if (fs.existsSync(blogPagePath)) {
    const content = fs.readFileSync(blogPagePath, 'utf-8');
    const hasMetadata = /metadata|generateMetadata/.test(content);

    addCheck(
      'Content',
      'Blog SEO',
      hasMetadata,
      5,
      hasMetadata ? '✅ Blog ma metadata' : '❌ Blog bez metadata',
      !hasMetadata ? 'Dodaj generateMetadata do blog/page.tsx' : null
    );
  }
}

// ===================================================================
// AUDYT 7: PERFORMANCE
// ===================================================================

function auditPerformance() {
  console.log('🔍 Audyt 7/10: Performance hints...');

  // Sprawdź lazy loading
  const pages = findFiles(CONFIG.appDir, /page\.tsx?$/);
  let pagesWithLazyLoad = 0;

  pages.forEach((pagePath) => {
    const content = fs.readFileSync(pagePath, 'utf-8');
    if (/dynamic\(/.test(content)) {
      pagesWithLazyLoad++;
    }
  });

  addCheck(
    'Performance',
    'Lazy Loading',
    pagesWithLazyLoad > 0,
    5,
    `${pagesWithLazyLoad} stron używa lazy loading`,
    pagesWithLazyLoad === 0
      ? 'Dodaj dynamic import dla ciężkich komponentów'
      : null
  );

  // Sprawdź Image component
  const components = findFiles(
    path.join(process.cwd(), 'apps', 'qursant', 'src', 'components'),
    /\.tsx?$/
  );
  let imagesOptimized = 0;
  let totalImages = 0;

  components.forEach((compPath) => {
    const content = fs.readFileSync(compPath, 'utf-8');
    const nextImages = (content.match(/from ['"]next\/image['"]/g) || [])
      .length;
    const htmlImages = (content.match(/<img/g) || []).length;

    imagesOptimized += nextImages;
    totalImages += nextImages + htmlImages;
  });

  const imgPercentage =
    totalImages > 0 ? (imagesOptimized / totalImages) * 100 : 100;

  addCheck(
    'Performance',
    'Next.js Image Component',
    imgPercentage >= 90,
    5,
    `${imagesOptimized}/${totalImages} obrazów używa <Image> (${imgPercentage.toFixed(
      0
    )}%)`,
    imgPercentage < 90
      ? `Zamień <img> na <Image> w ${totalImages - imagesOptimized} miejscach`
      : null
  );
}

// ===================================================================
// AUDYT 8: ACCESSIBILITY
// ===================================================================

function auditAccessibility() {
  console.log('🔍 Audyt 8/10: Accessibility...');

  // Sprawdź alt tags
  const components = findFiles(
    path.join(process.cwd(), 'apps', 'qursant', 'src'),
    /\.tsx?$/
  );
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;

  components.forEach((compPath) => {
    const content = fs.readFileSync(compPath, 'utf-8');

    // Szukaj <Image> i <img> z/bez alt
    const imagesMatches = content.matchAll(/<(Image|img)[^>]*>/g);

    for (const match of imagesMatches) {
      if (/alt\s*=/.test(match[0])) {
        imagesWithAlt++;
      } else {
        imagesWithoutAlt++;
      }
    }
  });

  const totalImgs = imagesWithAlt + imagesWithoutAlt;
  const altPercentage = totalImgs > 0 ? (imagesWithAlt / totalImgs) * 100 : 100;

  addCheck(
    'Accessibility',
    'Image Alt Tags',
    altPercentage >= 95,
    5,
    `${imagesWithAlt}/${totalImgs} obrazów ma alt (${altPercentage.toFixed(
      0
    )}%)`,
    altPercentage < 95 ? `Dodaj alt do ${imagesWithoutAlt} obrazów` : null
  );
}

// ===================================================================
// AUDYT 9: MOBILE-FIRST
// ===================================================================

function auditMobile() {
  console.log('🔍 Audyt 9/10: Mobile-First...');

  // Sprawdź viewport meta
  const layoutPath = path.join(CONFIG.appDir, 'layout.tsx');
  if (fs.existsSync(layoutPath)) {
    const content = fs.readFileSync(layoutPath, 'utf-8');
    const hasViewport = /viewport/i.test(content);

    addCheck(
      'Mobile',
      'Viewport Configuration',
      hasViewport,
      5,
      hasViewport ? '✅ Viewport skonfigurowany' : '❌ Brak viewport',
      !hasViewport ? 'Dodaj export const viewport w layout.tsx' : null
    );
  }

  // Sprawdź responsive classes
  const components = findFiles(
    path.join(process.cwd(), 'apps', 'qursant', 'src'),
    /\.tsx?$/
  );
  let responsiveComponents = 0;

  components.forEach((compPath) => {
    const content = fs.readFileSync(compPath, 'utf-8');
    if (/className=["'][^"']*\b(sm:|md:|lg:|xl:)/.test(content)) {
      responsiveComponents++;
    }
  });

  addCheck(
    'Mobile',
    'Responsive Design',
    responsiveComponents > 10,
    5,
    `${responsiveComponents} komponentów używa responsive classes`,
    responsiveComponents <= 10 ? 'Dodaj więcej responsive breakpoints' : null
  );
}

// ===================================================================
// AUDYT 10: SECURITY
// ===================================================================

function auditSecurity() {
  console.log('🔍 Audyt 10/10: Security...');

  // Sprawdź HTTPS w URLs
  const pages = findFiles(CONFIG.appDir, /\.(tsx?|json)$/);
  let httpUrls = 0;

  pages.forEach((pagePath) => {
    const content = fs.readFileSync(pagePath, 'utf-8');
    const matches = content.match(/http:\/\/(?!localhost)/g);
    if (matches) httpUrls += matches.length;
  });

  addCheck(
    'Security',
    'HTTPS URLs',
    httpUrls === 0,
    5,
    httpUrls === 0
      ? '✅ Wszystkie URLs używają HTTPS'
      : `⚠️ ${httpUrls} URL bez HTTPS`,
    httpUrls > 0 ? 'Zamień http:// na https://' : null
  );
}

// ===================================================================
// GENEROWANIE RAPORTU
// ===================================================================

function generateReport() {
  console.log('\n' + '='.repeat(70));
  console.log('📊 RAPORT SEO AUDIT - QURSANT');
  console.log('='.repeat(70));

  const percentage = (results.score / results.maxScore) * 100;
  const grade =
    percentage >= 90
      ? 'A+'
      : percentage >= 80
      ? 'A'
      : percentage >= 70
      ? 'B'
      : percentage >= 60
      ? 'C'
      : 'D';

  console.log(
    `\n🎯 WYNIK: ${results.score}/${
      results.maxScore
    } punktów (${percentage.toFixed(1)}%)`
  );
  console.log(`📊 OCENA: ${grade}`);

  // Grupuj checks po kategorii
  const byCategory = {};
  results.checks.forEach((check) => {
    if (!byCategory[check.category]) {
      byCategory[check.category] = [];
    }
    byCategory[check.category].push(check);
  });

  console.log('\n📋 SZCZEGÓŁY PO KATEGORIACH:\n');

  Object.keys(byCategory).forEach((category) => {
    const checks = byCategory[category];
    const passed = checks.filter((c) => c.passed).length;
    const total = checks.length;
    const points = checks.reduce(
      (sum, c) => sum + (c.passed ? c.points : 0),
      0
    );
    const maxPoints = checks.reduce((sum, c) => sum + c.points, 0);

    console.log(
      `\n  ${category}: ${passed}/${total} ✅ (${points}/${maxPoints} pkt)`
    );
    console.log('  ' + '-'.repeat(60));

    checks.forEach((check) => {
      const icon = check.passed ? '✅' : '❌';
      console.log(`  ${icon} ${check.name}: ${check.message}`);
    });
  });

  // Sugestie
  if (results.suggestions.length > 0) {
    console.log('\n💡 SUGESTIE ULEPSZEŃ:\n');
    results.suggestions.forEach((suggestion, i) => {
      console.log(`  ${i + 1}. ${suggestion}`);
    });
  }

  // Podsumowanie
  console.log('\n' + '='.repeat(70));
  console.log('🎉 GRATULACJE!');
  console.log(`   Twoja strona ma ${percentage.toFixed(1)}% zgodności SEO!`);

  if (percentage >= 90) {
    console.log('   🏆 Doskonały wynik! TOP 1% stron!');
  } else if (percentage >= 80) {
    console.log('   🌟 Bardzo dobry wynik! Niewiele do poprawy!');
  } else if (percentage >= 70) {
    console.log('   👍 Dobry wynik! Popraw sugestie powyżej.');
  } else {
    console.log('   ⚠️  Wymaga poprawy. Zobacz sugestie powyżej.');
  }

  console.log('='.repeat(70) + '\n');

  // Zapisz raport do pliku
  const reportPath = path.join(process.cwd(), 'seo-audit-report.json');
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        score: results.score,
        maxScore: results.maxScore,
        percentage: percentage.toFixed(1),
        grade,
        checks: results.checks,
        suggestions: results.suggestions,
      },
      null,
      2
    )
  );

  console.log(`📄 Raport zapisany: ${reportPath}\n`);
}

// ===================================================================
// MAIN
// ===================================================================

async function main() {
  console.log('\n🚀 Rozpoczynam SEO Audit...\n');

  try {
    auditFileStructure();
    auditMetadata();
    auditSchemaOrg();
    auditImages();
    auditSitemapRobots();
    auditContent();
    auditPerformance();
    auditAccessibility();
    auditMobile();
    auditSecurity();

    generateReport();
  } catch (error) {
    console.error('❌ Błąd podczas audytu:', error.message);
    process.exit(1);
  }
}

main();
