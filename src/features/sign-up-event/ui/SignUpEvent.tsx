import { useAppSelector } from "../../../app/store/hooks";
import { selectEventDetail } from "../../../entities/event";
import { Button } from "../../../shared/ui/button";
import { participateInEvent } from "../api/api";

export const SignUpEvent = () => {
  const eventDetail = useAppSelector(selectEventDetail);

  const handleClick = async () => {
    if (!eventDetail) return;

    try {
      // Дожидаемся запроса, иначе переход по ссылке может его оборвать
      await participateInEvent({ eventId: eventDetail.id });
    } catch (error) {
      console.error("Failed to register participation:", error);
    }

    if (eventDetail.urlEvent) {
      window.location.href = eventDetail.urlEvent;
    }
  };

  return <Button onClick={handleClick}>Записаться</Button>;
};
