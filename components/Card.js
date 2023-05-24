const DisplayCard = ({header,meta,description}) => {
  return (
    <div className="card" style={{overflowWrap:"break-word"}}>
      <div className="content">
        <div className="header">{header}</div>
        <div className="meta">{meta}</div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default DisplayCard;
