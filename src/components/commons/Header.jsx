import { memo, useState, useEffect } from "react";

import classNames from "classnames";
import { Typography } from "neetoui";
import { useTranslation, Trans } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import routes from "routes";

const Header = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="mt-1">
      <div className="mx-15 mb-2 mt-6 flex items-end justify-between">
        <div className="flex items-center">
          <Typography className="ml-12" style="h3" weight="semibold">
            <Trans
              i18nKey="title"
              components={{
                primary: <span className="neeto-ui-text-primary-600" />,
              }}
            />
          </Typography>
          <Typography style="body3" weight="medium">
            <div className="ml-10 flex space-x-10">
              <Link
                to={routes.root}
                className={classNames(
                  "neeto-ui-text-gray-800 hover:neeto-ui-text-primary-600",
                  {
                    "neeto-ui-text-primary-600 hover:neeto-ui-text-gray-80":
                      activeLink === routes.root,
                  }
                )}
              >
                {t("menu.home")}
              </Link>
              <Link
                to={routes.searchHistory}
                className={classNames(
                  "neeto-ui-text-gray-800 hover:neeto-ui-text-primary-600",
                  {
                    "neeto-ui-text-primary-600 hover:neeto-ui-text-gray-80":
                      activeLink === routes.searchHistory,
                  }
                )}
              >
                {t("menu.searchHistory")}
              </Link>
              <Link
                to={routes.favourites}
                className={classNames(
                  "neeto-ui-text-gray-800 hover:neeto-ui-text-primary-600",
                  {
                    "neeto-ui-text-primary-600 hover:neeto-ui-text-gray-80":
                      activeLink === routes.favourites,
                  }
                )}
              >
                {t("menu.favourites")}
              </Link>
            </div>
          </Typography>
        </div>
      </div>
      <hr className="neeto-ui-bg-gray-400 h-px" />
    </div>
  );
};

export default memo(Header);
