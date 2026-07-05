import { EmblaCarouselType } from "embla-carousel";
import { useEffect, useState } from "react";

export function useAutoplayProgress(emblaApi?: EmblaCarouselType) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);

    const autoplay = emblaApi.plugins()?.autoplay;
    if (!autoplay) return () => emblaApi.off("select", onSelect);

    const onTimerSet = () => {
      setDuration(autoplay.timeUntilNext() ?? 0);
      setTick((t) => t + 1);
    };
    emblaApi.on("autoplay:timerset", onTimerSet);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("autoplay:timerset", onTimerSet);
    };
  }, [emblaApi]);

  return { selectedIndex, duration, tick };
}
