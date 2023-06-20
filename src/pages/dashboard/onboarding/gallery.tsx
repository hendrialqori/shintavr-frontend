import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Gallery = () => {
  return (
    <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-3 gap-1 mt-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <LazyLoadImage
          key={i}
          className="border-2 dark:border-none object-cover lg:h-[400px] w-full rounded-md"
          src={`/sekolah-0${i + 1}.jpeg`}
          aria-label="avatar"
          alt="avatar-onboarding"
          effect="blur"
        />
      ))}
    </div>
  );
};
