import React from 'react';
import useInView from '../hooks/useInView';
import './FeatureCard.css';

export default function FeatureCard({ icon, title, description, color = 'blue', delay = 0, variant = 'default' }) {
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      className={`feature-card feature-card--${color} feature-card--${variant}${visible ? ' fc-visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="fc-icon">{icon}</div>
      <h3 className="fc-title">{title}</h3>
      <p className="fc-desc">{description}</p>
    </div>
  );
}
