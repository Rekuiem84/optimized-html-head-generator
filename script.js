const form = document.querySelector("#form");
const pre = document.querySelector("pre");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const data = Object.fromEntries(formData);

	let url = data.url;
	let fullUrl = "https://www." + url;

	let generalTags = `
  <!-- Balises générales -->
  <meta charset='UTF-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <link rel='canonical' href='${fullUrl}'>
  `;
	if (data.index_page) {
		generalTags += `<meta name="robots" content="index, follow">`;
	} else {
		generalTags += `<meta name="robots" content="noindex, nofollow">`;
	}

	const authorTags = `\n
  <!-- Balises Auteur -->
  <title>${data.title}</title>
  <meta name='description' content='${data.description}'>
  `;
	const openGraphTags = `
  <!-- Balises Open Graph -->
  <meta property="og:url" content='${fullUrl}'>
  <meta property="og:type" content="website">
  <meta property="og:title" content="${data.title}">
  <meta property="og:description" content='${data.description}'>
  <meta property="og:image" content="${data.image_card}">
  
  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta property="twitter:domain" content="${url}">
  <meta property="twitter:url" content="${fullUrl}">
  <meta name="twitter:title" content="${data.title}">
  <meta name="twitter:description" content='${data.description}'>
  <meta name="twitter:image" content="${data.image_card}">
  `;

	const miscTags = `
  <!-- Préconnexion pour les polices -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <!-- Préchargement des ressources critiques -->
  <link rel="preload" href="${data.style_path}" as="style">

  <!-- Sécurité -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self';">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="DENY">
  <meta http-equiv="X-XSS-Protection" content="1; mode=block">

  <!-- Langues -->
  <link rel="alternate" hreflang="${data.language}" href="${fullUrl}">

  <!-- Politique de référencement -->
  <meta name="referrer" content="no-referrer-when-downgrade">
  `;
	const analyticsTags = `
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${data.gtag}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
  
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '${data.gtag}');
  </script> 
  `;
	const googleSearchConsole = `
  <!-- Vérification Google Search Console -->
  <meta name="google-site-verification" content="${data.google_verif}">
  `;
	if (data.include) {
		var styleTags = `
  <!-- Style -->
  <link rel='stylesheet' href="${data.style_path}" />
  <link rel='shortcut icon' type='image/png' href="${data.favicon}" />
`;
		var scriptTags = `
  <!-- Script -->
  <script src="${data.script_path}" defer></script>
  `;
	} else {
		var styleTags = "";
		var scriptTags = "";
	}

	const StructuredData = `
  <!-- Structured Data -->
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "${data.type}",
      "name": "${data.name}",
      "description": "${data.description}",
      "url": "${fullUrl}",
      "image": "${data.image_card}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${data.address_street}",
        "addressLocality": "${data.address_locality}",
        "addressRegion": "${data.address_region}",
        "postalCode": "${data.postal_code}",
        "addressCountry": "${data.country}"
      },
      "telephone": "${data.tel}"
    }
  </script>
`;

	pre.textContent = `<head>
      ${generalTags}${authorTags}${styleTags}${scriptTags}${openGraphTags}${miscTags}${analyticsTags}${googleSearchConsole}${StructuredData}\n</head>  `;
});

pre.addEventListener("click", () => {
	navigator.clipboard.writeText(pre.textContent);
	const preBorder = pre.style.borderColor;
	pre.style.borderColor = "green";
	const preMessage = pre.getAttribute("data-message");
	pre.setAttribute("data-message", "Copié !");
	setTimeout(() => {
		pre.style.borderColor = preBorder;
		pre.setAttribute("data-message", preMessage);
	}, 2000);
});
