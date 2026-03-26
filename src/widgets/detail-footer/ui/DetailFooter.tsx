import { Menu } from "../../../features/menu/ui/Menu";
import { SignUpEvent } from "../../../features/sign-up-event/ui/SignUpEvent";
import { Footer } from "../../../shared/ui/footer";

export const DetailFooter = () => {
  return (
    <Footer>
      <SignUpEvent />
      <Menu />
    </Footer>
  );
};
