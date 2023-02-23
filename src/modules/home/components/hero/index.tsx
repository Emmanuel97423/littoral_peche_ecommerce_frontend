import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="w-2/3 text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-center small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Faites que chaque sortie pêche soit un succès avec les articles tendances, plébiscité par nos clients
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
          {/* This year, our new summer collection will shelter you from the harsh
          elements of a world that doesn&apos;t care if you live or die. */}
           Avec notre e-commerce de pêche. 
          Des équipements de qualité pour des prises de taille XXL!
        </p>
        <UnderlineLink href="/store">Explorer</UnderlineLink>
      </div>
      <Image
        src="/hero.png"
        layout="fill"
        loading="eager"
        priority={true}
        quality={90}
        objectFit="cover"
        alt="Photo hero"
        className="absolute inset-0"
        draggable="false"
      />
    </div>
  )
}

export default Hero
