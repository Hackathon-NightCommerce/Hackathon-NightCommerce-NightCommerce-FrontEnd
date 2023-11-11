import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { ImgWrap, StyledAboutCarousel } from "./styles";
import { ReactElement } from "react";

const responsive = {
  0: { items: 1 },
  400: { items: 2 },
  568: { items: 3 },
  780: { items: 4 },
  1024: { items: 5 },
};


const team = [
  {
    name: "Mateus Carius",
    avatar: "https://media.licdn.com/dms/image/D4D35AQFS5vjknF_TUQ/profile-framedphoto-shrink_800_800/0/1684502415698?e=1694545200&v=beta&t=Tu7oMS8MHJsQ7c1xbzLVw6aWN9fbcjTNCLiDdjAdvVE",
    linkedin: "https://www.linkedin.com/in/mateus-carius-604033148/",
    github: "https://github.com/MattCari",
  },
  {
    name: "Matheus Gualtieri",
    avatar: "https://media.licdn.com/dms/image/D4D35AQEofxnw8d_6Vg/profile-framedphoto-shrink_800_800/0/1679694650636?e=1694462400&v=beta&t=bW4r9zUs5fqKtyXtiNbz8rmule267L4PzgQnJCQ2OUM",
    linkedin: "https://www.linkedin.com/in/matheus-gualtieri/",
    github: "https://github.com/MatheusGualtieri",
  },
  {
    name: "Matheus Ferreira",
    avatar: "https://media.licdn.com/dms/image/D4D35AQFctHVdxPO54Q/profile-framedphoto-shrink_800_800/0/1673880619583?e=1694545200&v=beta&t=Mdv4rxLcORs-gSUeJ8ZD1PSZIo3I97f-8b7mowFzCG4",
    linkedin: "https://www.linkedin.com/in/matheusferreira33/",
    github: "https://github.com/MatheusFerreira33",
  },
  {
    name: "Natã Lomeu",
    avatar: "https://media.licdn.com/dms/image/D4E35AQH8rQSxNBRxcA/profile-framedphoto-shrink_400_400/0/1673269407485?e=1694545200&v=beta&t=PZCAZ7VEGLRRW5_lmZ1Fo37dLsMQSs03wDmGOjXBaYI",
    linkedin: "https://www.linkedin.com/in/natangaf/",
    github: "https://github.com/Natangaf",
  },
  {
    name: "Christian Vada",
    avatar: "https://media.licdn.com/dms/image/D4D35AQEJUHbAmuWI_Q/profile-framedphoto-shrink_800_800/0/1680572153463?e=1694545200&v=beta&t=eeHPXwHqyRfPQ4wXJvuCxvqeDyQB37nDieyeXZp4atY",
    linkedin: "https://www.linkedin.com/in/christianvada9/",
    github: "https://github.com/ChristianVada",
  },
  {
    name: "Bruno Henrique",
    avatar: "https://media.licdn.com/dms/image/D4D35AQFSUi1Xyo4PsQ/profile-framedphoto-shrink_800_800/0/1679056751085?e=1694545200&v=beta&t=5vvE62GBnlkfoGKPvYByJA2tj1runI6S5wSa_iTE3jI",
    linkedin: "https://www.linkedin.com/in/brunohgsantos/",
    github: "https://github.com/Brunohgs21",
  },
  {
    name: "Bruno Nunes",
    avatar: "https://media.licdn.com/dms/image/D4D35AQGVTaA0WMVkPQ/profile-framedphoto-shrink_800_800/0/1692276325639?e=1694545200&v=beta&t=HpRHyPpi4x5htdqP1lTmN3IotkHu0wybnq9wIDtU4x4",
    linkedin: "https://www.linkedin.com/in/bruno-nunes-204a2623b/",
    github: "https://github.com/Bruno-Nuness",
  },
];


const items: ReactElement[] = [];

team.map((dev, index) =>
  items.push(
    <StyledAboutCarousel key={index}>
      <ImgWrap>
        <img src={dev.avatar} alt="imagem de avatar" draggable="false" />
      </ImgWrap>
      <h4>{dev.name}</h4>
      <hr />
      <div>
        <span>
          <a href={dev.linkedin} target="_blank">
            <BsLinkedin /> Linkedin
          </a>
        </span>
        <span>
          <a href={dev.github} target="_blank">
            <FaGithub /> Github
          </a>
        </span>
      </div>
    </StyledAboutCarousel>
  )
);

export const AboutCarousel = () => (
  <AliceCarousel
    mouseTracking
    touchTracking
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
    disableButtonsControls
    animationDuration={4000}
    autoPlay
    paddingLeft={70}
    autoPlayStrategy="default"
    infinite
  />
);
