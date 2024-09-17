import { Typography } from "neetoui";

import LabeledDetail from "../commons/LabeledDetail";

const Card = ({ title, rating }) => (
  <div className="neeto-ui-rounded-lg relative flex w-full max-w-4xl flex-col border border-l-4 p-4">
    <div className="flex items-center justify-between">
      <div className="ml-1">
        <Typography style="body2" weight="semibold">
          {title}
        </Typography>
      </div>
      <div className="ml-auto">
        <Typography
          className="neeto-ui-text-gray-600"
          style="body3"
          weight="normal"
        >
          <LabeledDetail i18nKey="label.rating" value={rating} />
        </Typography>
      </div>
    </div>
  </div>
);

export default Card;
