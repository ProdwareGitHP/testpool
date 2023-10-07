function RequiredTitle(props) {
  const { title, value } = props;
  return <span style={{display:'inline-flex'}} title={title}>{value}</span>;
}

export default RequiredTitle;
