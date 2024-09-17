import { useEffect, useRef, useState } from "react";

import { isNot } from "neetocist";
import { Checkbox, Typography, Input, Button } from "neetoui";
import { useTranslation } from "react-i18next";

const FilterPopup = ({
  isOpen,
  onClose,
  anchorRef,
  setYear,
  setType,
  year,
  type,
}) => {
  const { t } = useTranslation();
  const popupRef = useRef(null);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleEscape = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (anchorRef.current && popupRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();

      setPosition({
        top: anchorRect.bottom + window.scrollY,
        left: anchorRect.left + window.scrollX - 335,
      });
    }
  }, [anchorRef, isOpen]);

  if (!isOpen) return null;

  const handleYearChange = e => {
    const value = e.target.value;
    setYear(value);
  };

  const handleTypeChange = e => {
    const value = e.target.value;
    setType(type =>
      type.includes(value) ? type.filter(isNot(value)) : [...type, value]
    );
  };

  return (
    <div
      className="neeto-ui-bg-white neeto-ui-rounded-lg neeto-ui-shadow-lg absolute z-50 w-1/4 p-4"
      ref={popupRef}
      style={{ top: position.top, left: position.left }}
      onClick={e => e.stopPropagation()}
    >
      <div className="text-right">
        <Button
          className="neeto-ui-text-gray-500 hover:neeto-ui-text-gray-700"
          size="small"
          style="text"
          onClick={onClose}
        >
          &times;
        </Button>
      </div>
      <div className="mb-3 space-y-4">
        <div>
          <Typography className="mb-2" style="body2" weight="semibold">
            {t("label.yearLabel")}
          </Typography>
          <Input
            placeholder={t("placeholders.enterYear")}
            type="number"
            value={year}
            onChange={handleYearChange}
          />
        </div>
        <div>
          <Typography className="mb-2" style="body2" weight="semibold">
            {t("label.type")}
          </Typography>
          <div className="flex space-x-2">
            <Checkbox
              checked={type.includes("movie")}
              label={t("label.movie")}
              name="type"
              value="movie"
              onChange={handleTypeChange}
            />
            <Checkbox
              checked={type.includes("series")}
              label={t("label.series")}
              name="type"
              value="series"
              onChange={handleTypeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
