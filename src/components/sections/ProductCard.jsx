import { Link } from 'react-router-dom';
import { Reveal } from '../animations/Reveal';
import { getProductAnchor, getProductPath } from '../../utils/productPaths';

export default function ProductCard({ product, index }) {
  const handleImageError = (e) => {
    const img = e.currentTarget;
    img.style.display = 'none';
    if (img.parentElement) {
      img.parentElement.style.background = '#f0f0f0';
    }
  };

  return (
    <Reveal
      direction="up"
      distance={30}
      duration={500}
      delay={index * 60}
      as="div"
      className="product-card scroll-mt-24 rounded-xl overflow-hidden"
      id={getProductAnchor(product.name)}
    >
      <Link to={getProductPath(product.name)} className="block h-full text-inherit no-underline">
        <div className="relative overflow-hidden bg-[#f5f5f0] aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <span className="font-['Barlow',sans-serif] text-[0.5rem] sm:text-[0.55rem] uppercase tracking-[0.08em] bg-[#1F4732]/80 backdrop-blur-sm text-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
              {product.category}
            </span>
          </div>
          {/* Gradient overlay on image bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1F4732]/20 to-transparent"></div>
        </div>
        <div className="p-3 sm:p-4">
          <h4 className="font-['Lora',serif] font-normal text-[1rem] sm:text-[1.1rem] text-[#1F4732] font-semibold mb-1">
            {product.name}
          </h4>
          <p className="font-['Barlow',sans-serif] text-[16px] leading-[1.5] text-[#666666] text-[0.75rem] sm:text-[0.8rem] leading-relaxed line-clamp-2 mb-2">
            {product.desc}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.slice(0, 2).map((tag, j) => (
              <span
                key={j}
                className="font-['Barlow',sans-serif] text-[0.5rem] sm:text-[0.55rem] text-[#6BA539] bg-[#e8f5e8] px-1.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className="inline-flex items-center gap-1 font-['Barlow',sans-serif] text-[0.65rem] sm:text-[0.7rem] text-[#6BA539] transition-colors duration-300 hover:text-[#1F4732] group/link"
          >
            Know More
            <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
