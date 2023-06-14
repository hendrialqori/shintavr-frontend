import { ModalWrapper } from "./modalWrapper";

export const Loading = () => {
  return (
    <ModalWrapper>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </ModalWrapper>
  )
}