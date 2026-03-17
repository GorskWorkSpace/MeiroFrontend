import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu/ui/Menu";
import { Footer } from "../../../shared/ui/footer";
import { Input } from "../../../shared/ui/input";

export const MainFooter = () => {
  return (
    <Footer>
      <Input placeholder="Поиск событий..." />
      <Filter />
      <Menu />
    </Footer>
  );
};
