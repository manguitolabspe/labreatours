
import React from 'react';

interface SocialLinksProps {
  className?: string;
  itemClassName?: string;
  config: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    whatsapp?: string;
  };
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ className = "flex space-x-6", itemClassName = "", config }) => {
  const links = [
    { id: 'facebook', icon: 'fa-brands fa-facebook-f', url: config.facebook },
    { id: 'instagram', icon: 'fa-brands fa-instagram', url: config.instagram },
    { id: 'tiktok', icon: 'fa-brands fa-tiktok', url: config.tiktok },
    { id: 'youtube', icon: 'fa-brands fa-youtube', url: config.youtube },
    { id: 'twitter', icon: 'fa-brands fa-x-twitter', url: config.twitter },
    { id: 'whatsapp', icon: 'fa-brands fa-whatsapp', url: config.whatsapp ? `https://wa.me/51${config.whatsapp.replace(/\s/g, '')}` : null },
  ];

  return (
    <div className={className}>
      {links.filter(link => link.url && link.url.trim() !== "").map(link => (
        <a 
          key={link.id} 
          href={link.url!} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`transition-all hover:scale-110 ${itemClassName}`}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
};
