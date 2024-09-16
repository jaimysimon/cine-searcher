import { useState } from "react";

import { capitalize } from "neetocommons/pure";
import { Button, Typography } from "neetoui";
import { useTranslation } from "react-i18next";

import Modal from "./Modal";

const Card = ({ imdbID, poster, title, year, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImdbID, setSelectedImdbID] = useState("");
  const { t } = useTranslation();

  const handleViewDetails = id => {
    setSelectedImdbID(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImdbID("");
  };

  return (
    <>
      <div className="neeto-ui-rounded-lg neeto-ui-bg-white neeto-ui-shadow-lg m-2 flex w-full max-w-xs flex-col">
        <div className="neeto-ui-rounded-lg h-40 w-full overflow-hidden">
          <img
            alt={title}
            className="h-full w-full object-contain"
            src={poster}
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <Typography className="text-sm font-semibold text-gray-900">
            {title}
          </Typography>
          <Typography className="neeto-ui-text-gray-600 mb-2 mt-1 text-xs">
            {capitalize(type)} • {year}
          </Typography>
          <div className="mt-auto flex items-center justify-between">
            <Button
              className="neeto-ui-rounded-full neeto-ui-bg-gray-100 neeto-ui-text-gray-800 hover:neeto-ui-bg-gray-200 px-3 py-1 text-xs font-semibold"
              style="secondary"
              onClick={() => handleViewDetails(imdbID)}
            >
              <Typography className="neeto-ui-text-primary-800 text-xs">
                {t("label.viewDetails")}
              </Typography>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        imdbID={selectedImdbID}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
export default Card;
