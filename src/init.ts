import { Config } from "./types";

const resetAttributes: string[] = ["data-aos", "data-aos-easing", "data-aos-duration", "data-aos-delay"];

export default function(config: Config = {}): { destroy: () => void } {
    const {
        callback = (e1, e2, e3, e4) => {},
        easing = "ease-in-out",
        duration = 1000,
        mirror = false,
        delay = 0,
        offsetEnter = 0,
        offsetExit = 0,
        mobile = false,
        minWindowWidth = 0
    } = config;

    const disableAOS = config.disableInitFunc ? 
        config.disableInitFunc() 
        :
        (mobile && /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (window.innerWidth < minWindowWidth);
    
    if (disableAOS) {
        document.querySelectorAll('[data-aos]').forEach((aosElem) => {
            resetAttributes.forEach((attr) => {
                aosElem.removeAttribute(attr);
            });
        });
        //kill aos
        return {destroy: () => {}}
    }


    const observers: IntersectionObserver[] = [];

    document.querySelectorAll('[data-aos]').forEach((aosElem) => {
        const anchorString = aosElem.getAttribute("data-aos-anchor") || "";
        const anchor = anchorString ? (document.querySelector(anchorString) || aosElem) : aosElem;

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    aosElem.classList.add("aos-animate");
                    callback(aosElem, "enter", observer, entry);
                }
                else if (mirror){
                    aosElem.classList.remove("aos-animate");
                    callback(aosElem, "exit", observer, entry);
                }
            });
        }, {
            rootMargin: `${offsetEnter}px 0px ${offsetExit*-1}px 0px`
        });
        
        observer.observe(anchor);
        observers.push(observer);

        aosElem.classList.add("aos-init");
        aosElem.getAttribute("data-aos-duration") ? null : (aosElem.setAttribute("data-aos-duration", duration.toString()));
        aosElem.getAttribute("data-aos-easing") ? null : (aosElem.setAttribute("data-aos-easing", easing.toString()));
        aosElem.getAttribute("data-aos-delay") ? null : (aosElem.setAttribute("data-aos-delay", delay.toString()));
    });

    return {
        destroy: () => {
            observers.forEach((observer) => {
                observer.disconnect();
            });
        }
    }
}