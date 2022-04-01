import { motion } from "framer-motion";


const FadeInAnimations = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
}

const SlideAnimations = {
    initial: {opacity: 0, y: 400},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, x: 400}
}


const SlideAnimationPage = ({children}) => {
    return(
        <motion.div
            variants={SlideAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.75}}
        >
            {children}
        </motion.div>
    )
}
const FadeInPage = ({children}) => {
    return(
        <motion.div
            variants={FadeInAnimations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.75}}
        >
            {children}
        </motion.div>
    )
}



export  {
    FadeInPage,
    SlideAnimationPage
}