import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * @typedef CardItem
 * @property {string | number} id - Unique identifier for the card.
 * @property {string} title - The main title text of the card.
 * @property {string} subtitle - The subtitle or category text.
 * @property {string} imageUrl - The URL for the card's background image.
 * @property {string} [link] - Optional URL to open when clicked.
 */
export interface CardItem {
  id: string | number;
  title: string;
  subtitle: string;
  imageUrl: string;
  link?: string;
}

/**
 * @typedef HoverRevealCardsProps
 * @property {CardItem[]} items - An array of card item objects to display.
 * @property {string} [className] - Optional additional class names for the container.
 * @property {string} [cardClassName] - Optional additional class names for individual cards.
 */
export interface HoverRevealCardsProps {
  items: CardItem[];
  className?: string;
  cardClassName?: string;
}

/**
 * A component that displays a grid of cards with a hover-reveal effect.
 */
const HoverRevealCards: React.FC<HoverRevealCardsProps> = ({
  items,
  className,
  cardClassName,
}) => {
  return (
    <div
      role="list"
      className={cn(
        'group grid w-full max-w-6xl grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2',
        className
      )}
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          role="listitem"
          aria-label={`${item.title}, ${item.subtitle}`}
          tabIndex={0}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => {
            if (item.link && item.link !== "#") {
              window.open(item.link, '_blank');
            }
          }}
          className={cn(
            'relative h-80 cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-lg',
            'group-hover:opacity-60 group-hover:blur-[2px]',
            'hover:!opacity-100 hover:!blur-none focus-visible:!opacity-100 focus-visible:!blur-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            cardClassName
          )}
          style={{ backgroundImage: `url(${item.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-6 text-white w-full">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">
              {item.subtitle}
            </p>
            <h3 className="text-xl font-black leading-tight line-clamp-2">{item.title}</h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HoverRevealCards;
