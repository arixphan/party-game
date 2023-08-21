import { AppRoute } from "./route";

export const HOME_ENTRIES = [
  {
    url: AppRoute.TRUTH_OR_DARE.INDEX,
    title: "Truth or Dare",
    description:
      "Get pumped for Truth or Dare, the ultimate party game! Share hilarious truths or conquer epic dares with your awesome pals. Get ready to laugh, bond, and make memories like never before! 🎉😄",
    cover: {
      img: "/cover/truthordare.gif",
      alt: "art cover",
    },
  },
  {
    url: AppRoute.RANDOM.RANDOM_PICKER,
    title: "Random Picker",
    description:
      "Random Picker is your go-to companion for making unbiased and fun choices. Whether it's picking winners for contests, selecting restaurants, or just adding a twist to decision-making, this nifty tool ensures randomness and excitement in every pick!",
    cover: {
      img: "/cover/random-picker-2.png",
      alt: "art cover",
    },
  },
  {
    url: AppRoute.RANDOM.WHEEL_OF_BEER,
    title: "Wheel Of Beer",
    description: `Get ready for a laugh-filled sip session! Spin the wheel, 
    and if it hits beer, destiny calls. It's tipsy chance, glass-raising fun with the beer gods. 
    Cheers to spinning, winning, and good times guaranteed! 🍻🎉`,
    cover: {
      img: "/cover/wheel-of-beer.png",
      alt: "art cover",
    },
  },
];

export type HomeEntry = (typeof HOME_ENTRIES)[number];
