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
  'https://petal-image-host.s3.eu-west-2.amazonaws.com/2e5ddb8e-78a9-4883-bb89-c7d4fb3c39acShaun-Pickering-3695757746.jpeg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFAaCWV1LXdlc3QtMiJHMEUCIQD4dJbH7skxGNzLiXI45Dvj6U297FdWbFgtyVCgiKlKCgIgeNEhPHnsi98nOMmXbkK12%2BTnV%2BUnx6K3PJjYijlwSjsq7QII2f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw3ODcxNjM5Njk0NTciDHeEPcSQlSWnppXAEirBAhxHNfLbkIKSIBPS6EFzfk5T%2B9cFea9U314h799rLhtsocVB8H3yk9KEwVCNJUZAo9Ypz6j4ZQfKSkGdu7wB2dEvkdOPa5Qmo%2BoNnpMLgctyNYdNNb40GrF8rnHmr7XehYFapoo6IqTLbR1%2FtQMgBpP53kVNNzogrN7Bv0C3v1z4CJOdMLvDf30nHXqE6xYK7AKWSEDVZCNxdg2%2BH%2BnNx%2Fm%2BPBeuSjpxnQfiaZxssRcG6HzmLMHSBA7aMoIgj8l7RQcz6b6nEaob5kt0LOWqL54gEW%2FROBH8ay8NcwggndA30mMGhWDCPOtUbPma9DjUtC1ykhH84dVNyN%2BMgBrbWP2vacXLNxqNLwhuZWo%2F1Qo1vp%2Bwb5Jp36hV6uKwIU%2Fp9zxhZDyfD8m7ILfeLspqHxgjSlqkU1%2FFiZyo2zTnu1x81jCq8e%2BlBjqzAp9gAZYUtLqpHYH70Is6FtOPCLy%2FskMaJbpYycufr4ReJFpU%2FTCtQf8%2FQjEwCpY%2BAlUgPpAzsGx0SPruWn71xSw7%2FqGoYfN6%2BDPL21dp%2BFQzbAi6PdEOxNiGu8DrWfM33XyFCNDI4jXeScbITDtP%2FRcQTedG7ABOWdP%2Bd6%2BvR3klNwUkGSBAlkR9jJYqx7PudYQVBxuQzxmleAeZ3csSPaifmYMPHIOdwkKcm6eKEgJvoKNqu%2FiN72oHGINPwRrVfpA0aryGgqZQgZr%2FYsN%2FNlJ8RqvH%2FSbi9MyaTMS2mWF6FHIv8kvLnZCF8L%2FQFdD2pKcgS96QrNTPqf0wDd4sXFK%2BxqPAlxOqyueE77Io3%2BgXwg34WDZDFnVPNsFMkwaH9n4Bkf4F6IFLSw2WIE7OHcOagZU%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230722T154309Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3ORVA66YQ6Q4Q5HZ%2F20230722%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Signature=2903b0aa7ed9195ce36541ffde5aa7779bd544bb8bd6196f2aa53e583e5d52d9',
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
