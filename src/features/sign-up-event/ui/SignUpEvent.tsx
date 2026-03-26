import { useAppSelector } from "../../../app/store/hooks";
import { Button } from "../../../shared/ui/button";

export const SignUpEvent = () => {
  const url = useAppSelector((state) => state.event.eventDetail?.urlEvent);
  const handleClick = () => {
    if (url) {
      window.location.href = url;
    }
  };

  return <Button onClick={handleClick}>Записаться</Button>;
};
