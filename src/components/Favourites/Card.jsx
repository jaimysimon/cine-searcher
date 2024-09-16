import { Typography } from "neetoui";

const Card = ({ poster, title }) => (
  <div className="neeto-ui-rounded-lg neeto-ui-shadow-lg relative h-12 w-1/2 overflow-hidden p-10">
    <img alt={title} className="h-full w-full object-cover" src={poster} />
    <div className="neeto-ui-bg-black absolute inset-0 flex items-center justify-center bg-opacity-50">
      <Typography
        className="neeto-ui-text-white text-center"
        component="i"
        style="h2"
        weight="medium"
      >
        {title}
      </Typography>
    </div>
  </div>
);
export default Card;
