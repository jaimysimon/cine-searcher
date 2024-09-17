import { Typography } from "neetoui";
import { Trans } from "react-i18next";

const LabeledDetail = ({ i18nKey, value }) => (
  <Typography style="body3">
    <Trans
      {...{ i18nKey }}
      values={{ entity: value }}
      components={{
        label: (
          <strong>
            <em />
          </strong>
        ),
      }}
    />
  </Typography>
);

export default LabeledDetail;
