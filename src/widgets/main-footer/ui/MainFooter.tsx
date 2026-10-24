import { Filter } from "../../../features/filter";
import { Menu } from "../../../features/menu";
import { SearchEvents } from "../../../features/search-events";
import { useMediaQuery } from "../../../shared/lib/hooks/useMediaQuery";
import { Footer } from "../../../shared/ui/footer";

export const MainFooter = () => {
  const isDesktop = useMediaQuery("(min-width: 1020px)");

  // На десктопе поиск, фильтр и меню живут в шапке
  if (isDesktop) {
    return null;
  }

  return (
    <Footer>
      <SearchEvents />
      <Filter />
      <Menu />
    </Footer>
  );
};
