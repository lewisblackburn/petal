import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Icon } from './ui/icon.tsx'
import { Button } from './ui/button.tsx'

const images = [
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hnzXoDaK346U4ByfvQenu2DZnTg.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/lotWiuWuTGlQ94rzBdy6ZmKZnTA.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qayga07ICNDswm0cMJ8P3VwklFZ.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7uJkLigRamfHerFSkfFOCMqH0pi.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/szDEqqarPi3YqiPLevm7LObYrDJ.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/evxtv4e8Amm436Y5rW16RkGu8pX.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/luhKkdD80qe62fwop6sdrXK9jUT.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tiZF8b9T9fMcwvsEEkJ5ik1wCnV.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/u7iHICDItwAoHZjwTwoBmPHql4G.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/tePFnZFw5JvjwjQjaKkqDPNMLPU.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2Gfjn962aaFSD6eST6QU3oLDZTo.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/iuIWl90qCpoxv6g775JB6Kg0m86.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/4U1SBHmwHkNA0eHZ2n1CuiC1K1g.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pD1o9B0ibENdNroYrBCQemG2jnr.jpg',
  'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/9z3hdYnDdfWGKD55kdDmshDojeP.jpg',
]

export function ImageSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [translateX, setTranslateX] = useState(currentImageIndex)
  const [animated, setAnimated] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false) // Track ongoing animations
  // clone the first four images and append them to the end of the array and vice versa
  const clonedImages = [...images, ...images, ...images]

  const imageClassName =
    'aspect-a4 object-cover rounded-lg flex-[0_0_25%] max-w-[25%] md:flex-[0_0_15%] md:max-w-[15%] lg:flex-[0_0_12.5%] lg:max-w-[12.5%]'

  const prevImage = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentImageIndex(prevIndex => prevIndex - 1)
    }
  }

  const nextImage = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentImageIndex(prevIndex => prevIndex + 1)
    }
  }

  // Create a ref to the container div
  const imageRef = useRef(null)

  useEffect(() => {
    // + 20 to account for the margin between the images (gap-5 -> 1.25rem -> 20px)
    setTranslateX(
      // @ts-expect-error Property 'offsetWidth' does not exist on type 'never
      -currentImageIndex * (imageRef.current?.offsetWidth + 20 || 0),
    )
  }, [currentImageIndex])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Popular</h2>
          <p className="text-muted-foreground">What everyone is watching</p>
        </div>
        <div>
          <Button onClick={prevImage} size="icon" variant="ghost">
            <Icon name="chevron-left" />
          </Button>
          <Button onClick={nextImage} size="icon" variant="ghost">
            <Icon name="chevron-right" />
          </Button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-5"
          animate={{
            transform: `translateX(${translateX}px)`, // Translate the container div based on the currentImageIndex
          }}
          // when last slide is reached, it immediately jumps back to the first actual slide without animation (animation duration set to 0)
          transition={{
            duration: animated ? 0.3 : 0,
          }}
          onAnimationComplete={() => {
            setIsAnimating(false)
            if (currentImageIndex === images.length * 2) {
              setAnimated(false)
              setCurrentImageIndex(images.length)
            } else if (currentImageIndex === 0) {
              setAnimated(false)
              setCurrentImageIndex(images.length)
            } else {
              setAnimated(true)
            }
          }}
        >
          {clonedImages.map((imageUrl, index) => (
            <img
              ref={imageRef}
              key={index}
              src={imageUrl}
              alt="poster"
              className={imageClassName}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
