import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

const people = [
  {
    id: 1,
    name: 'Todos',
    rating: 5,
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: 'Calendar',
    rating: 4,
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    id: 3,
    name: 'Notes',
    rating: 5,
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    id: 4,
    name: 'Countdowns',
    rating: 4,
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
  },
];

const LandingCarousel = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      showArrows={false}
      dynamicHeight={true}
      className="btn-twitter mt-5 title rounded-lg items-center"
    >
      {people.map(({ id, text, name }) => {
        return (
          <div
            className="opacity-100"
            key={id}
            style={{
              paddingTop: '20px',
              paddingRight: '5rem',
              paddingLeft: '5rem',
              color: 'white',
            }}
          >
            <p className="font-bold capitalize mb-4 text-3xl tracking-wider">
              {' '}
              {name}
            </p>
            <p className="text-white "> {text} </p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default LandingCarousel;
