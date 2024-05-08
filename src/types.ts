

export interface Config {
    /**
     * The duration (in ms) of the animation
     * @default 1000
    */
    duration?: number;
    /**
     * The easing function to be used for the animation
     * @default ease-in-out
    */
    easing?: string;
    /**
     * The callback function to be called when the element enters or exists the viewport.
    */
    callback?: (element: Element, status: "enter" | "exit", observer: IntersectionObserver, entry: IntersectionObserverEntry) => void;
    /**
     * Whether to mirror the animation when the element is out of view
     * @default false
    */
    mirror?: boolean;
    /**
     * A client-side function which will determine whether AOS is initialised or not.
     */
    disableInitFunc?: () => boolean;
    /**
     * The delay (in ms) before the animation starts
     * @default 0
    */
    delay?: number;
    /**
     * The offset (in px) from the top of the viewport at which the animation starts
     * @default 0px
    */
   
    offsetEnter?: number;
    /**
     * The offset (in px) from the bottom of the viewport at which the animation is undone (or starts again if scrolling up)
     * @default 0px
    */
    offsetExit?: number;

    /**
     * Whether to disable animations on mobile devices
     * (Only use if disableInitFunc is not provided)
     * @default false
    */
    mobile?: boolean;
    /**
     * The minimum width of the window for animations to be enabled. (Otherwise they will be disabled at initialisation)
     * (Only use if disableInitFunc is not provided)
     * @default 0
    */
    minWindowWidth?: number;
}