import { Ratio } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

function AppCarousel({props}) {
  return (
    <Carousel data-bs-theme="dark" className='app-carousel'>
        {props?.map((item)=> (
        <Carousel.Item key={item.id}>
            <Ratio aspectRatio="21x9">
                <img
                className="d-block w-100"
                src={item.src}
                alt={item.title}
                />
            </Ratio>
            <Carousel.Caption>
            <h5>{item.title}</h5>
            <p>{item.des}</p>
            </Carousel.Caption>
        </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default AppCarousel;