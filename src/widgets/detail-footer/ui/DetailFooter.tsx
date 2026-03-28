import { useAppSelector } from "../../../app/store/hooks";
import { selectEventDetail } from "../../../entities/event";
import { selectIsLoading } from "../../../entities/event/model/eventSlice";
import { Menu } from "../../../features/menu/ui/Menu";
import { SignUpEvent } from "../../../features/sign-up-event/ui/SignUpEvent";
import { Footer } from "../../../shared/ui/footer";

export const DetailFooter = () => {
  const isLoading = useAppSelector(selectIsLoading);
  const eventDetail = useAppSelector(selectEventDetail);

  if (!eventDetail || isLoading) {
    return null;
  }

  return (
    <Footer>
      <SignUpEvent />
      <Menu />
    </Footer>
  );
};
