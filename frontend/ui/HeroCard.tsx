import "./HeroCard.css";
import Image from "next/image";

function HeroComponent() {
  return (
    <div className="hero-component">
      <div className="hero-component__left">
        <div className="hero-component__left__wrapper">
          <p className="hero-component__left__wrapper__main-text">
            Save on your faves
          </p>
          <p className="hero-component__left__wrapper__sub-text">
            Special items at special prices
          </p>
          <a className="hero-component__left__wrapper__call-to-action" href="">
            Make your day
          </a>
        </div>
      </div>
      <div className="hero-component__right">
        <Image
          width={1000}
          height={667}
          priority
          className="hero-component__right__hero-image"
          src="/hero-image.jpg"
          alt="A duffle bag, dopp kit and ceramic mug sit atop a wood table in front of a wall of art prints."
        />
      </div>
    </div>
  );
}

export default HeroComponent;
