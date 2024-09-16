import { Modal as NeetoUIModal, Typography } from "neetoui";

const Modal = ({ isOpen, onClose, imdbID }) => {
  // const { t } = useTranslation();
  const { Header, Body } = NeetoUIModal;

  // const { isLoading, data } = useShowMovie(imdbID);
  // console.log(data);

  return (
    <NeetoUIModal {...{ isOpen, onClose }}>
      <Header>
        <Typography>hi</Typography>
      </Header>
      <Body>
        <Typography>{imdbID}</Typography>
      </Body>
    </NeetoUIModal>
  );
};
export default Modal;
