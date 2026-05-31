import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu/ui/Menu";
import { SearchEvents } from "../../../features/search-events";
import { Footer } from "../../../shared/ui/footer";
import { useMediaQuery } from "../../../shared/lib/hooks/useMediaQuery";

export const MainFooter = () => {
  const isDesktop = useMediaQuery("(min-width: 1020px)");

  if (isDesktop) {
    return (
      <Footer>
        <Menu />
        <Filter />
      </Footer>
    );
  } else {
    return (
      <Footer>
        <SearchEvents />
        <Filter />
        <Menu />
      </Footer>
    );
  }
};
