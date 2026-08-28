import { useEffect, useRef } from "react";

export interface Product {
  id: number;
  name: string;
  image: string;
}

interface CarouselProps {
  products: Product[];
  distance?: number;
  scrollPerItem?: number;
}

function Carousel({ products, distance = 1500, scrollPerItem = 500, }: CarouselProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const slidesRef = useRef<HTMLDivElement[]>([]);

    const mapRange = (
        value: number,
        inMin: number,
        inMax: number,
        outMin: number,
        outMax: number
        ) => {
        return (
            ((value - inMin) * (outMax - outMin)) /
            (inMax - inMin) +
            outMin
        );
    };

    useEffect(() => {
        if (!sectionRef.current) return;

        const section = sectionRef.current;
        const slides = slidesRef.current;

        const visibleRange = 5000;

        section.style.height =
            `${window.innerHeight + products.length * scrollPerItem}px`;

        slides.forEach((slide,index)=>{
            const currentZ = -index * distance;


            slide.style.transform =
                `translate3d(-50%,-50%,${currentZ}px)`;


            slide.style.opacity =
                String(
                    Math.max(
                        0,
                        Math.min(
                            1,
                            mapRange(
                                currentZ,
                                -visibleRange,
                                0,
                                0,
                                1
                            )
                        )
                    )
                );
        });

        const onScroll = () => {

            if (!sectionRef.current) return;

            const rect = section.getBoundingClientRect();

            const progress =
            (-rect.top) /
            (section.offsetHeight - window.innerHeight);

            if (progress < 0 || progress > 1) return;

            const increment = progress * distance * (products.length - 1);

            slides.forEach((slide, index) => {

            const currentZ =
                -index * distance + increment;

            slide.style.transform =
                `translate3d(-50%,-50%,${currentZ}px)`;

            slide.style.opacity =
                String(
                Math.max(
                    0,
                    Math.min(
                    1,
                    mapRange(
                        currentZ,
                        -visibleRange,
                        0,
                        0,
                        1
                    )
                    )
                )
                );
            });

        };

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", onScroll);

        onScroll();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };

    }, [products, distance, scrollPerItem]);

  return (
    <section ref={sectionRef} className="carousel">
      <div className="carousel-sticky">

        <div className="carousel-inner">

          {products.map((item, index) => (
            <div
                key={item.id}
                ref={(el) => {
                    if (el) slidesRef.current[index] = el;
                }}
                className={`carousel-slide ${
                    index % 2 === 0 ? "right" : "left"
                }`}
            >
                <h2>{item.name}</h2>
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Carousel;