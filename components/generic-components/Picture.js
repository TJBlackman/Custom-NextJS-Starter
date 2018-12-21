import { getSrcSetAndSizes } from '../../helpers/cloudinary_url';

const createSource = (props) => <source {...props}></source>; 

export default function Picture(props) {
    const { src, maxMin, className, alt } = props; 
    const image_sources = getSrcSetAndSizes(src, maxMin); 
  return (
    <picture>
      {image_sources.map(item => createSource(item))}
      <img src={image_sources[image_sources.length - 1]['srcSet']} alt={alt} className={className} />
    </picture>
  ) 
}
