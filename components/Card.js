const DisplayCard = ({header,meta,description}) => {
  return (
    <div class="card" style={{overflowWrap:"break-word"}}>
      <div class="content">
        <div class="header">{header}</div>
        <div class="meta">{meta}</div>
        <div class="description">{description}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
