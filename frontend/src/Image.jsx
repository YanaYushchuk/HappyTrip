export default function Image({src,...rest}) {
    console.log(src);
    var imgUrl= "default.jpg"
    if(src !== ""){
        imgUrl = src;
        console.log("change");
    }
    return (
      <img {...rest} src={imgUrl} alt={''} />
    );
  }