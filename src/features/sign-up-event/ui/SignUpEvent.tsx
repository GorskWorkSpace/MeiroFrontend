import { useAppSelector } from "../../../app/store/hooks";
import { Button } from "../../../shared/ui/button";
import { EventParticipation } from "../api/api";

export const SignUpEvent = () => {
  const url = useAppSelector((state) => state.event.eventDetail?.urlEvent);
  const id = useAppSelector((state) => state.event.eventDetail?.id);
  const handleClick = async () => {
    if (id) {
      EventParticipation({ eventId: id });
    }

    if (url) {
      window.location.href = url;
    }
  };

  return <Button onClick={handleClick}>Записаться</Button>;
};
