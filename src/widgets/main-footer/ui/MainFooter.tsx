import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu/ui/Menu";
import { SearchEvents } from "../../../features/search-events";
import { Footer } from "../../../shared/ui/footer";

export const MainFooter = () => {
  return (
    <Footer>
      <SearchEvents />
      <Filter />
      <Menu />
    </Footer>
  );
};
