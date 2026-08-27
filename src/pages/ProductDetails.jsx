import { Reveal } from '../components/animations/Reveal';

export default function ProductDetails({ product, details, onGetInTouch }) {
  if (!details) return null;

  const sections = [
    {
      name: product.name,
      description: details.overview,
      image: product.image,
      imageAlt: product.name,
    },
    ...(details.varieties || []).map((variety) => ({
      ...variety,
      imageAlt: variety.name,
    })),
  ];

  return (
    <section className="w-full bg-white text-[#707070]">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        {sections.map((item, index) => {
          const textFirst = index % 2 === 0;

          return (
            <Reveal key={item.name} direction={textFirst ? 'left' : 'right'} distance={45}>
              <article className={`grid items-center gap-10 py-20 sm:py-24 lg:min-h-[620px] lg:grid-cols-2 lg:gap-20 lg:py-28 ${index > 0 ? 'border-t border-[#edf0ea]' : 'pt-32 sm:pt-36 lg:pt-40'}`}>
                <div className={textFirst ? 'lg:order-1' : 'lg:order-2'}>
                  <h1 className="font-['Barlow',sans-serif] text-[2rem] font-black uppercase leading-none tracking-[-0.04em] text-[#363636] sm:text-[2.7rem] lg:text-[3.1rem]">
                    {item.name}
                  </h1>

                  {item.description && (
                    <p className="mt-6 max-w-[520px] whitespace-pre-line font-['Barlow',sans-serif] text-[0.9rem] leading-[1.65] text-[#707070] sm:text-[0.96rem]">
                      {item.description}
                    </p>
                  )}

                  {item.specifications?.length > 0 && (
                    <div className="mt-7 space-y-1 font-['Barlow',sans-serif] text-[0.86rem] leading-[1.5] text-[#707070] sm:text-[0.92rem]">
                      {item.specifications.map(({ label, value }) => (
                        <p key={`${item.name}-${label}`}>
                          {label}: {value}
                        </p>
                      ))}
                    </div>
                  )}

                  {item.note && (
                    <p className="mt-5 max-w-[520px] font-['Barlow',sans-serif] text-[0.86rem] leading-[1.5] text-[#707070] sm:text-[0.92rem]">
                      {item.note}
                    </p>
                  )}

                  {index === 0 && (
                    <button
                      type="button"
                      onClick={onGetInTouch}
                      className="mt-8 inline-flex rounded-full border-2 border-[#a5c900] px-9 py-3.5 font-['Barlow',sans-serif] text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-[#5e654c] transition-all duration-300 hover:bg-[#a5c900] hover:text-white"
                    >
                      Get in touch
                    </button>
                  )}
                </div>

                <div className={`${textFirst ? 'lg:order-2' : 'lg:order-1'} ${item.image ? 'flex min-h-[280px] items-center justify-center sm:min-h-[360px] lg:min-h-[460px]' : 'hidden lg:block lg:min-h-[460px]'}`}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      className="max-h-[480px] w-full max-w-[620px] object-contain"
                    />
                  )}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
