import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

export function SEO({ title, description, keywords }: SEOProps) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Handle meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute('content', description);
    }

    // Handle meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords && keywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (keywords && metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Handle Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription && description) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    if (description && ogDescription) {
      ogDescription.setAttribute('content', description);
    }
  }, [title, description, keywords]);

  return null; // This component doesn't render anything
}