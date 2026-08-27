import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCT_DATA, PRODUCT_GROUPS } from '../../data/products';
import { getProductPath } from '../../utils/productPaths';

export default function ProductDropdown({
  scrolled,
  productsOpen,
  productsMenuRef,
  isHovered,
  onHover,
  onOpen,
  onScheduleClose,
  onClearClose,
  onCategoryClick,
  onProductClick,
}) {
  return (
    <div
      ref={productsMenuRef}
      className="relative z-[210]"
      onMouseEnter={() => {
        onHover();
        onOpen();
      }}
      onMouseLeave={onScheduleClose}
    >
      <button
        type="button"
        onClick={onOpen}
        onFocus={onOpen}
        onBlur={(event) => {
          if (!productsMenuRef.current?.contains(event.relatedTarget)) {
            onScheduleClose();
          }
        }}
        aria-haspopup="true"
        aria-expanded={productsOpen}
        className={`relative flex items-center gap-1 pb-1 transition-all duration-300 group ${
          scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/90 hover:text-white font-medium'
        }`}
      >
        <span className="relative z-10">Products</span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`relative z-10 transition-transform duration-300 ${productsOpen ? 'rotate-180' : ''}`}
        />
        <span
          className={`absolute -bottom-0.5 left-0 h-[2px] transition-all duration-500 ${
            isHovered || productsOpen ? 'w-full' : 'w-0'
          }`}
          style={{
            background: scrolled ? 'linear-gradient(90deg, #1F4732, #6BA539)' : 'linear-gradient(90deg, #B8860B, #DAA520)',
            boxShadow: scrolled ? '0 0 20px rgba(31,71,50,0.3)' : '0 0 20px rgba(184,134,11,0.4)',
          }}
        />
        <span className={`absolute -bottom-0.5 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
          scrolled ? 'bg-[#1F4732]/20' : 'bg-cream/30'
        }`}></span>
      </button>

      <div
        className={`absolute left-1/2 top-full z-[220] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          productsOpen
            ? 'visible translate-y-0 opacity-100 pointer-events-auto'
            : 'invisible translate-y-2 opacity-0 pointer-events-none'
        }`}
        onMouseEnter={onClearClose}
        onMouseLeave={onScheduleClose}
        aria-hidden={!productsOpen}
      >
        <div className={`rounded-xl border p-4 shadow-2xl backdrop-blur-xl sm:p-5 ${
          scrolled
            ? 'border-[#1F4732]/10 bg-white/98 shadow-[#1F4732]/15'
            : 'border-[#DAA520]/25 bg-[#102d20]/98 shadow-black/30'
        }`}>
          <div className={`mb-4 flex items-center justify-between border-b pb-3 sm:mb-5 sm:pb-4 ${
            scrolled ? 'border-[#1F4732]/10' : 'border-white/10'
          }`}>
            <div>
              <p className={`font-['Barlow',sans-serif] text-[0.58rem] uppercase tracking-[0.2em] ${
                scrolled ? 'text-[#6BA539]' : 'text-[#DD8F2A]'
              }`}>Explore our range</p>
              <p className={`mt-1 font-['Lora',serif] text-[1.05rem] ${
                scrolled ? 'text-[#1F4732]' : 'text-white'
              }`}>Fresh from Bangladesh</p>
            </div>
            <span className={`hidden text-[0.58rem] uppercase tracking-[0.14em] sm:block ${
              scrolled ? 'text-[#8a9b8e]' : 'text-white/50'
            }`}>{PRODUCT_DATA.length} products</span>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {PRODUCT_GROUPS.map(({ category, products }) => (
              <div key={category} className="min-w-0">
                <button
                  type="button"
                  onClick={() => onCategoryClick(category)}
                  className={`group/category mb-2 flex w-full items-center justify-between text-left font-['Barlow',sans-serif] text-[0.68rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-300 sm:mb-2.5 sm:text-[0.72rem] ${
                    scrolled ? 'text-[#1F4732] hover:text-[#6BA539]' : 'text-white hover:text-[#DD8F2A]'
                  }`}
                >
                  <span>{category}</span>
                  <span className={`ml-2 text-[0.55rem] font-normal tracking-normal ${
                    scrolled ? 'text-[#8a9b8e]' : 'text-white/45'
                  }`}>{products.length}</span>
                </button>
                <div className="space-y-0.5">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      to={getProductPath(product.name)}
                      onClick={onProductClick}
                      className={`group/product flex items-center gap-2 rounded-md px-2 py-1.5 font-['Barlow',sans-serif] text-[0.72rem] transition-all duration-300 hover:translate-x-0.5 sm:text-[0.78rem] ${
                        scrolled
                          ? 'text-[#607568] hover:bg-[#edf6e8] hover:text-[#1F4732]'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className={`h-1 w-1 shrink-0 rounded-full transition-transform duration-300 group-hover/product:scale-150 ${
                        scrolled ? 'bg-[#6BA539]' : 'bg-[#DD8F2A]'
                      }`}></span>
                      <span className="truncate">{product.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileProductDropdown({
  scrolled,
  mobileProductsOpen,
  mobileExpandedCategories,
  onToggleProducts,
  onToggleCategory,
  onProductClick,
}) {
  return (
    <div className="rounded-lg">
      <button
        type="button"
        onClick={onToggleProducts}
        aria-expanded={mobileProductsOpen}
        className={`flex w-full items-center justify-between text-sm text-left font-medium tracking-wide py-2 px-3 rounded hover:bg-cream/10 transition-all duration-300 ${
          scrolled ? 'text-[#4a6b5a] hover:text-[#1F4732]' : 'text-cream/90 hover:text-white'
        }`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <span>PRODUCTS</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${mobileProductsOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-out ${
        mobileProductsOpen ? 'max-h-[900px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className={`ml-3 mt-1 border-l pl-3 ${
          scrolled ? 'border-[#1F4732]/15' : 'border-white/15'
        }`}>
          {PRODUCT_GROUPS.map(({ category, products }) => {
            const categoryExpanded = mobileExpandedCategories[category];

            return (
              <div key={category} className="border-b last:border-b-0 border-cream/10">
                <button
                  type="button"
                  onClick={() => onToggleCategory(category)}
                  aria-expanded={categoryExpanded}
                  className={`flex w-full items-center justify-between py-2 pr-2 text-left font-['Barlow',sans-serif] text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    scrolled ? 'text-[#1F4732] hover:text-[#6BA539]' : 'text-white/90 hover:text-[#DD8F2A]'
                  }`}
                >
                  <span>{category}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${categoryExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ease-out ${
                  categoryExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="space-y-0.5 pb-2">
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        to={getProductPath(product.name)}
                        onClick={onProductClick}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 font-['Barlow',sans-serif] text-[0.78rem] transition-all duration-300 hover:translate-x-0.5 ${
                          scrolled
                            ? 'text-[#607568] hover:bg-[#edf6e8] hover:text-[#1F4732]'
                            : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span className={`h-1 w-1 shrink-0 rounded-full ${
                          scrolled ? 'bg-[#6BA539]' : 'bg-[#DD8F2A]'
                        }`}></span>
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
