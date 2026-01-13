import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Note: In a real environment, GSAP SplitText is a club plugin. 
// For this implementation, we'll use a custom split logic to avoid dependency issues 
// while maintaining the React Bits interface.

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;
      
      const el = ref.current;
      const words = text.split(' ');
      el.innerHTML = words.map(word => 
        `<span class="split-word" style="display: inline-block; white-space: nowrap;">
          ${word.split('').map(char => 
            `<span class="split-char" style="display: inline-block;">${char}</span>`
          ).join('')}
        </span>`
      ).join(' ');

      const targets = el.querySelectorAll('.split-char');
      
      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: `top ${90}%`,
            once: true,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
        }
      );
    },
    {
      dependencies: [text, fontsLoaded],
      scope: ref
    }
  );

  const style = {
    textAlign,
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  };

  const Tag = tag;
  return <Tag ref={ref} style={style} className={className}>{text}</Tag>;
};

export default SplitText;
