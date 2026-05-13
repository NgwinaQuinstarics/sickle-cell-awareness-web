import React from 'react';
import './PageHero.css';

export default function PageHero({ badge, title, subtitle, color = 'blue' }) {
  return (
    <section className={`page-hero page-hero--${color}`}>
      <div className="page-hero-bg">
      
        
      </div>
      <div className="container page-hero-inner">
        {badge && <div className="ph-badge">{badge}</div>}
        <h1 className="ph-title" dangerouslySetInnerHTML={{ __html: title }} />
        {subtitle && <p className="ph-sub">{subtitle}</p>}
      </div>
    </section>
  );
}
